<template>
  <div>
    <h5 v-if="$yawik.isAuth()">{{ $t('channel') }}</h5>
    <q-dialog v-model="alert">
      <q-card>
        <q-bar>
          <q-icon name="mdi-emoticon-wink-outline" />
          <div class="text-h6">{{ $t('congratulations') }}</div>
          <q-space />

          <q-btn v-close-popup dense flat icon="mdi-close">
            <q-tooltip :delay="400">{{ $t('btn.close') }}</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section class="q-pt-md">
          {{ $t('you-have-created-a-job') }}
        </q-card-section>
        <q-card-section class="q-pt-none">
          {{ $t('your-are-not-logged-in') }}
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-checkbox v-model="hide" :label="$t('hide')" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn type="a" :href="$yawik.loginUrl()" no-caps color="primary">
            {{ $t('btn.login') }}
          </q-btn>
          <q-btn type="a" :href="$yawik.registerUrl()" no-caps color="primary">
            {{ $t('btn.register') }}
            <q-tooltip>
              {{ $t('job-wont-be-lost') }}
            </q-tooltip>
          </q-btn>
          <q-btn type="a" no-caps color="primary">
            {{ $t('btn.download') }}
          </q-btn>
          <q-btn type="a" disable no-caps color="primary">
            {{ $t('btn.email') }}
            <q-tooltip :delay="400">
              {{ $t('coming-soon') }}
            </q-tooltip>
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div class="row justify-center q-gutter-lg" :style="'opacity: ' + ($yawik.isAuth() ? '1;' : '0.2;')">
      <Channel v-for="c in data" :key="c.id" v-bind="c" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { mapGetters, mapMutations } from 'vuex';
import { GET_SETTINGS, SET_SETTINGS_FIELD } from 'src/store/names';
import Channel from 'src/components/Channel.vue';
import Data from 'src/channels.json';

export default
{
  name: 'ChooseChannel',
  setup()
  {
    return {
      alert: ref(false),
    };
  },
  components: {
    Channel
  },
  computed:
    {
      ...mapGetters([GET_SETTINGS]),
      hide:
      {
        get()
        {
          return this[GET_SETTINGS].hideCongratulations;
        },
        set(val)
        {
          this[SET_SETTINGS_FIELD]({ hideCongratulations: val });
        }
      },
      hideTime:
      {
        get()
        {
          return this[GET_SETTINGS].hideCongratulationsTime;
        },
        set(val)
        {
          this[SET_SETTINGS_FIELD]({ hideCongratulationsTime: val });
        }
      },
      data()
      {
        return Data;
      }
    },
  watch:
  {
    hide(newVal, oldVal)
    {
      this.$nextTick(() =>
      {
        if (newVal)
        {
          this[SET_SETTINGS_FIELD]({ hideCongratulationsTime: Date.now() });
        }
        else
        {
          delete this.hideTime;
        }
      });
    },
    alert(newVal, oldVal)
    {
      this.$nextTick(() =>
      {
        if (newVal)
        {
          this[SET_SETTINGS_FIELD]({ hideCongratulations: false });
        }
      });
    },
  },
  mounted()
  {
    this.alert = this.$yawik.isAuth() || this.checkTimer();
  },
  methods:
  {
    ...mapMutations([SET_SETTINGS_FIELD]),
    checkTimer()
    {
      return this.hideTime ? (Date.now() - this.hideTime) > 86400000 : true;
    },
  },

};
</script>

<style scoped>
  .channel
  {
    padding: 10px;
    width: 100%;
    max-width: 300px;
  }

  .button
  {
    margin: 0 50px 0 50px;
  }
</style>

<i18n>
{
  "en": {
    "congratulations": "Congratulations",
    "channel": "Where would you like to publish your job advertisement?",
    "your-are-not-logged-in": "You are not logged in. As an anonymous user, you can only download your job ad. To save the ad and publish it on different channels, you need to register. The registration as well as the management of job advertisements is free of charge.",
    "job-wont-be-lost": "Ihre Anzeige geht durch einen Registrier- oder Anmeldeprozess nicht verloren.",
    "hide": "Hide this dialogue for the next 24 hours"
  },
  "de": {
    "congratulations": "Glückwunsch",
    "you-have-created-a-job": "Sie haben erfolgreich eine Stellenanzeige erstellt.",
    "channel": "Wo möchten sie ihre Stellenanzeige veröffentlichen?",
    "your-are-not-logged-in": "Sie sind nicht angemeldet. Als anonymer Benutzer können sie ihre Stellenanzeige nur downloaden. Um die Anzeige zu speichern und auf unterschiedlichen Kanälen zu veröffentlichen, müssen sie sich anmelden. Die Registrierung sowie die Verwaltung von Stellenanzeigen ist kostenlos.",
    "job-wont-be-lost": "Ihre Anzeige geht durch einen Registrier- oder Anmeldeprozess nicht verloren.",
    "hide": "Diesen Dialog die nächsten 24 Stunden ausblenden"
  },
  "fr": {
    "congratulations": "Félicitations",
    "channel": "Où souhaitez-vous publier votre offre d'emploi ?",
    "your-are-not-logged-in": "Vous n'êtes pas connecté. En tant qu'utilisateur anonyme, vous pouvez uniquement télécharger votre annonce d'emploi. Pour enregistrer l'annonce et la publier sur différents canaux, vous devez vous inscrire. L'inscription ainsi que la gestion des annonces d'emploi sont gratuites.",
    "job-wont-be-lost": "Ihre Anzeige geht durch einen Registrier- oder Anmeldeprozess nicht verloren.",
    "hide": "Masquer ce dialogue pendant les prochaines 24 heures"
  }
}
</i18n>
