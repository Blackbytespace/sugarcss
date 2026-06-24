import { env } from '../../sugarcss.js';
import parseArgs from '../../utils/parseArgs.js';
import { savePersistentEnv } from '../../utils/savePersistentEnv.js';
import { setSugarcssJson } from '../../utils/sugarcssJson.js';
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
export default function responsiveBreakpoints(v, settings) {
    var _a, _b, _c;
    const args = parseArgs(v.value, ['min', 'max'], {
        separator: ['white-space', 'comma'],
    });
    const unit = (_c = (_b = (_a = args.ast.min) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.unit) !== null && _c !== void 0 ? _c : 'px';
    env.responsives['breakpoints'] = {
        min: args.values.min,
        max: args.values.max,
        unit,
    };
    const result = [];
    if (args.ast.min) {
        result.push({
            property: `--s-responsive-breakpoints-min`,
            value: {
                name: `--s-responsive-breakpoints-min`,
                value: [args.ast.min],
            },
        });
    }
    if (args.ast.max) {
        result.push({
            property: `--s-responsive-breakpoints-max`,
            value: {
                name: `--s-responsive-breakpoints-max`,
                value: [args.ast.max],
            },
        });
    }
    setSugarcssJson({
        responsives: {
            breakpoints: env.responsives['breakpoints'],
        },
    });
    if (settings.verbose) {
        console.log(`Registered responsive breakpoints: <yellow>${JSON.stringify(env.responsives['breakpoints'])}</yellow>`);
    }
    savePersistentEnv();
    return result;
}
//# sourceMappingURL=responsiveBreakpoints.js.map