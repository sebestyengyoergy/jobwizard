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
          <q-td key="title" :props="props">
            <span class="cursor-pointer jobtitle" @click="viewJob(props.row)">
              {{ props.row.attributes.jobTitle }}
            </span>
          </q-td>
          <q-td key="location" :props="props">
            {{ props.row.attributes.location!=null?props.row.attributes.location.streetAddress:'' }}
          </q-td>
          <q-td key="email" :props="props">
            {{ props.row.attributes.applyEmail }}
          </q-td>
          <q-td key="company" :props="props">
            {{ props.row.attributes.organization }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>

<script>

export default {
  name: 'Index',
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
      }
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
              name: 'title',
              required: true,
              label: this.$t('title'),
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
              name: 'email',
              align: 'left',
              label: this.$t('email'),
              field: 'contactEmail',
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
        viewJob(job)
        {
          this.$router.push(
            {
              name: 'job',
              params: {
                id: job.id
              }
            });
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
  "jobs": "Jobs",
  "title": "Job Title",
  "location": "Location",
  "company": "Company",
  "email": "E-Mail",
  "date": "Date"
  },
  "de": {
  "jobs": "Stellenanzeigen",
  "title": "Anzeigentitel",
  "location": "Ort",
  "company": "Firma",
  "email": "E-Mail",
  "date": "Datum"
  }
  }
</i18n>
