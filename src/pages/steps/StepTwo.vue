<template>
  <div class="q-gutter-md">
    <!-- Logo -->
    <q-file v-model="fileLogo" :label="$t('logo')" name="logo" accept="image/*" clearable dense outlined color="primary" bg-color="white">
      <template #prepend>
        <q-icon name="mdi-paperclip" />
      </template>
    </q-file>
    <div class="row">
      <img v-if="imageLogo" :src="imageLogo" class="img_logo q-mx-auto">
    </div>

    <!-- Header image -->
    <q-file v-model="fileHeader" :label="$t('header')" name="header" accept="image/*" clearable dense outlined color="primary" bg-color="white">
      <template #prepend>
        <q-icon name="mdi-paperclip" />
      </template>
    </q-file>
    <div class="row">
      <img v-if="imageHeader" :src="imageHeader" class="img_header q-mx-auto">
    </div>

    <!-- Intro -->
    <div>{{ $t('intro') }}</div>
    <q-field :model-value="intro" lazy-rules :rules="[ruleRequired]" borderless hide-bottom-space>
      <template #control>
        <q-editor ref="editor" v-model="intro" name="intro" min-height="200px" class="col-grow" />
      </template>
    </q-field>

    <!-- Tasks -->
    <div class="q-pt-sm">{{ $t('tasks') }}</div>
    <q-field :model-value="tasks" lazy-rules :rules="[ruleRequired]" borderless hide-bottom-space>
      <template #control>
        <q-editor v-model="tasks" name="tasks" min-height="200px" class="col-grow" />
      </template>
    </q-field>

    <!-- Profile -->
    <div class="q-pt-sm">{{ $t('profile') }}</div>
    <q-field :model-value="profile" lazy-rules :rules="[ruleRequired]" borderless hide-bottom-space>
      <template #control>
        <q-editor v-model="profile" name="profile" min-height="200px" class="col-grow" />
      </template>
    </q-field>

    <!-- Offer -->
    <div class="q-pt-sm">{{ $t('offer') }}</div>
    <q-field :model-value="offer" lazy-rules :rules="[ruleRequired]" borderless hide-bottom-space>
      <template #control>
        <q-editor v-model="offer" name="offer" min-height="200px" class="col-grow" />
      </template>
    </q-field>

    <!-- Contact info -->
    <div class="q-pt-sm">{{ $t('contact_info') }}</div>
    <q-field :model-value="contactInfo" lazy-rules :rules="[ruleRequired]" borderless hide-bottom-space>
      <template #control>
        <q-editor v-model="contactInfo" name="contactInfo" min-height="200px" class="col-grow" />
      </template>
    </q-field>
  </div>
</template>

<script>
import mixinValidations from 'src/lib/validations';
import { mapGetters, mapMutations } from 'vuex';
import { GET_STEP, GET_FORM, SET_FIELD } from 'src/store/names';

export default
{
  name: 'StepTwo',
  mixins: [mixinValidations],
  data()
  {
    return {
      fileLogo: null,
      imageLogo: '',
      fileHeader: null,
      imageHeader: '',
    };
  },
  computed:
    {
      ...mapGetters([GET_FORM]),
      intro:
        {
          get()
          {
            return this[GET_FORM].intro;
          },
          set(val)
          {
            this[SET_FIELD]({ intro: val });
          }
        },
      tasks:
        {
          get()
          {
            return this[GET_FORM].tasks;
          },
          set(val)
          {
            this[SET_FIELD]({ tasks: val });
          }
        },
      profile:
        {
          get()
          {
            return this[GET_FORM].profile;
          },
          set(val)
          {
            this[SET_FIELD]({ profile: val });
          }
        },
      offer:
        {
          get()
          {
            return this[GET_FORM].offer;
          },
          set(val)
          {
            this[SET_FIELD]({ offer: val });
          }
        },
      contactInfo:
        {
          get()
          {
            return this[GET_FORM].contactInfo;
          },
          set(val)
          {
            this[SET_FIELD]({ contactInfo: val });
          }
        },
    },
  watch:
    {
      [GET_STEP]()
      {
        this.setFocus();
      },
      fileLogo(file)
      {
        this.readFile(file).then(b64 =>
        {
          this.imageLogo = b64;
        });
      },
      fileHeader(file)
      {
        this.readFile(file).then(b64 =>
        {
          this.imageHeader = b64;
        });
      }
    },
  mounted()
  {
    this.setFocus();
  },
  methods:
    {
      ...mapMutations([SET_FIELD]),
      setFocus()
      {
        if (this[GET_STEP] === 'stepTwo') this.$refs.editor.focus();
      },
      readFile(file)
      {
        return new Promise((resolve) =>
        {
          if (file.size)
          {
            const reader = new FileReader();
            reader.onload = (e) =>
            {
              resolve(e.target.result);
            };
            reader.readAsDataURL(file);
          }
        });
      },
    }
};
</script>

<style>
  .img_logo
  {
    max-width: 160px;
    max-height: 160px;
  }

  .img_header
  {
    max-width: 100%;
    max-height: 220px;
  }
</style>

<i18n>
  {
    "en": {
      "logo": "Logo",
      "header": "Header image",
      "intro": "Intro",
      "tasks": "Tasks",
      "profile": "Profile",
      "offer": "Offer",
      "contact_info": "Contact info"
    },
    "de": {
      "logo": "Logo",
      "header": "Header image",
      "intro": "Unternehmensbeschreibung",
      "tasks": "Aufgaben",
      "profile": "Ihre Voraussetzungen",
      "offer": "Ihre Vorteile",
      "contact_info": "Contact info"
    }
  }
</i18n>
