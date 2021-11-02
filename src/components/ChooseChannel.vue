<template>
  <div>
    <h5>{{ $t('channel') }}</h5>
    <div class="row justify-center q-gutter-lg">
      <Channel v-for="c in data" :key="c.id" v-bind="c" />
    </div>
  </div>
</template>

<script>
import Channel from 'src/components/Channel.vue';
import Data from 'src/channels.json';

export default
{
  name: 'ChooseChannel',
  components: {
    Channel
  },
  computed:
  {
    data()
    {
      return Data;
    }
  }
};
</script>

<style scoped>
  .channel
  {
    padding: 10px;
    width: 100%;
    max-width: 300px;
  }
</style>

<i18n>
  {
    "en": {
      "channel": "Where would you like to publish your job advertisement?",
      "privacy_policy": "Note on data protection: After sending the entered data, it will be processed on our server and forwarded in an email to the person responsible for processing. We assure you of the highest level of confidentiality and compliance with all legal requirements. For more information on data processing, please refer to our <a href='{url}' target='_blank' rel='noopener noreferrer'>Privacy policy</a>."
    },
    "de": {
      "channel": "Wo möchten Sie ihre Stellenanzeige veröffentlichen?",
      "privacy_policy": "Hinweis zum Datenschutz: Nach dem Absenden der eingegebenen Daten werden diese auf unserem Server verarbeitet und in einer Mail an die für die Bearbeitung zuständige Person weitergeleitet. Wir sichern Ihnen dabei ein Höchstmaß an Vertraulichkeit zu und versichern die Einhaltung aller gesetzlichen Vorschriften. Weitere Informationen zur Datenverarbeitung erhalten Sie auf unserer <a href='{url}' target='_blank' rel='noopener noreferrer'>Datenschutzbestimmungen</a>.",
    }
  }
</i18n>
