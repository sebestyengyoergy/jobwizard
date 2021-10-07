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
      htmlCountry()
      {
        return this.countryImage ? `<img src="${this.countryImage}" class="img_country">` : '';
      },
      htmlApply()
      {
        return this[GET_FORM].applyPost
          ? this.$t('apply_postmail')
          : this[GET_FORM].applyURL
            ? `<a href="${this[GET_FORM].applyURL}" target="_blank" rel="noopener noreferrer">${this.$t('apply_text')}</a>`
            : this[GET_FORM].applyEmail ? `<a href="mailto:${this[GET_FORM].applyEmail}">${this.$t('apply_text')}</a>` : '';
      },
      htmlIntro()
      {
        return this[GET_FORM].intro ? `<section><header>${this.$t('intro')}</header><div>${this[GET_FORM].intro}</div></section>` : '';
      },
      htmlTasks()
      {
        return this[GET_FORM].tasks ? `<section><header>${this.$t('tasks')}</header><div>${this[GET_FORM].tasks}</div></section>` : '';
      },
      htmlProfile()
      {
        return this[GET_FORM].profile ? `<section><header>${this.$t('profile')}</header><div>${this[GET_FORM].profile}</div></section>` : '';
      },
      htmlOffer()
      {
        return this[GET_FORM].offer ? `<section><header>${this.$t('offer')}</header><div>${this[GET_FORM].offer}</div></section>` : '';
      },
      htmlContacts()
      {
        return this[GET_FORM].contactInfo ? `<section><header>${this.$t('contacts')}</header><div>${this[GET_FORM].contactInfo}</div></section>` : '';
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
    .img_country
    {
      max-width: 48px;
    }
        .items-center
    {
      align-items: center;
    }
    .bold
    {
      font-weight: bold;
    }
    .list
    {
      margin: 4px 0;
      padding-left: 25px;
      list-style-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 -20 24 40' width='20' height='28'%3E%3Cpath d='M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z'%3E%3C/path%3E%3C/svg%3E");
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
      max-width: 1280px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="row">
      <div class="three columns">${this.htmlLogo}</div>
      <div class="nine columns">
        <h5>${this[GET_FORM].organization || ''}</h5>
        <h1>${this[GET_FORM].jobTitle}</h1>
        <div>${this.htmlCountry}</div>
        <div>${[this[GET_FORM].country?.label || '', this[GET_FORM].location || ''].filter(val => val).join(', ')}</div>
      </div>
    </div>
  </div>
  <div class="container">
    <article>
      <!-- Applications -->
      <div class="button button-primary">
        ${this.htmlApply}
      </div>
      ${this.htmlHeaderImage}

      <h5 align="center">${this[GET_FORM].reference ? 'Ref: ' + this[GET_FORM].reference : ''}</h5>
      <!-- Parameters -->
      <div style="padding: 0 24px;">
        ${this.htmlIntro}
        ${this.htmlTasks}
        ${this.htmlProfile}
        ${this.htmlOffer}
        ${this.htmlContacts}
      </div>
      <!-- Work kind and duration -->
      <div class="flex" style="padding-top: 25px;">
        <div class="mx-auto flex">
          <div>
            <div class="bold">${this.$t('work_kind')}</div>
            <ul class="list">
              ${this.htmlWorkKind}
            </ul>
          </div>
          <div style="border: 1px solid #DDD; border-width: 0 1px 0 1px; margin: 0 16px;"></div>
          <div>
            <div class="bold">${this.$t('work_duration')}</div>
            <ul class="list">
              ${this.htmlWorkDuration}
            </ul>
          </div>
        </div>
      </div>
    </article>
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
      "work_kind": "Work kind",
      "freelance": "Freelance",
      "contract": "Contract",
      "work_duration": "Duration",
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
      "contacts": "Kontact Info",
      "work_kind": "Art der Anstellung",
      "freelance": "Freie Mitarbeit",
      "contract": "Festanstellung",
      "work_duration": "Pensum",
      "fulltime": "Vollzeit",
      "parttime": "Teilzeit",
      "apply_postmail": "Bewerbung per Post",
      "apply_text": "jetzt bewerben"
    }
  }
</i18n>
