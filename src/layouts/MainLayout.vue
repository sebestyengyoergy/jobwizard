<template>
  <q-layout view="lHh Lpr lFf" class="yawik">
    <q-header v-if="showToolbar" reveal class="bg-white text-primary">
      <q-toolbar>
        <q-toolbar-title>
          <LogoPanel v-if="showToolbar" logo-url="https://form.yawik.org/yawik-logo.png" />
        </q-toolbar-title>
        <q-separator spaced vertical />
        <SwitchLanguage class="q-mx-auto" />

        <q-separator spaced vertical />

        <q-btn flat @click="showLogin">
          {{ $t(GET_TOKEN ? 'logout' : 'login') }}
        </q-btn>

        <q-separator spaced vertical />

        <q-btn dense flat round :icon="showDrawer ? 'mdi-menu' : 'mdi-menu-open'" @click="showDrawer = !showDrawer" />
      </q-toolbar>
      <SidebarDrawer v-model="showDrawer" />
    </q-header>
    <q-page-container style="overflow-x: hidden;">
      <router-view v-slot="{ Component }">
        <transition name="fade" appear mode="out-in">
          <component :is="Component" :toolbar="showToolbar" />
        </transition>
      </router-view>
    </q-page-container>
    <DialogLogin />
  </q-layout>
</template>

<script>
import SwitchLanguage from '../components/SwitchLanguage';
import SidebarDrawer from '../components/Drawer.vue';
import LogoPanel from '../components/Logo';
import DialogLogin from '../components/dialogs/DialogLogin';
import eventBus, { SHOW_LOGIN } from 'src/lib/eventBus';
import { GET_TOKEN, SET_TOKEN } from '../store/names';
import { mapGetters, mapMutations } from 'vuex';

export default
{
  name: 'MainLayout',
  components:
    {
      SidebarDrawer,
      LogoPanel,
      SwitchLanguage,
      DialogLogin,
    },
  data()
  {
    return {
      showDrawer: false,
    };
  },
  computed:
    {
      ...mapGetters([GET_TOKEN]),
      showToolbar()
      {
        return !!this.$route.query.tb;
      },
    },
  created()
  {
    const lang = this.$route.params.lang;
    this.$root.$i18n.locale = lang;
    import(
      /* webpackInclude: /(de|en-GB)\.js$/ */
      'quasar/lang/' + (lang === 'en' ? 'en-GB' : lang)
    ).then(lang =>
    {
      this.$q.lang.set(lang.default);
    });
  },
  methods:
    {
      ...mapMutations([SET_TOKEN]),
      showLogin()
      {
        if (this[GET_TOKEN])
        {
          this[SET_TOKEN](null);
        }
        else
        {
          eventBus.emit(SHOW_LOGIN);
        }
      },
    }
};
</script>

<style>
  .fade-enter-active,
  .fade-leave-active
  {
    transition: all 0.2s cubic-bezier(0.55, 0, 0.1, 1);
  }

  .fade-enter,
  .fade-leave-active
  {
    opacity: 0;
    transform: translate(2em, 0);
  }

  .yawik
  {
    background-color: #EEF4FB;
  }
</style>

<i18n>
  {
    "en": {
      "login": "Login",
      "logout": "Logout"
    }
  }
</i18n>
