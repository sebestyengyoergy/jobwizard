<template>
  <div class="q-pa-md">
    <q-toolbar>
      <q-breadcrumbs active-color="secondary" style="font-size: 16px;">
        <q-breadcrumbs-el label="Home" icon="mdi-home" :to="home" />
        <q-breadcrumbs-el
          v-if="!(route == 'wizard')"
          :label="$t(route == 'job' ? 'jobs' : route )"
          :icon="'mdi-' + icon"
          :to="jobs"
        />
        <q-breadcrumbs-el
          v-if="route == 'job'"
          label="job"
          icon="mdi-star"
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
    home()
    {
      return process.env.VUE_ROUTER_BASE + this.$yawik.lang();
    },
    icon()
    {
      let mdi = 'cog';
      switch (this.route)
      {
        case 'job':
          mdi = 'view-list';
          break;
        case 'jobs':
          mdi = 'view-list';
          break;
        case 'jobboard':
          mdi = 'earth';
          break;
        case 'statistics':
          mdi = 'poll';
          break;
        default:
          mdi = 'cog';
      }
      return mdi;
    },
    jobs()
    {
      return process.env.VUE_ROUTER_BASE + this.$yawik.lang() + '/jobs';
    }
  }
};
</script>
