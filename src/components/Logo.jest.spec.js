import { describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { config, mount } from '@vue/test-utils';
import Logo from 'src/components/Logo';


const $yawik = jest.fn({
  lang() {
    return 'de'
  }
});

// Global mock
config.global.mocks.$yawik = $yawik;


/*
 * You can provide a config object as param like such:
 *
 * ```ts
 * installQuasarPlugin({ plugins: { Dialog } });
 * ```
 */
installQuasarPlugin();

describe('Logo', () =>
{
  let cmp;

  beforeEach(() =>
  {
    cmp = mount(Logo, {
      global: { 
        mocks: { $yawik }
      },
    });
  });

  it('mounts without errors', () =>
  {
    expect(cmp).toBeTruthy();
  });

});
