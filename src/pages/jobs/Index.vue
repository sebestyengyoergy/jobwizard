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
    >
      <template #body="props">
        <q-tr :props="props">
          <q-td key="title" :props="props">
            <span style="color: blue; cursor: pointer;" @click="viewJob(props.row)">
              {{ props.row.title }}
            </span>
          </q-td>
          <q-td key="location" :props="props">
            {{ props.row.location }}
          </q-td>
          <q-td key="email" :props="props">
            {{ props.row.contactEmail }}
          </q-td>
          <q-td key="organization" :props="props">
            {{ props.row.organization.name }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>

<script>

export default {
  name: 'Index',
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
            name: 'organization',
            align: 'left',
            label: this.$t('organization'),
            field: row => row.organization.name,
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
      },
      viewJob(job)
      {
        //console.log("JOB "+JSON.stringify(job))
        //console.log("Title "+job.title)
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

<i18n>
{
  "en": {
    "jobs": "Jobs",
    "title": "Job Title",
    "location": "Location",
    "organization": "Organization",
    "email": "E-Mail",
    "date": "Date"
  },
  "de": {
    "jobs": "Stellenanzeigen",
    "title": "Anzeigentitel",
    "location": "Ort",
    "organization": "Unternehmen",
    "email": "E-Mail",
    "date": "Datum"
  }
}
</i18n>
