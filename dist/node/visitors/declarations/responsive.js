import { env } from '../../sugarcss.js';
import parseArgs from '../../utils/parseArgs.js';
import { savePersistentEnv } from '../../utils/savePersistentEnv.js';
import { setSugarcssJson } from '../../utils/sugarcssJson.js';
/**
 * @name            s-responsive
 * @namespace       css.declaration
 * @type            Declaration
 * @platform        css
 * @status          stable
 *
 * This allows you to declare responsive value settings and global breakpoints.
 *
 * @param      {Number}        min            The minimum value for the responsive value
 * @param      {Number}        max            The maximum value for the responsive value
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
export default function responsiveValue(v, settings) {
    var _a, _b, _c;
    const name = v.name.replace(`--s-responsive-`, '');
    // Handle --s-responsive-breakpoints: 768px 1200px
    if (name === 'breakpoints') {
        const args = parseArgs(v.value, ['min', 'max'], {
            separator: ['white-space', 'comma'],
        });
        const unit = (_c = (_b = (_a = args.ast.min) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.unit) !== null && _c !== void 0 ? _c : 'px';
        env.responsives['breakpoints'] = {
            min: args.values.min,
            max: args.values.max,
            unit,
        };
        savePersistentEnv();
        return [];
    }
    // Handle --s-responsive-{name}: min max
    const args = parseArgs(v.value, ['min', 'max'], {
        separator: ['white-space', 'comma'],
    });
    const result = [];
    if (!env.responsives[name]) {
        env.responsives[name] = {
            min: args.values.min,
            max: args.values.max,
        };
    }
    if (args.ast.min) {
        result.push({
            property: `--s-responsive-${name}-min`,
            value: {
                name: `--s-responsive-${name}-min`,
                value: [args.ast.min],
            },
        });
    }
    if (args.ast.max) {
        result.push({
            property: `--s-responsive-${name}-max`,
            value: {
                name: `--s-responsive-${name}-max`,
                value: [args.ast.max],
            },
        });
    }
    setSugarcssJson({
        responsives: {
            [name]: env.responsives[name],
        },
    });
    if (settings.verbose) {
        console.log(`Registered responsive value: <cyan>${name}</cyan>: <yellow>${JSON.stringify(env.responsives[name])}</yellow>`);
    }
    savePersistentEnv();
    return result;
}
//# sourceMappingURL=responsive.js.map