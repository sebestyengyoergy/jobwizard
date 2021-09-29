<template>
  <div class="q-gutter-md">
    <q-input v-model.trim="jobTitle" :label="$t('job_title')" color="primary" name="job_title" outlined dense />
    <q-input v-model.trim="organization" :label="$t('organization')" color="primary" name="organization" outlined dense />
    <div class="row">
      <q-select v-model="country" :label="$t('country')" :options="filteredCountries" color="primary" name="country"
                outlined dense options-dense use-input fill-input hide-selected
                input-debounce="200" class="col-4" @input-value="country = $event" @filter="countryAutocomplete"
      />
      <q-input v-model.trim="location" :label="$t('location')" color="primary" name="location" outlined dense class="col-grow" />
    </div>
    <q-input v-model.trim="applyUrl" :label="$t('apply_url')" color="primary" name="apply_url" outlined dense />
    <q-input v-model.trim="applyEmail" :label="$t('apply_email')" color="primary" name="apply_email" outlined dense />
    <q-checkbox v-model="application" :label="$t('application')" color="primary" name="application" />
    <q-input v-model.trim="reference" :label="$t('reference')" color="primary" name="reference" outlined dense />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import {
  GET_JOB_TITLE,
  GET_ORGANIZATION,
  GET_COUNTRY,
  GET_LOCATION,
  GET_APPLY_URL,
  GET_APPLY_EMAIL,
  GET_APPLICATION,
  GET_REFERENCE,
  SET_JOB_TITLE,
  SET_ORGANIZATION,
  SET_COUNTRY,
  SET_LOCATION,
  SET_APPLY_URL,
  SET_APPLY_EMAIL,
  SET_APPLICATION,
  SET_REFERENCE
} from 'src/store/names';
import countries from 'src/countries';

export default
{
  name: 'StepOne',
  props:
    {
      active: // eslint-disable-line vue/no-unused-properties
        {
          type: Boolean,
          default: false
        },
      stepper: // eslint-disable-line vue/no-unused-properties
        {
          type: Object,
          default: null
        },
      width: // eslint-disable-line vue/no-unused-properties
        {
          type: Number,
          default: 1024
        },
    },
  data()
  {
    return {
      filteredCountries: [],
    };
  },
  computed:
    {
      ...mapGetters([GET_JOB_TITLE, GET_ORGANIZATION, GET_COUNTRY, GET_LOCATION, GET_APPLY_URL, GET_APPLY_EMAIL, GET_APPLICATION, GET_REFERENCE]),
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
            return this[GET_JOB_TITLE];
          },
          set(val)
          {
            this[SET_JOB_TITLE](val);
          }
        },
      organization:
        {
          get()
          {
            return this[GET_ORGANIZATION];
          },
          set(val)
          {
            this[SET_ORGANIZATION](val);
          }
        },
      location:
        {
          get()
          {
            return this[GET_LOCATION];
          },
          set(val)
          {
            this[SET_LOCATION](val);
          }
        },
      country:
        {
          get()
          {
            return this[GET_COUNTRY];
          },
          set(val)
          {
            this[SET_COUNTRY](val);
          }
        },
      applyUrl:
        {
          get()
          {
            return this[GET_APPLY_URL];
          },
          set(val)
          {
            this[SET_APPLY_URL](val);
          }
        },
      applyEmail:
        {
          get()
          {
            return this[GET_APPLY_EMAIL];
          },
          set(val)
          {
            this[SET_APPLY_EMAIL](val);
          }
        },
      application:
        {
          get()
          {
            return this[GET_APPLICATION];
          },
          set(val)
          {
            this[SET_APPLICATION](val);
          }
        },
      reference:
        {
          get()
          {
            return this[GET_REFERENCE];
          },
          set(val)
          {
            this[SET_REFERENCE](val);
          }
        },
    },
  methods:
    {
      ...mapMutations([SET_JOB_TITLE, SET_ORGANIZATION, SET_COUNTRY, SET_LOCATION, SET_APPLY_URL, SET_APPLY_EMAIL, SET_APPLICATION, SET_REFERENCE]),
      countryAutocomplete(val, update, abort)
      {
        update(() =>
        {
          const needle = val.toLocaleLowerCase();
          this.filteredCountries = this.countryList.filter(v => v.search.indexOf(needle) > -1);
        });
      }
    }
};
</script>

<style lang="scss">
  //
</style>

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
    }
  }
</i18n>
