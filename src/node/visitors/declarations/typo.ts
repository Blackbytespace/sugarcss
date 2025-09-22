import { TSugarCssSettings } from '../../sugarcss.types.js';
import __parseArgs from '../../utils/parseArgs.js';

import __argsToCustomPropertiesAst from '../../utils/argsToCustomPropertiesAst.js';

/**
 * @name            s-typo
 * @namespace       css.declaration
 * @type            Declaration
 * @platform        css
 * @status          stable
 *
 * This variable allows you to declare a typography easily and use it in your css.
 * You can declare as many typos as you want.
 *
 * @param     {String}        font                          The font to use from the registered ones
 * @param     {Number}        [size=1em]                    The font size to use
 * @param     {Number}        [line-height=1]               The line height to use
 * @param     {Number}        [letter-spacing=0]            The letter spacing to use
 * @param     {String}        [text-transform=none]         The text transform to use
 * @param     {String}        [text-decoration=none]        The text decoration to use
 *
 * @example         css
 * :root {
 *   --s-typo-h1: s-font(title) s-size(h1) 1.4 0;
 *   --s-typo-h2: s-font(title) s-size(h2) 1.2 0 uppercase;
 *   --s-typo-p: s-font(default) s-size(p) 1.4 0 lowercase underline;
 * }
 *
 * .my-element {
 *    @s-typo(h1);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@blackbyte.space)
 */

export default function typo(v, settings: TSugarCssSettings): any {
  const name = v.name.replace(`--s-typo-`, '');
  const args = __parseArgs(
    v.value,
    [
      'font',
      'size',
      'line-height',
      'letter-spacing',
      'text-transform',
      'text-decoration',
    ],
    {
      separator: ['comma', 'white-space'],
    },
  );

  if (settings.verbose) {
    console.log(
      `Registered typo: <cyan>${name}</cyan>: <yellow>${JSON.stringify(
        args.values,
      )}</yellow>`,
    );
  }

  const result: any[] = __argsToCustomPropertiesAst(v.name, args);
  return result;
}
