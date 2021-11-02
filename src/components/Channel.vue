<template>
  <q-card class="channel">
    <q-img fit="contain" class="channel-logo" :src="logo" />
    <q-card-section>
      <div class="row no-wrap items-center">
        <div class="col text-h6 ellipsis">
          {{ name }}
        </div>
        <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
          <q-icon :name="icon" />
          &nbsp;{{ $t(id + '.slug') }}
        </div>
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="text-subtitle1">
        {{ $t(id + '.slogan') }}
      </div>
      <div class="text-caption text-grey">
        {{ $t(id + '.description') }}
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions>
      <q-icon name="mdi-cash" />
      <q-btn flat color="primary">
        {{ price > 0 ? price + '€' : $t('free') }}
      </q-btn>
      <q-toggle
        v-model="portal"
        :label="portal"
        :val="name"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import { GET_FORM, SET_FIELD } from 'src/store/names';
import { mapGetters, mapMutations } from 'vuex';

export default
{
  name: 'Channel',
  props: {
    id: {
      type: String,
      default: undefined
    },
    name: {
      type: String,
      default: undefined
    },
    logo: {
      type: String,
      default: undefined
    },
    icon: {
      type: String,
      default: undefined
    },
    price: {
      type: Number,
      default: undefined
    },
    mode: {
      type: Boolean
    },
  },
  computed:
    {
      ...mapGetters([GET_FORM]),
      portal:
        {
          get()
          {
            return this[GET_FORM].channels;
          },
          set(val)
          {
            this[SET_FIELD]({ channels: val });
          }
        },
    },
  methods:
    {
      ...mapMutations([SET_FIELD]),
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

  .channel-logo
  {
    max-height: 92px;
    width: auto;
    display: block;
  }
</style>

<i18n>
  {
    "en": {
      "channel": "Where would you like to publish your job advertisement?",
      "product1": {
        "name": "Google",
        "slug": "for jobs",
        "slogan": "publish on google for jobs",
        "description": "the job posting will be published on Goole for jobs"
      },
      "product2": {
        "name": "Homepage",
        "slug": "Homepage",
        "slogan": "publish on your homepage",
        "description": "the job posting will be published on your homepage"
      },
      "product3": {
        "name": "Yawik",
        "slug": "for jobs",
        "slogan": "publish on google for jobs",
        "description": "the job posting will be published on Goole for jobs"
      },
      "free": "free",
      "true": "On",
      "false": "Off"
    },
    "de": {
      "channel": "Wo möchten Sie ihre Stellenanzeige veröffentlichen?",
      "product1": {
        "name": "Google",
        "slug": "for jobs",
        "slogan": "auf Google for Jobs schalten",
        "description": "Die Stellenanzeige wird auf Google for Jobs veröffentlicht."
      },
      "product2": {
        "name": "Homepage",
        "slug": "Homepage",
        "slogan": "auf Homepage veröffentlichen",
        "description": "Die Stellenanzeige wird auf ihrer Homepage veröffentlicht."
      },
      "product3": {
        "name": "Yawik",
        "slug": "Yawik",
        "slogan": "auf dem Yawik Portal schalten",
        "description": "mit dem Geld unterstützen Sie die weitere Entwicklung von Yawik"
      },
      "free": "kostenlos",
      "true": "An",
      "false": "Aus"
    }
  }
</i18n>
