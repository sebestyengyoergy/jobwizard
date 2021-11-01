<template>
  <q-page class="flex">
    <div class="q-pa-md absolute-center" >
      <q-list bordered separator style="width: 500px; background: white;">
        <q-item clickable v-ripple>
          <q-item-section >
            <q-item-label>{{$t('job.title')}}</q-item-label>
            <q-item-label caption>{{job.title}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section>
            <q-item-label>{{$t('job.email')}}</q-item-label>
            <q-item-label caption>{{job.contactEmail}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section>
            <q-item-label>{{$t('job.organization')}}</q-item-label>
            <q-item-label caption>{{job.organization.length ? job.organization[0].name: ''}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section>
            <q-item-label>{{$t('job.location')}}</q-item-label>
            <q-item-label caption>{{job.location}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section>
            <q-item-label>{{$t('job.city')}}</q-item-label>
            <q-item-label caption>{{job.locations.length ? job.locations[0].city : ''}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section>
            <q-item-label>{{$t('job.region')}}</q-item-label>
            <q-item-label caption>{{job.locations.length ? job.locations[0].region : ''}}</q-item-label>
          </q-item-section>
        </q-item><q-item clickable v-ripple>
          <q-item-section>
            <q-item-label>{{$t('job.country')}}</q-item-label>
            <q-item-label caption>{{job.locations.length ? job.locations[0].country : ''}}</q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </div>

  </q-page>
</template>

<script>

export default {
  name: 'Job',
  data()
  {
    return {
      
      job: {
        title: '',
        location:'',
        locations:[],
        contactEmail:'',
        organization:[],
        
      }
    };
  },
  computed:
    {
       id(){
         return this.$route.params.id;
       }
    },
  methods:
  {
    getJob()
    {
       this.$axios.get(`${process.env.YAWIK_API_URL}/jobs/${this.id}`,
          {
            headers:
              {
                Accept: 'application/ld+json',
              },
          }).then(response =>
        {
          this.job = response.data;
          
        }).finally(() =>
        {
          this.loading = false;
        });
    }
  },
  created()
  {
      this.getJob()
  }


};
</script>

<i18n>
{
  "en": {
    "job":{
      "title": "Job Title",
      "email" : "Email",
      "organization": "Organization",
      "location" : "Location",
      "city": "City",
      "region" : "Region",
      "country": "Country"

    }
  },
  "de": {
   "job":{
      "title": "Job Title",
      "email" : "Email",
      "organization": "Organization",
      "location" : "Location",
      "city": "City",
      "region" : "Region",
      "country": "Country"

    }
  }
}
</i18n>
