import { useQuasar, Cookies } from 'quasar';
import { store } from '../store';
const yawik = {
  lang()
  {
    const $q = useQuasar();
    return $q.lang.isoName === 'en-GB' ? 'en' : $q.lang.isoName;
  },
  dateFormat()
  {
    return this.lang() === 'de' ? 'DD.MM.YYYY' : 'MM-DD-YYYY';
  },
  isAuth()
  {
    return store.getters.HAS_AUTH;
  },
  loginUrl(path = '')
  {
    return `${process.env.YAWIK_SSO_URL}` +
    'realms/' +
    `${process.env.YAWIK_SSO_REALM}` +
    '/protocol/openid-connect/auth?client_id=' +
    `${process.env.YAWIK_SSO_CLIENT}` +
    '&response_mode=fragment&response_type=code&login=true&redirect_uri=' +
    `${process.env.YAWIK_URL_HOME}` +
    this.lang() + '/' + path;
  },
  registerUrl(path = '')
  {
    return `${process.env.YAWIK_SSO_URL}` +
    'realms/' +
    `${process.env.YAWIK_SSO_REALM}` +
    '/protocol/openid-connect/registrations?client_id=' +
    `${process.env.YAWIK_SSO_CLIENT}` +
    '&response_mode=fragment&response_type=code&redirect_uri=' +
    `${process.env.YAWIK_URL_HOME}` +
    this.lang() + '/' + path;
  },
  setCookies(name, duration)
  {
    const options = {
      expires: duration
    };
    Cookies.set(name, name, options);
  }
};
export default ({ app }) =>
{
  app.config.globalProperties.$yawik = yawik;
};
export { yawik };
