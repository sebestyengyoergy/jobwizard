<template>
  <q-dialog v-model="showDialog">
    <q-form @submit="submitForm">
      <q-card class="relative-position">
        <q-card-section class="bg-primary text-white q-py-sm">
          <div class="text-h6">{{ $t('login') }}</div>
        </q-card-section>

        <q-card-section class="q-pb-none">
          <q-input ref="username" v-model="username" name="username" :label="$t('username')" outlined dense :rules="[ruleRequired]" lazy-rules autocomplete="username">
            <template #append>
              <q-icon name="mdi-blank" />
            </template>
          </q-input>
        </q-card-section>
        <q-card-section class="q-pb-none">
          <q-input v-model="password" :label="$t('password')" :type="showPassword ? 'text' : 'password'" outlined dense :rules="[ruleRequired]" lazy-rules autocomplete="current-password">
            <template #append>
              <q-icon
                :name="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                class="cursor-pointer"
                @click="showPassword = !showPassword"
              />
            </template>
          </q-input>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn color="primary" outline class="q-mr-sm" @click="showDialog = false">
            {{ $t('cancel') }}
          </q-btn>
          <q-btn color="primary" class="q-ml-sm" type="submit">
            {{ $t('send') }}
          </q-btn>
        </q-card-actions>
        <q-inner-loading :showing="sending">
          <q-spinner size="50px" color="primary" />
        </q-inner-loading>
      </q-card>
    </q-form>
  </q-dialog>
</template>

<script>
import validations from 'src/lib/validations';
import eventBus, { SHOW_LOGIN, AJAX_FAILED } from 'src/lib/eventBus';
import { SET_TOKEN } from 'src/store/names';
import { mapMutations } from 'vuex';

export default
{
  name: 'DialogLogin',
  mixins: [validations],
  data()
  {
    return {
      showDialog: false,
      username: '',
      password: '',
      showPassword: false,
      sending: false,
    };
  },
  created()
  {
    eventBus.on(SHOW_LOGIN, this.showLogin);
  },
  beforeUnmount()
  {
    eventBus.off(SHOW_LOGIN, this.showLogin);
  },
  methods:
    {
      ...mapMutations([SET_TOKEN]),
      showLogin()
      {
        this.username = '';
        this.password = '';
        this.showPassword = false;
        this.showDialog = true;
        setTimeout(() =>
        {
          this.$refs.username.focus();
        }, 120);
      },
      submitForm()
      {
        const data = new FormData();
        data.append('appKey', process.env.YAWIK_APP_KEY);
        data.append('user', this.username);
        data.append('pass', this.password);
        this.sending = true;
        this.$axios.post(process.env.YAWIK_API_URL + '/login/extern?format=json', data).then(response =>
        {
          if (response.data.status === 'success')
          {
            this[SET_TOKEN](response.data.token);
            this.showDialog = false;
          }
          else
          {
            eventBus.emit(AJAX_FAILED, response);
          }
        }).catch(err =>
        {
          eventBus.emit(AJAX_FAILED, err);
        }).finally(() =>
        {
          this.sending = false;
        });
      }
    }
};
</script>

<i18n>
  {
    "en": {
      "login": "Login",
      "username": "Username",
      "password": "Password",
      "send": "Send",
      "cancel": "Cancel"
    }
  }
</i18n>
