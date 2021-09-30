import { isURL } from 'validator';

export default
{
  methods:
    {
      ruleRequired(value)
      {
        return typeof value === 'number' ? true : !!value || this.$t('rules.required');
      },
      validDMY(value)
      {
        if (!value) return true;
        const time = (new Date(value.split(/[.-]/).reverse().join('-') + 'T00:00:00Z')).getTime();
        return (!isNaN(time) && time < 4102444800000) || this.$t('rules.invalid_date');
      },
      validEmail(value)
      {
        if (!value) return true;
        // return /^([a-zA-Z0-9]+\.|[a-zA-Z0-9]+[_-]+[a-zA-Z0-9]+\.)*([a-zA-Z0-9]+|[a-zA-Z0-9]+[_-]+[a-zA-Z0-9]+)@(([a-zA-Z0-9]+|[a-zA-Z0-9]+[-]+[a-zA-Z0-9]+)\.)+[a-zA-Z]{2,}$/.test(value) || this.$t('rules.invalid_email');
        // The following pattern is used to check if the entered e-mail address fits the user@domain format.  It also is used to separate the username from the domain.
        const emailPat = /^(.+)@(.+)$/;

        // The following string represents the pattern for matching all special characters.  We don't want to allow special characters in the address. These characters include ( ) < > @ , ; : \ " . [ ]

        const specialChars = '\\(\\)><@,;:\\\\\\"\\.\\[\\]';

        // The following string represents the range of characters allowed in a username or domainname.  It really states which chars aren't allowed.

        const validChars = '[^\\s' + specialChars + ']';

        // The following pattern applies if the "user" is a quoted string (in which case, there are no rules about which characters are allowed and which aren't; anything goes).  E.g. "jiminy cricket"@disney.com is a legal e-mail address.

        const quotedUser = '("[^"]*")';

        // The following pattern applies for domains that are IP addresses, rather than symbolic names.  E.g. joe@[123.124.233.4] is a legal e-mail address. NOTE: The square brackets are required.

        const ipDomainPat = /^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})]$/;

        // The following string represents an atom (basically a series of non-special characters.)

        const atom = validChars + '+';

        // The following string represents one word in the typical username. For example, in john.doe@somewhere.com, john and doe are words. Basically, a word is either an atom or quoted string.

        const word = '(' + atom + '|' + quotedUser + ')';

        // The following pattern describes the structure of the user

        const userPat = new RegExp('^' + word + '(\\.' + word + ')*$');

        // The following pattern describes the structure of a normal symbolic domain, as opposed to ipDomainPat, shown above.

        // const domainPat = new RegExp('^' + atom + '(\\.' + atom + ')*$');

        // Finally, let's start trying to figure out if the supplied address is valid.

        // Begin with the coarse pattern to simply break up user@domain into different pieces that are easy to analyze.

        const matchArray = value.match(emailPat);

        if (matchArray == null)
        {
          // Too many/few @'s or something; basically, this address doesn't even fit the general mould of a valid e-mail address.

          return this.$t('rules.invalid_email.delimiters'); // "Email address seems incorrect (check @ and .'s)";
        }
        const user = matchArray[1];
        const domain = matchArray[2];

        // Start by checking that only basic ASCII characters are in the strings (0-127).

        for (let i = 0; i < user.length; i++)
        {
          if (user.charCodeAt(i) > 127)
          {
            return this.$t('rules.invalid_email.unicode_user'); // 'This username in email contains invalid characters.';
          }
        }
        for (let i = 0; i < domain.length; i++)
        {
          if (domain.charCodeAt(i) > 127)
          {
            return this.$t('rules.invalid_email.unicode_domain'); // 'This domain name contains invalid characters.';
          }
        }

        // See if "user" is valid

        if (user.match(userPat) == null)
        {
          // user is not valid
          return this.$t('rules.invalid_email.username'); // "The username in email doesn't seem to be valid.";
        }

        // if the e-mail address is at an IP address (as opposed to a symbolic host name) make sure the IP address is valid.

        const IPArray = domain.match(ipDomainPat);
        if (IPArray != null)
        {
          // this is an IP address

          for (let i = 1; i <= 4; i++)
          {
            if (IPArray[i] > 255)
            {
              return this.$t('rules.invalid_email.ip'); // 'Destination IP address is invalid!';
            }
          }
          return true;
        }

        // Domain is symbolic name.  Check if it's valid.

        const atomPat = new RegExp('^' + atom + '$');
        const domArr = domain.split('.');
        const len = domArr.length;
        for (let i = 0; i < len; i++)
        {
          if (domArr[i].search(atomPat) === -1)
          {
            return this.$t('rules.invalid_email.domain'); // 'The domain name does not seem to be valid.';
          }
        }

        // Make sure there's a host name preceding the domain.

        if (len < 2)
        {
          return this.$t('rules.invalid_email.hostname'); // 'This email address is missing a hostname!';
        }

        // If we've gotten this far, everything's valid!
        return true;
      },
      validURL(value)
      {
        return value ? isURL(value) || this.$t('rules.invalid_url') : true;
      },
    }
};
