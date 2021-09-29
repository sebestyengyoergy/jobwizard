import { createI18n } from 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js';

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  silentTranslationWarn: true,
  warnHtmlInMessage: 'off',
  messages:
    {
      en:
        {
          localeName: () => 'English',
        },
      de:
        {
          localeName: () => 'Deutsch',
        },
    }
});

export default ({ app }) =>
{
  // Set i18n instance on app
  app.use(i18n);
};

// if you need to import it from
// other files, then:
export { i18n };
