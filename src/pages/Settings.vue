OA<template>
  <q-page class="flex">
    <q-splitter
      v-model="splitterModel"
      style="min-height: 250px;"
      :limit="[10,100]"
    >
      <template #before>
        <q-tabs
          v-model="tab"
          vertical
          class="text-primary"
        >
          <q-tab name="organization" icon="mdi-domain" :label="$t('organization')" />
          <q-tab name="misc" icon="mdi-cog" :label="$t('misc')" />
        </q-tabs>
      </template>

      <template #after>
        <q-tab-panels
          v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="organization">
            <Organization />
          </q-tab-panel>

          <q-tab-panel name="misc">
            <div class="text-h4 q-mb-md">{{ $t('misc') }}</div>
            <p>{{ $t('text') }}</p>
            <p>{{ $t('text') }}</p>
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
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
    };
  },
  setup()
  {
    return {
      tab: ref('organization'),
      splitterModel: ref(10)
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
