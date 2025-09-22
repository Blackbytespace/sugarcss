import { TSugarCssSettings } from '../../sugarcss.types.js';
import __parseArgs from '../../utils/parseArgs.js';
import __toRem from '../../utils/toRem.js';

/**
 * @name            s-rem
 * @namespace       css.function
 * @type            Function
 * @platform        css
 * @status          stable
 *
 * This function allows you to convert a pixel value to a rem value.
 * You can pass multiple values to be converted at once.
 *
 * @param      {Number}        ...pxValue          The pixel value(s) you want to convert to rem
 * @return     {Css}                          The generated css
 *
 * @example         css
 * .my-element {
 *    font-size: s-rem(20px); // 1.25rem
 *    padding: s-rem(10px); // 0.625rem
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@blackbyte.space)
 */
export default function rem(value: any, settings: TSugarCssSettings): any {
  const args = {
    ...__parseArgs(value.arguments, [], {}),
  };

  const finalValue: any[] = [];
  for (let [key, value] of Object.entries(args.ast)) {
    finalValue.push(__toRem(value));
  }
  return finalValue;
}
