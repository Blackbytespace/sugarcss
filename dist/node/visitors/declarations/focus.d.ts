import { TSugarCssSettings } from '../../sugarcss.types.js';
/**
 * @name            s-focus
 * @namespace       css.declaration
 * @type            Declaration
 * @platform        css
 * @status          stable
 *
 * This allows you to register a focus style.
 * It can be used through the `@s-focus` at-rule that will apply the registered focus style to the current selector.
 *
 * @param      {Number}        size               The size of the focus in pixels
 * @param      {String}        style.             The style of the focus like "solid", "dashed", etc...
 * @param      {String}        color              The color value to apply
 *
 * @example         css
 * :root {
 *    --s-focus-default: 2px solid red;
 *    --s-focus-links: 3px dashed blue;
 * }
 *
 * .my-element {
 *   @s-focus(); /* apply the default focus style *\/
 *   @s-focus(links); /* apply the links focus style *\/
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@blackbyte.space)
 */
export default function color(v: any, settings: TSugarCssSettings): any;
