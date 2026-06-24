import { TSugarCssSettings } from '../../sugarcss.types.js';
/**
 * @name            s-shadow
 * @namespace       css.function
 * @type            Function
 * @platform        css
 * @status          stable
 *
 * This function allows you to apply a registered shadow.
 *
 * @param     {String}        shadow         The shadow you want to apply
 * @return     {Css}                        The generated css
 *
 * @example         css
 * :root {
 *      --s-shadow-small: 0 2px 4px rgba(0, 0, 0, 0.1);
 *      --s-shadow-medium: 0 4px 8px rgba(0, 0, 0, 0.1);
 *      --s-shadow-large: 0 8px 16px rgba(0, 0, 0, 0.1);
 * }
 *
 * .my-element {
 *    box-shadow: s-shadow(small);
 *    box-shadow: s-shadow(medium);
 *    box-shadow: s-shadow(large);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@blackbyte.space)
 */
export default function shadow(value: any, settings: TSugarCssSettings): any;
