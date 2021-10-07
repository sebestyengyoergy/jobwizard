<template>
  <q-dialog :model-value="modelValue" maximized @update:modelValue="close">
    <q-card flat class="bg-third column overflow-hidden">
      <q-card-actions class="bg-primary text-white q-py-sm" align="center">
        <q-btn color="secondary" @click="close">{{ $t('close') }}</q-btn>
      </q-card-actions>
      <q-card-section class="col-grow overflow-hidden row q-pa-md">
        <iframe class="col-grow q-mx-auto rounded-borders" style="max-width: 1280px; border: 3px dashed #CCC;" :srcdoc="htmlCode" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { GET_FORM, GET_LOGO, GET_HEADER } from 'src/store/names';
import { mapGetters } from 'vuex';

export default
{
  name: 'DialogPreview',
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
      canvas: null,
      countryImage: '',
    };
  },
  computed:
    {
      ...mapGetters([GET_FORM, GET_LOGO, GET_HEADER]),
      country()
      {
        return this[GET_FORM].country;
      },
      htmlLogo()
      {
        return this[GET_LOGO] ? `<img src="${this[GET_LOGO]}" class="img_logo">` : '';
      },
      htmlHeaderImage()
      {
        return this[GET_HEADER] ? `<div class="flex" style="padding: 16px 0 0;"><img src="${this[GET_HEADER]}" class="img_header mx-auto"></div>` : '';
      },
      htmlApply()
      {
        return this[GET_FORM].applyPost
          ? this.$t('apply_postmail')
          : this[GET_FORM].applyURL
            ? `<a href="${this[GET_FORM].applyURL}" class="mx-auto" target="_blank" rel="noopener noreferrer">${this.$t('apply_text')}</a>`
            : this[GET_FORM].applyEmail ? `<a href="mailto:${this[GET_FORM].applyEmail}">${this.$t('apply_text')}</a>` : '';
      },
      htmlIntro()
      {
        return this[GET_FORM].intro ? `<section><header>${this[GET_FORM].introLabel}</header><div>${this[GET_FORM].intro}</div></section>` : '';
      },
      htmlTasks()
      {
        return this[GET_FORM].tasks ? `<section><header>${this[GET_FORM].taskLabel}</header><div>${this[GET_FORM].tasks}</div></section>` : '';
      },
      htmlProfile()
      {
        return this[GET_FORM].profile ? `<section><header>${this[GET_FORM].profileLabel}</header><div>${this[GET_FORM].profile}</div></section>` : '';
      },
      htmlOffer()
      {
        return this[GET_FORM].offer ? `<section><header>${this[GET_FORM].offerLabel}</header><div>${this[GET_FORM].offer}</div></section>` : '';
      },
      htmlContacts()
      {
        return this[GET_FORM].contactInfo ? `<section><header>${this[GET_FORM].contactInfoLabel}</header><div>${this[GET_FORM].contactInfo}</div></section>` : '';
      },
      htmlWorkKind()
      {
        return this[GET_FORM].workKind.length > 0 ? this[GET_FORM].workKind.map(item => `<li>${this.$t(item)}</li>`).join('') : '';
      },
      htmlWorkDuration()
      {
        return this[GET_FORM].workDuration.length > 0 ? this[GET_FORM].workDuration.map(item => `<li>${this.$t(item)}</li>`).join('') : '';
      },
      htmlCode()
      {
        return `<!DOCTYPE html><html lang="${this.$root.$i18n.locale}">
<head>
  <title>${this[GET_FORM].jobTitle}</title>
  <meta charset="utf-8">
  <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css" integrity="sha512-EZLkOqwILORob+p0BXZc+Vm3RgJBOe1Iq/0fiI7r/wJgzOFZMlsqTa29UEl6v6U6gsV4uIpsNZoV32YZqrCRCQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <script type="application/ld+json">${JSON.stringify(this.jsonLD)}` + '<' + `/script>
  <style>
    a
    {
      color: #5498D7;
      text-decoration: none;
    }
    a:hover
    {
      text-decoration: underline;
    }
    .button a
    {
      color: #fff;
      text-decoration: none;
    }
    a:hover
    {
      text-decoration: none;
    }
    .flex
    {
      display: flex;
    }
    .mx-auto
    {
      margin-left: auto;
      margin-right: auto;
    }
    .img_logo
    {
      max-width: 160px;
      max-height: 160px;
    }
    .img_header
    {
      max-width: 100%;
      max-height: 220px;
    }
    .items-center
    {
      align-items: center;
    }
    .bold
    {
      font-weight: bold;
    }
    section
    {
      padding-bottom: 16px;
    }
    section header
    {
      font-weight: bold;
      line-height: 1.75;
    }
    article
    {
      margin: 0 auto;
    }
    .jobintro {
      border: 1px solid #eee;
      background-color: #eef4fb;
    }
    .jobdetails {
      border: 1px solid #eee;
    }
    .container {
      max-width: 700px;
    }
  </style>
</head>
<body>
  <div class="container jobintro">
    <div class="row">
      <div class="three columns">${this.htmlLogo}</div>
      <div class="nine columns">
        <h5>${this[GET_FORM].organization || ''}</h5>
        <h1>${this[GET_FORM].jobTitle}</h1>
        <div>
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" />
        </svg>
        ${[this[GET_FORM].country?.label || '', this[GET_FORM].location || ''].filter(val => val).join(', ')}
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M6,2C4.89,2 4,2.89 4,4V20A2,2 0 0,0 6,22H10V20.09L12.09,18H6V16H14.09L16.09,14H6V12H18.09L20,10.09V8L14,2H6M13,3.5L18.5,9H13V3.5M20.15,13C20,13 19.86,13.05 19.75,13.16L18.73,14.18L20.82,16.26L21.84,15.25C22.05,15.03 22.05,14.67 21.84,14.46L20.54,13.16C20.43,13.05 20.29,13 20.15,13M18.14,14.77L12,20.92V23H14.08L20.23,16.85L18.14,14.77Z" />
        </svg>
        ${[this[GET_FORM].workKind]}
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12 20C16.4 20 20 16.4 20 12S16.4 4 12 4 4 7.6 4 12 7.6 20 12 20M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2M17 11.5V13H11V7H12.5V11.5H17Z" />
        </svg>
        ${[this[GET_FORM].workDuration]}
        </div>
      </div>
    </div>
  </div>
  <div class="container jobdetails">
    <article>
      <!-- Applications -->
      ${this.htmlHeaderImage}
      <!-- Parameters -->
      <div style="padding: 0 24px;">
        ${this.htmlIntro}
        ${this.htmlTasks}
        ${this.htmlProfile}
        ${this.htmlOffer}
        ${this.htmlContacts}
      </div>
    </article>
    <h5 align="center">${this[GET_FORM].reference ? 'Ref: ' + this[GET_FORM].reference : ''}</h5>
    <div class="row items-center">
      <div class="six columns offset-by-three button button-primary">
        ${this.htmlApply}
      </div>
    </h5>
  </div>
</body>
</html>`;
      },
      jsonLD()
      {
        const today = new Date();
        const expires = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
        const result = {
          '@context': 'https://schema.org/',
          '@type': 'JobPosting',
          title: this[GET_FORM].jobTitle,
          description: this[GET_FORM].intro,
          identifier:
            {
              '@type': 'PropertyValue',
              name: this[GET_FORM].organization,
              value: this[GET_FORM].reference,
            },
          datePosted: this.dateText(today),
          validThrough: this.dateText(expires),
          hiringOrganization: {
            '@type': 'Organization',
            name: this[GET_FORM].organization,
          },
          jobLocation: {
            '@type': 'Place',
            address: {
              '@type': 'PostalAddress',
              streetAddress: this[GET_FORM].location,
              addressCountry: this[GET_FORM].country,
            }
          },
        };
        if (this.employment.length > 0) result.employmentType = this.employment;
        if (this[GET_FORM].applyURL) result.directApply = true;
        return result;
      },
      employment()
      {
        return this[GET_FORM].workKind.map(item => ({
          freelance: 'OTHER',
          contract: 'CONTRACTOR',
        }[item])).concat(this[GET_FORM].workDuration.map(item => ({
          fulltime: 'FULL_TIME',
          parttime: 'PART_TIME',
        }[item])));
      },
    },
  watch:
    {
      country:
        {
          immediate: true,
          handler(newVal)
          {
            if (newVal)
            {
              this.countryImage = '';
              const img = new Image();
              img.onload = (e) =>
              {
                this.canvas.width = img.naturalWidth;
                this.canvas.height = img.naturalHeight;
                const context = this.canvas.getContext('2d');
                context.drawImage(img, 0, 0);
                this.countryImage = this.canvas.toDataURL('image/png');
              };
              img.src = `country/${newVal.value.toLowerCase()}.png`;
            }
          }
        },
    },
  created()
  {
    this.canvas = document.createElement('canvas');
  },
  methods:
    {
      close()
      {
        this.$emit('update:modelValue', false);
      },
      dateText(value)
      {
        return value.getFullYear() + '-' + String(value.getMonth() + 1).padStart(2, '0') + '-' + String(value.getDate()).padStart(2, '0');
      }
    }
};
</script>

<i18n>
  {
    "en": {
      "close": "Close",
      "jobad_wizard": "Job ad Wizard",
      "intro": "Intro",
      "tasks": "Tasks",
      "profile": "Profile",
      "offer": "Offer",
      "contacts": "Contact info",
      "freelance": "Freelance",
      "contract": "Contract",
      "fulltime": "Full-time",
      "parttime": "Part-time",
      "apply_postmail": "Apply by regular post",
      "apply_text": "apply now"
    },
    "de": {
      "close": "Schließen",
      "jobad_wizard": "Job ad Wizard",
      "intro": "Einleitung",
      "tasks": "Aufgaben",
      "profile": "Profil",
      "offer": "Angebot",
      "contacts": "Kontakt Info",
      "freelance": "Freie Mitarbeit",
      "contract": "Festanstellung",
      "fulltime": "Vollzeit",
      "parttime": "Teilzeit",
      "apply_postmail": "Bewerbung per Post",
      "apply_text": "jetzt bewerben"
    }
  }
</i18n>
