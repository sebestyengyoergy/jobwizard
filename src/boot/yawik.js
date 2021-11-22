import { useQuasar } from 'quasar';
const yawik = {
  lang()
  {
    const $q = useQuasar();
    return $q.lang.isoName === 'en-GB' ? 'en' : $q.lang.isoName;
  }
};
export default ({ app }) =>
{
  app.config.globalProperties.$yawik = yawik;
};
export { yawik };
