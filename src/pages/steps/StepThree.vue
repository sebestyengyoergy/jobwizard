<template>
  <div>
    <div class="q-col-gutter-sm row">
      <div class="col-6 column">
        <div class="q-pb-sm">{{ $t('work_kind.title') }}</div>
        <q-field :model-value="workKind" lazy-rules :rules="[ruleRequired]" borderless>
          <template #control>
            <q-option-group v-model="workKind" :options="listKinds" type="checkbox" color="primary" name="workKind" />
          </template>
        </q-field>
      </div>
      <div class="col-6 column">
        <div class="q-pb-sm">{{ $t('work_duration.title') }}</div>
        <q-field :model-value="workDuration" lazy-rules :rules="[ruleRequired]" borderless>
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
import { GET_WORK_KIND, GET_WORK_DURATION, SET_WORK_KIND, SET_WORK_DURATION } from 'src/store/names';

export default
{
  name: 'StepThree',
  mixins: [mixinValidations],
  props:
    {
      active: // eslint-disable-line vue/no-unused-properties
        {
          type: Boolean,
          default: false
        },
      stepper: // eslint-disable-line vue/no-unused-properties
        {
          type: Object,
          default: null
        },
      width: // eslint-disable-line vue/no-unused-properties
        {
          type: Number,
          default: 1024
        },
    },
  computed:
    {
      ...mapGetters([GET_WORK_KIND, GET_WORK_DURATION]),
      workKind:
        {
          get()
          {
            return this[GET_WORK_KIND];
          },
          set(val)
          {
            this[SET_WORK_KIND](val);
          }
        },
      workDuration:
        {
          get()
          {
            return this[GET_WORK_DURATION];
          },
          set(val)
          {
            this[SET_WORK_DURATION](val);
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
      ...mapMutations([SET_WORK_KIND, SET_WORK_DURATION]),
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
    }
  }
</i18n>
