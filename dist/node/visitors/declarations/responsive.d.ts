import { TSugarCssSettings } from '../../sugarcss.types.js';
/**
 * @name            s-responsive
 * @namespace       css.declaration
 * @type            Declaration
 * @platform        css
 * @status          stable
 *
 * This allows you to declare responsive value settings and global breakpoints.
 *
 * @param      {Number}        min            The minimum value for the responsive value
 * @param      {Number}        max            The maximum value for the responsive value
 * @return     {Css}                          The generated css
 *
 * @example         css
 * :root {
 *    /* breakpoints *\/
 *    --s-responsive-breakpoints: 768px 1200px;
 *    /* min max *\/
 *    --s-responsive-default: 30px 50px;
 * }
 * .my-element {
 *    font-size: s-responsive(10px, 100px);
 *    font-size: s-responsive(h1);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@blackbyte.space)
 */
export default function responsiveValue(v: any, settings: TSugarCssSettings): any;
