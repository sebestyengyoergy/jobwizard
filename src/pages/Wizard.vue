<template>
  <q-page class="flex" padding>
    <q-form ref="frm" class="q-mx-auto" @submit="submitForm" @validation-error="hasErrors">
      <div class="justify-center q-pb-lg flex">
        <q-btn-group push>
          <q-btn name="preview" color="primary" outline @click="dlgPreview = true">
            {{ $t('preview') }}
          </q-btn>
          <SwitchLanguage class="q-mx-auto" />
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
                :done="isCompleted(stepName)" :error="validationErrors(stepName)"
        >
          <component :is="stepName" :active="currentStep === stepName" :stepper="stepper" :width="maxWidth" style="min-height: 500px;" />
        </q-step>
        <template #navigation>
          <div class="row justify-end q-px-lg q-pb-lg">
            <q-btn v-if="steps.indexOf(currentStep) > 0" name="prev" outline color="primary" :label="$t('back')" class="q-mr-md" @click.stop="navigate('previous')" />
            <q-btn v-if="lastStep" color="primary" name="next" :label="$t('download')" @click.stop="trySubmit" />
            <q-btn v-else color="primary" name="next" :label="$t('continue')" @click.stop="navigate('next')" />
          </div>
        </template>
      </q-stepper>
    </q-form>
    <DialogPreview v-model="dlgPreview" />
  </q-page>
</template>

<script>
import SwitchLanguage from 'src/components/SwitchLanguage';
import DialogPreview from './DialogPreview';
import StepOne from './steps/StepOne';
import StepTwo from './steps/StepTwo';
import StepThree from './steps/StepThree';
import StepFour from './steps/StepFour';
import { GET_STEP, SET_STEP, CLEAR_FORM } from '../store/names';
import { mapGetters, mapMutations } from 'vuex';

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
  data()
  {
    return {
      stepper: null, // used by steps to navigate to next step on ENTER key in any input field
      maxWidth: 1024, // used to limit the width of QEditor, otherwise it grows too much when you type text
      dlgPreview: false,
      lastStep: false,
    };
  },
  computed:
    {
      ...mapGetters([GET_STEP]),
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
        return ['stepOne', 'stepTwo', 'stepThree', 'stepFour'];
      },
    },
  watch:
    {
      currentStep()
      {
        this.$nextTick(() =>
        {
          // Quasar is too fast - as soon as it detects MouseDown event on the CONTINUE button, it goes to the next step
          // And on the last step the button becomes a SUBMIT type too fast, even before MouseUp - which then leads to speculative form submit
          this.lastStep = this.currentStep === this.steps[this.steps.length - 1];
        });
      }
    },
  created()
  {
    // we have to update maxWidth on window resize
    window.addEventListener('resize', this.onResize, false);
  },
  mounted()
  {
    this.stepper = this.$refs.stepper; // used by steps to navigate to next step by ENTER key inside any input field
    this.onResize();
  },
  beforeUnmount()
  {
    window.removeEventListener('resize', this.onResize, false);
  },
  methods:
    {
      ...mapMutations([SET_STEP, CLEAR_FORM]),
      onResize()
      {
        // limit the width of QEditor - otherwise it grows too much on typing
        this.maxWidth = this.$refs.frm.$el.clientWidth;
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
      validationErrors(step)
      {
        if (!this.$refs.frm) return false;
        // get all components for the given step and check if they have a validation error
        return false;
        //const components = this.$refs.frm.getValidationComponents().filter(ref => this.findStep(ref) === step);
        //return step !== this.currentStep ? components.some(item => !item.validate()) : components.some(item => item.hasError);
      },
      isCompleted(step)
      {
        if (this.steps.indexOf(this.currentStep) <= this.steps.indexOf(step)) return false;
        //if (step === 'stepTwo' && !this[GET_COVER_LETTER]) return false;
        //if (step === 'stepFour' && this[GET_FILES].length === 0 && !this[GET_PHOTO]) return false;
        return true;
      },
      submitForm()
      {
        //
      },
      abortForm()
      {
        this[CLEAR_FORM]();
      }
    }
};
</script>

<style lang="scss">
  .q-stepper .q-step > *
  {
    max-width: $yawik-max-stepper-width;
  }
</style>

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
      "download": "Download"
    }
  }
</i18n>
