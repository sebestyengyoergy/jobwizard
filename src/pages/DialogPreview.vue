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
      htmlApplyURL()
      {
        return this[GET_FORM].applyURL ? `<tr><td><strong>URL</strong>:</td><td>&nbsp;<a href="${this[GET_FORM].applyURL}" target="_blank" rel="noopener noreferrer">${this[GET_FORM].applyURL}</a></td></tr>` : '';
      },
      htmlApplyEmail()
      {
        return this[GET_FORM].applyEmail ? `<tr><td><strong>${this.$t('email')}</strong>:</td><td>&nbsp;<a href="mailto:${this[GET_FORM].applyEmail}">${this[GET_FORM].applyEmail}</a></td></tr>` : '';
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
  <title>${this.$t('jobad_wizard')}</title>
  <meta charset="utf-8">
  <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width">
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
  <div class="flex">
    <div class="mx-auto flex items-center">
      ${this.htmlLogo}
      <div style="padding-left: 16px;">
        <h2>${this[GET_FORM].organization || ''}</h2>
        <h1 align="center">${this[GET_FORM].jobTitle}</h1>
        <div class="flex items-center">
          <div style="padding-right: 16px;">${this.htmlCountry}</div>
          <div>${[this[GET_FORM].country?.label || '', this[GET_FORM].location || ''].filter(val => val).join(', ')}</div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex" style="padding: 20px 0;">
    <article>
      <!-- Applications -->
      <table align="center" cellpadding="4">
        ${this.htmlApplyURL}
        ${this.htmlApplyEmail}
      </table>
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
      }
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
    }
};
</script>

<i18n>
  {
    "en": {
      "close": "Close",
      "jobad_wizard": "Job ad Wizard",
      "email": "E-mail",
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
      "parttime": "Part-time"
    }
  }
</i18n>
