import { TSugarCssSettings } from '../../sugarcss.types.js';
/**
 * @name            s-focus
 * @namespace       css.rule
 * @type            AtRule
 * @platform        css
 * @status          stable
 *
 * This simply
 *
 * @param      {String}        name              The font name you want to apply
 * @return     {Css}                              The generated css
 *
 * @snippet       @s-font($1);
 *
 * @example         css
 * :root {
 *    --s-font-title: VT323 600 normal normal 0.1em;
 * }
 *
 * .my-element {
 *      @s-font(title);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@blackbyte.space)
 */
export default function font(v: any, settings: TSugarCssSettings): any;
