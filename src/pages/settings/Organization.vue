<template>
  <div class="full-width">
    <div style="width: 100%;" class="text-h4 q-mb-md">
      {{ $t("settings.org_title") }}
    </div>
    <h5>{{ $t('settings.org_name.header') }}</h5>
    {{ $t("settings.org_name.help") }}
    <q-space /><br>
    <q-input
      v-model.trim="orgName"
      :label="$t('settings.org_name.label')"
      name="orgName"
      dense
      outlined
    />

    <h5>{{ $t('settings.org_desc.header') }}</h5>

    {{ $t('settings.org_desc.help') }}
    <q-space /><br>

    <EditorInput
      v-model:label="orgLabel"
      v-model:value="orgDescription"
      :rules="[ruleRequired]"
      name="orgDesc"
    />
    <h5>{{ $t('settings.org_contact.header') }}</h5>

    {{ $t('settings.org_contact.help') }}
    <q-space /><br>

    <EditorInput
      v-model:label="orgContactInfoLabel"
      v-model:value="orgContactInfo"
      :rules="[ruleRequired]"
      name="orgContactInfo"
    />
  </div>
</template>

<script>
import EditorInput from 'src/components/form/Editor';
import { mapGetters, mapMutations } from 'vuex';
import mixinValidations from 'src/lib/validations';
import { GET_SETTINGS, SET_SETTINGS_FIELD } from 'src/store/names';

export default {
  name: 'Organization',
  components: {
    EditorInput,
  },
  mixins: [mixinValidations],
  computed: {
    ...mapGetters([GET_SETTINGS]),
    orgName: {
      get()
      {
        return this[GET_SETTINGS].orgName;
      },
      set(val)
      {
        this[SET_SETTINGS_FIELD]({ orgName: val });
      },
    },
    orgLabel: {
      get()
      {
        return this[GET_SETTINGS].orgDescriptionLabel;
      },
      set(val)
      {
        this[SET_SETTINGS_FIELD]({ orgDescriptionLabel: val });
      },
    },
    orgDescription: {
      get()
      {
        return this[GET_SETTINGS].orgDescription;
      },
      set(val)
      {
        this[SET_SETTINGS_FIELD]({ orgDescription: val });
      },
    },
    orgContactInfoLabel: {
      get()
      {
        return this[GET_SETTINGS].orgContactInfoLabel;
      },
      set(val)
      {
        this[SET_SETTINGS_FIELD]({ orgContactInfoLabel: val });
      },
    },
    orgContactInfo: {
      get()
      {
        return this[GET_SETTINGS].orgContactInfo;
      },
      set(val)
      {
        this[SET_SETTINGS_FIELD]({ orgContactInfo: val });
      },
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
        "org_title": "Organization",
        "org_name": {
          "label": "Company name",
          "help": "The company name is suggested when entering a job advertisement",
          "header": "Name of the company or organisation",
        },
        "org_desc": {
          "label": "Company description",
          "help": "The company description is suggested as an introduction when you enter a job ad. You can change the heading by clicking on it. It is displayed in the advertisement above the introduction.",
          "header": "Company description"
        },
        "org_contact": {
          "label": "Contact",
          "help": "Here you can store contact information for applicants. These will be suggested to them for future advertisements.",
          "header": "Contact for applicants"
        }
      },
    },
    "de": {
      "settings": {
        "org_title": "Organisation",
        "org_name": {
          "label": "Firmenname",
          "header": "Name der Firma oder Organisation",
          "help": "Der Firmenname wird bei der Eingabe einer Stellenanzeigen vorgeschlagen",
        },
        "org_desc": {
          "label": "Unternehmensbeschreibung",
          "help": "Die Unternehmensbeschreibung wird bei der Eingabe einer Anzeige als Einleitung vorgeschlagen. Sie können die Überschrift duch anklicken ändern. Die Überschrift wird in der Anzeige oberhalb der Einleitung angezeigt.",
          "header": "Unternehmensbeschreibung"
        },
        "org_contact": {
          "label": "Kontakt",
          "help": "Hier können Sie Kontakt Informationen für Bewerber hinterlegen. Diese werden ihnen bei zukünftigen Anzeigen vorgeschlagen.",
          "header": "Kontakt für Bewerber"
        }
      },
    },
    "fr": {
      "settings": {
        "org_title": "Organisation",
        "org_name": {
          "name": "Nom de l'entreprise",
          "header": "Nom de l'entreprise",
          "help": "Le nom de l'entreprise est proposé lors de la saisie d'une offre d'emploi",
        },
        "org_desc": {
          "label": "Description de l'entreprise",
          "help": "La description de l'entreprise est proposée comme introduction lors de la saisie d'une annonce. Vous pouvez modifier le titre en cliquant dessus. Le titre est affiché dans l'annonce au-dessus de l'introduction.",
          "header": "Description de l'entreprise"
        },
        "org_contact": {
          "label": "Contact",
          "help": "Ici, vous pouvez enregistrer des informations de contact pour les candidats. Celles-ci leur seront proposées lors de leurs prochaines annonces.",
          "header": "Contact pour les candidats"
        }
      },
    }

  }
</i18n>
