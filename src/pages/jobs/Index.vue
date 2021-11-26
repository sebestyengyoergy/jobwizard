<template>
  <q-page class="flex">
    <q-table
      v-model:pagination="pagination"
      :title="$t('jobs')"
      :rows="rows"
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
            <span class="jobtitle" @click="viewJob(props.row)">
              {{ props.row.title }}
            </span>
          </q-td>
          <q-td key="location" :props="props">
            {{ props.row.location }}
          </q-td>
          <q-td key="email" :props="props">
            {{ props.row.contactEmail }}
          </q-td>
          <q-td key="company" :props="props">
            {{ props.row.company }}
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
      pagination: {
        sortBy: null,
        descending: false,
        rowsPerPage: 10,
        rowsNumber: 1,
        page: 1,
      },
      jobsUrl: `${process.env.YAWIK_API_URL}/jobs?page=`,
      // jobsUrl: `${process.env.YAWIK_API_URL}/jobs`,
      loading: false,
      rowsPerPageOptions: [10, 25, 50, 100, 500],
      sortBy: null,
      descendingOrder: false,
      itemsPerPage: 10,
      sortByTitle: 'asc',
      sortByLocation: 'asc',
      sortByCompany: 'asc'
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
              sortable: false
            },
            {
              name: 'company',
              align: 'left',
              label: this.$t('company'),
              field: 'company',
              sortable: true
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
        //  console.log("pagination " + JSON.stringify(pagination))
          this.loading = true;
          this.itemsPerPage = pagination.pagination.rowsPerPage;

          const sortBy = pagination.pagination.sortBy;
          this.sortBy = sortBy;
          const descendingOrder = pagination.pagination.descending;
          this.descendingOrder = descendingOrder;
          if (sortBy != null)
          {
            if (sortBy === 'title')
            {
              this.sortByTitle = descendingOrder ? 'asc' : 'desc';
            }
            else if (sortBy === 'company')
            {
              this.sortByCompany = descendingOrder ? 'asc' : 'desc';
            }
            else if (sortBy === 'location')
            {
              this.sortByLocation = descendingOrder ? 'asc' : 'desc';
            }
          }

          this.$axios.get(this.jobsUrl +
              pagination.pagination.page +
              '&itemsPerPage=' + this.itemsPerPage +
              '&order[title]=' + this.sortByTitle +
              '&order[company]=' + this.sortByCompany +
              '&order[location]=' + this.sortByLocation,
          {
            headers:
                    {
                      // Authorization: 'Bearer ' + this.$store.getters.GET_TOKEN.token,
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
        getPageNumber(str)
        {
          const parts = str.split('=');
          return parseInt(parts[parts.length - 1]);
        },
        setPagination(data)
        {
          this.pagination = {
            sortBy: this.sortBy,
            descending: this.descendingOrder,
            rowsNumber: data['hydra:totalItems'],
            page: this.getPageNumber(data['hydra:view']['@id']),
            rowsPerPage: this.itemsPerPage
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
        convertToSlug(Text)
        {
          return Text
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '');
        }
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
    cursor: pointer;
  }

  .body--light .jobtitle
  {
    color: #5498D7;
    cursor: pointer;
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
