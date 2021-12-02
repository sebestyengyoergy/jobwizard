export default
{
  localeName: () => 'English',
  login: () => 'Login',
  logout: () => 'Abmelden',
  close: () => 'Close',
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
    invalid_url: () => 'Invalid URL'
  }
};
