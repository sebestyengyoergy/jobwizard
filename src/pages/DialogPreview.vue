<template>
  <q-dialog :model-value="modelValue" maximized @update:modelValue="close">
    <q-card flat class="bg-third">
      <q-card-actions class="bg-primary text-white q-py-sm" align="center">
        <q-btn color="secondary" @click="close">{{ $t('close') }}</q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default
{
  name: 'DialogPreview',
  props:
    {
      modelValue:
        {
          type: Boolean,
          default: false
        },
    },
  emits: ['update:modelValue'],
  methods:
    {
      close()
      {
        this.$emit('update:modelValue', false);
      },
    }
};
</script>

<style lang="scss">
  //
</style>

<i18n>
  {
    "en": {
      "close": "Close"
    }
  }
</i18n>
