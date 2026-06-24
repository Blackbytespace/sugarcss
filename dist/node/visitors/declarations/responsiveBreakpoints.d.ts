import { TSugarCssSettings } from '../../sugarcss.types.js';
/**
 * @name            s-responsive-breakpoints
 * @namespace       css.declaration
 * @type            Declaration
 * @platform        css
 * @status          stable
 *
 * @example         css
 * :root {
 *    --s-responsive-breakpoints: 768px 1200px;
 * }
 * .my-element {
 *    /* responsive value 10px-100px between breakpoint 768px and 1200px *\/
 *    font-size: s-responsive(10px, 100px);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@blackbyte.space)
 */
export default function responsiveBreakpoints(v: any, settings: TSugarCssSettings): any;
