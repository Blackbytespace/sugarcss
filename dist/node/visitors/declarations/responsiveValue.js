import { env } from '../../sugarcss.js';
import parseArgs from '../../utils/parseArgs.js';
import { savePersistentEnv } from '../../utils/savePersistentEnv.js';
import { setSugarcssJson } from '../../utils/sugarcssJson.js';
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
export default function responsiveValue(v, settings) {
    const name = v.name.replace(`--s-responsive-value-`, ''), args = parseArgs(v.value, ['min', 'max', 'breakpointMin', 'breakpointMax'], {
        separator: ['white-space', 'comma'],
    });
    const result = [];
    if (!env.responsiveValues[name]) {
        env.responsiveValues[name] = {
            min: args.values.min,
            max: args.values.max,
            breakpointMin: args.values.breakpointMin,
            breakpointMax: args.values.breakpointMax,
        };
    }
    // set new css variables
    if (args.ast.min) {
        result.push({
            property: `--s-responsive-value-${name}-min`,
            value: {
                name: `--s-responsive-value-${name}-min`,
                value: [args.ast.min],
            },
        });
    }
    if (args.ast.max) {
        result.push({
            property: `--s-responsive-value-${name}-max`,
            value: {
                name: `--s-responsive-value-${name}-max`,
                value: [args.ast.max],
            },
        });
    }
    if (args.ast.breakpointMin) {
        result.push({
            property: `--s-responsive-value-${name}-breakpoint-min`,
            value: {
                name: `--s-responsive-value-${name}-breakpoint-min`,
                value: [args.ast.breakpointMin],
            },
        });
    }
    if (args.ast.breakpointMax) {
        result.push({
            property: `--s-responsive-value-${name}-breakpoint-max`,
            value: {
                name: `--s-responsive-value-${name}-breakpoint-max`,
                value: [args.ast.breakpointMax],
            },
        });
    }
    // save to sugarcss.json
    setSugarcssJson({
        responsiveValues: {
            [name]: env.responsiveValues[name],
        },
    });
    if (settings.verbose) {
        console.log(`Registered responsive value: <cyan>${name}</cyan>: <yellow>${JSON.stringify(env.responsiveValues[name])}</yellow>`);
    }
    // save persistent env
    savePersistentEnv();
    return result;
}
//# sourceMappingURL=responsiveValue.js.map