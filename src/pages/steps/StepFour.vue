<template>
  <div>
    <div v-if="!hasAuth" class="text-center">
      <h3>{{ $t('thank') }}</h3>
      <div>
        {{ $t('howtoDownload') }}
      </div>
      <q-btn type="a" style="background-color: orange; margin-top: 20px;" glossy href="https://github.com/sponsors/cbleek" rounded size="xl">{{ $t('supportYawik') }}</q-btn>
    </div>
    <div v-else>
      <PrivacyPolicy v-model="acceptTerms" />
    </div>
  </div>
</template>

<script>
import PrivacyPolicy from 'src/components/PrivacyPolicy';
import { GET_FORM, SET_FIELD, HAS_AUTH } from 'src/store/names';
import { mapGetters, mapMutations } from 'vuex';

export default
{
  name: 'StepFour',
  components:
    {
      PrivacyPolicy,
    },
  computed:
    {
      ...mapGetters([GET_FORM, HAS_AUTH]),
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
        },
      hasAuth()
      {
        return this[HAS_AUTH];
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
      "supportYawik": "Yawik unterstützen"
    }
  }
</i18n>
