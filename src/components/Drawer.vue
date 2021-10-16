<template>
  <q-drawer v-model="value" side="right" overlay bordered no-swipe-open no-swipe-close no-swipe-backdrop>
    <q-scroll-area class="fit">
      <q-list padding>
        <q-item v-ripple clickable :to="'/' + lang + '/jobs'">
          <q-item-section avatar>
            <q-icon name="mdi-view-list" color="secondary" />
          </q-item-section>

          <q-item-section>
            {{ $t('jobs') }}
          </q-item-section>
        </q-item>

        <q-separator />

        <q-item v-ripple clickable :to="'/' + lang + '/settings'">
          <q-item-section avatar>
            <q-icon name="mdi-cog" color="secondary" />
          </q-item-section>

          <q-item-section>
            {{ $t('settings') }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script>
import { HAS_AUTH, GET_LANG } from 'src/store/names';
import { mapGetters } from 'vuex';
import eventBus, { TOGGLE_LOGIN } from 'src/lib/eventBus';

export default
{
  name: 'Drawer',
  props:
    {
      modelValue:
        {
          type: Boolean,
          default: false
        },
    },
  data()
  {
    return {
    };
  },
  emits: ['update:modelValue'],
  computed:
    {
      ...mapGetters([HAS_AUTH, GET_LANG]),
      value:
        {
          get()
          {
            return this.modelValue;
          },
          set(val)
          {
            this.$emit('update:modelValue', val);
          }
        },
      lang:
        {
          get()
          {
            return this[GET_LANG];
          }
        },

    },
  methods:
    {
      toggleLogin()
      {
        eventBus.emit(TOGGLE_LOGIN);
      },
    }
};
</script>

<i18n>
  {
    "en": {
      "jobs": "Jobs",
      "settings": "Settings"
    },
    "de": {
      "jobList": "Stellenanzeigen",
      "settings": "Einstellungen"
    }
  }
</i18n>
