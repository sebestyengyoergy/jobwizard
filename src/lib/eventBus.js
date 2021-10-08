import mitt from 'mitt';

const emitter = mitt();

export default emitter;

export const TOGGLE_LOGIN = 'TOGGLE_LOGIN';
export const AJAX_FAILED = 'AJAX_FAILED';
