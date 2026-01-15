import { dashCase } from '@blackbyte/sugar/string';
import { TSugarCssSettings } from '../../sugarcss.types.js';
import parseArgs from '../../utils/parseArgs.js';
import { setSugarcssJson } from '../../utils/sugarcssJson.js';

/**
 * @name            s-container
 * @namespace       css.declaration
 * @type            Declaration
 * @platform        css
 * @status          stable
 *
 * The container variables allows you to specify some container related variables like the max-width, side padding, etc...
 *
 * @param      {String}        minWidth             The min width of the container
 * @param      {String}        maxWidth             The max width of the container
 * @param      {String}        sidePadding          The side padding of the container
 *
 * @example         css
 * :root {
 *    --s-container-default: 320px 1200px 20px;
 *    --s-container-full: 0 100% 20px;
 * }
 *
 * .my-element {
 *    @s-container();
 *    @s-container(full);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@blackbyte.space)
 */
export default function container(v, settings: TSugarCssSettings): any {
  const name = v.name.replace(`--s-container-`, ''),
    args = parseArgs(v.value, ['minWidth', 'maxWidth', 'sidePadding'], {
      separator: ['white-space', 'comma'],
    });

  if (settings.verbose) {
    console.log(
      `Registered container: <cyan>${name}</cyan>: <yellow>${JSON.stringify(
        args.values,
      )}</yellow>`,
    );
  }

  // save to sugarcss.json
  setSugarcssJson({
    containers: {
      [name]: args.values,
    },
  });

  const result: any[] = [];

  for (let [key, value] of Object.entries(args.values)) {
    result.push({
      property: `--s-container-${name}-${dashCase(key)}`,
      value: {
        name: `--s-container-${name}-${dashCase(key)}`,
        value: [
          {
            type: 'length',
            value: {
              unit: 'px',
              value,
            },
          },
        ],
      },
    });
  }

  return result;
}
