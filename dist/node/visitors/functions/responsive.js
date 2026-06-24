import { env } from '../../sugarcss.js';
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
export default function responsive(value, settings) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    const args = Object.assign({}, parseArgs(value.arguments, [
        'min',
        'max',
        'breakpointMinOrRelativeUnit',
        'breakpointMax',
        'relativeUnit',
    ], {
        separator: ['white-space', 'comma'],
    }));
    let minVal = args.values.min;
    let maxVal = args.values.max;
    let relativeUnit = typeof args.values.breakpointMinOrRelativeUnit === 'string'
        ? args.values.breakpointMinOrRelativeUnit
        : args.values.relativeUnit || 'vw';
    let breakpointMin = typeof args.values.breakpointMinOrRelativeUnit === 'number'
        ? args.values.breakpointMinOrRelativeUnit
        : ((_b = (_a = env === null || env === void 0 ? void 0 : env.responsives.breakpoints) === null || _a === void 0 ? void 0 : _a.min) !== null && _b !== void 0 ? _b : 768);
    let breakpointMax = (_e = (_c = args.values.breakpointMax) !== null && _c !== void 0 ? _c : (_d = env === null || env === void 0 ? void 0 : env.responsives.breakpoints) === null || _d === void 0 ? void 0 : _d.max) !== null && _e !== void 0 ? _e : 1200;
    const unit = (_l = (_h = (_g = (_f = args.ast.min) === null || _f === void 0 ? void 0 : _f.value) === null || _g === void 0 ? void 0 : _g.unit) !== null && _h !== void 0 ? _h : (_k = (_j = args.ast.max) === null || _j === void 0 ? void 0 : _j.value) === null || _k === void 0 ? void 0 : _k.unit) !== null && _l !== void 0 ? _l : 'px';
    const minBpPx = breakpointMin;
    const maxBpPx = breakpointMax;
    // slope = (maxVal - minVal) / (maxBpPx - minBpPx)
    // preferred = slope * 100vw + (minVal - slope * minBpPx)unit
    // This avoids any length/length division which Firefox rejects in calc()
    const slope = (maxVal - minVal) / (maxBpPx - minBpPx);
    const intercept = minVal - slope * minBpPx;
    const interceptStr = intercept >= 0
        ? `+ ${intercept}${unit}`
        : `- ${Math.abs(intercept)}${unit}`;
    const finalValue = `clamp(${minVal}${unit}, calc(${slope * 100}${relativeUnit} ${interceptStr}), ${maxVal}${unit})`;
    return {
        raw: finalValue,
    };
}
//# sourceMappingURL=responsive.js.map