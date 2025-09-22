import { env } from '../../sugarcss.js';
import { TSugarCssSettings } from '../../sugarcss.types.js';
import __parseArgs from '../../utils/parseArgs.js';

/**
 * @name            s-spaces
 * @namespace       css.function
 * @type            Function
 * @platform        css
 * @status          stable
 *
 * This function allows you to apply a space depending on the
 * min, max and easing function declared using the `--s-spaces` variable, or registered with
 * a custom name like --s-space-small, --s-space-medium, etc...
 *
 * @param      {Number|String}        ...space         The space(s) you want to apply
 * @param      {Boolean}              [scalable=true]     Specify if you want the space(s) to be scalable or not
 * @return     {Css}                        The generated css
 *
 * @example         css
 * :root {
 *      /* Define min, max and a easing function * /
 *      --s-spaces: 0 80px;
 *
 *      /* Define named spaces * /
 *      --s-spaces-small: 10px;
 *      --s-spaces-medium: 20px;
 *      --s-spaces-large: 40px;
 * }
 *
 * .my-element {
 *    padding: s-space(10); // 80px / 100 * 10 = 8px
 *    padding: s-space(100); // 80px / 100 * 100 = 80px
 *    padding: s-space(small); // 10px
 *    padding: s-space(medium); // 20px
 *    padding: s-space(large); // 40px
 *    padding: s-space(10 false); // not scalable
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@blackbyte.space)
 */

export default function space(value: any, settings: TSugarCssSettings): any {
  const args = __parseArgs(value.arguments, [], {
    separator: ['white-space', 'comma'],
  });

  const spaceArgs = env.spaces;
  let easing = spaceArgs?.easing;

  // prepare the easing function
  const easingFunction = env.easingFunctions[easing];

  // calculate the delta between min and max
  const spaceDelta = `calc(
      (var(--s-spaces-max) - var(--s-spaces-min)) * 0.01
    )`;

  let isScalable = true;

  const spaces: string[] = [];
  for (let [argName, argValue] of Object.entries(args.values)) {
    let resultCalc = '';

    if (argValue === false) {
      isScalable = false;
      continue;
    }

    // skip easing declaration
    if (typeof argValue === 'number') {
      // get the requested value percentage
      const easingFunctionStr = easingFunction.replace(
        /t/gm,
        `${argValue * 0.01}`,
      );

      resultCalc = `(${easingFunctionStr} * ${spaceDelta} * ${argValue}) + var(--s-spaces-min)`;
    }

    // create the calc declaration
    spaces.push(`var(--s-space-${argValue}, ${resultCalc})`);
  }

  // if not scalable, return the raw sizes
  if (!isScalable) {
    return {
      raw: spaces.map((s) => s).join(' '),
    };
  }

  return {
    raw: spaces
      .map((s) => {
        return `calc(${s} * var(--s-scale, 1))`;
      })
      .join(' '),
  };
}
