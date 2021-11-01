<template>
  <q-page class="flex">
    <q-layout view="hHh Lpr lff" container style="height: 700px;" class="shadow-2">
      <q-drawer
        v-model="drawer"
        show-if-above
        :width="200"
        :breakpoint="500"
        bordered
        class="bg-grey-3"
      >
        <q-scroll-area class="fit">
          <q-list>
            <template v-for="(menuItem, index) in menuList" :key="index">
              <q-item v-ripple clickable :active="index===selectedIndex" @click="selectedIndex=index">
                <q-item-section avatar>
                  <q-icon :name="menuItem.icon" />
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
            <p>{{ $t('text') }}</p>
            <p>{{ $t('text') }}</p>
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
    <SupportYawik />
  </q-page>
</template>

<script>
import { ref } from 'vue';
import SupportYawik from 'src/components/SupportYawik';
import Organization from './settings/Organization';
export default
{
  name: 'Settings',
  components:
  {
    SupportYawik,
    Organization
  },
  data()
  {
    return {
      selectedIndex: 0
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
  }
};
</script>

<i18n>
  {
    "en": {
      "settings": "Settings",
      "misc": "Misc",
      "organization": "Organization",
      "text": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero."
    },
    "de": {
      "settings": "Einstellungen",
      "misc": "Sonstiges",
      "organization": "Organisation",
      "text": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero."
    }
  }
</i18n>
