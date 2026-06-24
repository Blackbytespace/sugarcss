import { setSugarcssJson } from '../../utils/sugarcssJson.js';
/**
 * @name            s-shadow
 * @namespace       css.declaration
 * @type            Declaration
 * @platform        css
 * @status          stable
 *
 * This variables allows you to register a shadow value that you can use in your css easily.
 * through the s-shadow() function or the @s-shadow() rule.
 * You can register as many shadow as you want.
 *
 * @param        {String}       value            The value to register for your shadow
 *
 * @example         css
 * :root {
 *      --s-shadow-small: 0 2px 4px rgba(0, 0, 0, 0.1);
 *      --s-shadow-medium: 0 4px 8px rgba(0, 0, 0, 0.1);
 *      --s-shadow-large: 0 8px 16px rgba(0, 0, 0, 0.1);
 * }
 *
 * .my-element {
 *    box-shadow: s-shadow(small); // 10px
 *    box-shadow: s-shadow(medium); // 20px
 *    box-shadow: s-shadow(large); // 40px
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@blackbyte.space)
 */
export default function shadow(v, settings) {
    const name = v.name.replace(`--s-shadow-`, '').replace(/\-[a-z]$/, '');
    const result = [];
    result.push({
        property: `--s-shadow-${name}`,
        value: {
            name: `--s-shadow-${name}`,
            value: v.value,
        },
    });
    // save to sugarcss.json
    setSugarcssJson({
        shadows: {
            [name]: v.value,
        },
    });
    if (settings.verbose) {
        console.log(`Registered shadow: <yellow>${JSON.stringify({
            name,
            value: v.value,
        })}</yellow>`);
    }
    return result;
}
//# sourceMappingURL=shadow.js.map