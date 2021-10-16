<template>
  <div class="q-pa-md">
    <q-card class="text-center absolute-center">
      <q-card-section>
        <div class="text-h3">{{ $t('thank') }}</div>
        <div class="text-subtitle2">{{ $t('comming') }}</div>
      </q-card-section>
      <q-card-section>
        <q-btn type="a" style="background-color: orange; margin-top: 20px;" glossy href="https://github.com/sponsors/cbleek" rounded size="xl">{{ $t('support') }}</q-btn>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default
{
  name: 'SupportYawik',
  data()
  {
    return {};
  }
};
</script>

<i18n>
  {
    "en": {
      "comming": "comming soon ...",
      "support": "Support Yawik",
      "thank": "Thank you for using Yawik",
      "supportYawik": "If you like Yawik and want to accelerate its development, consider supporting it."
    },
    "de": {
      "comming": "wird bald gemacht ...",
      "support": "Unterstütze Yawik",
      "thank": "Danke, dass sie Yawik nutzen",
      "supportYawik": "Wenn ihnen Yawik gefällt und sie die Entwicklung beschleunigen wollen, denken sie darüber nach Yawik zu unterstützen."
    }
  }
</i18n>
