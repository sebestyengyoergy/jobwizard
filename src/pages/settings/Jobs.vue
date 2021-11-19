<template>
  <div class="full-width">
    <div class="text-h4 q-mb-md">{{ $t('settings.jobs_title') }}</div>
    <h5>{{ $t('settings.jobs_location.header') }}</h5>
    {{ $t('settings.jobs_location.help') }}
    <h5>{{ $t('settings.jobs_stats.header') }}</h5>
    {{ $t('settings.jobs_stats.help') }}
    <q-checkbox
      v-model="statistics"
      :label="$t('settings.jobs_stats.label')"
      color="primary"
      name="statistics"
    />
    <h5>{{ $t('settings.jobs_lang.header') }}</h5>

    <q-checkbox
      v-model="spellcheck"
      :label="$t('settings.jobs_lang.label')"
      color="primary"
      name="spellcheck"
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
    statistics:
        {
          get()
          {
            return this[GET_SETTINGS].jobsStatsEnabled;
          },
          set(val)
          {
            this[SET_SETTINGS_FIELD]({ jobsStatsEnabled: val });
          }
        },
    spellcheck:
        {
          get()
          {
            return this[GET_SETTINGS].jobsSpellcheckEnabled;
          },
          set(val)
          {
            this[SET_SETTINGS_FIELD]({ jobsSpellcheckEnabled: val });
          }
        },
  },
  methods: {
    ...mapMutations([SET_SETTINGS_FIELD]),
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
          "help": "with the activate, a code is built into the job advertisement that collects access figures."
        },
        "jobs_lang": {
          "header": "Sprachen",
          "help": "in which language would you like to publish job advertisements?",
          "label": "aktivate spellcheck?"
        }
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
          "statistics": "Statistiken",
          "stats_label": "Klicks und Pageviews datenschutzkonform  auswerten.",
          "help": "mit dem aktivieren wird in die Anzeige ein Code eingebaut, der Zugriffszahlen sammelt."
        },
        "jobs_lang": {
          "header": "Sprachen",
          "help": "in welcher Sprache möchten Sie Stellenanzeigen veröffentlichen?",
          "label": "Rechtschreibprüfung aktivieren?"
        }
      },
    }
  }
</i18n>
