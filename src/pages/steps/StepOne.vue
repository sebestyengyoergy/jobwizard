<template>
  <div class="row q-col-gutter-md">
    <!-- Job title -->
    <TextInput
      v-model="jobTitle"
      name="job_title"
      class="col-12"
      :label="$t('job_title')"
      :rules="[ruleRequired]"
      @enterPress="gotoNext"
    />

    <!-- Organization -->
    <TextInput
      v-model.trim="organization"
      name="organization"
      class="col-12"
      :label="$t('label.organization')"
      :rules="[ruleRequired]"
      @enterPress="gotoNext"
    />

    <div class="col-12">
      <div class="row">
        <q-input
          id="location"
          ref="location"
          v-model.trim="locationDisplay"
          :label="$t('label.location')"
          color="primary"
          class="col-lg-8 col-md-8"
          name="location"
          outlined
          dense
          :rules="[ruleRequired]"
          @keypress.enter="gotoNext"
        />
        <q-checkbox
          v-model="remoteWork"
          style="margin-top: -20px;"
          :label="$t('label.homeoffice')"
          color="primary"
          name="apply_post"
          class="col-lg-2 col-md-2"
        />
        <q-slider
          v-if="remoteWork"
          v-model="remoteWorkPercentage"
          style="margin-top: -20px;"
          name="remoteWorkPercentage"
          class="col-lg-2 col-md-2"
          :label-value="remoteWorkPercentage + '%'"
          label-always
          :min="10"
          :max="100"
          :step="10"
        />
      </div>
    </div>
    <!-- URL -->
    <TextInput
      v-model="applyUrl"
      name="apply_url"
      class="col-12"
      :label="$t('label.apply_url')"
      :rules="[validURL]"
      :disable="applyPost"
      @enterPress="gotoNext"
    />

    <!-- Email -->
    <TextInput
      v-model="applyEmail"
      name="apply_email"
      class="col-12"
      :label="$t('label.apply_email')"
      :rules="[validEmail]"
      :disable="applyPost"
      @enterPress="gotoNext"
    />

    <q-checkbox
      v-model="applyPost"
      :label="$t('label.apply_post')"
      color="primary"
      name="apply_post"
    >
      <Tooltip :text="$t('help.apply_post')" />
    </q-checkbox>

    <!-- Reference -->
    <TextInput
      v-model="reference"
      name="reference"
      class="col-12"
      :label="$t('label.reference')"
      @enterPress="gotoNext"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { GET_FORM, GET_SETTINGS, SET_FIELD } from 'src/store/names';
import mixinValidations from 'src/lib/validations';
import TextInput from 'src/components/form/TextInput.vue';
import Tooltip from 'src/components/form/Tooltip.vue';

export default {
  name: 'StepOne',
  components: {
    TextInput,
    Tooltip
  },
  mixins: [mixinValidations],
  emits: ['next'],
  data()
  {
    return {
      hideDelay: 600,
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
      }
    };
  },
  computed:
      {
        ...mapGetters([GET_FORM, GET_SETTINGS]),

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
        remoteWork:
          {
            get()
            {
              return this[GET_FORM].remoteWork;
            },
            set(val)
            {
              this[SET_FIELD]({ remoteWork: val });
            }
          },
        remoteWorkPercentage:
          {
            get()
            {
              return this[GET_FORM].remoteWorkPercentage;
            },
            set(val)
            {
              this[SET_FIELD]({ remoteWorkPercentage: val });
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
        countries:
          {
            get()
            {
              return this[GET_SETTINGS].countries;
            }
          }
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
      if (this.countries)
      {
        this.googleSearchBox.setComponentRestrictions(
          {
            country: this.countries.map(element => element.value)
          }
        );
      }
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
        }
        ,
      }
}
;
</script>
