<template>
  <div>
    <a href="/">
      <img :alt="$t('logo')" :src="logoUrl" class="logo">
    </a>
  </div>
</template>

<script>
export default
{
  name: 'Logo',
  props:
    {
      logoUrl:
        {
          type: String,
          required: true
        },
    },
};
</script>

<style>
  .logo
  {
    max-width: 160px;
    max-height: 80px;
    vertical-align: middle;
  }

  .q-toolbar .logo
  {
    max-height: 50px;
  }
</style>

<i18n>
  {
    "en": {
      "logo": "Logo"
    }
  }
</i18n>
