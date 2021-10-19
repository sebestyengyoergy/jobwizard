<template>
  <div>
    <a :href="urlHome">
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
  computed:
    {
      urlHome()
      {
        return process.env.YAWIK_URL_HOME;
      }
    }
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
    },
    "de": {
      "logo": "Logo"
    }

  }
</i18n>
