import { uid } from 'quasar';

import {
  GET_FORM,
  GET_SETTINGS,
  GET_STEP,
  GET_LANG,
  GET_LOGO,
  GET_HEADER,
  GET_TOKEN,
  HAS_AUTH,
  CLEAR_FORM,
  SET_SETTINGS_FIELD,
  SET_STEP,
  SET_FIELD,
  SET_LANG,
  SET_LOGO,
  SET_HEADER,
  SET_TOKEN,
  SET_LOCATION
} from '../names';

const emptyForm = {
  jobId: uid(),
  step: 'stepOne',
  jobTitle: '',
  organization: '',
  channels: [],
  location: {
    streetAdress: '',
    addressLocality: '',
    addressRegion: '',
    postalCode: '',
    addressCountry: '',
  },
  remoteWork: false,
  remoteWorkPercentage: 50,
  formattedAddress: '',
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
  partTimePercentage: 50,
  shiftWorkAmount: 2,
  acceptTerms: false,
  salary: {
    label: '40.000€ - 60.000€',
    value: '40|60'
  },
  salaryVisibility: true
};

const userSettings = {
  miscDarkmode: 'auto',
  miscTimezone: '',
  country: null,
  useBrowserLanguage: true,
  defaultLanguage: '',
  orgName: '',
  orgDescriptionLabel: '',
  orgDescription: '',
  orgContactInfoLabel: '',
  orgContactInfo: '',
  jobsStatsEnabled: true,
  formSpellcheckEnabled: true,
};

export default
{
  state()
  {
    return {
      form: emptyForm,
      settings: userSettings,
      logo: '', // Base-64 encoded
      header: '', // Base-64 encoded
      token: null,
      lang: null
    };
  },
  getters:
    {
      [GET_FORM](state)
      {
        return state.form;
      },
      [GET_SETTINGS](state)
      {
        return state.settings;
      },
      [GET_STEP](state)
      {
        return state.form.step;
      },
      [GET_LANG](state)
      {
        return state.lang;
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
        state.jobId = uid();
      },
      [SET_STEP](state, value)
      {
        state.form.step = value;
      },
      [SET_FIELD](state, obj)
      {
        state.form[Object.keys(obj)[0]] = Object.values(obj)[0];
      },
      [SET_LANG](state, value)
      {
        state.lang = value;
      },
      [SET_LOCATION](state, obj)
      {
        state.form.location = obj;
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
      [SET_SETTINGS_FIELD](state, obj)
      {
        state.settings[Object.keys(obj)[0]] = Object.values(obj)[0];
      },
    }
};
