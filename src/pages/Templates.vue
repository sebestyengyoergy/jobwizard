<template>
  <q-page class="flex">
    <div class="row items-center">
      <q-card class="absolute-center channel">
        <div class="text-h4 q-mb-md full-width">{{ $t('templates') }}</div>
        <p>{{ $t('offer') }}</p>
        <p>{{ $t('sponsoren') }}</p>
        <q-card-section>
          <div class="row no-wrap">
            <div class="col text-h6 ellipsis">
              {{ $t('name') }}
            </div>
            <div class="col-auto text-grey text-caption q-pt-md row no-wrap">
              <q-icon name="mdi-content-copy" />
              &nbsp;{{ $t("templates") }}
            </div>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-subtitle1">
            {{ $t("templates-slug") }}
          </div>
          <div class="text-caption text-grey">
            {{ $t('templates-description') }}
          </div>
        </q-card-section>

        <q-separator />

        <div class="text-center text-h4 q-mb-md full-width">{{ $t('preis1') }}</div>
        <q-card-actions>
          <q-btn type="a" href="mailto:contact@yawik.org" no-caps color="primary">
            {{ $t('mail') }}
          </q-btn>
          <q-btn type="a" href="https://github.com/sponsors/cbleek" no-caps color="primary">
            {{ $t('github') }}
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { useMeta } from 'quasar';

export default
{
  name: 'Templates',
  setup()
  {
    useMeta({
      link: {
        material: {
          rel: 'canonical',
          href: 'https://jobwizard.yawik.org' + window.location.pathname
        }
      },
    });
  },
};
</script>

<style scoped>
  .channel
  {
    padding: 10px;
    width: 100%;
    max-width: 500px;
  }

  .channel-logo
  {
    max-height: 92px;
    width: auto;
    display: block;
  }
</style>

<i18n>
  {
    "en": {
      "name": "Template",
      "offer": "Would you like to place job advertisements in your corporate design? Just send us an email with what you have. We will build a template for you and store it in your job wizard.",
      "preis1": "1,998.00 € plus VAT",
      "templates-slug": "Template in corporate design",
      "sponsoren": "Sponsors receive a 50% discount.",
      "mail": "Mail to Yawik",
      "github": "Become a sponsor",
      "templates-description": "Eine Vorlage zum Festpreis. Senden sie uns was sie haben per Mail. Wir erstellen innerhalb 3 Arbeitstagen eine Vorlage, die sie im Jobwizard nutzen können."

    },
    "de": {
      "name": "Vorlage",
      "offer": "Sie möchten Stellenanzeigen ihn in ihrem corporate design schalten? Schicken Sie uns einfach eine Mail mit dem, was sie haben. Wir bauen ihnen daraus eine Vorlage und hinterlegen diese in ihrem Jobwizard.",
      "preis1": "1.998,00 € zzgl. MwSt",
      "templates-slug": "Vorlage im corporate design",
      "sponsoren": "Sponsoren erhalten 50% Rabatt.",
      "mail": "Mail an Yawik",
      "github": "Sponsor werden",
      "templates-description": "Eine Vorlage zum Festpreis. Senden sie uns was sie haben per Mail. Wir erstellen innerhalb 3 Arbeitstagen eine Vorlage, die sie im Jobwizard nutzen können."
    },
    "fr": {
      "offer": "Vous souhaitez publier des offres d'emploi avec votre identité visuelle ? Envoyez-nous simplement un e-mail avec ce que vous avez. Nous en ferons un modèle que nous déposerons dans votre Jobwizard.",
      "preis1": "1.998,00 € plus TVA",
      "templates-slug": "Modèle en corporate design",
      "sponsoren": "Les sponsors bénéficient d'une réduction de 50%.",
      "mail": "Mail à Yawik",
      "github": "Devenir sponsor",
      "templates-description": "Un modèle à prix fixe. Envoyez-nous ce que vous avez par e-mail. Nous créons un modèle en 3 jours ouvrables que vous pouvez utiliser dans le Jobwizard.",
    }
  }
</i18n>
