<template>
  <div class="full-width">
    <div class="text-h4 q-mb-md">{{ $t("settings.jobs_title") }}</div>
    <h5>{{ $t("settings.jobs_location.header") }}</h5>
    <div>{{ $t("settings.jobs_location.help") }}</div>
    <div class="q-mt-md">
      <q-input
        ref="autocomplete"
        v-model="location"
        :dark="$q.dark.mode"
        dense
        outlined
        label="Location"
        for="address"
        :placeholder="$t('settings.jobs_location.placeholder')"
      />
    </div>
    <h5>{{ $t("settings.jobs_stats.header") }}</h5>
    <div>{{ $t("settings.jobs_stats.help") }}</div>
    <q-checkbox
      v-model="statistics"
      :label="$t('settings.jobs_stats.label')"
      color="primary"
      name="statistics"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import mixinValidations from 'src/lib/validations';
import { GET_SETTINGS, SET_SETTINGS_FIELD } from 'src/store/names';

export default {
  name: 'Jobs',
  mixins: [mixinValidations],
  computed: {
    ...mapGetters([GET_SETTINGS]),
    statistics: {
      get()
      {
        return this[GET_SETTINGS].jobsStatsEnabled;
      },
      set(val)
      {
        this[SET_SETTINGS_FIELD]({ jobsStatsEnabled: val });
      }
    },
    location: {
      get()
      {
        return this[GET_SETTINGS].location;
      },
      set(val)
      {
        this[SET_SETTINGS_FIELD]({ location: val });
      }
    }
  },
  mounted()
  {
    this.autocomplete = new google.maps.places.Autocomplete(
      (document.getElementById('address')),
      { types: ['geocode'] });
    this.autocomplete.addListener('place_changed', () =>
    {
      const place = this.autocomplete.getPlace();
      //  let ac = place.address_components;
      this.location = place.formatted_address;
    });
  },
  methods: {
    ...mapMutations([SET_SETTINGS_FIELD])
  },
};
</script>

<i18n>
{
  "en": {
    "settings": {
      "jobs_title": "Jobs",
      "jobs_location": {
        "header": "Location",
        "label": "",
        "help": "If they recruit repeatedly at certain locations, they can define a list of locations here."
      },
      "jobs_stats": {
        "header": "Statistics",
        "label": "Evaluate clicks and page views in accordance with data protection regulations.",
        "help": "with the activate, a code is built into the job advertisement that collects access figures.",
        "placeholder": "Enter Location"
      },
    },
  },
  "de": {
    "settings": {
      "jobs_title": "Stellenanzeigen",
      "jobs_location": {
        "header": "Dienstsitz",
        "help": "Wenn sie immer wieder an bestimmten Orten rekrutieren, können sie hier eine Liste von Orten definieren."
      },
      "jobs_stats": {
        "header": "Statistiken",
        "label": "Klicks und Pageviews datenschutzkonform auswerten.",
        "help": "mit dem Aktivieren wird in die Anzeige ein Code eingebaut, der Zugriffszahlen sammelt.",
        "placeholder": "Enter Location"
      }
    }
  }
}
</i18n>
