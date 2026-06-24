import { TSugarCssSettings } from '../../sugarcss.types.js';
/**
 * @name            s-visually-hidden
 * @namespace       css.rule
 * @type            AtRule
 * @platform        css
 * @status          stable
 *
 * This rule allows you to hide an element visually while keeping it accessible to screen readers and assistive technologies.
 * It applies a set of CSS properties that effectively hide the element from view but still allow it to be read by screen readers.
 *
 * @return     {Css}                             The generated css
 *
 * @example         css
 * .my-element {
 *   @s-visually-hidden;
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@blackbyte.space)
 */
export default function zindex(v: any, settings: TSugarCssSettings): any;
