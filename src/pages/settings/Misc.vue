<template>
  <div class="full-width">
    <div class="text-h4 q-mb-md">{{ $t('settings.misc_title') }}</div>
    <h5>{{ $t('settings.misc_layout.header') }}</h5>
    <q-checkbox
      v-model="dark"
      :label="$t('settings.misc_layout.name')"
      color="primary"
      name="darkmode"
      @click="$q.dark.toggle()"
    />
    <h5>{{ $t('settings.misc_locale.header') }}</h5>
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
      "settings": {
        "misc_title": "Misc",
        "misc_layout": {
          "header": "Layout",
          "name": "Dark mode"
        },
        "misc_locale":{
          "header": "Locale",
          "name": "Locale"
        }
      }
    },
    "de": {
      "settings": {
        "misc_title": "Sonstiges",
        "misc_layout": {
          "header": "Ansicht",
          "name": "Nachtmodus",
        },
        "misc_locale":{
          "header": "Standort",
          "name": "Standort"
        }
      }
    }
  }
</i18n>
