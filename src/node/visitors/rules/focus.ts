import { TSugarCssSettings } from '../../sugarcss.types.js';
import parseArgs from '../../utils/parseArgs.js';

/**
 * @name            s-focus
 * @namespace       css.rule
 * @type            AtRule
 * @platform        css
 * @status          stable
 *
 * This simply
 *
 * @param      {String}        name              The font name you want to apply
 * @return     {Css}                              The generated css
 *
 * @snippet       @s-font($1);
 *
 * @example         css
 * :root {
 *    --s-font-title: VT323 600 normal normal 0.1em;
 * }
 *
 * .my-element {
 *      @s-font(title);
 * }
 *
 * @since           0.0.1
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://hello@blackbyte.space)
 */

export default function font(v: any, settings: TSugarCssSettings): any {
  // parse args
  const args = {
    ...parseArgs(v.prelude, ['name']),
  };
  args.values = {
    name: 'default',
    ...args.values,
  };

  const ast = [
    {
      type: 'style',
      value: {
        selectors: [
          [
            {
              type: 'nesting',
            },
            {
              type: 'pseudo-class',
              kind: 'focus-visible',
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
                  property: 'outline',
                },
                value: [
                  {
                    type: 'var',
                    value: {
                      name: {
                        ident: `--s-focus-${args.values.name}-size`,
                      },
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
                    type: 'var',
                    value: {
                      name: {
                        ident: `--s-focus-${args.values.name}-style`,
                      },
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
                    type: 'var',
                    value: {
                      name: {
                        ident: `--s-focus-${args.values.name}-color`,
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
          source_index: 0,
          line: 1,
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
              type: 'pseudo-class',
              kind: 'focus',
            },
            {
              type: 'pseudo-class',
              kind: 'not',
              selectors: [
                [
                  {
                    type: 'pseudo-class',
                    kind: 'focus-visible',
                  },
                ],
              ],
            },
          ],
        ],
        declarations: {
          importantDeclarations: [],
          declarations: [
            {
              property: 'outline',
              value: {
                width: {
                  type: 'medium',
                },
                style: {
                  type: 'line-style',
                  value: 'none',
                },
                color: {
                  type: 'currentcolor',
                },
              },
            },
          ],
        },
        rules: [],
        loc: {
          source_index: 0,
          line: 4,
          column: 3,
        },
      },
    },
  ];

  return ast;
}
