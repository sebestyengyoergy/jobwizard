<template>
  <div>
    <q-btn no-caps flat :icon="$q.config.logo" :to="home">
      {{ '&nbsp;' + $q.config.sitename }}
    </q-btn>
    <Tooltip :text="$t('slogan')" />
  </div>
</template>

<script>
import Tooltip from 'src/components/form/Tooltip';

export default
{
  name: 'Logo',
  components:
  {
    Tooltip
  },
  computed:
    {
      home()
      {
        return process.env.VUE_ROUTER_BASE + this.$root.$i18n.locale;
      }
    }
};
</script>

<style lang="scss">
  .logo
  {
    background-size: cover;
    vertical-align: middle;
  }

  .desktop .logo
  {
    width: 167px;
    background-image: url('../../public/images/yawik_logo-desktop.svg');
  }

  .mobile .logo
  {
    width: 53px;
    background-image: url('../../public/images/yawik_logo-mobile.svg');
  }

</style>

<i18n>
  {
    "en": {
      "logo": "Logo",
      "slogan": "let's develop great software so you can find good people."
    },
    "de": {
      "logo": "Logo",
      "slogan": "lasst uns tolle Software entwickeln, damit ihr gute Leute findet."
    }
  }
</i18n>
