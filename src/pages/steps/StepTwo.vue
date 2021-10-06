<template>
  <div class="q-gutter-md">
    <!-- Logo -->
    <q-file v-model="fileLogo" :label="$t('logo')" name="logo" accept="image/*" clearable dense outlined color="primary" bg-color="white">
      <template #prepend>
        <q-icon name="mdi-paperclip" />
      </template>
    </q-file>
    <q-item>
      <q-item-section side>
        <q-btn size="100px" class="img_logo">
          <img v-if="imageLogo" :src="imageLogo" class="col-md-2 img_logo q-mx-auto">
        </q-btn>
      </q-item-section>
      <q-item-section>
        <q-item-label caption>{{ GET_FORM.organization || '' }}</q-item-label>
        <q-item-label>{{ GET_FORM.jobTitle }}</q-item-label>
      </q-item-section>
    </q-item>

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
    <q-field :model-value="intro" :rules="[ruleRequired]" borderless hide-bottom-space>
      <template #control>
        <q-editor ref="editor" v-model="intro" name="intro" min-height="200px" class="col-grow" />
      </template>
    </q-field>

    <!-- Tasks -->
    <div class="q-pt-sm">{{ $t('tasks') }}</div>
    <q-field :model-value="tasks" :rules="[ruleRequired]" borderless hide-bottom-space>
      <template #control>
        <q-editor v-model="tasks" name="tasks" min-height="200px" class="col-grow" />
      </template>
    </q-field>

    <!-- Profile -->
    <div class="q-pt-sm">{{ $t('profile') }}</div>
    <q-field :model-value="profile" :rules="[ruleRequired]" borderless hide-bottom-space>
      <template #control>
        <q-editor v-model="profile" name="profile" min-height="200px" class="col-grow" />
      </template>
    </q-field>

    <!-- Offer -->
    <div class="q-pt-sm">{{ $t('offer') }}</div>
    <q-field :model-value="offer" :rules="[ruleRequired]" borderless hide-bottom-space>
      <template #control>
        <q-editor v-model="offer" name="offer" min-height="200px" class="col-grow" />
      </template>
    </q-field>

    <!-- Contact info -->
    <div class="q-pt-sm">{{ $t('contact_info') }}</div>
    <q-field :model-value="contactInfo" :rules="[ruleRequired]" borderless hide-bottom-space>
      <template #control>
        <q-editor v-model="contactInfo" name="contactInfo" min-height="200px" class="col-grow" />
      </template>
    </q-field>
  </div>
</template>

<script>
import mixinValidations from 'src/lib/validations';
import { mapGetters, mapMutations } from 'vuex';
import { GET_STEP, GET_FORM, SET_FIELD, GET_LOGO, GET_HEADER, SET_LOGO, SET_HEADER } from 'src/store/names';

export default
{
  name: 'StepTwo',
  mixins: [mixinValidations],
  data()
  {
    return {
      fileLogo: null,
      fileHeader: null,
    };
  },
  computed:
    {
      ...mapGetters([GET_FORM, GET_LOGO, GET_HEADER]),
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
      imageLogo:
        {
          get()
          {
            return this[GET_LOGO];
          },
          set(val)
          {
            this[SET_LOGO](val);
          }
        },
      imageHeader:
        {
          get()
          {
            return this[GET_HEADER];
          },
          set(val)
          {
            this[SET_HEADER](val);
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
      ...mapMutations([SET_FIELD, SET_LOGO, SET_HEADER]),
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
    width: 150px;
    max-height: 150px;
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
