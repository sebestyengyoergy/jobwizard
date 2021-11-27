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
          rules:
            {
              required: () => 'Pflichtfeld',
              invalid_date: () => 'Invalid date',
              invalid_email:
                {
                  delimiters: () => 'Die E-Mail-Adresse scheint falsch zu sein (@ und Punkte prüfen)',
                  unicode_user: () => 'Dieser Benutzername in der E-Mail enthält ungültige Zeichen',
                  unicode_domain: () => 'Dieser Domainname enthält ungültige Zeichen',
                  username: () => 'Der Benutzername in der E-Mail scheint nicht gültig zu sein',
                  ip: () => 'Die Ziel-IP-Adresse ist ungültig!',
                  domain: () => 'Der Domänenname scheint nicht gültig zu sein',
                  hostname: () => 'Bei dieser E-Mail-Adresse fehlt ein Hostname!',
                },
              invalid_url: () => 'ungültige URL',
            },

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
