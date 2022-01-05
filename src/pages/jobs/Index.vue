<template>
  <q-page class="flex">
    <q-table
      v-if="$yawik.isAuth()"
      v-model:pagination="pagination"
      :title="$t('ad_management')"
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
            {{ props.row.attributes.publishedAt ? new Date(props.row.attributes.publishedAt).toLocaleString($yawik.lang()) : $t('unpublished') }}
          </q-td>
          <q-td key="action" :props="props">
            <span style="cursor: pointer; color: blue;" @click="editJob(props.row)">{{ $t('edit_job') }}</span>
          </q-td>
          <q-td key="title" :props="props">
            <a v-if="props.row.attributes.html.url" target="_new" :href="jobDetailUrl + props.row.attributes.html.url">
              <span class="cursor-pointer jobtitle">
                {{ props.row.attributes.jobTitle }} {{ props.row.attributes.id }}
              </span>
            </a>
            <span v-if="!props.row.attributes.html.url" class="jobtitle">
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
      <template #top-right>
        <q-btn no-caps color="primary" :disable="loading" :label="$t('create_job')" :to="'/' + $yawik.lang()" />
      </template>
    </q-table>
    <q-card v-if="!$yawik.isAuth()" class="absolute-center channel">
      <div class="text-h4 q-mb-md full-width">{{ $t('title') }}</div>
      <p>{{ $t('please_register') }}</p>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle1">
          <q-icon name="mdi-content-copy" /> &nbsp; {{ $t("ad_management") }}
        </div>
        <div class="text-caption text-grey">
          {{ $t('ad-management-description') }}
        </div>
      </q-card-section>

      <q-separator />

      <div class="text-center text-h4 q-mb-md full-width">{{ $t('preis1') }}</div>
      <q-card-actions>
        <q-btn type="a" :href="'https://sso.cross-solution.de/auth/realms/YAWIK/protocol/openid-connect/auth?client_id=demo&response_mode=fragment&response_type=code&login=true&redirect_uri=https://jobwizard.yawik.org/' + $yawik.lang() + '/jobs'" no-caps color="primary">
          {{ $t('btn.login') }}
        </q-btn>
        <q-btn type="a" :href="'https://sso.cross-solution.de/auth/realms/YAWIK/protocol/openid-connect/registrations?client_id=demo&response_mode=fragment&response_type=code&redirect_uri=https://jobwizard.yawik.org/' + $yawik.lang() + '/jobs'" no-caps color="primary">
          {{ $t('register') }}
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>

import { useMeta } from 'quasar';
import { SET_JOB } from 'src/store/names';
import { mapMutations } from 'vuex';

export default {
  name: 'Index',
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
      jobDetailUrl: `${process.env.YAWIK_JOB_URL}`,
      loading: false,
      rowsPerPageOptions: [10, 25, 50, 100],
      pagination: {
        sortBy: 'desc',
        descending: true,
        rowsNumber: 10,
        page: 1,
        rowsPerPage: 10
      },
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
              name: 'action',
              align: 'left',
              label: this.$t('action'),
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
    if (this.$yawik.isAuth())
    {
      this.getJobs();
    }
  },
  methods:
      {
        ...mapMutations([SET_JOB]),
        getJobs(pagination = { pagination: this.pagination })
        {
          this.loading = true;
          this.$axios.get(this.jobsUrl, {
            params: {
              'pagination[page]': pagination.pagination.page,
              'pagination[pageSize]': pagination.pagination.rowsPerPage,
              populate: 'html',
              sort: 'publishedAt:desc'
            },
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer ' + this.$store.getters.GET_TOKEN.token
            }
          }
          ).then(response =>
          {
            console.log(response);
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
        editJob(job)
        {
          this.$axios({
            method: 'GET',
            url: process.env.YAWIK_API_URL + '/api/jobs/' + job.id,
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer ' + this.$store.getters.GET_TOKEN.token
            }
          }).then(response =>
          {
            this[SET_JOB]({ data: response.data.success.job });
          });

          this.$router.push({
            name: 'wizard',
          });
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
  }

  .body--light .jobtitle
  {
    color: #5498D7;
  }

</style>

<i18n>
{
  "en": {
    "edit_job":"Edit Job",
    "title": "Please register",
    "action": "Action",
    "unpublished": "unpublished",
    "ad-management-description": "With the advertisement management you can save, edit and delete job advertisements. The advertisement management is also required to integrate job advertisements into your homepage.",
    "preis1": "Registration is free of charge",
    "please_register": "You are currently not logged in. To use the ad management, you must register. Registration is free of charge.",
    "register": "Register",
  },
  "de": {
    "edit_job":"Anzeige bearbeiten",
    "unpublished": "unveröffentlicht",
    "title": "Bitte melden Sie sich an",
    "action": "Aktion",
    "ad-management-description": "Mit der Anzeigenverwaltung können die Stellenanzeigen speichern, bearbeiten und löschen. Die Anzeigenverwaltung wird auch benötigt, um Stellenanzeigen in ihre Homepage zu integrieren.",
    "date": "Datum",
    "preis1": "Die Anmeldung ist kostenlos",
    "please_register": "Sie sind momentan nicht angemeldet. Um die Anzeigenverwaltung zu nutzen, müssen Sie sich registrieren. Die Registrierung ist kostenlos.",
    "register": "Registrieren",
  },
  "fr": {
    "edit_job": "Modifier l'annonce",
    "title": "Veuillez vous identifier.",
    "unpublished": "non publié",
    "action": "Action",
    "please_register": "Vous n'êtes pas connecté pour le moment. Pour pouvoir utiliser la gestion des annonces, vous devez vous inscrire. L'inscription est gratuite.",
    "preis1": "L'inscription est gratuite",
    "register": "S'inscrire",
  }
}
</i18n>
