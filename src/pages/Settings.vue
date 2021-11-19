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
            <Organization @click="showNotif($t('notify.please_login'))" />
          </div>
          <div v-else-if="selectedIndex===1">
            <Jobs />
          </div>
          <div v-else-if="selectedIndex===2">
            <Misc />
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </q-page>
</template>

<script>
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import Organization from './settings/Organization';
import Misc from './settings/Misc';
import Jobs from './settings/Jobs';

export default
{
  name: 'Settings',
  components:
  {
    Organization,
    Jobs,
    Misc
  },
  data()
  {
    return {
      selectedIndex: 0,
    };
  },
  computed:
  {
    menuList()
    {
      return [
        {
          icon: 'mdi-domain',
          label: this.$t('organization'),
          separator: true
        },
        {
          icon: 'mdi-newspaper-variant-outline',
          label: this.$t('jobs'),
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
    const $q = useQuasar();

    return {
      tab: ref('organization'),
      splitterModel: ref(10),
      drawer: ref(false),
      showNotif(text, label)
      {
        $q.notify({
          message: text,
          color: 'primary',
          avatar: 'https://www.gravatar.com/avatar/c51d961553bd9e448b0768c401e98e7b',
          actions: [
            {
              label: 'Dismiss',
              color: 'white',
              handler: () =>
              { /* ... */ }
            }
          ]
        });
      }
    };
  }
};
</script>

<i18n>
  {
    "en": {
      "settings": "Settings",
      "jobs": "Jobs",
      "misc": "Misc",
      "organization": "Organization",
      "notify": {
        "please_login": "Um Einstellungen dauerhaft zu speichern, melden Sie sich bitte an. Die Anmeldung ist kostenlos."
      }
    },
    "de": {
      "settings": "Einstellungen",
      "jobs": "Stellenanzeigen",
      "misc": "Sonstiges",
      "organization": "Organisation",
      "notify": {
        "please_login": "Um Einstellungen dauerhaft zu speichern, melden Sie sich bitte an. Die Anmeldung ist kostenlos."
      }
    }
  }
</i18n>
