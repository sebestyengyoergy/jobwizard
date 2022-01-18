<template>
  <div>
    <ChooseChannel />
    <br>
  </div>
</template>

<script>
import ChooseChannel from 'src/components/ChooseChannel';

export default
{
  name: 'StepFour',
  components:
    {
      ChooseChannel
    },
};
</script>

<i18n>
  {
    "en": {
      "thank": "Thank you for using Yawik",
      "howtoDownload": "You can now download your job advertisement. If you register, you will be able to save and publish your jobad.",
      "supportYawik": "Support Yawik"
    },
    "de": {
      "thank": "Danke, dass sie Yawik nutzen",
      "howtoDownload": "Sie können nun ihre Stellenanzeige runterladen. Wenn sie sich registrieren, werden sie Ihre Anzeige speichern und veröffentlichen können.",
      "supportYawik": "Yawik unterstützen",
    }
  }
</i18n>
