import parseArgs from '../../utils/parseArgs.js';
/**
 * @name            s-focus
 * @namespace       css.declaration
 * @type            Declaration
 * @platform        css
 * @status          stable
 *
 * This allows you to register a focus style.
 * It can be used through the `@s-focus` at-rule that will apply the registered focus style to the current selector.
 *
 * @param      {Number}        size               The size of the focus in pixels
 * @param      {String}        style.             The style of the focus like "solid", "dashed", etc...
 * @param      {String}        color              The color value to apply
 *
 * @example         css
 * :root {
 *    --s-focus-default: 2px solid red;
 *    --s-focus-links: 3px dashed blue;
 * }
 *
 * .my-element {
 *   @s-focus(); /* apply the default focus style *\/
 *   @s-focus(links); /* apply the links focus style *\/
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@blackbyte.space)
 */
export default function color(v, settings) {
    const name = v.name.replace(`--s-focus-`, ''), args = parseArgs(v.value, ['size', 'style', 'color'], {
        separator: ['white-space', 'comma'],
    });
    const size = args.ast.size;
    const style = args.ast.style;
    const color = args.ast.color;
    const result = [
        {
            property: `--s-focus-${name}-size`,
            value: {
                name: `--s-focus-${name}-size`,
                value: [size],
            },
        },
        {
            property: `--s-focus-${name}-style`,
            value: {
                name: `--s-focus-${name}-style`,
                value: [style],
            },
        },
        {
            property: `--s-focus-${name}-color`,
            value: {
                name: `--s-focus-${name}-color`,
                value: [color],
            },
        },
    ];
    // @TODO      do not check for color name
    if (settings.verbose) {
        console.log(`Registered focus: <cyan>${name}</cyan>: <magenta>${size} ${style} ${color}</magenta>`);
    }
    return result;
}
//# sourceMappingURL=focus.js.map