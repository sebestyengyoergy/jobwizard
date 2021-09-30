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
          rules:
            {
              required: () => 'Required field',
              invalid_date: () => 'Invalid date',
              invalid_email:
                {
                  delimiters: () => 'Email address seems incorrect (check @ and dots)',
                  unicode_user: () => 'This username in email contains invalid characters',
                  unicode_domain: () => 'This domain name contains invalid characters',
                  username: () => 'The username in email does not seem to be valid',
                  ip: () => 'Destination IP address is invalid!',
                  domain: () => 'The domain name does not seem to be valid',
                  hostname: () => 'This email address is missing a hostname!',
                },
              invalid_url: () => 'Invalid URL',
            }
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
