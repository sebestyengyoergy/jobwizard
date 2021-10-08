<template>
  <q-drawer v-model="value" side="right" overlay bordered no-swipe-open no-swipe-close no-swipe-backdrop>
    <div class="text-secondary q-pb-md">
      <q-separator />
      <DrawerButton :icon="HAS_AUTH ? 'mdi-logout' : 'mdi-login'" @click="value = false,toggleLogin()">{{ $t(HAS_AUTH ? 'logout' : 'login') }}</DrawerButton>
      <template v-if="HAS_AUTH">
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
import { HAS_AUTH } from 'src/store/names';
import { mapGetters } from 'vuex';
import eventBus, { TOGGLE_LOGIN } from 'src/lib/eventBus';
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
      ...mapGetters([HAS_AUTH]),
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
    },
  methods:
  {
    toggleLogin()
    {
      eventBus.emit(TOGGLE_LOGIN);
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
