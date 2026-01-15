import { camelCase, parse } from '@blackbyte/sugar/string';
import { env } from '../../sugarcss.js';
import { TSugarCssSettings } from '../../sugarcss.types.js';
import parseArgs from '../../utils/parseArgs.js';
import { setSugarcssJson } from '../../utils/sugarcssJson.js';

/**
 * @name            s-setting
 * @namespace       css.declaration
 * @type            Declaration
 * @platform        css
 * @status          stable
 *
 * This variable allows you to override default settings easily directly into your css.
 *
 * Available settings:
 * - `--s-setting-mobile-first`: Specify if the mobile first approach should be used for media queries.
 * - `--s-setting-rem-factor`: The factor to use when converting px to rem. So if you want 1rem = 16px, set this value to 0.0625 (1/16).
 * - `--s-setting-px-to-rem`: Specify if you want to convert px to rem automatically.
 * - `--s-setting-opacity-zero-value`: Specify whith value should be used for all `opacity: 0` declarations. This is useful to avoid some issues where browsers don't recognize an element with `opacity: 0` as if it was in the viewport.
 * - `--s-setting-verbose`: Enable/disable verbose mode.
 *
 * @param      {String}        value                The setting value to set
 *
 * @example         css
 * :root {
 *    --s-setting-mobile-first: true;
 *    --s-setting-rem-factor: 0.0625;
 *    --s-setting-px-to-rem: true;
 *    --s-setting-opacity-zero-value: 0.0001;
 *    --s-setting-verbose: false;
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@blackbyte.space)
 */
export default function setting(v, settings: TSugarCssSettings): any {
  const name = camelCase(v.name.replace(`--s-setting-`, '')),
    args = parseArgs(v.value, ['value']);

  env.settings[name] = parse(args.values.value);

  // save to sugarcss.json
  setSugarcssJson({
    settings: env.settings,
  });

  if (settings.verbose) {
    console.log(
      `Registered setting: <cyan>${name}</cyan>: <yellow>${env.settings[name]}</yellow>`,
    );
  }

  return [];
}
