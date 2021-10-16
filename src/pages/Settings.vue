<template>
  <q-page class="flex" padding>
    <div>{{ $t('settings') }}</div>
    <SupportYawik />
  </q-page>
</template>

<script>
import SupportYawik from 'src/components/SupportYawik';

export default
{
  name: 'Settings',
  components:
  {
    SupportYawik,
  },
  data()
  {
    return {
    };
  }
};
</script>

<i18n>
  {
    "en": {
      "settings": "Settings"
    },
    "de": {
      "settings": "Einstellungen"
    }
  }
</i18n>
