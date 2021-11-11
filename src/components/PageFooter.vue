<template>
  <q-footer
    bordered
  >
    <q-tabs
      no-caps
    >
      <q-tab
        name="yawik"
      >
        <q-btn
          class="full-width"
          flat
          no-caps
          type="a"
          rel="noopener noreferrer"
          target="_blank"
          :href="urlOperator"
        >
          {{ $t('copyright', {year: new Date().getFullYear() }) }}
        </q-btn>
      </q-tab>
      <q-tab
        name="imprint"
      >
        <q-btn
          class="full-width"
          flat
          :ripple="false"
          no-caps
          type="a"
          rel="noopener noreferrer"
          target="_blank"
          :href="urlImprint"
          :label="$t('imprint')"
        />
      </q-tab>
      <q-tab
        name="privacy"
      >
        <q-btn
          class="full-width"
          flat
          no-caps
          type="a"
          rel="noopener noreferrer"
          target="_blank"
          :href="urlPrivacy"
          :label="$t('privacy')"
        />
      </q-tab>
      <q-tab
        name="docs"
      >
        <q-btn
          class="full-width"
          flat
          no-caps
          type="a"
          rel="noopener noreferrer"
          target="_blank"
          :href="urlDocs"
          :label="$t('docs')"
        />
      </q-tab>
    </q-tabs>
  </q-footer>
</template>

<script>
export default
{
  name: 'PageFooter',
  data()
  {
    return {};
  },
  computed:
    {
      urlOperator()
      {
        return process.env.YAWIK_URL_OPERATOR;
      },
      urlPrivacy()
      {
        return process.env.YAWIK_URL_PRIVACY;
      },
      urlImprint()
      {
        return process.env.YAWIK_URL_IMPRINT;
      },
      urlDocs()
      {
        return process.env.YAWIK_URL_DOCS;
      }
    }
};
</script>

<style>
  .uploader .q-item__section--thumbnail img
  {
    object-fit: contain;
  }

  .uploader .q-uploader__list .q-item__label
  {
    line-height: 1.25em !important;
  }
</style>

<i18n>
  {
    "en": {
      "copyright": "Copyright",
      "docs": "Documentation",
      "privacy": "Privacy",
      "imprint": "Imprint",
    },
    "de": {
      "docs": "Dokumentation",
      "privacy": "Datenschutz",
      "imprint": "Impressum",
      "copyright": "Copyright"
    }

  }
</i18n>
