<template>
  <router-view />
</template>

<script>
import eventBus, { AJAX_FAILED } from './lib/eventBus';

export default
{
  name: 'App',
  created()
  {
    eventBus.on(AJAX_FAILED, this.ajaxFailed);
  },
  beforeUnmount()
  {
    eventBus.off(AJAX_FAILED, this.ajaxFailed);
  },
  methods:
    {
      ajaxFailed(axiosError)
      {
        if (axiosError)
        {
          this.$q.notify({
            color: 'negative',
            position: 'top',
            icon: 'mdi-alert',
            message: typeof axiosError === 'string' ? axiosError : (axiosError.response?.data?.messages || [])[0] || axiosError.response?.data?.message || axiosError.message,
          });
        }
      },

    }
};
</script>
