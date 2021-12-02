<template>
  <div>
    <div class="q-col-gutter-sm row">
      <div class="col-6 column">
        <div class="q-pb-sm">{{ $t('work_kind.title') }}</div>
        <q-field :model-value="workKind" name="workKind" :rules="[ruleRequired]" borderless>
          <template #control>
            <q-option-group v-model="workKind" :options="listKinds" type="checkbox" color="primary" name="workKind"/>
          </template>
        </q-field>
      </div>

      <div class="col-6 column">
        <div class="q-pb-sm">{{ $t('work_duration.title') }}</div>
        <q-field :model-value="workDuration" name="workDuration" :rules="[ruleRequired]" borderless>
          <template #control>
            <q-option-group
              v-model="workDuration"
              :options="listDurations"
              type="checkbox"
              color="primary"
              name="workDuration"

            >
              <template #label-0="opt">
                <span>{{ opt.label }}</span>
              </template>

              <template #label-1="opt">
                <div style="width: 350px;">
                  <div class="row">
                    <div class="col-5" style="display: flex; align-items: center;">
                      <span>{{ opt.label }}</span>
                    </div>
                    <div v-if="workDuration.includes('parttime')" class="col-7">
                      <q-slider
                        v-model="partTimePercentage"
                        markers
                        :min="10"
                        :max="90"
                        :step="10"
                        label
                        :label-value="partTimePercentage + '%'"
                        label-always
                        @change="sliderChange"
                      />
                    </div>
                  </div>
                </div>
              </template>
              <template #label-2="opt">
                <div style="width: 350px;">
                  <div class="row">
                    <div class="col-5" style="display: flex; align-items: center;">
                      <span>{{ opt.label }}</span>
                    </div>
                    <div v-if="workDuration.includes('shiftwork')" class="col-7">
                      <q-slider
                        v-model="shiftWorkAmount"
                        markers
                        :min="2"
                        :max="5"
                        :step="1"
                        label
                        :label-value="shiftWorkAmount"
                        label-always
                        @change="sliderChange"
                      />
                    </div>
                  </div>
                </div>
              </template>
            </q-option-group>
          </template>
        </q-field>
      </div>
    </div>
    <div class="q-col-gutter-sm row">
      <div class="col-6 column">
        <div class="q-pb-sm">{{ $t('salary.label') }}</div>
        <q-select v-model="salary" :options="options" name="salary" outlined/>
      </div>
      <div class="col-6 column">
        <div class="q-pb-sm">{{ $t('salary.visibility') }}</div>
        <q-checkbox v-model="salaryVisibility" :label="$t('salary.visibility')" name="salaryVisibility"/>
      </div>
    </div>
  </div>
</template>

<script>
  import mixinValidations from 'src/lib/validations';
  import {mapGetters, mapMutations} from 'vuex';
  import {GET_FORM, SET_FIELD} from 'src/store/names';

  export default {
    name: 'StepThree',
    mixins: [mixinValidations],
    data() {
      return {
        //  partTimePercentage: 50,
        //  shiftWorkAmount: 2,
        options: [
          {
            label: '<20.000€',
            value: '20|'
          },
          {
            label: '20.000€ - 40.000€',
            value: '20|40'
          },
          {
            label: '40.000€ - 60.000€',
            value: '40|60'
          },
          {
            label: '60.000€ - 80.000€',
            value: '60|80'
          },
          {
            label: '80.000€ - 100.000€',
            value: '80|100'
          },
          {
            label: '100.000€ - 120.000€',
            value: '100|120'
          },
          {
            label: '>120.000€',
            value: '|120'
          }
        ]
      };
    },
    computed:
      {
        ...mapGetters([GET_FORM]),
        workKind:
          {
            get() {
              return this[GET_FORM].workKind;
            },
            set(val) {
              this[SET_FIELD]({workKind: val});
            }
          },
        workDuration:
          {
            get() {
              return this[GET_FORM].workDuration;
            },
            set(val) {
              this[SET_FIELD]({workDuration: val});
            }
          },
        partTimePercentage:
          {
            get() {
              const partTimePercentage = this[GET_FORM].partTimePercentage;
              return partTimePercentage === undefined ? 50 : partTimePercentage;
            },
            set(val) {
              this[SET_FIELD]({partTimePercentage: val});
            }
          },
        shiftWorkAmount:
          {
            get() {
              const shiftWorkAmount = this[GET_FORM].shiftWorkAmount;
              return shiftWorkAmount === undefined ? 2 : shiftWorkAmount;
            },
            set(val) {
              this[SET_FIELD]({shiftWorkAmount: val});
            }
          },
        listKinds() {
          return [
            {
              value: 'freelance',
              label: this.$t('work_kind.options.freelance')
            },
            {
              value: 'contract',
              label: this.$t('work_kind.options.contract')
            },
            {
              value: 'internship',
              label: this.$t('work_kind.options.internship')
            },
            {
              value: 'apprenticeship',
              label: this.$t('work_kind.options.apprenticeship')
            },
          ];
        },
        listDurations() {
          return [
            {
              value: 'fulltime',
              label: this.$t('work_duration.options.full_time')
            },
            {
              value: 'parttime',
              label: this.$t('work_duration.options.part_time')
            },
            {
              value: 'shiftwork',
              label: this.$t('work_duration.options.shift_work')
            },
          ];
        },
        salary:
          {
            get() {
              return this[GET_FORM].salary;
            },
            set(val) {
              this[SET_FIELD]({salary: val});
            }
          },
        salaryVisibility:
          {
            get() {
              return this[GET_FORM].salaryVisibility;
            },
            set(val) {
              this[SET_FIELD]({salaryVisibility: val});
            }
          },

      },
    methods:
      {
        ...mapMutations([SET_FIELD]),
        sliderChange() {
          const workDurationVal = this.workDuration;
          this.workDuration = workDurationVal;
          setTimeout(() => {
            this.workDuration = workDurationVal;
          }, 10)
        }
      }
  };
</script>

<i18n>
  {
  "en": {
  "salary": {
  "label": "Annual salary",
  "visibility": "Hide salary in jobad"
  },
  "visibility": "Visibility",
  "work_kind": {
  "title": "Kind of work",
  "options": {
  "freelance": "Freelance",
  "contract": "Contract",
  "internship": "Internship",
  "apprenticeship": "Apprenticeship",
  }
  },
  "work_duration": {
  "title": "Duration",
  "options": {
  "full_time": "Full-time",
  "part_time": "Part-time",
  "shift_work": "Shift work"
  }
  }
  },
  "de": {
  "salary": {
  "label": "Jahresgehalt",
  "visibility": "Gehalt in Stellenanzeige ausblenden"
  },
  "visibility": "Sichtbarkeit",
  "work_kind": {
  "title": "Art der Anstellung",
  "options": {
  "freelance": "Freie Mitarbeit",
  "contract": "Festanstellung",
  "internship": "Praktikum",
  "apprenticeship": "Ausbildungsplatz",
  }
  },
  "work_duration": {
  "title": "Pensum",
  "options": {
  "full_time": "Vollzeit",
  "part_time": "Teilzeit",
  "shift_work": "Schichtarbeit"
  }
  },
  "rules": {
  "required": "Pflichtfeld"
  }
  }
  }
</i18n>
