<template>
  <div class="full-width">
    <div class="text-h4 q-mb-md">{{ $t('settings.misc_title') }}</div>
    <h5>{{ $t('settings.layout.header') }}</h5>
    {{ $t('settings.layout.help') }}<br>
    <q-checkbox
      v-model="dark"
      :label="$t('settings.layout.name')"
      color="primary"
      name="darkmode"
      @click="$q.dark.toggle()"
    />
    <h5>{{ $t('settings.locale.header') }}</h5>
    {{ $t('settings.locale.help') }}<br>
    <SwitchLanguage :disabled="browserLanguage" />
    <br>
    <q-checkbox
      v-model="browserLanguage"
      :label="$t('settings.layout.use_browser_language')"
      color="primary"
      name="browserLanguage"
    />
    <h5>{{ $t("settings.form.header") }}</h5>
    <div>{{ $t("settings.form.help") }}</div>

    <q-checkbox
      v-model="spellcheck"
      :label="$t('settings.form.spellcheck')"
      color="primary"
      name="spellcheck"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import mixinValidations from 'src/lib/validations';
import SwitchLanguage from 'src/components/SwitchLanguage';
import { GET_SETTINGS, SET_SETTINGS_FIELD } from 'src/store/names';

export default {
  name: 'Misc',
  components:
  {
    SwitchLanguage
  },
  mixins: [mixinValidations],
  computed: {
    ...mapGetters([GET_SETTINGS]),
    dark:
    {
      get()
      {
        return this[GET_SETTINGS].miscDarkmode;
      },
      set(val)
      {
        this[SET_SETTINGS_FIELD]({ miscDarkmode: val });
      }
    },
    browserLanguage:
    {
      get()
      {
        return this[GET_SETTINGS].useBrowserLanguage;
      },
      set(val)
      {
        if (val === false)
        {
          this[SET_SETTINGS_FIELD]({ defaultLanguage: this.$root.$i18n.locale });
        }
        this[SET_SETTINGS_FIELD]({ useBrowserLanguage: val });
      }
    },
    spellcheck:
    {
      get()
      {
        return this[GET_SETTINGS].formSpellcheckEnabled;
      },
      set(val)
      {
        this[SET_SETTINGS_FIELD]({ formSpellcheckEnabled: val });
      },
    }
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
        "misc_title": "Misc",
        "layout": {
          "header": "Layout",
          "help": "The Job Wizard takes over the dark mode settings from the terminal. You can set the night view setting permanently.",
          "name": "Dark mode",
          "use_browser_language": "Use the language settings of the browser"
        },
        "locale":{
          "header": "Locale and language",
          "help": "The jobwizard uses the language settings of your browser for the default language. Here you can set the language in the jobwizard.",
          "name": "Locale"
        },
        "form": {
          "header": "Forms",
          "help": "Many modern browsers and mobile devices have a built-in autocorrect function. Here you can activate or deactivate this feature for the job wizard.",
          "spellcheck": "activate spellcheck?",
        }
      }
    },
    "de": {
      "settings": {
        "misc_title": "Sonstiges",
        "layout": {
          "header": "Ansicht",
          "help": "Der Jobwizard übernimmt die Einstellungen zur Nachtansicht vom Endgerät. Die können sie die Einstellung zur Nachansicht fest einstellen.",
          "name": "Nachtmodus",
          "use_browser_language": "Spracheinstellungen des Browsers nutzen"
        },
        "locale":{
          "header": "Standort und Sprache",
          "help": "Für die Voreinstellung der Sprache übernimmt der Jobwizard die Spracheinstellungen ihres Browsers.  Hier können sie die Sprache im Jobwizard festlegen.",
          "name": "Standort"
        },
        "form": {
          "header": "Formulare",
          "help": "Viele moderne Browser und Mobilgeräte haben eine eingebaute Autokorrektur Funktion. Hier können sie dieses Feature für den Jobwizard aktivieren bzw. deaktivieren.",
          "spellcheck": "Rechtschreibprüfung aktivieren?",
        }
      }
    }
  }
</i18n>
