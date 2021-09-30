import {
  GET_FORM,
  GET_STEP,
  CLEAR_FORM,
  SET_STEP,
  SET_FIELD
} from '../names';

const emptyForm = {
  step: 'stepOne',
  jobTitle: '',
  organization: '',
  country: null,
  location: '',
  applyURL: '',
  applyEmail: '',
  application: false,
  reference: '',
  logo: '',
  header: '',
  intro: '',
  tasks: '',
  profile: '',
  offer: '',
  contactInfo: '',
  workKind: [],
  workDuration: [],
  acceptTerms: false,
};

export default
{
  state()
  {
    return {
      form: Object.assign({}, emptyForm),
    };
  },
  getters:
    {
      [GET_FORM](state)
      {
        return state.form;
      },
      [GET_STEP](state)
      {
        return state.form.step;
      },
    },
  mutations:
    {
      [CLEAR_FORM](state)
      {
        for (const key in emptyForm) state.form[key] = emptyForm[key];
      },
      [SET_STEP](state, value)
      {
        state.form.step = value;
      },
      [SET_FIELD](state, obj)
      {
        state.form[Object.keys(obj)[0]] = Object.values(obj)[0];
      },
    }
};
