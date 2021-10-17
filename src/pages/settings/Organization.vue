<template>
  <div class="full-width">
    <div style="width: 100%;" class="text-h4 q-mb-md">{{ $t('organization') }}</div>
    <q-input v-model.trim="organization" :label="$t('orgName')" color="primary" bg-color="white" name="organization"
             dense outlined hide-bottom-space
    >
      <template #hint>
        {{ $t('orgNameHelp') }}
      </template>
    </q-input>
    {{ $t('introDescHelp') }}
    <TextArea section="intro" />
  </div>
</template>

<script>
import TextArea from 'src/components/TextArea';

export default
{
  name: 'Organization',
  components:
  {
    TextArea
  },
  data()
  {
    return {
      organization: '',
    };
  }
};
</script>

<i18n>
  {
    "en": {
      "organization": "Organization",
      "orgName": "Organization name",
      "orgNameHelp": "The company name is suggested when entering a job advertisement",
      "introDescHelp": "The company description is suggested as an introduction when you enter a job ad. You can change the heading by clicking on it. It is displayed in the advertisement above the introduction.",
      "text": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero."
    },
    "de": {
      "organization": "Organisation",
      "orgName": "Firmenname",
      "orgNameHelp": "Der Firmenname wird bei der Eingabe einer Stellenanzeigen vorgeschlagen",
      "introDescHelp": "Die Unternehmensbeschreibung wird Ihnen bei der Eingabe einer Stellenanzeige als Einleitung vorgeschlagen. Die Überschrift können sie durch Anklicken ändern. Sie wird in der Anzeige oberhalb der Einleitung angezeigt.",
      "text": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero."
    }
  }
</i18n>
