<template>
  <div>
    <PrivacyPolicy v-model="acceptTerms" />
  </div>
</template>

<script>
import PrivacyPolicy from 'src/components/PrivacyPolicy';
import { GET_FORM, SET_FIELD } from 'src/store/names';
import { mapGetters, mapMutations } from 'vuex';

export default
{
  name: 'StepFour',
  components:
    {
      PrivacyPolicy,
    },
  computed:
    {
      ...mapGetters([GET_FORM]),
      acceptTerms:
        {
          get()
          {
            return this[GET_FORM].acceptTerms;
          },
          set(val)
          {
            this[SET_FIELD]({ acceptTerms: val });
          }
        }
    },
  methods:
    {
      ...mapMutations([SET_FIELD]),
    }
};
</script>
