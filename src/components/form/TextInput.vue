<template>
  <q-input
    :id="id"
    v-model="inputVal"
    :disable="disable"
    :label="label"
    :name="name"
    :rules="rules"
    :dark="$q.dark.mode"
    dense
    outlined
    @keypress.enter="$emit('enter-press')"
  >
    <template v-if="hint!=null" #hint>
      {{ hint }}
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'TextInput',
  emits: ['input', 'enter-press'],
  props: {
    label: {
      required: true,
      type: String
    },
    name: {
      required: true,
      type: String
    },
    value: {
      require: false,
      default: null,
      type: String
    },
    hint: {
      require: false,
      default: null,
      type: String
    },
    rules: {
      required: false,
      default: null,
      type: Array
    },
    id: {
      required: false,
      default: null,
      type: String
    },
    disable: {
      required: false,
      default: false,
      type: Boolean
    }
  },
  data()
  {
    return {
      inputVal: null
    };
  },
  watch: {
    value(val)
    {
      this.inputVal = val;
      this.$emit('input', val);
    },
    inputVal(val)
    {
      this.$emit('input', val);
    },
    disable(newVal, oldVal)
    {

    }
  },
  beforeMount()
  {
    if (this.value != null)
    {
      this.inputVal = this.value;
    }
  }
};
</script>
