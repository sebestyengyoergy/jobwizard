<template>
  <div class="full-width">
    <div style="width: 100%;" class="text-h4 q-mb-md">
      {{ $t("settings.org_title") }}
    </div>
    <h5>{{ $t('settings.org_name.header') }}</h5>
    <q-input
      v-model.trim="orgName"
      :label="$t('settings.org_name.name')"
      name="orgName"
      dense
      outlined
    >
      <template #hint>
        {{ $t("settings.org_name.help") }}
      </template>
    </q-input>

    <h5>{{ $t('settings.org_desc.header') }}</h5>

    {{ $t('settings.org_desc.help') }}
    <q-space /><br>

    <EditorInput
      v-model:label="orgLabel"
      v-model:value="orgDescription"
      :rules="[ruleRequired]"
      name="orgDesc"
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
        return this[GET_SETTINGS].orgLabel;
      },
      set(val)
      {
        this[SET_SETTINGS_FIELD]({ orgLabel: val });
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
          "header": "Organization name",
          "name": "Organization name",
          "help": "The company name is suggested when entering a job advertisement",
        },
        "org_desc": {
          "orgLabel": "Company description",
          "help": "The company description is suggested as an introduction when you enter a job ad. You can change the heading by clicking on it. It is displayed in the advertisement above the introduction.",
          "header": "Company description"
        },
      },
    },
    "de": {
      "settings": {
        "org_title": "Organisation",
        "org_name": {
          "name": "Firmenname",
          "header": "Name der Organisation",
          "help": "Der Firmenname wird bei der Eingabe einer Stellenanzeigen vorgeschlagen",
        },
        "org_desc": {
          "label": "Unternehmensbeschreibung",
          "help": "Die Unternehmensbeschreibung wird Ihnen bei der Eingabe einer Stellenanzeige als Einleitung vorgeschlagen. Die Überschrift können sie durch Anklicken ändern. Sie wird in der Anzeige oberhalb der Einleitung angezeigt.",
          "header": "Unternehmensbeschreibung"
        }
      },
    }
  }
</i18n>
