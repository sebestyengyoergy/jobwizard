<template>
  <q-tooltip
    max-width="15em"
    :hide-delay="hideDelay"
    :delay="delay"
    style="text-align: center;"
    transition-show="scale"
    transition-hide="fade"
    class="text-center shadow-4"
    @onHover="true"
  >
    {{ text }}
  </q-tooltip>
</template>

<script>
export default {
  name: 'Tooltip',
  props: {
    text: {
      required: true,
      type: String
    },
    delay: {
      required: false,
      default: 500,
      type: Number
    },
    hideDelay: {
      required: false,
      default: 650,
      type: Number
    },
  },
};
</script>
