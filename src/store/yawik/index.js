import {
  GET_FORM,
  GET_STEP,
  GET_LOGO,
  GET_HEADER,
  GET_TOKEN,
  HAS_AUTH,
  CLEAR_FORM,
  SET_STEP,
  SET_FIELD,
  SET_LOGO,
  SET_HEADER,
  SET_TOKEN
} from '../names';

const emptyForm = {
  step: 'stepOne',
  jobTitle: '',
  organization: '',
  country: null,
  location: '',
  applyURL: '',
  applyEmail: '',
  applyPost: false,
  reference: '',
  introLabel: '',
  intro: '',
  taskLabel: '',
  tasks: '',
  profileLabel: '',
  profile: '',
  offerLabel: '',
  offer: '',
  contactInfoLabel: '',
  contactInfo: '',
  workKind: [],
  workDuration: [],
  acceptTerms: false,
  salary: {
    label: '40.000€ - 60.000€',
    value: '40|60'
  },
  salaryVisibility: true
};

export default
{
  state()
  {
    return {
      form: Object.assign({}, emptyForm),
      logo: '', // Base-64 encoded
      header: '', // Base-64 encoded
      token: null,
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
      [GET_TOKEN](state)
      {
        return state.token;
      },
      [HAS_AUTH](state)
      {
        return state.token && state.token.authenticated;
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
      },
      [SET_TOKEN](state, token)
      {
        state.token = token;
      },
    }
};
