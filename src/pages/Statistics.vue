<template>
  <q-page class="flex">
    <div style="width: 100%;" class="text-h4 q-mb-md">
      {{ $t('statistics') }}
      <apexchart
        width="500"
        type="bar"
        :options="chartOptions1"
        :series="series1"
      />
    </div>
    <div class="example">
      <apexchart
        width="500"
        height="350"
        type="area"
        :options="chartOptions2"
        :series="series2"
      />
      <SupportYawik />
    </div>
  </q-page>
</template>

<script>
import SupportYawik from 'src/components/SupportYawik';
import VueApexCharts from 'vue3-apexcharts';
import { useMeta } from 'quasar';

export default
{
  name: 'Statistics',
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
  components: {
    apexchart: VueApexCharts,
    SupportYawik
  },
  data: function()
  {
    return {
      chartOptions1: {
        chart: {
          id: 'vuechart-example',
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
      series1: [
        {
          name: 'Klicks',
          data: [30, 40, 35, 50, 49, 60, 70, 91],
        },
      ],
      chartOptions2: {
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
        },
        tooltip: {
          fixed: {
            enabled: false,
            position: 'topRight'
          }
        }
      },
      series2: [
        {
          name: 'series1',
          data: [31, 40, 28, 51, 42, 109, 100]
        },
        {
          name: 'series2',
          data: [11, 32, 45, 32, 34, 52, 41]
        }
      ]
    };
  },
};
</script>

<i18n>
  {
    'en': {
      'statistics': 'Statistics',
    },
    'de': {
      'statistics': 'Statistiken',
    }
  }
</i18n>
