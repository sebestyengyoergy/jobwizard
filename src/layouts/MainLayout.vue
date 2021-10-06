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
    <PageFooter v-if="showFooter" />1
    <DialogLogin />
  </q-layout>
</template>

<script>
import PageFooter from '../components/PageFooter';
import SwitchLanguage from '../components/SwitchLanguage';
import SidebarDrawer from '../components/Drawer.vue';
import LogoPanel from '../components/Logo';
import DialogLogin from '../components/dialogs/DialogLogin';
import eventBus, { AJAX_FAILED } from 'src/lib/eventBus';
import { GET_TOKEN, SET_TOKEN } from '../store/names';
import { mapGetters, mapMutations } from 'vuex';

export default
{
  name: 'MainLayout',
  components:
    {
      PageFooter,
      SidebarDrawer,
      LogoPanel,
      SwitchLanguage,
      DialogLogin,
    },
  data()
  {
    return {
      showDrawer: false,
      tokenTimer: null,
    };
  },
  computed:
    {
      ...mapGetters([GET_TOKEN]),
      showToolbar()
      {
        return !this.$route.query.tb;
      },
      showFooter()
      {
        return !this.$route.query.hf;
      }
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
  beforeUnmount()
  {
    this.clearTimer();
  },
  methods:
    {
      ...mapMutations([SET_TOKEN]),
      clearTimer()
      {
        if (this.tokenTimer) clearInterval(this.tokenTimer);
      },
      showLogin()
      {
        if (this[GET_TOKEN])
        {
          this[SET_TOKEN](null);
          window.location.href = process.env.YAWIK_SSO_URL + 'realms/' + process.env.YAWIK_SSO_REALM + '/protocol/openid-connect/logout?redirect_uri=' + encodeURI(window.location.origin + '/' + this.$root.$i18n.locale);
        }
        else
        {
          //eventBus.emit(SHOW_LOGIN);
          const cloak = new window.Keycloak({
            url: process.env.YAWIK_SSO_URL,
            realm: process.env.YAWIK_SSO_REALM,
            clientId: process.env.YAWIK_SSO_CLIENT,
          });
          cloak.init({
            onLoad: 'login-required',
          }).then(authenticated =>
          {
            if (authenticated)
            {
              this[SET_TOKEN](cloak);
              //Token Refresh
              this.clearTimer();
              this.tokenTimer = setInterval(() =>
              {
                cloak.updateToken(70).then((refreshed) =>
                {
                  if (!refreshed)
                  {
                    console.warn('Token not refreshed, valid for ' + Math.round(cloak.tokenParsed.exp + cloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
                  }
                }).catch(() =>
                {
                  console.error('Failed to refresh token');
                });
              }, 6000);
            }
          }).catch(err =>
          {
            eventBus.emit(AJAX_FAILED, err);
          });
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
