<template>
  <div :style="{maxWidth: maxWidth + 'px'}" class="col-md-6 col-sm-12">
    <div class="cursor-pointer text-h5">
      <q-icon color="primary" name="mdi-pencil" /> {{ labelText }}
      <q-popup-edit v-slot="scope" v-model="labelText" auto-save>
        <q-input v-model="labelText" dense autofocus counter @keyup.enter="scope.set" />
      </q-popup-edit>
    </div>
    <q-field :model-value="inputVal" :rules="rules" borderless hide-bottom-space>
      <template #control>
        <q-editor :ref="name" v-model="inputVal" :name="name" :toolbar="toolbar" :min-height="minHeight" class="col-grow" />
      </template>
    </q-field>
  </div>
</template>

<script>
export default {
  name: 'Editor',
  emits: ['update:value', 'update:label'],
  props: {
    label: {
      require: false,
      default: null,
      type: String
    },
    value: {
      require: false,
      default: null,
      type: String
    },
    name: {
      require: false,
      default: null,
      type: String
    },
    toolbar: {
      type: Array,
      default: () =>
      {
        return [
          ['left', 'justify'],
          ['bold', 'italic'],
          ['token', 'hr', 'link'],
          ['quote', 'unordered', 'ordered'],
          ['undo', 'redo']
        ];
      }
    },
    minHeight: {
      type: String,
      default: '200px'
    },
    maxWidth: {
      type: String,
      default: '800px'
    },
    rules: {
      require: false,
      default: null,
      type: Array
    }
  },
  data()
  {
    return {
      inputVal: '',
      labelText: '',
    };
  },
  watch: {
    value(val)
    {
      this.inputVal = val;
      this.$emit('update:value', val);
    },
    inputVal(val)
    {
      this.$emit('update:value', val);
    },
    label(val)
    {
      this.labelText = val;
    },
    labelText(val)
    {
      this.$emit('update:label', val);
    },

  },
  created()
  {
    if (this.value)
    {
      this.inputVal = this.value;
    }
    if (this.label)
    {
      this.labelText = this.label;
    }
  }
};
</script>
