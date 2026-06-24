/**
 * @name            s-visually-hidden
 * @namespace       css.rule
 * @type            AtRule
 * @platform        css
 * @status          stable
 *
 * This rule allows you to hide an element visually while keeping it accessible to screen readers and assistive technologies.
 * It applies a set of CSS properties that effectively hide the element from view but still allow it to be read by screen readers.
 *
 * @return     {Css}                             The generated css
 *
 * @example         css
 * .my-element {
 *   @s-visually-hidden;
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@blackbyte.space)
 */
export default function zindex(v, settings) {
    return [
        {
            type: 'nested-declarations',
            value: {
                declarations: {
                    importantDeclarations: [],
                    declarations: [
                        {
                            property: 'custom',
                            value: {
                                name: 'clip',
                                value: [
                                    {
                                        type: 'function',
                                        value: {
                                            name: 'rect',
                                            arguments: [
                                                {
                                                    type: 'token',
                                                    value: {
                                                        type: 'number',
                                                        value: 0,
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
                                                        type: 'number',
                                                        value: 0,
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
                                                        type: 'number',
                                                        value: 0,
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
                                                        type: 'number',
                                                        value: 0,
                                                    },
                                                },
                                            ],
                                        },
                                    },
                                ],
                            },
                        },
                        {
                            property: 'clip-path',
                            vendorPrefix: [],
                            value: {
                                type: 'shape',
                                shape: {
                                    type: 'inset',
                                    value: {
                                        rect: [
                                            {
                                                type: 'percentage',
                                                value: 0.5,
                                            },
                                            {
                                                type: 'percentage',
                                                value: 0.5,
                                            },
                                            {
                                                type: 'percentage',
                                                value: 0.5,
                                            },
                                            {
                                                type: 'percentage',
                                                value: 0.5,
                                            },
                                        ],
                                        radius: {
                                            topLeft: [
                                                {
                                                    type: 'dimension',
                                                    value: {
                                                        unit: 'px',
                                                        value: 0,
                                                    },
                                                },
                                                {
                                                    type: 'dimension',
                                                    value: {
                                                        unit: 'px',
                                                        value: 0,
                                                    },
                                                },
                                            ],
                                            topRight: [
                                                {
                                                    type: 'dimension',
                                                    value: {
                                                        unit: 'px',
                                                        value: 0,
                                                    },
                                                },
                                                {
                                                    type: 'dimension',
                                                    value: {
                                                        unit: 'px',
                                                        value: 0,
                                                    },
                                                },
                                            ],
                                            bottomRight: [
                                                {
                                                    type: 'dimension',
                                                    value: {
                                                        unit: 'px',
                                                        value: 0,
                                                    },
                                                },
                                                {
                                                    type: 'dimension',
                                                    value: {
                                                        unit: 'px',
                                                        value: 0,
                                                    },
                                                },
                                            ],
                                            bottomLeft: [
                                                {
                                                    type: 'dimension',
                                                    value: {
                                                        unit: 'px',
                                                        value: 0,
                                                    },
                                                },
                                                {
                                                    type: 'dimension',
                                                    value: {
                                                        unit: 'px',
                                                        value: 0,
                                                    },
                                                },
                                            ],
                                        },
                                    },
                                },
                                referenceBox: 'border-box',
                            },
                        },
                        {
                            property: 'height',
                            value: {
                                type: 'length-percentage',
                                value: {
                                    type: 'dimension',
                                    value: {
                                        unit: 'px',
                                        value: 1,
                                    },
                                },
                            },
                        },
                        {
                            property: 'overflow',
                            value: {
                                x: 'hidden',
                                y: 'hidden',
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
                            property: 'width',
                            value: {
                                type: 'length-percentage',
                                value: {
                                    type: 'dimension',
                                    value: {
                                        unit: 'px',
                                        value: 1,
                                    },
                                },
                            },
                        },
                    ],
                },
                loc: {
                    source_index: 41,
                    line: 18,
                    column: 13,
                },
            },
        },
    ];
}
//# sourceMappingURL=visuallyHidden.js.map