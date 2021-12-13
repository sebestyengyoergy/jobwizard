<template>
  <q-page class="flex">
    <q-table
      v-model:pagination="pagination"
      :title="$t('jobs')"
      :rows="rows"
      :grid="grid"
      :columns="columns"
      :rows-per-page-options="rowsPerPageOptions"
      :loading="loading"
      row-key="name"
      class="full-width"
      table-class="jobtable"
      title-class="text-h5"
      table-header-class="jobtable-header"
      @request="getJobs"
    >
      <template #body="props">
        <q-tr :props="props">
          <q-td key="date" :props="props">
            {{ props.row.attributes.publishedAt }}
          </q-td>
          <q-td key="title" :props="props">
            <span class="cursor-pointer jobtitle" @click="getJob(props.row)">
              {{ props.row.attributes.jobTitle }}
            </span>
          </q-td>
          <q-td key="location" :props="props">
            {{ props.row.attributes.formattedAddress }}
          </q-td>
          <q-td key="company" :props="props">
            {{ props.row.attributes.organization }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <job-preview :model-value="modelValue" :job="job" @closed="modelValue=false" />
  </q-page>
</template>

<script>

import JobPreview from './JobPreview';
import { useMeta } from 'quasar';

export default {
  name: 'Index',
  components: { JobPreview },
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
  data()
  {
    return {
      rows: [],
      jobsUrl: `${process.env.YAWIK_API_URL}/api/jobs`,
      loading: false,
      rowsPerPageOptions: [10, 25, 50, 100, 500],
      pagination: {
        sortBy: 'asc',
        descending: true,
        rowsNumber: 10,
        page: 1,
        rowsPerPage: 10
      },
      modelValue: false,
      job: null
    };
  },
  computed:
      {
        grid()
        {
          return this.$q.platform.is.mobile;
        },
        columns()
        {
          return [
            {
              name: 'date',
              align: 'left',
              label: this.$t('date'),
              field: 'date',
              sortable: false
            },
            {
              name: 'title',
              required: true,
              label: this.$t('job_title'),
              align: 'left',
              field: row => row.attributes.jobTitle,
              format: val => `${val}`,
              sortable: false
            },
            {
              name: 'location',
              align: 'left',
              label: this.$t('location'),
              field: 'location',
              sortable: false
            },
            {
              name: 'company',
              align: 'left',
              label: this.$t('company'),
              field: 'company',
              sortable: false
            }
          ];
        },
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
          this.$axios.get(this.jobsUrl +
            '?pagination[page]=' + pagination.pagination.page +
            '&pagination[pageSize]=' + pagination.pagination.rowsPerPage
          ).then(response =>
          {
            this.rows = response.data.data;
            this.setPagination(response.data.meta.pagination);
          }).finally(() =>
          {
            this.loading = false;
          });
        },
        setPagination(pagination)
        {
          this.pagination = {
            sortBy: 'asc',
            descending: true,
            rowsNumber: pagination.total,
            page: pagination.page,
            rowsPerPage: pagination.pageSize
          };
        },
        getJob(job)
        {
        //  this.$axios.get(`http://localhost:1337/api/jobs/1`,
          this.$axios.get(`${process.env.YAWIK_API_URL}/api/jobs/${job.id}`,
            {
              headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + this.$store.getters.GET_TOKEN.token,
                'Content-Type': 'application/json',
              }
            }).then(response =>
          {
            this.job = response.data.data.attributes;
            this.modelValue = true;
          });
        },

        viewJob(job)
        {
          /*this.$router.push(
            {
              name: 'job',
              params: {
                id: job.id
              }
            });*/
        },
      }
};
</script>

<style>

  .jobtable
  {
    font-size: 15px;
  }

  .body--dark .jobtitle
  {
    color: #FAA427;
  }

  .body--light .jobtitle
  {
    color: #5498D7;
  }

</style>

<i18n>
  {
  "en": {
  "location": "Location",
  "company": "Company",
  "email": "E-Mail",
  "date": "Date"
  },
  "de": {
  "location": "Ort",
  "company": "Firma",
  "email": "E-Mail",
  "date": "Datum"
  }
  }
</i18n>
