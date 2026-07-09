import parseArgs from '../../utils/parseArgs.js';
/**
 * @name            s-shadow
 * @namespace       css.rule
 * @type            AtRule
 * @platform        css
 * @status          stable
 *
 * This declaration allows you to apply a registered shadow easily.
 * To be able to use this, you need to register at least 1 shadow like in the example below:
 *
 * @param      {String}        name              The transition name you want to apply
 * @return     {Css}                             The generated css
 *
 * @snippet       @s-shadow($1);
 *
 * @example         css
 * :root {
 *    --s-shadow-default: 0 2px 4px rgba(0, 0, 0, 0.1);
 *    --s-shadow-special: 0 4px 8px rgba(0, 0, 0, 0.2);
 * }
 *
 * .my-element {
 *      @s-shadow();
 * }
 *
 * .my-other-element {
 *     @s-shadow(special);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@blackbyte.space)
 */
export default function shadow(v, settings) {
    // parse args
    const args = Object.assign({}, parseArgs(v.prelude, ['name']));
    args.values = Object.assign({ name: 'default' }, args.values);
    const ast = [
        {
            type: 'style',
            value: {
                selectors: [
                    [
                        {
                            type: 'nesting',
                        },
                    ],
                ],
                declarations: {
                    importantDeclarations: [],
                    declarations: [
                        {
                            property: 'unparsed',
                            value: {
                                propertyId: {
                                    property: `box-shadow`,
                                    vendor_prefix: [],
                                },
                                value: [
                                    {
                                        type: 'var',
                                        value: {
                                            name: {
                                                ident: `--s-shadow-${args.values.name}`,
                                            },
                                        },
                                    },
                                ],
                            },
                        },
                    ],
                },
                rules: [],
                loc: {
                    source_index: 4,
                    line: 0,
                    column: 19,
                },
            },
        },
    ];
    return ast;
}
//# sourceMappingURL=shadow.js.map