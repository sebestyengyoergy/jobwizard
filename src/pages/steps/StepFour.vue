<template>
  <div>
    <PrivacyPolicy v-model="acceptTerms" />
  </div>
</template>

<script>
import PrivacyPolicy from 'src/components/PrivacyPolicy';
import { GET_TERMS, SET_TERMS } from 'src/store/names';
import { mapGetters, mapMutations } from 'vuex';

export default
{
  name: 'StepFour',
  components:
    {
      PrivacyPolicy,
    },
  props:
    {
      active: // eslint-disable-line vue/no-unused-properties
        {
          type: Boolean,
          default: false
        },
      stepper: // eslint-disable-line vue/no-unused-properties
        {
          type: Object,
          default: null
        },
      width: // eslint-disable-line vue/no-unused-properties
        {
          type: Number,
          default: 1024
        },
    },
  computed:
    {
      ...mapGetters([GET_TERMS]),
      acceptTerms:
        {
          get()
          {
            return this[GET_TERMS];
          },
          set(val)
          {
            this[SET_TERMS](val);
          }
        }
    },
  methods:
    {
      ...mapMutations([SET_TERMS]),
    }
};
</script>
