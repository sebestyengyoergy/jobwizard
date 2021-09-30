<template>
  <router-view />
</template>

<script>
export default
{
  name: 'App'
};
</script>

<style lang="scss">
  .q-layout
  {
    .q-field--outlined
    {
      .q-field__control::before
      {
        z-index: 1;
      }
    }

    .q-field .q-field__control-container
    {
      background-color: inherit;
    }

    .q-field--labeled.q-field--dense .q-field__native,
    .q-field--labeled.q-field--dense .q-field__prefix,
    .q-field--labeled.q-field--dense .q-field__suffix,
    .q-field--auto-height.q-field--dense.q-field--labeled .q-field__control-container
    {
      padding-top: 2px;
    }

    .q-field--float .q-field__label
    {
      transform: translateY(-120%) scale(0.75);
      background-color: inherit;
      max-width: 133%;
      padding-left: 6px;
      padding-right: 6px;
      z-index: 1;
      right: auto;
    }

    .q-field--dense.q-field--float .q-field__label
    {
      transform: translateY(-85%) scale(0.75);
    }
  }
</style>
