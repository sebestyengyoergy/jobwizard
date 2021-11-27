<template>
  <q-btn-dropdown no-caps color="primary">
    <template #label>
      <img :src="'flags/'+$root.$i18n.locale+'.png'" width="28" :alt="$root.$i18n.locale.substr(0, 2).toUpperCase()"
           class="q-mr-md"
      >
      {{ $q.platform.is.mobile ? '' : $t('localeName') }}
    </template>
    <q-list>
      <q-item v-for="(msg,lang) in $root.$i18n.messages" :key="lang" v-close-popup clickable class="items-center"
              @click="setLocale(lang)"
      >
        <q-item-section side>
          <q-icon :color="lang === $root.$i18n.locale ? null : 'transparent'" name="mdi-check" />
        </q-item-section>
        <q-item-label>{{ $root.$i18n.messages[lang].localeName() }}</q-item-label>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script>
import { SET_LANG, SET_SETTINGS_FIELD } from '../store/names';
import { mapMutations } from 'vuex';

export default {
  name: 'SwitchLanguage',
  methods:
      {
        ...mapMutations([SET_LANG, SET_SETTINGS_FIELD]),
        setLocale(lang)
        {
          this.$root.$i18n.locale = lang;
          this[SET_LANG](lang); // should be removed. We only need default Language
          this[SET_SETTINGS_FIELD]({ defaultLanguage: lang });

          const routeName = this.$route.name;
          let routePath = '/' + lang;
          if (routeName !== 'wizard')
          {
            routePath = routePath + '/' + this.$route.name;
            if (routeName === 'job')
            {
              routePath = routePath + '/' + this.$route.params.id;
            }
          }
          this.$router.push(routePath);

          import(
            /* webpackInclude: /(de|en-GB)\.js$/ */
            'quasar/lang/' + (lang === 'en' ? 'en-GB' : lang)
          ).then(lang =>
          {
            this.$q.lang.set(lang.default);
          });
        }
      }
};
</script>
