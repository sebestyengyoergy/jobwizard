<template>
  <q-field :model-value="acceptTerms" class="privacy" :rules="[ruleRequired]" borderless dense v-bind="$attrs">
    <template #control>
      <q-item v-ripple tag="label">
        <q-item-section avatar top>
          <q-checkbox v-model="acceptTerms" name="terms" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ $t('terms') }}</q-item-label>
          <q-item-label caption>
            <!-- eslint-disable vue/no-v-html -->
            <div class="terms" @click.stop v-html="$t('terms_label', {url: urlTerms})" />
            <!-- eslint-enable vue/no-v-html -->
          </q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-field>
</template>

<script>
import mixinValidations from 'src/lib/validations';

export default
{
  name: 'AcceptTerms',
  mixins: [mixinValidations],
  inheritAttrs: false,
  props:
    {
      modelValue:
        {
          type: Boolean,
          default: false
        }
    },
  emits: ['update:modelValue'],
  computed:
    {
      acceptTerms:
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
      urlTerms()
      {
        return process.env.YAWIK_URL_TERMS;
      }
    }
};
</script>

<style lang="scss">
  .terms a
  {
    color: $primary;
  }

  .privacy.q-field--borderless .q-field__bottom
  {
    padding: 0 12px 8px;
  }

  .privacy .q-field__control .q-field__native
  {
    padding: 0;
  }
</style>

<i18n>
  {
    "en": {
      "terms": "Terms and conditions",
      "terms_label": "Saving the advertisement is free of charge. There is no guarantee of publication. We reserve the right to delete advertisements. <a href='{url}' target='_blank' rel='noopener noreferrer'>Privacy policy</a>."
    },
    "de": {
      "terms": "Geschäftsbedingungen",
      "terms_label": "Das Speichern der Anzeige ist kostenlos. Eine Garantie der Veröffentlichung gibt es nicht. Wir behalten uns das Recht vor Anzeigen zu löschen. <a href='{url}' target='_blank' rel='noopener noreferrer'>Geschäftsbedingungen</a>."
    }
  }
</i18n>
