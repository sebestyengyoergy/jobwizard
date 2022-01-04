<template>
  <div>
    <h5 v-if="!$yawik.isAuth()">{{ $t('anonymous') }}</h5>
    <h5 v-if="$yawik.isAuth()">{{ $t('channel') }}</h5>

    <div class="row justify-center q-gutter-lg" :style="'opacity: ' + ($yawik.isAuth() ? '1;' : '0.2;')">
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
      "anonymous": "You are not logged in. As an anonymous user, you can only download your job ad. To save the ad and publish it on different channels, you need to register. Registration is free of charge.",
    },
    "de": {
      "channel": "Wo möchten sie ihre Stellenanzeige veröffentlichen?",
      "anonymous": "Sie sind nicht angemeldet. Als anonymer Benutzer können sie ihre Stellenanzeige nur downloaden. Um die Anzeige zu speichern und auf unterschiedlichen Kanälen zu veröffentlichen, müssen sie sich anmelden. Die Registrierung ist kostenlos.",
    },
    "fr": {
      "channel": "Où souhaitez-vous publier votre offre d'emploi ?",
      "anonymous": "Vous n'êtes pas connecté. En tant qu'utilisateur anonyme, vous pouvez uniquement télécharger votre annonce d'emploi. Pour enregistrer l'annonce et la publier sur différents canaux, vous devez vous inscrire. L'inscription est gratuite.",
    }

  }
</i18n>
