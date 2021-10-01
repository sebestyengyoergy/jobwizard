<template>
  <div>
    <div class="q-col-gutter-sm row">
      <div class="col-6 column">
        <div class="q-pb-sm">{{ $t('work_kind.title') }}</div>
        <q-field :model-value="workKind" :rules="[ruleRequired]" borderless>
          <template #control>
            <q-option-group v-model="workKind" :options="listKinds" type="checkbox" color="primary" name="workKind" />
          </template>
        </q-field>
      </div>

      <div class="col-6 column">
        <div class="q-pb-sm">{{ $t('work_duration.title') }}</div>
        <q-field :model-value="workDuration" :rules="[ruleRequired]" borderless>
          <template #control>
            <q-option-group v-model="workDuration" :options="listDurations" type="checkbox" color="primary" name="workDuration" />
          </template>
        </q-field>
      </div>
    </div>
  </div>
</template>

<script>
import mixinValidations from 'src/lib/validations';
import { mapGetters, mapMutations } from 'vuex';
import { GET_FORM, SET_FIELD } from 'src/store/names';

export default
{
  name: 'StepThree',
  mixins: [mixinValidations],
  computed:
    {
      ...mapGetters([GET_FORM]),
      workKind:
        {
          get()
          {
            return this[GET_FORM].workKind;
          },
          set(val)
          {
            this[SET_FIELD]({ workKind: val });
          }
        },
      workDuration:
        {
          get()
          {
            return this[GET_FORM].workDuration;
          },
          set(val)
          {
            this[SET_FIELD]({ workDuration: val });
          }
        },
      listKinds()
      {
        return [
          {
            value: 'freelance',
            label: this.$t('work_kind.options.freelance')
          },
          {
            value: 'contract',
            label: this.$t('work_kind.options.contract')
          },
        ];
      },
      listDurations()
      {
        return [
          {
            value: 'fulltime',
            label: this.$t('work_duration.options.full_time')
          },
          {
            value: 'parttime',
            label: this.$t('work_duration.options.part_time')
          },
        ];
      },
    },
  methods:
    {
      ...mapMutations([SET_FIELD]),
    }
};
</script>

<i18n>
  {
    "en": {
      "work_kind": {
        "title": "Kind of work",
        "options": {
          "freelance": "Freelance",
          "contract": "Contract"
        }
      },
      "work_duration": {
        "title": "Duration",
        "options": {
          "full_time": "Full-time",
          "part_time": "Part-time"
        }
      }
    },
    "de": {
      "work_kind": {
        "title": "Art der Anstellung",
        "options": {
          "freelance": "Freie Mitarbeit",
          "contract": "Festanstellung"
        }
      },
      "work_duration": {
        "title": "Pensum",
        "options": {
          "full_time": "Vollzeit",
          "part_time": "Teilzeit"
        }
      }
    }
  }
</i18n>
