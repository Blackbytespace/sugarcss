import { TSugarCssSettings } from '../../sugarcss.types.js';
/**
 * @name            s-responsive-value
 * @namespace       css.function
 * @type            Function
 * @platform        css
 * @status          stable
 *
 * This function allows you to generate a responsive value based on the provided settings.
 * It uses the CSS clamp function to generate a value that will be responsive between a minimum and a maximum value based on the viewport width.
 * You can define custom breakpoints and values for each responsive value using css variables.
 *
 * @param      {Number|String}        min             The minimum value for the responsive value or the name of the responsive value defined in the css variables
 * @param      {Number}               max             The maximum value for the responsive value
 * @param      {String}               [name="default"]          The name of the responsive value defined in the css variables (optional if the name is specified in the "min" parameter)
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
export default function responsiveValue(value: any, settings: TSugarCssSettings): any;
