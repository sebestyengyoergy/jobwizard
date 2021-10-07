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
        <q-btn size="30px" :ripple="false" class="img_logo">
          <img v-if="imageLogo" :src="imageLogo" class="img_logo">
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
    <div class="cursor-pointer">
      {{ introLabel }}
      <q-popup-edit v-slot="scope" v-model="introLabel" auto-save>
        <q-input v-model="introLabel" dense autofocus counter @keyup.enter="scope.set" />
      </q-popup-edit>
    </div>
    <q-field :model-value="intro" :rules="[ruleRequired]" borderless hide-bottom-space>
      <template #control>
        <q-editor ref="editor" v-model="intro" name="intro" :toolbar="toolbar" min-height="200px" class="col-grow" />
      </template>
    </q-field>

    <!-- Tasks -->
    <div class="cursor-pointer">
      {{ taskLabel }}
      <q-popup-edit v-slot="scope" v-model="taskLabel" auto-save>
        <q-input v-model="taskLabel" dense autofocus counter @keyup.enter="scope.set" />
      </q-popup-edit>
    </div>
    <q-field :model-value="tasks" :rules="[ruleRequired]" borderless hide-bottom-space>
      <template #control>
        <q-editor v-model="tasks" name="tasks" :toolbar="toolbar" min-height="200px" class="col-grow" />
      </template>
    </q-field>

    <!-- Profile -->
    <div class="cursor-pointer">
      {{ profileLabel }}
      <q-popup-edit v-slot="scope" v-model="profileLabel" auto-save>
        <q-input v-model="profileLabel" dense autofocus counter @keyup.enter="scope.set" />
      </q-popup-edit>
    </div>
    <q-field :model-value="profile" :rules="[]" borderless hide-bottom-space>
      <template #control>
        <q-editor v-model="profile" name="profile" :toolbar="toolbar" min-height="200px" class="col-grow" />
      </template>
    </q-field>

    <!-- Offer -->
    <div class="cursor-pointer">
      {{ offerLabel }}
      <q-popup-edit v-slot="scope" v-model="offerLabel" auto-save>
        <q-input v-model="offerLabel" dense autofocus counter @keyup.enter="scope.set" />
      </q-popup-edit>
    </div>
    <q-field :model-value="offer" :rules="[]" borderless hide-bottom-space>
      <template #control>
        <q-editor v-model="offer" name="offer" :toolbar="toolbar" min-height="200px" class="col-grow" />
      </template>
    </q-field>

    <!-- Contact info -->
    <div class="cursor-pointer">
      {{ contactInfoLabel }}
      <q-popup-edit v-slot="scope" v-model="contactInfoLabel" auto-save>
        <q-input v-model="contactInfoLabel" dense autofocus counter @keyup.enter="scope.set" />
      </q-popup-edit>
    </div>
    <q-field :model-value="contactInfo" :rules="[GET_FORM].applyPost ? [ruleRequired] : []" borderless hide-bottom-space>
      <template #control>
        <q-editor v-model="contactInfo" :toolbar="toolbar" name="contactInfo" min-height="200px" class="col-grow" />
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
      toolbar: [
        ['left', 'justify'],
        ['bold', 'italic'],
        ['token', 'hr', 'link'],
        ['quote', 'unordered', 'ordered'],
        ['undo', 'redo']
      ],
    };
  },
  computed:
    {
      ...mapGetters([GET_FORM, GET_LOGO, GET_HEADER]),
      introLabel:
        {
          get()
          {
            return this[GET_FORM].introLabel ? this[GET_FORM].introLabel : this.$t('intro');
          },
          set(val)
          {
            this[SET_FIELD]({ introLabel: val });
          }
        },
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
      taskLabel:
        {
          get()
          {
            return this[GET_FORM].taskLabel ? this[GET_FORM].taskLabel : this.$t('task');
          },
          set(val)
          {
            this[SET_FIELD]({ taskLabel: val });
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
      profileLabel:
        {
          get()
          {
            return this[GET_FORM].profileLabel ? this[GET_FORM].profileLabel : this.$t('profile');
          },
          set(val)
          {
            this[SET_FIELD]({ profileLabel: val });
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
      offerLabel:
        {
          get()
          {
            return this[GET_FORM].offerLabel ? this[GET_FORM].offerLabel : this.$t('offer');
          },
          set(val)
          {
            this[SET_FIELD]({ offerLabel: val });
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
      contactInfoLabel:
        {
          get()
          {
            return this[GET_FORM].contactInfoLabel ? this[GET_FORM].contactInfoLabel : this.$t('contact_info');
          },
          set(val)
          {
            this[SET_FIELD]({ contactInfoLabel: val });
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
