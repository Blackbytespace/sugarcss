import { TSugarCssSettings } from '../../sugarcss.types.js';
/**
 * @name            s-responsive-value
 * @namespace       css.declaration
 * @type            Declaration
 * @platform        css
 * @status          stable
 *
 * This allows you to declare a responsive value settings.
 * You can define custom breakpoints and values for each responsive value using css variables.
 *
 * @param      {Number}        min             The minimum value for the responsive value
 * @param      {Number}        max             The maximum value for the responsive value
 * @param      {Number}        breakpointMin    The minimum breakpoint for the responsive value
 * @param      {Number}        breakpointMax    The maximum breakpoint for the responsive value
 * @return     {Css}                          The generated css
 *
 * @example         css
 * :root {
 *    /* min max breakpoint-min breakpoint-max *\/
 *    --s-responsive-value-default: 30px 50px 768px 1200px;
 *    /* if not specified the breakpoints will take the "default" values defined above *\/
 *    --s-responsive-value-h1: 40px 40px;
 * }
 * .my-element {
 *    /* 10px for viewport smaller than 768px, 100px
 *       for viewport larger than 1200px, and a responsive value
 *       between 10px and 100px for viewport between 768px and 1200px *\/
 *    font-size: s-responsive-value(10px, 100px);
 *
 *    /* using the "h1" responsive value defined in the css variables *\/
 *    font-size: s-responsive-value(h1);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@blackbyte.space)
 */
export default function responsiveValue(v: any, settings: TSugarCssSettings): any;
