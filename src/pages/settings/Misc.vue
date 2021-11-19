<template>
  <div class="full-width">
    <div class="text-h4 q-mb-md">{{ $t('misc') }}</div>
    <h5>{{ $t('layout') }}</h5>

    <q-checkbox
      v-model="dark"
      :label="$t('darkmode')"
      color="primary"
      name="darkmode"
      @click="$q.dark.toggle()"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import mixinValidations from 'src/lib/validations';
import { GET_SETTINGS, SET_SETTINGS_FIELD } from 'src/store/names';

export default {
  name: 'Misc',
  mixins: [mixinValidations],
  computed: {
    ...mapGetters([GET_SETTINGS]),
    dark:
        {
          get()
          {
            return this[GET_SETTINGS].miscDarkmode;
          },
          set(val)
          {
            this[SET_SETTINGS_FIELD]({ miscDarkmode: val });
          }
        },
  },
  methods: {
    ...mapMutations([SET_SETTINGS_FIELD]),
  },
};
</script>

<i18n>
  {
    "en": {
      "misc": "Misc",
      "layout": "Layout",
      "darkmode": "Dark mode",
    },
    "de": {
      "misc": "Sonstiges",
      "layout": "Ansicht",
      "darkmode": "Nachtmodus",
    }
  }
</i18n>
