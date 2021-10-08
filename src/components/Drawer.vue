<template>
  <q-drawer v-model="value" side="right" overlay bordered no-swipe-open no-swipe-close no-swipe-backdrop>
    <div class="text-secondary q-pb-md">
      <q-separator />
      <DrawerButton :icon="isAuthenticated ? 'mdi-logout' : 'mdi-login'" @click="value = false,showLogin()">{{ $t(isAuthenticated ? 'logout' : 'login') }}</DrawerButton>
      <template v-if="isAuthenticated">
        <q-separator />
        <DrawerButton icon="mdi-image-search" @click="value = false,dlgLogo = true">{{ $t('change_logo') }}</DrawerButton>
        <q-separator />
        <DrawerButton icon="mdi-domain" @click="value = false,dlgCompany = true">{{ $t('change_org') }}</DrawerButton>
      </template>
    </div>
    <DialogLogo v-model="dlgLogo" />
    <DialogCompany v-model="dlgCompany" />
  </q-drawer>
</template>

<script>
import { GET_TOKEN, SET_TOKEN } from 'src/store/names';
import { mapGetters, mapMutations } from 'vuex';
import eventBus, { SHOW_LOGIN } from 'src/lib/eventBus';
import DrawerButton from 'src/components/DrawerButton';
import DialogLogo from 'src/components/dialogs/DialogLogo';
import DialogCompany from 'src/components/dialogs/DialogOrg';

export default
{
  name: 'Drawer',
  components:
    {
      DrawerButton,
      DialogLogo,
      DialogCompany,
    },
  props:
    {
      modelValue:
        {
          type: Boolean,
          default: false
        },
    },
  emits: ['update:modelValue'],
  data()
  {
    return {
      dlgLogo: false,
      dlgCompany: false,
    };
  },
  computed:
    {
      ...mapGetters([GET_TOKEN]),
      value:
        {
          get()
          {
            return this.modelValue;
          },
          set(val)
          {
            this.$emit('update:modelValue', val);
          }
        },
      isAuthenticated()
      {
        const cloak = this[GET_TOKEN];
        return cloak && cloak.authenticated;
      }
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

<i18n>
  {
    "en": {
      "login": "Login",
      "logout": "Logout",
      "change_logo": "Change logo",
      "change_org": "Change organization"
    }
  }
</i18n>
