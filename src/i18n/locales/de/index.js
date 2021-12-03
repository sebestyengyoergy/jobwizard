export default
{
  localeName: () => 'Deutsch',
  btn: {
    login: () => 'Anmelden',
    logout: () => 'Abmelden',
    close: () => 'Schliessen',
    preview: () => 'Vorschau',
    cancel: () => 'Cancel',
    abort: () => 'Abbrechen',
    back: () => 'Zurück',
    continue: () => 'Weiter',
    download: () => 'Download',
    save: () => 'Speichern',
    send: () => 'Senden',
    publish: () => 'Veröffentlichen',
  },
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
    invalid_url: () => 'ungültige URL'
  }
};
