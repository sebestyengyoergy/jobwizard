<template>
  <div class="q-gutter-md">
    <!-- Logo -->
    <div class="row">
      <q-uploader
        hide-upload-btn
        accept="image/*"
        style="max-width: 220px; height: 220px;"
        :max-total-size="1e7"
        :max-files="1"
        :label="$t('choose_logo')"
        @rejected="rejectedFiles"
        @added="logoAdded"
        @removed="logoRemoved"
      />
      <q-item>
        <q-item-section>
          <q-item-label caption>{{ GET_FORM.organization || '' }}</q-item-label>
          <q-item-label>{{ GET_FORM.jobTitle }}</q-item-label>
        </q-item-section>
      </q-item>
    </div>

    <!-- Header image -->
    <q-uploader
      hide-upload-btn
      accept="image/*"
      style="max-height: 400px; min-height: 200px; width: 100%;"
      :max-total-size="1e7"
      :max-files="1"
      :label="$t('choose_header')"
      @rejected="rejectedFiles"
      @added="headerAdded"
      @removed="headerRemoved"
    />

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
      // fileLogo: null,
      // fileHeader: null,
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
      rejectedFiles(files)
      {
        this.$q.notify({
          color: 'negative',
          position: 'top',
          icon: 'mdi-alert',
          message: this.$t('image_rejected'),
        });
      },
      logoAdded(files)
      {
        this.readFile(files[0]).then(b64 =>
        {
          this.imageLogo = b64;
        });
      },
      logoRemoved(files)
      {
        this.imageLogo = '';
      },
      headerAdded(files)
      {
        this.readFile(files[0]).then(b64 =>
        {
          this.imageHeader = b64;
        });
      },
      headerRemoved(files)
      {
        this.imageHeader = '';
      },
    }
};
</script>

<style>
  .img_logo
  {
    max-width: 220px;
    max-height: 220px;
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
      "contact_info": "Contact",
      "image_rejected": "File too big - above 10Mb",
      "choose_logo": "Choose company logo",
      "choose_header": "Choose a header image"
    },
    "de": {
      "logo": "Logo",
      "header": "Headerbild",
      "intro": "Unternehmensbeschreibung",
      "tasks": "Aufgaben",
      "profile": "Ihre Voraussetzungen",
      "offer": "Ihre Vorteile",
      "contact_info": "Kontakt",
      "image_rejected": "Die Datei ist zu groß. über 10Mb",
      "choose_logo": "Logo wählen",
      "choose_header": "Header wählen"
    }
  }
</i18n>
