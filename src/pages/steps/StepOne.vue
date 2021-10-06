<template>
  <div class="q-gutter-md">
    <!-- Job title -->
    <q-input v-model.trim="jobTitle" :label="$t('job_title')" color="primary" bg-color="white" name="job_title"
             outlined dense :rules="[ruleRequired]" hide-bottom-space @keypress.enter="gotoNext"
    />

    <!-- Organization -->
    <q-input v-model.trim="organization" :label="$t('organization')" color="primary" bg-color="white" name="organization"
             outlined dense :rules="[ruleRequired]" hide-bottom-space @keypress.enter="gotoNext"
    />

    <!-- Country and location -->
    <div class="row">
      <q-select v-model="country" :label="$t('country')" :options="filteredCountries" color="primary" bg-color="white" name="country"
                outlined dense options-dense use-input fill-input hide-selected
                :rules="[ruleRequired]" hide-bottom-space input-debounce="200" class="col-4"
                @filter="countryAutocomplete" @keypress.enter="gotoNext"
      >
        <template #option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section avatar>
              <img :src="'country/'+scope.opt.value.toLowerCase()+'.png'" style="max-width: 48px; border: 1px solid #E5E5E5;">
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ scope.opt.label }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
        <!-- Current flag -->
        <template #prepend>
          <q-avatar v-if="country">
            <img :src="'country/'+(country.value || '').toLowerCase()+'.png'" style="max-width: 48px; border: 1px solid #E5E5E5;">
          </q-avatar>
        </template>
      </q-select>
      <q-input ref="location" v-model.trim="location" :label="$t('location')" color="primary" bg-color="white" name="location"
               outlined dense class="col-grow" :rules="[ruleRequired]" hide-bottom-space
               @keypress.enter="gotoNext"
      />
    </div>

    <!-- URL -->
    <q-input v-model.trim="applyUrl" :label="$t('apply_url')" color="primary" bg-color="white" name="apply_url"
             outlined dense :rules="[validURL]" hide-bottom-space :disabled="application" @keypress.enter="gotoNext"
    />

    <!-- Email -->
    <q-input v-model.trim="applyEmail" :label="$t('apply_email')" color="primary" bg-color="white" name="apply_email"
             outlined dense :rules="[validEmail]" hide-bottom-space :disabled="application" @keypress.enter="gotoNext"
    />

    <q-checkbox v-model="application" :label="$t('application')" color="primary" name="application" />

    <!-- Reference -->
    <q-input v-model.trim="reference" :label="$t('reference')" color="primary" bg-color="white" name="reference"
             outlined dense :rules="[ruleRequired]" hide-bottom-space @keypress.enter="gotoNext"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { GET_FORM, SET_FIELD } from 'src/store/names';
import mixinValidations from 'src/lib/validations';
import countries from 'src/countries';

export default
{
  name: 'StepOne',
  mixins: [mixinValidations],
  emits: ['next'],
  data()
  {
    return {
      filteredCountries: [],
      googleSearchBox: null,
      googleMapsListener: null,
    };
  },
  computed:
    {
      ...mapGetters([GET_FORM]),
      countryList()
      {
        return Object.entries(countries).map(([code, name]) => ({
          value: code,
          label: name,
          search: name.toLocaleLowerCase(),
        }));
      },
      jobTitle:
        {
          get()
          {
            return this[GET_FORM].jobTitle;
          },
          set(val)
          {
            this[SET_FIELD]({ jobTitle: val });
          }
        },
      organization:
        {
          get()
          {
            return this[GET_FORM].organization;
          },
          set(val)
          {
            this[SET_FIELD]({ organization: val });
          }
        },
      location:
        {
          get()
          {
            return this[GET_FORM].location;
          },
          set(val)
          {
            this[SET_FIELD]({ location: val });
          }
        },
      country:
        {
          get()
          {
            return this[GET_FORM].country;
          },
          set(val)
          {
            this[SET_FIELD]({ country: val });
          }
        },
      applyUrl:
        {
          get()
          {
            return this[GET_FORM].applyURL;
          },
          set(val)
          {
            this[SET_FIELD]({ applyURL: val });
          }
        },
      applyEmail:
        {
          get()
          {
            return this[GET_FORM].applyEmail;
          },
          set(val)
          {
            this[SET_FIELD]({ applyEmail: val });
          }
        },
      application:
        {
          get()
          {
            return this[GET_FORM].application;
          },
          set(val)
          {
            this[SET_FIELD]({ application: val });
          }
        },
      reference:
        {
          get()
          {
            return this[GET_FORM].reference;
          },
          set(val)
          {
            this[SET_FIELD]({ reference: val });
          }
        },
    },
  mounted()
  {
    if (window.google)
    {
      this.googleSearchBox = new window.google.maps.places.SearchBox(this.$refs.location.$refs.input);
      window.google.maps.event.addListener(this.googleSearchBox, 'places_changed', this.locationChanged);
    }
  },
  beforeUnmount()
  {
    if (this.googleMapsListener) window.google.maps.event.removeListener(this.googleMapsListener);
    this.googleSearchBox = null;
  },
  methods:
    {
      ...mapMutations([SET_FIELD]),
      countryAutocomplete(val, update, abort)
      {
        update(() =>
        {
          const needle = val.toLocaleLowerCase();
          this.filteredCountries = this.countryList.filter(v => v.search.indexOf(needle) > -1);
        });
      },
      gotoNext()
      {
        this.$emit('next');
      },
      locationChanged()
      {
        const place = this.googleSearchBox.getPlaces()[0];
        this.location = place.formatted_address;
      },
    }
};
</script>

<i18n>
  {
    "en": {
      "job_title": "Job title",
      "organization": "Organization",
      "country": "Country",
      "location": "Location",
      "apply_url": "Apply URL",
      "apply_email": "Apply e-mail",
      "application": "Application",
      "reference": "Reference"
    },
    "de": {
      "job_title": "Anzeigentitel",
      "organization": "Name des Unternehmens",
      "country": "Land",
      "location": "Ort",
      "apply_url": "Bewerbungslink",
      "apply_email": "Bewerbungsemail",
      "application": "nur postalisch",
      "reference": "Referenz"
    }
  }
</i18n>
