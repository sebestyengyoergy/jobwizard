<template>
  <div class="full-width">
    <div style="width: 100%;" class="text-h4 q-mb-md">
      {{ $t("org") }}
    </div>
    <h5>{{ $t('orgNameHeader') }}</h5>
    <q-input
      v-model.trim="orgName"
      :label="$t('orgName')"
      name="orgName"
      dense
      outlined
    >
      <template #hint>
        {{ $t("orgHelp") }}
      </template>
    </q-input>

    <h5>{{ $t('orgDescHeader') }}</h5>

    {{ $t("orgDescHelp") }}
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
      "org": "Organization",
      "orgName": "Organization name",
      "orgNameHeader": "Organization name",
      "orgLabel": "Company description",
      "orgHelp": "The company name is suggested when entering a job advertisement",
      "orgDescHelp": "The company description is suggested as an introduction when you enter a job ad. You can change the heading by clicking on it. It is displayed in the advertisement above the introduction.",
      "orgDescHeader": "Company description"
    },
    "de": {
      "org": "Organisation",
      "orgLabel": "Unternehmensbeschreibung",
      "orgName": "Firmenname",
      "orgNameHeader": "Name der Organisation",
      "orgHelp": "Der Firmenname wird bei der Eingabe einer Stellenanzeigen vorgeschlagen",
      "orgDescHelp": "Die Unternehmensbeschreibung wird Ihnen bei der Eingabe einer Stellenanzeige als Einleitung vorgeschlagen. Die Überschrift können sie durch Anklicken ändern. Sie wird in der Anzeige oberhalb der Einleitung angezeigt.",
      "orgDescHeader": "Unternehmensbeschreibung"
    }
  }
</i18n>
