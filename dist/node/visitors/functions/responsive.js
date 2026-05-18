import { env } from '../../sugarcss.js';
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
export default function responsive(value, settings) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const args = Object.assign({}, parseArgs(value.arguments, ['min', 'max'], {
        separator: ['white-space', 'comma'],
    }));
    let name = args.values.name || 'default';
    if (typeof args.values.min === 'string') {
        name = args.values.min;
    }
    const minVal = args.values.min;
    const maxVal = args.values.max;
    const unit = (_f = (_c = (_b = (_a = args.ast.min) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.unit) !== null && _c !== void 0 ? _c : (_e = (_d = args.ast.max) === null || _d === void 0 ? void 0 : _d.value) === null || _e === void 0 ? void 0 : _e.unit) !== null && _f !== void 0 ? _f : 'px';
    const minBpPx = (_h = (_g = env === null || env === void 0 ? void 0 : env.responsives.breakpoints) === null || _g === void 0 ? void 0 : _g.min) !== null && _h !== void 0 ? _h : 768;
    const maxBpPx = (_k = (_j = env === null || env === void 0 ? void 0 : env.responsives.breakpoints) === null || _j === void 0 ? void 0 : _j.max) !== null && _k !== void 0 ? _k : 1200;
    // slope = (maxVal - minVal) / (maxBpPx - minBpPx)
    // preferred = slope * 100vw + (minVal - slope * minBpPx)unit
    // This avoids any length/length division which Firefox rejects in calc()
    const slope = (maxVal - minVal) / (maxBpPx - minBpPx);
    const intercept = minVal - slope * minBpPx;
    const interceptStr = intercept >= 0
        ? `+ ${intercept}${unit}`
        : `- ${Math.abs(intercept)}${unit}`;
    const finalValue = `clamp(${minVal}${unit}, calc(${slope * 100}vw ${interceptStr}), ${maxVal}${unit})`;
    return {
        raw: finalValue,
    };
}
//# sourceMappingURL=responsive.js.map