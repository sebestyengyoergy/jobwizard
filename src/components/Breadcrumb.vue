<template>
  <div class="q-pa-md">
    <q-toolbar>
      <q-breadcrumbs active-color="secondary" style="font-size: 16px;">
        <q-breadcrumbs-el label="Home" icon="mdi-home" :to="home" />
        <q-breadcrumbs-el
          v-if="!(route == 'wizard')"
          :label="$t(route)"
          :icon="'mdi-' + ((route=='jobs' || route=='job') ? 'view-list' : 'cog')"
        />
      </q-breadcrumbs>
    </q-toolbar>
  </div>
</template>

<script>
export default
{
  name: 'Breadcrumb',
  data()
  {
    return {};
  },
  computed: {
    route()
    {
      return this.$route.name;
    },
    lang()
    {
      return this.$q.lang.isoName === 'en-GB' ? 'en' : this.$q.lang.isoName;
    },
    home()
    {
      return process.env.VUE_ROUTER_BASE + this.lang;
    }
  }
};
</script>

<i18n>
  {
    "en": {
      "jobs": "Jobs",
      "settings": "Settings"
    },
    "de": {
      "jobs": "Stellenanzeigen",
      "settings": "Einstellungen",
    }
  }
</i18n>
