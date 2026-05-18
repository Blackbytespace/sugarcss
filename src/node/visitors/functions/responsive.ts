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
 * This function allows you to generate a responsive value based on the provided settings.
 * It uses the CSS clamp function to generate a value that will be responsive between a minimum and a maximum value based on the viewport width.
 * You can define custom breakpoints and values for each responsive value using css variables.
 *
 * @param      {Number|String}        min             The minimum value for the responsive value or the name of the responsive value defined in the css variables
 * @param      {Number}               max             The maximum value for the responsive value
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
export default function responsive(
  value: any,
  settings: TSugarCssSettings,
): any {
  const args = {
    ...parseArgs(value.arguments, ['min', 'max'], {
      separator: ['white-space', 'comma'],
    }),
  };

  let name = args.values.name || 'default';
  if (typeof args.values.min === 'string') {
    name = args.values.min;
  }

  const minVal: number = args.values.min;
  const maxVal: number = args.values.max;
  const unit: string =
    args.ast.min?.value?.unit ?? args.ast.max?.value?.unit ?? 'px';

  const minBpPx = env?.responsives.breakpoints?.min ?? 768;
  const maxBpPx = env?.responsives.breakpoints?.max ?? 1200;

  // slope = (maxVal - minVal) / (maxBpPx - minBpPx)
  // preferred = slope * 100vw + (minVal - slope * minBpPx)unit
  // This avoids any length/length division which Firefox rejects in calc()
  const slope = (maxVal - minVal) / (maxBpPx - minBpPx);
  const intercept = minVal - slope * minBpPx;
  const interceptStr =
    intercept >= 0
      ? `+ ${intercept}${unit}`
      : `- ${Math.abs(intercept)}${unit}`;

  const finalValue = `clamp(${minVal}${unit}, calc(${slope * 100}vw ${interceptStr}), ${maxVal}${unit})`;

  return {
    raw: finalValue,
  };
}
