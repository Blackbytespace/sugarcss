import parseArgs from '../../utils/parseArgs.js';
/**
 * @name            s-tooltip
 * @namespace       css.rule
 * @type            AtRule
 * @platform        css
 * @status          stable
 *
 * This rule allows you to make the element a tooltip easily.
 *
 * @param       {Number}        [size=10]                                   The size of the tooltip arrow
 * @param       {Number}        [offset=0]                                  The offset of the tooltip from its target
 * @param       {String}.       [color=current]                             The color of the tooltip arrow
 *
 * @return      {Css}                                                       The generated css
 *
 * @snippet       @s-tooltip($1, $2, $3);
 *
 * @example         css
 * .my-tooltip {
 *     @s-tooltip(20px, blue);
 *     @s-tooltip(10px, s-color(accent));
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@blackbyte.space)
 */
export default function tooltip(v, settings) {
    // parse args
    const args = Object.assign({}, parseArgs(v.prelude, ['size', 'offset', 'color']));
    args.values = Object.assign({ size: 10, color: 'current', offset: 0 }, args.values);
    return [
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
                            property: 'custom',
                            value: {
                                name: '--s-tooltip-arrow-size',
                                value: [
                                    {
                                        type: 'length',
                                        value: {
                                            unit: 'px',
                                            value: args.values.size,
                                        },
                                    },
                                ],
                            },
                        },
                        {
                            property: 'custom',
                            value: {
                                name: '--s-tooltip-offset',
                                value: [
                                    {
                                        type: 'length',
                                        value: {
                                            unit: 'px',
                                            value: args.values.offset,
                                        },
                                    },
                                ],
                            },
                        },
                        {
                            property: 'custom',
                            value: {
                                name: '--s-tooltip-background',
                                value: [
                                    {
                                        type: 'function',
                                        value: {
                                            name: 's-color',
                                            arguments: [
                                                {
                                                    type: 'token',
                                                    value: {
                                                        type: 'ident',
                                                        value: args.values.color,
                                                    },
                                                },
                                            ],
                                        },
                                    },
                                ],
                            },
                        },
                        {
                            property: 'custom',
                            value: {
                                name: '--s-tooltip-color',
                                value: [
                                    {
                                        type: 'function',
                                        value: {
                                            name: 's-color',
                                            arguments: [
                                                {
                                                    type: 'token',
                                                    value: {
                                                        type: 'ident',
                                                        value: 'current',
                                                    },
                                                },
                                                {
                                                    type: 'token',
                                                    value: {
                                                        type: 'comma',
                                                    },
                                                },
                                                {
                                                    type: 'token',
                                                    value: {
                                                        type: 'ident',
                                                        value: 'foreground',
                                                    },
                                                },
                                            ],
                                        },
                                    },
                                ],
                            },
                        },
                        {
                            property: 'position',
                            value: {
                                type: 'absolute',
                            },
                        },
                        {
                            property: 'white-space',
                            value: 'nowrap',
                        },
                        {
                            property: 'unparsed',
                            value: {
                                propertyId: {
                                    property: 'background',
                                },
                                value: [
                                    {
                                        type: 'var',
                                        value: {
                                            name: {
                                                ident: '--s-tooltip-background',
                                                from: null,
                                            },
                                            fallback: null,
                                        },
                                    },
                                ],
                            },
                        },
                        {
                            property: 'unparsed',
                            value: {
                                propertyId: {
                                    property: 'bottom',
                                },
                                value: [
                                    {
                                        type: 'function',
                                        value: {
                                            name: 'calc',
                                            arguments: [
                                                {
                                                    type: 'token',
                                                    value: {
                                                        type: 'percentage',
                                                        value: 1,
                                                    },
                                                },
                                                {
                                                    type: 'token',
                                                    value: {
                                                        type: 'delim',
                                                        value: '+',
                                                    },
                                                },
                                                {
                                                    type: 'var',
                                                    value: {
                                                        name: {
                                                            ident: '--s-tooltip-arrow-size',
                                                            from: null,
                                                        },
                                                        fallback: null,
                                                    },
                                                },
                                                {
                                                    type: 'token',
                                                    value: {
                                                        type: 'delim',
                                                        value: '+',
                                                    },
                                                },
                                                {
                                                    type: 'var',
                                                    value: {
                                                        name: {
                                                            ident: '--s-tooltip-offset',
                                                            from: null,
                                                        },
                                                        fallback: null,
                                                    },
                                                },
                                            ],
                                        },
                                    },
                                ],
                            },
                        },
                        {
                            property: 'left',
                            value: {
                                type: 'length-percentage',
                                value: {
                                    type: 'percentage',
                                    value: 0.5,
                                },
                            },
                        },
                        {
                            property: 'translate',
                            value: {
                                x: {
                                    type: 'percentage',
                                    value: -0.5,
                                },
                                y: {
                                    type: 'dimension',
                                    value: {
                                        unit: 'px',
                                        value: 0,
                                    },
                                },
                                z: {
                                    type: 'value',
                                    value: {
                                        unit: 'px',
                                        value: 0,
                                    },
                                },
                            },
                        },
                        {
                            property: 'transform-origin',
                            vendorPrefix: [],
                            value: {
                                x: {
                                    type: 'center',
                                },
                                y: {
                                    type: 'side',
                                    side: 'top',
                                    offset: null,
                                },
                            },
                        },
                        {
                            property: 'opacity',
                            value: 0,
                        },
                        {
                            property: 'custom',
                            value: {
                                name: 'pointer-events',
                                value: [
                                    {
                                        type: 'token',
                                        value: {
                                            type: 'ident',
                                            value: 'none',
                                        },
                                    },
                                ],
                            },
                        },
                    ],
                },
                rules: [],
                loc: {
                    source_index: 17,
                    line: 0,
                    column: 13,
                },
            },
        },
        {
            type: 'style',
            value: {
                selectors: [
                    [
                        {
                            type: 'pseudo-class',
                            kind: 'hover',
                        },
                        {
                            type: 'combinator',
                            value: 'child',
                        },
                        {
                            type: 'nesting',
                        },
                    ],
                ],
                declarations: {
                    importantDeclarations: [],
                    declarations: [
                        {
                            property: 'opacity',
                            value: 1,
                        },
                    ],
                },
                rules: [],
                loc: {
                    source_index: 17,
                    line: 9,
                    column: 3,
                },
            },
        },
        {
            type: 'style',
            value: {
                selectors: [
                    [
                        {
                            type: 'nesting',
                        },
                        {
                            type: 'pseudo-element',
                            kind: 'before',
                        },
                    ],
                ],
                declarations: {
                    importantDeclarations: [],
                    declarations: [
                        {
                            property: 'custom',
                            value: {
                                name: 'content',
                                value: [
                                    {
                                        type: 'token',
                                        value: {
                                            type: 'string',
                                            value: '',
                                        },
                                    },
                                ],
                            },
                        },
                        {
                            property: 'position',
                            value: {
                                type: 'absolute',
                            },
                        },
                        {
                            property: 'top',
                            value: {
                                type: 'length-percentage',
                                value: {
                                    type: 'percentage',
                                    value: 1,
                                },
                            },
                        },
                        {
                            property: 'left',
                            value: {
                                type: 'length-percentage',
                                value: {
                                    type: 'percentage',
                                    value: 0.5,
                                },
                            },
                        },
                        {
                            property: 'unparsed',
                            value: {
                                propertyId: {
                                    property: 'margin-left',
                                },
                                value: [
                                    {
                                        type: 'function',
                                        value: {
                                            name: 'calc',
                                            arguments: [
                                                {
                                                    type: 'var',
                                                    value: {
                                                        name: {
                                                            ident: '--s-tooltip-arrow-size',
                                                            from: null,
                                                        },
                                                        fallback: null,
                                                    },
                                                },
                                                {
                                                    type: 'token',
                                                    value: {
                                                        type: 'delim',
                                                        value: '*',
                                                    },
                                                },
                                                {
                                                    type: 'token',
                                                    value: {
                                                        type: 'number',
                                                        value: -1,
                                                    },
                                                },
                                            ],
                                        },
                                    },
                                ],
                            },
                        },
                        {
                            property: 'unparsed',
                            value: {
                                propertyId: {
                                    property: 'border-width',
                                },
                                value: [
                                    {
                                        type: 'var',
                                        value: {
                                            name: {
                                                ident: '--s-tooltip-arrow-size',
                                                from: null,
                                            },
                                            fallback: null,
                                        },
                                    },
                                ],
                            },
                        },
                        {
                            property: 'border-style',
                            value: {
                                top: 'solid',
                                right: 'solid',
                                bottom: 'solid',
                                left: 'solid',
                            },
                        },
                        {
                            property: 'unparsed',
                            value: {
                                propertyId: {
                                    property: 'border-color',
                                },
                                value: [
                                    {
                                        type: 'var',
                                        value: {
                                            name: {
                                                ident: '--s-tooltip-background',
                                                from: null,
                                            },
                                            fallback: null,
                                        },
                                    },
                                    {
                                        type: 'token',
                                        value: {
                                            type: 'ident',
                                            value: 'transparent',
                                        },
                                    },
                                    {
                                        type: 'token',
                                        value: {
                                            type: 'white-space',
                                            value: ' ',
                                        },
                                    },
                                    {
                                        type: 'token',
                                        value: {
                                            type: 'ident',
                                            value: 'transparent',
                                        },
                                    },
                                    {
                                        type: 'token',
                                        value: {
                                            type: 'white-space',
                                            value: ' ',
                                        },
                                    },
                                    {
                                        type: 'token',
                                        value: {
                                            type: 'ident',
                                            value: 'transparent',
                                        },
                                    },
                                ],
                            },
                        },
                    ],
                },
                rules: [],
                loc: {
                    source_index: 8,
                    line: 13,
                    column: 3,
                },
            },
        },
        {
            type: 'style',
            value: {
                selectors: [
                    [
                        {
                            type: 'nesting',
                        },
                        {
                            type: 'class',
                            name: '-justify-start',
                        },
                    ],
                ],
                declarations: {
                    importantDeclarations: [],
                    declarations: [
                        {
                            property: 'bottom',
                            value: {
                                type: 'auto',
                            },
                        },
                        {
                            property: 'top',
                            value: {
                                type: 'length-percentage',
                                value: {
                                    type: 'percentage',
                                    value: 0.5,
                                },
                            },
                        },
                        {
                            property: 'left',
                            value: {
                                type: 'auto',
                            },
                        },
                        {
                            property: 'unparsed',
                            value: {
                                propertyId: {
                                    property: 'right',
                                },
                                value: [
                                    {
                                        type: 'function',
                                        value: {
                                            name: 'calc',
                                            arguments: [
                                                {
                                                    type: 'token',
                                                    value: {
                                                        type: 'percentage',
                                                        value: 1,
                                                    },
                                                },
                                                {
                                                    type: 'token',
                                                    value: {
                                                        type: 'delim',
                                                        value: '+',
                                                    },
                                                },
                                                {
                                                    type: 'var',
                                                    value: {
                                                        name: {
                                                            ident: '--s-tooltip-arrow-size',
                                                            from: null,
                                                        },
                                                        fallback: null,
                                                    },
                                                },
                                                {
                                                    type: 'token',
                                                    value: {
                                                        type: 'delim',
                                                        value: '+',
                                                    },
                                                },
                                                {
                                                    type: 'var',
                                                    value: {
                                                        name: {
                                                            ident: '--s-tooltip-offset',
                                                            from: null,
                                                        },
                                                        fallback: null,
                                                    },
                                                },
                                            ],
                                        },
                                    },
                                ],
                            },
                        },
                        {
                            property: 'translate',
                            value: {
                                x: {
                                    type: 'dimension',
                                    value: {
                                        unit: 'px',
                                        value: 0,
                                    },
                                },
                                y: {
                                    type: 'percentage',
                                    value: -0.5,
                                },
                                z: {
                                    type: 'value',
                                    value: {
                                        unit: 'px',
                                        value: 0,
                                    },
                                },
                            },
                        },
                    ],
                },
                rules: [
                    {
                        type: 'style',
                        value: {
                            selectors: [
                                [
                                    {
                                        type: 'nesting',
                                    },
                                    {
                                        type: 'pseudo-element',
                                        kind: 'before',
                                    },
                                ],
                            ],
                            declarations: {
                                importantDeclarations: [],
                                declarations: [
                                    {
                                        property: 'top',
                                        value: {
                                            type: 'length-percentage',
                                            value: {
                                                type: 'percentage',
                                                value: 0.5,
                                            },
                                        },
                                    },
                                    {
                                        property: 'left',
                                        value: {
                                            type: 'length-percentage',
                                            value: {
                                                type: 'percentage',
                                                value: 1,
                                            },
                                        },
                                    },
                                    {
                                        property: 'rotate',
                                        value: {
                                            x: 0,
                                            y: 0,
                                            z: 1,
                                            angle: {
                                                type: 'deg',
                                                value: -90,
                                            },
                                        },
                                    },
                                    {
                                        property: 'unparsed',
                                        value: {
                                            propertyId: {
                                                property: 'translate',
                                            },
                                            value: [
                                                {
                                                    type: 'var',
                                                    value: {
                                                        name: {
                                                            ident: '--s-tooltip-arrow-size',
                                                            from: null,
                                                        },
                                                        fallback: null,
                                                    },
                                                },
                                                {
                                                    type: 'token',
                                                    value: {
                                                        type: 'percentage',
                                                        value: -0.5,
                                                    },
                                                },
                                            ],
                                        },
                                    },
                                ],
                            },
                            rules: [],
                            loc: {
                                source_index: 18,
                                line: 37,
                                column: 5,
                            },
                        },
                    },
                ],
                loc: {
                    source_index: 18,
                    line: 30,
                    column: 3,
                },
            },
        },
        {
            type: 'style',
            value: {
                selectors: [
                    [
                        {
                            type: 'nesting',
                        },
                        {
                            type: 'class',
                            name: '-justify-end',
                        },
                    ],
                ],
                declarations: {
                    importantDeclarations: [],
                    declarations: [
                        {
                            property: 'bottom',
                            value: {
                                type: 'auto',
                            },
                        },
                        {
                            property: 'top',
                            value: {
                                type: 'length-percentage',
                                value: {
                                    type: 'percentage',
                                    value: 0.5,
                                },
                            },
                        },
                        {
                            property: 'right',
                            value: {
                                type: 'auto',
                            },
                        },
                        {
                            property: 'unparsed',
                            value: {
                                propertyId: {
                                    property: 'left',
                                },
                                value: [
                                    {
                                        type: 'function',
                                        value: {
                                            name: 'calc',
                                            arguments: [
                                                {
                                                    type: 'token',
                                                    value: {
                                                        type: 'percentage',
                                                        value: 1,
                                                    },
                                                },
                                                {
                                                    type: 'token',
                                                    value: {
                                                        type: 'delim',
                                                        value: '+',
                                                    },
                                                },
                                                {
                                                    type: 'var',
                                                    value: {
                                                        name: {
                                                            ident: '--s-tooltip-arrow-size',
                                                            from: null,
                                                        },
                                                        fallback: null,
                                                    },
                                                },
                                                {
                                                    type: 'token',
                                                    value: {
                                                        type: 'delim',
                                                        value: '+',
                                                    },
                                                },
                                                {
                                                    type: 'var',
                                                    value: {
                                                        name: {
                                                            ident: '--s-tooltip-offset',
                                                            from: null,
                                                        },
                                                        fallback: null,
                                                    },
                                                },
                                            ],
                                        },
                                    },
                                ],
                            },
                        },
                        {
                            property: 'translate',
                            value: {
                                x: {
                                    type: 'dimension',
                                    value: {
                                        unit: 'px',
                                        value: 0,
                                    },
                                },
                                y: {
                                    type: 'percentage',
                                    value: -0.5,
                                },
                                z: {
                                    type: 'value',
                                    value: {
                                        unit: 'px',
                                        value: 0,
                                    },
                                },
                            },
                        },
                    ],
                },
                rules: [
                    {
                        type: 'style',
                        value: {
                            selectors: [
                                [
                                    {
                                        type: 'nesting',
                                    },
                                    {
                                        type: 'pseudo-element',
                                        kind: 'before',
                                    },
                                ],
                            ],
                            declarations: {
                                importantDeclarations: [],
                                declarations: [
                                    {
                                        property: 'top',
                                        value: {
                                            type: 'length-percentage',
                                            value: {
                                                type: 'percentage',
                                                value: 0.5,
                                            },
                                        },
                                    },
                                    {
                                        property: 'left',
                                        value: {
                                            type: 'auto',
                                        },
                                    },
                                    {
                                        property: 'right',
                                        value: {
                                            type: 'length-percentage',
                                            value: {
                                                type: 'percentage',
                                                value: 1,
                                            },
                                        },
                                    },
                                    {
                                        property: 'rotate',
                                        value: {
                                            x: 0,
                                            y: 0,
                                            z: 1,
                                            angle: {
                                                type: 'deg',
                                                value: 90,
                                            },
                                        },
                                    },
                                    {
                                        property: 'translate',
                                        value: {
                                            x: {
                                                type: 'dimension',
                                                value: {
                                                    unit: 'px',
                                                    value: 0,
                                                },
                                            },
                                            y: {
                                                type: 'percentage',
                                                value: -0.5,
                                            },
                                            z: {
                                                type: 'value',
                                                value: {
                                                    unit: 'px',
                                                    value: 0,
                                                },
                                            },
                                        },
                                    },
                                ],
                            },
                            rules: [],
                            loc: {
                                source_index: 18,
                                line: 51,
                                column: 5,
                            },
                        },
                    },
                ],
                loc: {
                    source_index: 18,
                    line: 44,
                    column: 3,
                },
            },
        },
        {
            type: 'style',
            value: {
                selectors: [
                    [
                        {
                            type: 'nesting',
                        },
                        {
                            type: 'class',
                            name: '-align-end',
                        },
                    ],
                ],
                declarations: {
                    importantDeclarations: [],
                    declarations: [
                        {
                            property: 'bottom',
                            value: {
                                type: 'auto',
                            },
                        },
                        {
                            property: 'unparsed',
                            value: {
                                propertyId: {
                                    property: 'top',
                                },
                                value: [
                                    {
                                        type: 'function',
                                        value: {
                                            name: 'calc',
                                            arguments: [
                                                {
                                                    type: 'token',
                                                    value: {
                                                        type: 'percentage',
                                                        value: 1,
                                                    },
                                                },
                                                {
                                                    type: 'token',
                                                    value: {
                                                        type: 'delim',
                                                        value: '+',
                                                    },
                                                },
                                                {
                                                    type: 'var',
                                                    value: {
                                                        name: {
                                                            ident: '--s-tooltip-arrow-size',
                                                            from: null,
                                                        },
                                                        fallback: null,
                                                    },
                                                },
                                                {
                                                    type: 'token',
                                                    value: {
                                                        type: 'delim',
                                                        value: '+',
                                                    },
                                                },
                                                {
                                                    type: 'var',
                                                    value: {
                                                        name: {
                                                            ident: '--s-tooltip-offset',
                                                            from: null,
                                                        },
                                                        fallback: null,
                                                    },
                                                },
                                            ],
                                        },
                                    },
                                ],
                            },
                        },
                    ],
                },
                rules: [
                    {
                        type: 'style',
                        value: {
                            selectors: [
                                [
                                    {
                                        type: 'nesting',
                                    },
                                    {
                                        type: 'pseudo-element',
                                        kind: 'before',
                                    },
                                ],
                            ],
                            declarations: {
                                importantDeclarations: [],
                                declarations: [
                                    {
                                        property: 'top',
                                        value: {
                                            type: 'auto',
                                        },
                                    },
                                    {
                                        property: 'bottom',
                                        value: {
                                            type: 'length-percentage',
                                            value: {
                                                type: 'percentage',
                                                value: 1,
                                            },
                                        },
                                    },
                                    {
                                        property: 'rotate',
                                        value: {
                                            x: 0,
                                            y: 0,
                                            z: 1,
                                            angle: {
                                                type: 'deg',
                                                value: 180,
                                            },
                                        },
                                    },
                                ],
                            },
                            rules: [],
                            loc: {
                                source_index: 18,
                                line: 65,
                                column: 5,
                            },
                        },
                    },
                ],
                loc: {
                    source_index: 18,
                    line: 61,
                    column: 3,
                },
            },
        },
    ];
}
//# sourceMappingURL=tooltip.js.map