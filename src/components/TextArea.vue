<template>
  <div class="q-gutter-md">
    <!-- Intro -->
    <div class="cursor-pointer">
      {{ $t('label') }}
      <q-popup-edit v-slot="scope" v-model="label" auto-save>
        <q-input v-model="label" dense autofocus counter @keyup.enter="scope.set" />
      </q-popup-edit>
    </div>
    <q-field :model-value="text" :rules="[ruleRequired]" borderless hide-bottom-space>
      <template #control>
        <q-editor v-model="text" name="text" :toolbar="toolbar" min-height="200px" class="col-grow" />
      </template>
    </q-field>
  </div>
</template>

<script>
import mixinValidations from 'src/lib/validations';

export default
{
  name: 'TextArea',
  mixins: [mixinValidations],
  props:
    {
      section:
        {
          type: String,
          default: 'label'
        },
    },
  data()
  {
    return {
      text: '',
      toolbar: [
        ['left', 'justify'],
        ['bold', 'italic'],
        ['token', 'hr', 'link'],
        ['quote', 'unordered', 'ordered'],
        ['undo', 'redo']
      ],
    };
  },
  computed:
  {
    label()
    {
      return this.section;
    }
  }
};
</script>

<i18n>
  {
    "en": {
      "label": "Company description"
    },
    "de": {
      "label": "Unternehmensbeschreibung",
    }
  }
</i18n>
