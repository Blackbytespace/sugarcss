import { TSugarCssSettings } from '../../sugarcss.types.js';
/**
 * @name            s-shadow
 * @namespace       css.rule
 * @type            AtRule
 * @platform        css
 * @status          stable
 *
 * This declaration allows you to apply a registered shadow easily.
 * To be able to use this, you need to register at least 1 shadow like in the example below:
 *
 * @param      {String}        name              The transition name you want to apply
 * @return     {Css}                             The generated css
 *
 * @snippet       @s-shadow($1);
 *
 * @example         css
 * :root {
 *    --s-shadow-default: 0 2px 4px rgba(0, 0, 0, 0.1);
 *    --s-shadow-special: 0 4px 8px rgba(0, 0, 0, 0.2);
 * }
 *
 * .my-element {
 *      @s-shadow();
 * }
 *
 * .my-other-element {
 *     @s-shadow(special);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@blackbyte.space)
 */
export default function shadow(v: any, settings: TSugarCssSettings): any;
