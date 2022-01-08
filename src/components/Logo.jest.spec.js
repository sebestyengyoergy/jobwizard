import { describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { config, mount } from '@vue/test-utils';
import Logo from 'src/components/Logo';
import yawik from 'src/boot/yawik.js';

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
        mocks: {
          $yawik: {
            lang(){return 'de'}
          },
          $t: () => {}
        }
      }
    });
  });

  it('mounts without errors', () =>
  {
    expect(cmp).toBeTruthy();
  });

});
