<template>
  <q-page class="flex">
    <q-layout
      view="hHh Lpr lff"
      container
      style="height: 800px;"
    >
      <q-drawer
        v-model="drawer"
        show-if-above
        :width="200"
        :breakpoint="500"
        bordered
        no-swipe-open
        no-swipe-close
        no-swipe-backdrop
      >
        <q-scroll-area class="fit">
          <q-list>
            <template v-for="(menuItem, index) in menuList" :key="index">
              <q-item v-ripple clickable :active="index===selectedIndex" @click="selectedIndex=index">
                <q-item-section avatar>
                  <q-icon :name="menuItem.icon" color="secondary" />
                </q-item-section>
                <q-item-section>
                  {{ menuItem.label }}
                </q-item-section>
              </q-item>
              <q-separator v-if="menuItem.separator" :key="'sep' + index" />
            </template>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <q-page padding>
          <div v-if="selectedIndex===0">
            <Organization />
          </div>
          <div v-else-if="selectedIndex===1">
            <div class="text-h4 q-mb-md">{{ $t('misc') }}</div>
            <q-checkbox
              v-model="dark"
              :label="$t('darkmode')"
              color="primary"
              name="darkmode"
              @click="$q.dark.toggle()"
            />
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </q-page>
</template>

<script>
import { ref } from 'vue';
import Organization from './settings/Organization';
import { mapGetters, mapMutations } from 'vuex';
import { GET_SETTINGS, SET_SETTINGS_FIELD } from 'src/store/names';

export default
{
  name: 'Settings',
  components:
  {
    Organization
  },
  data()
  {
    return {
      selectedIndex: 0,
    };
  },
  computed:
  {
    ...mapGetters([GET_SETTINGS]),
    dark:
        {
          get()
          {
            return this[GET_SETTINGS].miscDarkmode;
          },
          set(val)
          {
            this[SET_SETTINGS_FIELD]({ miscDarkmode: val });
          }
        },
    menuList()
    {
      return [
        {
          icon: 'mdi-domain',
          label: this.$t('organization'),
          separator: true
        },
        {
          icon: 'mdi-cog',
          label: this.$t('misc'),
          separator: false
        }
      ];
    }
  },
  setup()
  {
    return {
      tab: ref('organization'),
      splitterModel: ref(10),

      drawer: ref(false),

    };
  },
  methods:
  {
    ...mapMutations([SET_SETTINGS_FIELD])
  }
};
</script>

<i18n>
  {
    "en": {
      "settings": "Settings",
      "misc": "Misc",
      "organization": "Organization",
      "darkmode": "Dark mode"
    },
    "de": {
      "settings": "Einstellungen",
      "misc": "Sonstiges",
      "organization": "Organisation",
      "darkmode": "Nachtmodus"
    }
  }
</i18n>
