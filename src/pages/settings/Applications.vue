<template>
  <div class="full-width">
    <div class="text-h4 q-mb-md">{{ $t("nav.applications") }}</div>
    <h5>{{ $t("settings.apply_post.header") }}</h5>
    <div>{{ $t("settings.apply_post.help") }}</div>
    <q-checkbox
      v-model="postEnabled"
      :label="$t('settings.apply_post.label')"
      color="primary"
    />
    <h5>{{ $t("settings.apply_email.header") }}</h5>
    <div>{{ $t("settings.apply_email.help") }}</div>
    <q-checkbox
      v-model="emailEnabled"
      :disable="postEnabled"
      :label="$t('settings.apply_email.enable')"
      color="primary"
    />
    <q-space /><br>
    <q-input
      v-model.trim="email"
      :label="$t('settings.apply_email.label')"
      :disable="(postEnabled || !emailEnabled)"
      :rules="[validEmail]"
      :placeholder="$t('settings.apply_email.placeholder')"
      dense
      outlined
    />

    <h5>{{ $t("settings.apply_url.header") }}</h5>
    <div>{{ $t("settings.apply_url.help") }}</div>
    <q-checkbox
      v-model="urlEnabled"
      :disable="(postEnabled)"
      :label="$t('settings.apply_url.enable')"
      color="primary"
    />
    <q-space /><br>
    <q-input
      v-model.trim="url"
      :disable="(postEnabled || !urlEnabled)"
      :rules="[validURL]"
      :label="$t('settings.apply_url.label')"
      :placeholder="$t('settings.apply_url.placeholder')"
      dense
      outlined
    />

    <h5>{{ $t("settings.contact_info.header") }}</h5>
    <div>{{ $t("settings.contact_info.help") }}</div>
    <q-checkbox
      v-model="contactEnabled"
      :label="$t('settings.apply_post.label')"
      color="primary"
    />
    <EditorInput
      v-model:label="headline"
      v-model:value="text"
      :disable="!contactEnabled"
      :rules="[ruleRequired]"
    />
  </div>
</template>

<script>
import EditorInput from 'src/components/form/Editor';
import { mapGetters, mapMutations } from 'vuex';
import mixinValidations from 'src/lib/validations';
import { GET_SETTINGS, SET_SETTINGS_FIELD } from 'src/store/names';

export default {
  name: 'Applications',
  components: {
    EditorInput,
  },
  mixins: [mixinValidations],
  computed: {
    ...mapGetters([GET_SETTINGS]),
    postEnabled: {
      get()
      {
        return this[GET_SETTINGS].applications_applyPost_enabled;
      },
      set(val)
      {
        this[SET_SETTINGS_FIELD]({ applications_applyPost_enabled: val });
      },
    },
    emailEnabled: {
      get()
      {
        return this[GET_SETTINGS].applications_applyEmail_enabled;
      },
      set(val)
      {
        this[SET_SETTINGS_FIELD]({ applications_applyEmail_enabled: val });
      },
    },
    urlEnabled: {
      get()
      {
        return this[GET_SETTINGS].applications_applyUrl_enabled;
      },
      set(val)
      {
        this[SET_SETTINGS_FIELD]({ applications_applyUrl_enabled: val });
      },
    },
    contactEnabled: {
      get()
      {
        return this[GET_SETTINGS].applications_ContactInfo_enabled;
      },
      set(val)
      {
        this[SET_SETTINGS_FIELD]({ applications_ContactInfo_enabled: val });
      },
    },
    headline: {
      get()
      {
        return this[GET_SETTINGS].applications_contactInfo_headline;
      },
      set(val)
      {
        this[SET_SETTINGS_FIELD]({ applications_contactInfo_headline: val });
      },
    },
    text: {
      get()
      {
        return this[GET_SETTINGS].applications_contactInfo_text;
      },
      set(val)
      {
        this[SET_SETTINGS_FIELD]({ applications_contactInfo_text: val });
      },
    },
    url: {
      get()
      {
        return this[GET_SETTINGS].applications_applyPost_address;
      },
      set(val)
      {
        this[SET_SETTINGS_FIELD]({ applications_applyPost_address: val });
      },
    },
    email: {
      get()
      {
        return this[GET_SETTINGS].applications_applyEmail_address;
      },
      set(val)
      {
        this[SET_SETTINGS_FIELD]({ applications_applyEmail_address: val });
      },
    },

  },
  methods:
  {
    ...mapMutations([SET_SETTINGS_FIELD]),
  },
};
</script>

<i18n>
{
  "en": {
    "settings": {
      "apply_post": {
        "header": "Postal applications",
        "label": "Evaluate clicks and page views in accordance with data protection regulations.",
        "help": "If your application process requires that applications are only received by post, you can activate this here.",
      },
      "apply_email": {
        "header": "Applications by email",
        "label": "E-mail address",
        "enable": "Allow incoming applications by email",
        "help": "Here you can specify an e-mail address to which applications should be sent.",
        "placeholder": "E-mail address for incoming applications"
      },
      "apply_url": {
        "header": "Application form",
        "label": "Application form",
        "enable": "Use application form",
        "help": "Here you can store a link to an application form through which a candidate should apply.",
        "placeholder": "Link to an application form"
      },
      "contact_info": {
        "label": "Contact",
        "help": "Here you can store contact information for applicants. These will be suggested to them for future advertisements.",
        "header": "Contact for applicants"
      }
    },
  },
  "de": {
    "settings": {
      "apply_post": {
        "header": "Postalische Bewerbungen",
        "label": "Bewerbungen nur über den postalischen Weg zulassen.",
        "help": "Wenn es der Bewerbungsprozess bei Ihnen verlangt, dass Bewerbungen nur über den postalischen Weg eingehen sollen, können Sie das hier aktivieren. Einstellungen zu Email und Bewerbungsformular werden Aktivierung ignoriert.",
      },
      "apply_email": {
        "header": "Bewerbungen per Email",
        "label": "E-Mail Adresse",
        "enable": "Eingehende Bewerbungen per Email zulassen",
        "help": "Hier können sie eine E-Mail Adresse festlegen, an die Bewerbungen gesendet werden sollen.",
        "placeholder": "E-Mail Adresse für eingehende Bewerbungen"
      },
      "apply_url": {
        "header": "Bewerbungsformular",
        "label": "Bewerbungsformular",
        "enable": "Bewerbungsformular verwenden",
        "help": "Hier können Sie einen Link zu einem Bewerbungsformular hinterlegen, über das sich ein Kandidat bewerben soll.",
        "placeholder": "Link zu einem Bewerbungsformular"
      },
      "contact_info": {
        "label": "Kontakt",
        "help": "Hier können Sie Kontakt Informationen für Bewerber hinterlegen. Diese werden ihnen bei zukünftigen Anzeigen vorgeschlagen.",
        "header": "Kontakt für Bewerber"
      }
    }
  },
  "fr": {
    "settings": {
      "apply_post": {
        "header": "Candidatures par voie postale",
        "label": "Autoriser les candidatures uniquement par voie postale.",
        "help": "Si votre processus de candidature exige que les candidatures soient envoyées uniquement par voie postale, vous pouvez l'activer ici. Les paramètres relatifs à l'e-mail et au formulaire de candidature ne sont pas pris en compte dans l'activation."
      },
      "contact_info": {
        "label": "Contact",
        "help": "Si votre processus de candidature exige que les candidatures soient envoyées uniquement par voie postale, vous pouvez l'activer ici.",
        "header": "Contact pour les candidats"
      },
      "apply_url": {
        "header": "Formulaire de candidature",
        "label": "Formulaire de candidature",
        "enable": "Utiliser le formulaire de candidature",
        "help": "Vous pouvez déposer ici un lien vers un formulaire de candidature via lequel un candidat doit postuler.",
        "placeholder": "Lien vers un formulaire de candidature"
      },
      "contact_info": {
        "label": "Contact",
        "help": "Ici, vous pouvez enregistrer des informations de contact pour les candidats. Celles-ci leur seront proposées lors de leurs prochaines annonces.",
        "header": "Contact pour les candidats"
      }
    }
  }
}
</i18n>
