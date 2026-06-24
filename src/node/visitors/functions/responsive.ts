import { env } from '../../sugarcss.js';
import { TSugarCssSettings } from '../../sugarcss.types.js';
import parseArgs from '../../utils/parseArgs.js';

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
export default function responsive(
  value: any,
  settings: TSugarCssSettings,
): any {
  const args = {
    ...parseArgs(
      value.arguments,
      [
        'min',
        'max',
        'breakpointMinOrRelativeUnit',
        'breakpointMax',
        'relativeUnit',
      ],
      {
        separator: ['white-space', 'comma'],
      },
    ),
  };

  let minVal: number = args.values.min;
  let maxVal: number = args.values.max;
  let relativeUnit: string =
    typeof args.values.breakpointMinOrRelativeUnit === 'string'
      ? args.values.breakpointMinOrRelativeUnit
      : args.values.relativeUnit || 'vw';
  let breakpointMin: number =
    typeof args.values.breakpointMinOrRelativeUnit === 'number'
      ? args.values.breakpointMinOrRelativeUnit
      : (env?.responsives.breakpoints?.min ?? 768);
  let breakpointMax: number =
    args.values.breakpointMax ?? env?.responsives.breakpoints?.max ?? 1200;

  const unit: string =
    args.ast.min?.value?.unit ?? args.ast.max?.value?.unit ?? 'px';

  const minBpPx = breakpointMin;
  const maxBpPx = breakpointMax;

  // slope = (maxVal - minVal) / (maxBpPx - minBpPx)
  // preferred = slope * 100vw + (minVal - slope * minBpPx)unit
  // This avoids any length/length division which Firefox rejects in calc()
  const slope = (maxVal - minVal) / (maxBpPx - minBpPx);
  const intercept = minVal - slope * minBpPx;
  const interceptStr =
    intercept >= 0
      ? `+ ${intercept}${unit}`
      : `- ${Math.abs(intercept)}${unit}`;

  const finalValue = `clamp(${minVal}${unit}, calc(${slope * 100}${relativeUnit} ${interceptStr}), ${maxVal}${unit})`;

  return {
    raw: finalValue,
  };
}
