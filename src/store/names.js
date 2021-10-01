/*
We use constants in Vuex for several reasons:
1. Preventing duplicate names
2. Preventing usage/calling of getter/mutation/action with non-existent name
3. Getting advantage of IDE code-completion and usage of constants (i.e. to spot unused names)
*/

// getters
export const GET_STEP = 'GET_STEP';
export const GET_FORM = 'GET_FORM';
export const GET_LOGO = 'GET_LOGO';
export const GET_HEADER = 'GET_HEADER';

// mutations
export const SET_STEP = 'SET_STEP';
export const CLEAR_FORM = 'CLEAR_FORM';
export const SET_FIELD = 'SET_FIELD';
export const SET_LOGO = 'SET_LOGO';
export const SET_HEADER = 'SET_HEADER';
