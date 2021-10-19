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
            <q-icon name="mdi-cogs" color="secondary" />
          </q-item-section>

          <q-item-section>
            {{ $t('settings') }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
    11 {{ $q.lang.isoName }} 12
  </q-drawer>
</template>

<script>
import { HAS_AUTH } from 'src/store/names';
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
      ...mapGetters([HAS_AUTH]),
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
      lang()
      {
        return this.$q.lang.isoName === 'en-GB' ? 'en' : this.$q.lang.isoName;
      }
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
      "jobs": "Stellenanzeigen",
      "settings": "Einstellungen"
    }
  }
</i18n>
