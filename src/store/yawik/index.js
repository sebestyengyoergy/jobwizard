import {
  GET_FORM,
  GET_STEP,
  GET_JOB_TITLE,
  GET_ORGANIZATION,
  GET_COUNTRY,
  GET_LOCATION,
  GET_APPLY_URL,
  GET_APPLY_EMAIL,
  GET_APPLICATION,
  GET_REFERENCE,
  GET_WORK_KIND,
  GET_WORK_DURATION,
  GET_TERMS,
  CLEAR_FORM,
  SET_STEP,
  SET_JOB_TITLE,
  SET_ORGANIZATION,
  SET_COUNTRY,
  SET_LOCATION,
  SET_APPLY_URL,
  SET_APPLY_EMAIL,
  SET_APPLICATION,
  SET_WORK_KIND,
  SET_WORK_DURATION,
  SET_REFERENCE,
  SET_TERMS
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
      [GET_JOB_TITLE](state)
      {
        return state.form.jobTitle;
      },
      [GET_ORGANIZATION](state)
      {
        return state.form.organization;
      },
      [GET_COUNTRY](state)
      {
        return state.form.country;
      },
      [GET_LOCATION](state)
      {
        return state.form.location;
      },
      [GET_APPLY_URL](state)
      {
        return state.form.applyURL;
      },
      [GET_APPLY_EMAIL](state)
      {
        return state.form.applyEmail;
      },
      [GET_APPLICATION](state)
      {
        return state.form.application;
      },
      [GET_REFERENCE](state)
      {
        return state.form.reference;
      },
      [GET_WORK_KIND](state)
      {
        return state.form.workKind;
      },
      [GET_WORK_DURATION](state)
      {
        return state.form.workDuration;
      },
      [GET_TERMS](state)
      {
        return state.form.acceptTerms;
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
      [SET_JOB_TITLE](state, value)
      {
        state.form.jobTitle = value;
      },
      [SET_ORGANIZATION](state, value)
      {
        state.form.organization = value;
      },
      [SET_COUNTRY](state, value)
      {
        state.form.country = value;
      },
      [SET_LOCATION](state, value)
      {
        state.form.location = value;
      },
      [SET_APPLY_URL](state, value)
      {
        state.form.applyURL = value;
      },
      [SET_APPLY_EMAIL](state, value)
      {
        state.form.applyEmail = value;
      },
      [SET_APPLICATION](state, value)
      {
        state.form.application = value;
      },
      [SET_REFERENCE](state, value)
      {
        state.form.reference = value;
      },
      [SET_WORK_KIND](state, value)
      {
        state.form.workKind = value;
      },
      [SET_WORK_DURATION](state, value)
      {
        state.form.workDuration = value;
      },
      [SET_TERMS](state, value)
      {
        state.form.acceptTerms = value;
      },
    }
};
