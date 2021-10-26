<template>
  <q-page class="flex">
    <q-table
      v-model:pagination="pagination"
      :title="$t('jobs')"
      :rows="rows"
      :columns="columns"
      :rows-per-page-options="[]"
      :loading="loading"
      row-key="name"
      class="full-width"
      @request="getJobs"
    />
  </q-page>
</template>

<script>

const metaData = {
  title: 'JobWizard',
  titleTemplate: title => `${title} - Aktuelle Stellenanzeigen`,
  meta: {
    description: {
      name: 'description',
      content: 'Übersicht von Stellenazeigen, die mit dem Yawik Jobwizard erstellt und veröffentlicht wurden.'
    },
    keywords: {
      name: 'keywords',
      content: 'Aktuelle Stellenanzeigen, JobWizard, Anzeigengenerator'
    },
    robots: {
      name: 'robots',
      content: 'index, follow'
    }
  },
  noscript: {
    default: 'Der Yawik Anzeigengenerator benötigt Javascript'
  }
};

import { useMeta } from 'quasar';

export default {
  name: 'Jobs',
  setup()
  {
    useMeta(metaData);
  },
  components:
    {},
  data()
  {
    return {
      rows: [],
      pagination: {
        rowsPerPage: 10,
        rowsNumber: 1,
        page: 1,
      },
      jobsUrl: `${process.env.YAWIK_API_URL}/jobs?page=`,
      loading: false
    };
  },
  computed:
    {
      columns()
      {
        return [
          {
            name: 'title',
            required: true,
            label: this.$t('title'),
            align: 'left',
            field: row => row.title,
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
            name: 'email',
            align: 'left',
            label: this.$t('email'),
            field: 'contactEmail',
            sortable: true
          },

          {
            name: 'organization',
            label: this.$t('organization'),
            field: row => row.organization.name,
            sortable: true
          },
        ];
      }
    },
  mounted()
  {
    this.getJobs();
  },
  methods:
    {
      getJobs(pagination = { pagination: this.pagination })
      {
        this.loading = true;
        this.$axios.get(this.jobsUrl + pagination.pagination.page,
          {
            headers:
              {
                Accept: 'application/ld+json',
              },
          }).then(response =>
        {
          this.rows = response.data['hydra:member'];
          this.setPagination(response.data);
        }).finally(() =>
        {
          this.loading = false;
        });
      },
      getIndexNumber(str)
      {
        const parts = str.split('=');
        return parseInt(parts[parts.length - 1]);
      },
      setPagination(data)
      {
        this.pagination = {
          rowsNumber: data['hydra:totalItems'],
          page: this.getIndexNumber(data['hydra:view']['@id']),
          rowsPerPage: 10
        };
        //console.log(JSON.stringify(this.pagination));
      }
    }
};
</script>

<i18n>
{
  "en": {
    "jobs": "Jobs",
    "title": "Job Title"
  },
  "de": {
    "jobs": "Stellenanzeigen (Demo Daten)",
    "title": "Anzeigentitel"
  }
}
</i18n>
