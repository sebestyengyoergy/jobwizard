<template>
  <div>
    <div v-if="!$store.getters.HAS_AUTH" class="text-center">
      <h3>{{ $t('thank') }}</h3>
      <div>
        {{ $t('howtoDownload') }}
      </div>
      <q-btn type="a" style="background-color: grey-6; margin-top: 20px;" glossy href="https://github.com/sponsors/cbleek" rounded size="xl">{{ $t('supportYawik') }}</q-btn>
    </div>
    <div v-else>
      <ChooseChannel />
      <PrivacyPolicy v-model="acceptTerms" />
    </div>
  </div>
</template>

<script>
import PrivacyPolicy from 'src/components/PrivacyPolicy';
import ChooseChannel from 'src/components/ChooseChannel';
import { GET_FORM, SET_FIELD } from 'src/store/names';
import { mapGetters, mapMutations } from 'vuex';

export default
{
  name: 'StepFour',
  components:
    {
      PrivacyPolicy,
      ChooseChannel
    },
  computed:
    {
      ...mapGetters([GET_FORM]),
      acceptTerms:
        {
          get()
          {
            return this[GET_FORM].acceptTerms;
          },
          set(val)
          {
            this[SET_FIELD]({ acceptTerms: val });
          }
        }
    },
  methods:
    {
      ...mapMutations([SET_FIELD]),
    }
};
</script>

<i18n>
  {
    "en": {
      "thank": "Thank you for using Yawik",
      "howtoDownload": "You can now download your job advertisement. If you register, you will be able to save and publish your jobad.",
      "supportYawik": "Support Yawik"
    },
    "de": {
      "thank": "Danke, dass sie Yawik nutzen",
      "howtoDownload": "Sie können nun ihre Stellenanzeige runterladen. Wenn sie sich registrieren, werden sie Ihre Anzeige speichern und veröffentlichen können.",
      "supportYawik": "Yawik unterstützen",
      "rules": {
        "required": "Pflichtfeld"
      }
    }
  }
</i18n>
