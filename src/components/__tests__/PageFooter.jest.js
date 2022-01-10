import { describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { shallowMount } from '@vue/test-utils';
import PageFooter from '../PageFooter';

/*
 * You can provide a config object as param like such:
 *
 * ```ts
 * installQuasarPlugin({ plugins: { Dialog } });
 * ```
 */
installQuasarPlugin();

describe('PageFooter', () =>
{
  let cmp;

  beforeEach(() =>
  {
    cmp = shallowMount(PageFooter);
  });

  it('mounts without errors', () =>
  {
    expect(cmp).toBeTruthy();
  });

  it('check enviroment properties', () =>
  {
    process.env.YAWIK_URL_OPERATOR = 'test1';
    expect(cmp.vm.urlOperator).toBe('test1');
    process.env.YAWIK_URL_PRIVACY = 'test2';
    expect(cmp.vm.urlPrivacy).toBe('test2');
    process.env.YAWIK_URL_IMPRINT = 'test3';
    expect(cmp.vm.urlImprint).toBe('test3');
    process.env.YAWIK_URL_DOCS = 'test4';
    expect(cmp.vm.urlDocs).toBe('test4');
  });
});
