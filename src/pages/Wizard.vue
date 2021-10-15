<template>
  <q-page class="flex" padding>
    <q-form ref="frm" spellcheck="true" class="q-mx-auto grow" :style="{maxWidth: maxWidth + 'px'}" @submit="submitForm" @validation-error="hasErrors">
      <div class="justify-center q-pb-lg flex">
        <q-btn-group push>
          <q-btn name="preview" color="primary" outline @click="dlgPreview = true">
            {{ $t('preview') }}
          </q-btn>
          <SwitchLanguage v-if="!toolbar" class="q-mx-auto" />
          <q-btn name="abort" color="negative" @click="abortForm">{{ $t($q.platform.is.mobile ? 'cancel' : 'abort') }}</q-btn>
        </q-btn-group>
      </div>
      <!-- eslint-disable quasar/no-invalid-props -->
      <q-stepper
        ref="stepper"
        v-model="currentStep"
        animated
        bordered
        header-nav
        all-panels
        :swipeable="$q.platform.is.mobile"
        :contracted="$q.platform.is.mobile"
        header-class="bg-third"
      >
        <!-- eslint-enable quasar/no-invalid-props -->
        <q-step v-for="stepName in steps" :key="stepName" :name="stepName" :prefix="steps.indexOf(stepName)+1" :title="$t('steps.' + stepName)"
                done-color="positive" active-color="primary" error-color="negative"
                :done="isCompleted(stepName)" :error="validationErrors[stepName] && isCompleted(stepName)"
        >
          <component :is="stepName" style="min-height: 500px;" @next="navigate('next')" />
        </q-step>
        <template #navigation>
          <div class="row justify-end q-px-lg q-pb-lg">
            <q-btn v-if="steps.indexOf(currentStep) > 0" name="prev" outline color="primary" :label="$t('back')" class="q-mr-md" @click.stop="navigate('previous')" />
            <q-btn v-if="lastStep & !hasAuth" color="primary" name="next" :label="$t('download')" @click.stop="trySubmit" />
            <q-btn-dropdown v-if="lastStep & hasAuth" color="primary" name="next" :label="$t('save')">
              <q-list>
                <q-item v-close-popup clickable @click.stop="trySubmit">
                  <q-item-section>
                    <q-item-label>{{ $t('save') }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item v-close-popup clickable @click.stop="trySubmit">
                  <q-item-section>
                    <q-item-label>{{ $t('download') }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
            <q-btn v-if="!lastStep" color="primary" name="next" :label="$t('continue')" @click.stop="navigate('next')" />
          </div>
        </template>
      </q-stepper>
    </q-form>
    <DialogPreview ref="preview" v-model="dlgPreview" />
  </q-page>
</template>

<script>
import SwitchLanguage from 'src/components/SwitchLanguage';
import DialogPreview from './DialogPreview';
import StepOne from './steps/StepOne';
import StepTwo from './steps/StepTwo';
import StepThree from './steps/StepThree';
import StepFour from './steps/StepFour';
import { GET_STEP, SET_STEP, CLEAR_FORM, HAS_AUTH } from '../store/names';
import { mapGetters, mapMutations } from 'vuex';
import saveAs from 'src/lib/FileSaver';

const maxContentWidth = 800; // pixels

export default
{
  name: 'Wizard',
  components:
    {
      SwitchLanguage,
      DialogPreview,
      StepOne,
      StepTwo,
      StepThree,
      StepFour,
    },
  props:
    {
      toolbar:
        {
          type: Boolean,
          default: false
        },
    },
  data()
  {
    return {
      stepper: null, // used by steps to navigate to next step on ENTER key in any input field
      maxWidth: 1024, // used to limit the width of QEditor, otherwise it grows too much when you type text
      dlgPreview: false,
      lastStep: false,
      validationErrors:
        {
          stepOne: false,
          stepTwo: false,
          stepThree: false,
          stepFour: false,
        }
    };
  },
  computed:
    {
      ...mapGetters([GET_STEP, HAS_AUTH]),
      currentStep:
        {
          get()
          {
            return this[GET_STEP];
          },
          set(value)
          {
            this[SET_STEP](value);
          }
        },
      steps()
      {
        return Object.keys(this.validationErrors);
      },
      hasAuth()
      {
        return this[HAS_AUTH];
      }
    },
  watch:
    {
      currentStep(newVal, oldVal)
      {
        this.$nextTick(() =>
        {
          // Quasar is too fast - as soon as it detects MouseDown event on the CONTINUE button, it goes to the next step
          // And on the last step the button becomes a SUBMIT type too fast, even before MouseUp - which then leads to speculative form submit
          this.lastStep = this.currentStep === this.steps[this.steps.length - 1];
          this.validateStep(oldVal);
        });
      },
    },
  created()
  {
    // we have to update maxWidth on window resize
    window.addEventListener('resize', this.onResize, false);
    this.lastStep = this.currentStep === this.steps[this.steps.length - 1];
  },
  mounted()
  {
    this.stepper = this.$refs.stepper; // used by steps to navigate to next step by ENTER key inside any input field
    this.onResize();
    this.steps.slice(0, this.steps.indexOf(this.currentStep)).forEach(step =>
    {
      this.validateStep(step);
    });
  },
  beforeUnmount()
  {
    window.removeEventListener('resize', this.onResize, false);
  },
  methods:
    {
      ...mapMutations([SET_STEP, CLEAR_FORM, HAS_AUTH]),
      onResize()
      {
        // limit the width of QEditor - otherwise it grows too much on typing
        this.maxWidth = Math.min(maxContentWidth, document.body.clientWidth);
      },
      navigate(direction)
      {
        this.$nextTick(() =>
        {
          this.$refs.stepper[direction]();
        });
      },
      trySubmit()
      {
        this.$refs.frm.submit();
      },
      hasErrors(ref)
      {
        // ensure the first invalid field is focused when it is on a different panel/q-step
        let node = ref;
        do
        {
          node = node.$parent;
          if (node.$options.name === 'QStep')
          {
            if (node.name !== node.$parent.value)
            {
              const newName = node.name;
              do
              {
                node = node.$parent;
                if (node.$options.name === 'QStepper')
                {
                  node.$emit('update:modelValue', newName);
                  break;
                }
              } while (node !== this.$root);
              this.$nextTick(() =>
              {
                ref.focus();
              });
            }
            break;
          }
        } while (node !== this.$root);
      },
      findStep(component)
      {
        let node = component;
        do
        {
          node = node.$parent;
          if (node.$options.name === 'QStep') return node.name;
        } while (node !== this.$root);
      },
      isCompleted(step)
      {
        return (this.steps.indexOf(this.currentStep) > this.steps.indexOf(step));
      },
      validateStep(step)
      {
        const components = this.$refs.frm.getValidationComponents().filter(ref => this.findStep(ref) === step);
        this.validationErrors[step] = components.some(item => !item.validate()); // stop on the first validation error
        // this.validationErrors[step] = components.filter(item => !item.validate()).length > 0; // validate all fields
      },
      submitForm()
      {
        const html = this.$refs.preview.htmlCode;
        saveAs(new Blob([html], { type: 'text/html' }), 'job_ad.html', { autoBOM: true });
      },
      abortForm()
      {
        this[CLEAR_FORM]();
      },
    }
};
</script>

<i18n>
  {
    "en": {
      "preview": "Preview",
      "cancel": "Cancel",
      "abort": "Abort",
      "steps": {
        "stepOne": "General data",
        "stepTwo": "Create job ad",
        "stepThree": "Categories",
        "stepFour": "Privacy"
      },
      "back": "Back",
      "continue": "Next",
      "download": "Download",
      "save": "Save"
    },
    "de": {
      "preview": "Vorschau",
      "cancel": "Cancel",
      "abort": "Abbrechen",
      "steps": {
        "stepOne": "Allgemeine Daten",
        "stepTwo": "Stellenanzeige anlegen",
        "stepThree": "Kategorien",
        "stepFour": "Datenschutz"
      },
      "back": "Zurück",
      "continue": "Weiter",
      "download": "Download",
      "save": "Speichern"

    }
  }
</i18n>
