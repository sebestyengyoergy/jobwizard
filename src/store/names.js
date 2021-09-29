/*
We use constants in Vuex for several reasons:
1. Preventing duplicate names
2. Preventing usage/calling of getter/mutation/action with non-existent name
3. Getting advantage of IDE code-completion and usage of constants (i.e. to spot unused names)
*/

// getters
export const GET_STEP = 'GET_STEP';
export const GET_FORM = 'GET_FORM';
export const GET_JOB_TITLE = 'GET_JOB_TITLE';
export const GET_ORGANIZATION = 'GET_ORGANIZATION';
export const GET_COUNTRY = 'GET_COUNTRY';
export const GET_LOCATION = 'GET_LOCATION';
export const GET_APPLY_URL = 'GET_APPLY_URL';
export const GET_APPLY_EMAIL = 'GET_APPLY_EMAIL';
export const GET_APPLICATION = 'GET_APPLICATION';
export const GET_REFERENCE = 'GET_REFERENCE';

// mutations
export const SET_STEP = 'SET_STEP';
export const CLEAR_FORM = 'CLEAR_FORM';
export const SET_JOB_TITLE = 'SET_JOB_TITLE';
export const SET_ORGANIZATION = 'SET_ORGANIZATION';
export const SET_COUNTRY = 'SET_COUNTRY';
export const SET_LOCATION = 'SET_LOCATION';
export const SET_APPLY_URL = 'SET_APPLY_URL';
export const SET_APPLY_EMAIL = 'SET_APPLY_EMAIL';
export const SET_APPLICATION = 'SET_APPLICATION';
export const SET_REFERENCE = 'SET_REFERENCE';
