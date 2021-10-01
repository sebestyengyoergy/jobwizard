import {
  GET_FORM,
  GET_STEP,
  GET_LOGO,
  GET_HEADER,
  CLEAR_FORM,
  SET_STEP,
  SET_FIELD,
  SET_LOGO,
  SET_HEADER
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
      logo: '', // Base-64 encoded
      header: '', // Base-64 encoded
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
      [GET_LOGO](state)
      {
        return state.logo;
      },
      [GET_HEADER](state)
      {
        return state.header;
      },
    },
  mutations:
    {
      [CLEAR_FORM](state)
      {
        for (const key in emptyForm) state.form[key] = emptyForm[key];
        state.logo = '';
        state.header = '';
      },
      [SET_STEP](state, value)
      {
        state.form.step = value;
      },
      [SET_FIELD](state, obj)
      {
        state.form[Object.keys(obj)[0]] = Object.values(obj)[0];
      },
      [SET_LOGO](state, value)
      {
        state.logo = value;
      },
      [SET_HEADER](state, value)
      {
        state.header = value;
      }
    }
};
