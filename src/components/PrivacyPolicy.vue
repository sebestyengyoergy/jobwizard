<template>
  <q-field :model-value="acceptTerms" class="privacy" lazy-rules :rules="[ruleRequired]" borderless dense v-bind="$attrs">
    <template #control>
      <q-item v-ripple tag="label">
        <q-item-section avatar top>
          <q-checkbox v-model="acceptTerms" name="terms" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ $t('privacy') }}</q-item-label>
          <q-item-label caption>
            <!-- eslint-disable vue/no-v-html -->
            <div class="terms" @click.stop v-html="$t('privacy_policy', {url: urlPrivacy})" />
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
  name: 'PrivacyPolicy',
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
      urlPrivacy()
      {
        return process.env.YAWIK_URL_PRIVACY;
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
      "privacy": "Privacy terms",
      "privacy_policy": "Note on data protection: After sending the entered data, it will be processed on our server and forwarded in an email to the person responsible for processing. We assure you of the highest level of confidentiality and compliance with all legal requirements. For more information on data processing, please refer to our <a href='{url}' target='_blank' rel='noopener noreferrer'>Privacy policy</a>."
    },
    "de": {
      "privacy": "Datenschutz",
      "privacy_policy": "Hinweis zum Datenschutz: Nach dem Absenden der eingegebenen Daten werden diese auf unserem Server verarbeitet und in einer Mail an die für die Bearbeitung zuständige Person weitergeleitet. Wir sichern Ihnen dabei ein Höchstmaß an Vertraulichkeit zu und versichern die Einhaltung aller gesetzlichen Vorschriften. Weitere Informationen zur Datenverarbeitung erhalten Sie auf unserer <a href='{url}' target='_blank' rel='noopener noreferrer'>Datenschutzbestimmungen</a>."
    }
  }
</i18n>
