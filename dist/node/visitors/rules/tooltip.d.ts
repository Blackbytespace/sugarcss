import { TSugarCssSettings } from '../../sugarcss.types.js';
/**
 * @name            s-tooltip
 * @namespace       css.rule
 * @type            AtRule
 * @platform        css
 * @status          stable
 *
 * This rule allows you to make the element a tooltip easily.
 *
 * @param       {Number}        [size=10]                                   The size of the tooltip arrow
 * @param       {Number}        [offset=0]                                  The offset of the tooltip from its target
 * @param       {String}.       [color=current]                             The color of the tooltip arrow
 *
 * @return      {Css}                                                       The generated css
 *
 * @snippet       @s-tooltip($1, $2, $3);
 *
 * @example         css
 * .my-tooltip {
 *     @s-tooltip(20px, blue);
 *     @s-tooltip(10px, s-color(accent));
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@blackbyte.space)
 */
export default function tooltip(v: any, settings: TSugarCssSettings): any;
