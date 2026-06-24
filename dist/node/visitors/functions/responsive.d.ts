import { TSugarCssSettings } from '../../sugarcss.types.js';
/**
 * @name            s-responsive
 * @namespace       css.function
 * @type            Function
 * @platform        css
 * @status          stable
 *
 * This function allows you to create a responsive value that will adapt between a minimum and a maximum value based on the viewport width or any other relative unit (cqw, etc...).
 * The function takes a minimum value, a maximum value, and optionally the breakpoints or relative unit to use for the calculation.
 * It then generates a CSS `clamp()` function that will ensure the value stays within the specified range while being responsive to the viewport size.
 *
 * @param      {Number|String}        min             The minimum value for the responsive value or the name of the responsive value defined in the css variables
 * @param      {Number}               max             The maximum value for the responsive value
 * @param      {String}               [breakpointMinOrRelativeUnit]   The minimum breakpoint for the responsive value or the relative unit to use for the calculation (default: vw)
 * @param      {String}               [breakpointMax] The maximum breakpoint for the responsive value (default: 1200px or the value defined in the config)
 * @param      {String}               [relativeUnit]  The relative unit to use for the calculation (default: vw)
 * @return     {Css}                          The generated css
 *
 * @example         css
 * :root {
 *    /* breakpoints *\/
 *    --s-responsive-breakpoints: 768px 1200px;
 * }
 * .my-element {
 *    /* responsive value 10px-100px between breakpoint 768px and 1200px *\/
 *    font-size: s-responsive(10px, 100px);
 *
 *    /* responsive value 10px-100px between breakpoint 300px and 1500px *\/
 *    font-size: s-responsive(10px, 100px, 300px, 1500px);
 *
 *    /* responsive value 30px-50px between container 100px and 400px *\/
 *    /* require one parent to have container-type defined *\/
 *    font-size: s-responsive(30px, 50px, 100px, 400px, cqw);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@blackbyte.space)
 */
export default function responsive(value: any, settings: TSugarCssSettings): any;
