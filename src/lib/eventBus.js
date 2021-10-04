import mitt from 'mitt';

const emitter = mitt();

export default emitter;

export const SHOW_LOGIN = 'SHOW_LOGIN';
export const AJAX_FAILED = 'AJAX_FAILED';
