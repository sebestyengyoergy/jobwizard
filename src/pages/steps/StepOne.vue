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
      <q-input id="location" ref="location" v-model.trim="locationDisplay" :label="$t('location')" color="primary" bg-color="white"
               name="location"
               outlined dense class="col-grow" :rules="[ruleRequired]" hide-bottom-space
               @keypress.enter="gotoNext"
      />
    </div>

    <!-- URL -->
    <q-input v-model.trim="applyUrl" :label="$t('apply_url')" color="primary" bg-color="white" name="apply_url"
             outlined dense :rules="[validURL]" hide-bottom-space :disable="applyPost" @keypress.enter="gotoNext"
    />

    <!-- Email -->
    <q-input v-model.trim="applyEmail" :label="$t('apply_email')" color="primary" bg-color="white" name="apply_email"
             outlined dense :rules="[validEmail]" hide-bottom-space :disable="applyPost" @keypress.enter="gotoNext"
    />

    <q-checkbox v-model="applyPost" :label="$t('apply_post')" color="primary" name="apply_post" />

    <!-- Reference -->
    <q-input v-model.trim="reference" :label="$t('reference')" color="primary" bg-color="white" name="reference"
             outlined dense :rules="[]" hide-bottom-space @keypress.enter="gotoNext"
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
      locationForm: [
        'location',
        'locality',
        'administrative_area_level_1',
        'country',
        'postal_code',
      ],
      locationData: {
        streetAddress: '',
        addressLocality: '',
        addressRegion: '',
        postalCode: '',
        addressCountry: ''
      },
      locationNameFormat: {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        country: 'long_name',
        postal_code: 'short_name',
      },
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
      country:
        {
          get()
          {
            return this[GET_FORM].country;
          },
          set(val)
          {
            this.googleSearchBox.setComponentRestrictions(
              {
                country: [val.value.toLocaleLowerCase()]
              }
            );
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
      applyPost:
        {
          get()
          {
            return this[GET_FORM].applyPost;
          },
          set(val)
          {
            this[SET_FIELD]({ applyPost: val });
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
      locationDisplay:
        {
          get()
          {
            return this[GET_FORM].formattedAddress;
          },
          set(val)
          {
            this[SET_FIELD]({ formattedAddress: val });
          }
        },
    },
  mounted()
  {
    if (window.google)
    {
      const autocompleteInput = this.$refs.location.getNativeElement();
      this.googleSearchBox = new window.google.maps.places.Autocomplete(autocompleteInput, {
        fields: ['formatted_address', 'address_components'],
        types: ['(cities)']
      });
      this.googleSearchBox.addListener('place_changed', () =>
      {
        const place = this.googleSearchBox.getPlace();
        this.locationChanged(place);
      }
      );
    }
  },
  beforeUnmount()
  {
    if (this.googleMapsListener) this.googleSearchBox.removeListener(this.googleMapsListener);
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
      getLocationComp(place, type)
      {
        for (const component of place)
        {
          if (component.types[0] === type)
          {
            return component[this.locationNameFormat[type]];
          }
        }
        return '';
      },
      insertLocatationData(loc)
      {
        for (const component of this.locationForm)
        {
          switch (component)
          {
            case 'location':
              this.locationData.streetAddress = this.getLocationComp(loc, 'street_number') + ' ' + this.getLocationComp(loc, 'route');
              break;
            case 'locality':
              this.locationData.addressLocality = this.getLocationComp(loc, component);
              break;
            case 'administrative_area_level_1':
              this.locationData.addressRegion = this.getLocationComp(loc, component);
              break;
            case 'country':
              this.locationData.addressCountry = this.getLocationComp(loc, component);
              break;
            case 'postal_code':
              this.locationData.postalCode = this.getLocationComp(loc, component);
              break;
          }
        }
      },
      locationChanged(place)
      {
        const addressComponents = place.address_components;
        this.insertLocatationData(addressComponents);
        this.$store.commit('SET_LOCATION', Object.assign({}, this.locationData));
        this.locationDisplay = place.formatted_address;
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
      "apply_post": "No online application/postal application",
      "reference": "Reference",
    },
    "de": {
      "job_title": "Anzeigentitel",
      "organization": "Name des Unternehmens",
      "country": "Land",
      "location": "Ort",
      "apply_url": "Bewerbungslink",
      "apply_email": "Bewerbungsemail",
      "apply_post": "keine Onlinebewerbung/postalische Bewerbungen",
      "reference": "Referenz",
      "rules": {
        "required": "Pflichtfeld"
      }
    }
  }
</i18n>
