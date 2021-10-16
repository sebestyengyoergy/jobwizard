<template>
  <q-page class="flex" padding>
    <q-table
      :title="$t('jobs')"
      :rows="rows"
      :columns="columns"
      row-key="name"
      class="full-width fill-height"
    />
    <SupportYawik />
  </q-page>
</template>

<script>
import SupportYawik from 'src/components/SupportYawik';

const rows = [
  {
    name: 'Software Developer (m/w/d)',
    location: 'Frankfurt am Main',
    organization: 'CROSS Solution',
    date: '02.10.2021',
  },
  {
    name: 'Key Account Manager (m/w/d)',
    location: 'Berlin',
    organization: 'ABC Company',
    date: '02.10.2021',
  },
  {
    name: 'Datenbank Administrator',
    location: 'Köln',
    organization: 'Yawik Solutions',
    date: '02.10.2021',
  },
  {
    name: 'Grundschullehrer*in (m/w/d)',
    location: 'Dinkelsbühl',
    organization: 'Big Company AG',
    date: '02.10.2021',
  },
  {
    name: 'Pharmareferent / Klinikspezialist (m/w/d) Medizinisches Cannabis',
    location: 'Wächtersbach',
    organization: 'Gesundheitsvorsorge und Sicherheitstechnik GmbH',
    date: '02.10.2021',
  },
  {
    name: 'Verlader im Tiefkühlbereich mit Staplerschein (m/w/d)',
    location: '12681 Berlin',
    organization: 'Bewirtschaftungsbetriebe GmbH',
    date: '02.10.2021',
  },
  {
    name: 'CNC-Fräser oder -Dreher (m/w/d)',
    location: 'Haar bei München',
    organization: 'Gebäude- und Anlagentechnik GmbH',
    date: '02.10.2021',
  },
  {
    name: 'Sortiermitarbeiter (m/w/d) kurzer Bewerbungsprozess',
    location: 'Bremen',
    organization: 'PACT Group',
    date: '02.10.2021',
  },
  {
    name: 'Gesundheits- und Kinderkrankenpfleger (m/w/d)',
    location: 'München',
    organization: 'Deutschland GmbH',
    date: '02.10.2021',
  },
  {
    name: 'Pflegefachkraft (m/w/d)',
    location: 'Trier',
    organization: 'Baumarkt AG',
    date: '02.10.2021',
  }
];

export default
{
  name: 'Jobs',
  components:
    {
      SupportYawik,
    },
  data()
  {
    return {
      rows
    };
  },
  computed:
  {
    columns()
    {
      return [
        {
          name: 'date',
          label: this.$t('date'),
          field: 'date'
        },
        {
          name: 'name',
          required: true,
          label: this.$t('title'),
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'location',
          align: 'left',
          label: this.$t('location'),
          field: 'location',
          sortable: true
        },
        {
          name: 'organization',
          label: this.$t('organization'),
          field: 'organization',
          sortable: true
        },
      ];
    }
  }
};
</script>

<i18n>
  {
    "en": {
      "jobs": "Jobs (demo data)",
      "title": "Job Title"
    },
    "de": {
      "jobs": "Stellenanzeigen (Demo Daten)",
      "title": "Anzeigentitel"
    }
  }
</i18n>
