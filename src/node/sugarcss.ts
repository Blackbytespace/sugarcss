import { parseHtml } from '@blackbyte/sugar/console';
import browserslist from 'browserslist';
import {
  TransformOptions,
  browserslistToTargets,
  composeVisitors,
  transform,
} from 'lightningcss';
import { TSugarCssEnv, TSugarCssSettings } from './sugarcss.types.js';
import { collectSettingsCss } from './utils/collectSettingsCss.js';
import { saveSugarcssJson } from './utils/sugarcssJson.js';
import colorDeclaration from './visitors/declarations/color.js';
import containerDeclaration from './visitors/declarations/container.js';
import delayDeclaration from './visitors/declarations/delay.js';
import easeDeclaration from './visitors/declarations/ease.js';
import focusDeclaration from './visitors/declarations/focus.js';
import fontDeclaration from './visitors/declarations/font.js';
import fontFamilyDeclaration from './visitors/declarations/fontFamily.js';
import gridDeclaration from './visitors/declarations/grid.js';
import mediaDeclaration from './visitors/declarations/media.js';
import radiusDeclaration from './visitors/declarations/radius.js';
import responsiveBreakpointsDeclaration from './visitors/declarations/responsiveBreakpoints.js';
import settingDeclaration from './visitors/declarations/setting.js';
import shadeDeclaration from './visitors/declarations/shade.js';
import shadowDeclaration from './visitors/declarations/shadow.js';
import sizeDeclaration from './visitors/declarations/size.js';
import sizesDeclaration from './visitors/declarations/sizes.js';
import spaceDeclaration from './visitors/declarations/space.js';
import spacesDeclaration from './visitors/declarations/spaces.js';
import transitionDeclaration from './visitors/declarations/transition.js';
import typoDeclaration from './visitors/declarations/typo.js';
import colorFunction from './visitors/functions/color.js';
import containerFunction from './visitors/functions/container.js';
import delayFunction from './visitors/functions/delay.js';
import easeFunction from './visitors/functions/ease.js';
import fontFunction from './visitors/functions/font.js';
import fontFamilyFunction from './visitors/functions/fontFamily.js';
import radiusFunction from './visitors/functions/radius.js';
import remFunction from './visitors/functions/rem.js';
import responsive from './visitors/functions/responsive.js';
import scalableFunction from './visitors/functions/scalable.js';
import shadowFunction from './visitors/functions/shadow.js';
import sizeFunction from './visitors/functions/size.js';
import spaceFunction from './visitors/functions/space.js';
import transitionFunction from './visitors/functions/transition.js';
import weight from './visitors/functions/weight.js';
import zindexFunction from './visitors/functions/zindex.js';
import containerRule from './visitors/rules/container.js';
import fitRule from './visitors/rules/fit.js';
import focusRule from './visitors/rules/focus.js';
import fontRule from './visitors/rules/font.js';
import gridRule from './visitors/rules/grid.js';
import mapColorRule from './visitors/rules/mapColor.js';
import mediaRule from './visitors/rules/media.js';
import radiusRule from './visitors/rules/radius.js';
import scaleRule from './visitors/rules/scale.js';
import scrollbarRule from './visitors/rules/scrollbar.js';
import shadowRule from './visitors/rules/shadow.js';
import tooltipRule from './visitors/rules/tooltip.js';
import transitionRule from './visitors/rules/transition.js';
import typoRule from './visitors/rules/typo.js';
import visuallyHiddenRule from './visitors/rules/visuallyHidden.js';
import weightRule from './visitors/rules/weight.js';
import zindexRule from './visitors/rules/zindex.js';

// `env` starts from its literal defaults. Build-time state (medias, grids,
// responsives, settings) is populated deterministically by the declarations
// pre-pass in `sugarize()` before any component css is compiled — see
// `collectSettingsCss` — so no disk cache is needed.
export const env: TSugarCssEnv = {
  functions: {},
  rules: {},
  easingFunctions: {
    linear: '1',
    inSin: '1 - cos((t * pi) / 2)',
    outSin: 'sin((t * pi) / 2)',
    inOutSin: '((cos(pi * t) - 1) / 2) * -1',
    inQuad: 't * t',
    outQuad: 't * (2 - t)',
    inCubic: '1 - pow(1 - t, 3)',
    outCubic: '4 * t * t * t',
    inQuart: 'pow(t, 4)',
    outQuart: '1 - pow(1 - t, 4)',
    inQuint: 'pow(t, 5)',
    outQuint: '1 - pow(1 - t, 5)',
    inExpo: 'pow(2, 10 * (t - 1))',
    outExpo: '1 - pow(2, -10 * t)',
  },
  medias: {},
  responsives: {
    breakpoints: {
      min: 768,
      max: 1200,
      unit: 'px',
    },
  },
  grids: {},
  spaces: {
    easing: 'linear',
    min: 0,
    max: 100,
  },
  sizes: {
    easing: 'linear',
    min: 0,
    max: 100,
  },
  shadows: {},
  settings: {
    remFactor: 0.0625,
    verbose: false,
    mobileFirst: false,
    scalable: ['padding'],
    pxToRem: true,
    opacityZeroValue: 0.0001,
    sugarcssJsonPath: undefined,
  },
};

const nativeConsoleLog = console.log;
console.log = (...args): void => {
  args.forEach((arg) => {
    if (typeof arg === 'string') {
      arg = parseHtml(arg);
    }
    nativeConsoleLog(arg);
  });
};

/**
 * Recursively drop keys whose value is `null`.
 * When we replay AST that lightningcss itself produced (e.g. a captured @mixin
 * body), lightningcss cannot re-deserialize optional fields that carry an
 * explicit `null` (e.g. `block: null` on an UnknownAtRule, `from: null` on a
 * DashedIdentReference/Specifier) and throws "failed to deserialize; expected
 * ... found ()". An omitted key and a `null` key are semantically identical for
 * these optional fields (both -> None), so stripping them is behavior-preserving.
 */
function stripNullFields<T>(node: T): T {
  if (Array.isArray(node)) {
    return node.map(stripNullFields) as unknown as T;
  }
  if (node && typeof node === 'object') {
    const out: any = {};
    for (const k of Object.keys(node)) {
      const v = (node as any)[k];
      if (v === null) continue;
      out[k] = stripNullFields(v);
    }
    return out;
  }
  return node;
}

/**
 * Recursively wrap every visitor callback so its return value is run through
 * `stripNullFields`. Visitors that re-emit AST originally parsed by lightningcss
 * (e.g. a declaration value containing `var(--x)`, or a replayed @mixin body)
 * carry explicit `null` on optional fields that lightningcss cannot round-trip.
 * Sanitizing every return value fixes this generically for all visitors.
 */
function wrapVisitorReturns(node: any): any {
  if (typeof node === 'function') {
    return (...args: any[]) => stripNullFields(node(...args));
  }
  if (node && typeof node === 'object') {
    const out: any = Array.isArray(node) ? [] : {};
    for (const k of Object.keys(node)) {
      out[k] = wrapVisitorReturns(node[k]);
    }
    return out;
  }
  return node;
}

// guard so the declarations pre-pass runs only once per process
let envPopulated = false;

export function sugarize(
  ligningcss?: TransformOptions<any>,
  settings?: Partial<TSugarCssSettings>,
): any {
  // pass 1: run the declaration visitors over the project settings css to
  // populate the env singleton (medias, grids, responsives, settings) BEFORE
  // any component css is compiled. This makes at-rules like `@media md` and
  // `s-responsive()` resolve regardless of the order lightningcss processes
  // files (it transforms each file independently and does not follow @import).
  // The declarations-only visitor carries no `customAtRules`, so `@include` /
  // `@mixin` / `@import` degrade to harmless pass-through instead of throwing.
  if (!envPopulated) {
    envPopulated = true;
    const declVisitor = composeVisitors([
      sugarcss(settings, { declarationsOnly: true }),
    ]);
    for (const css of collectSettingsCss()) {
      try {
        transform({
          filename: 'sugarcss-settings.css',
          code: new TextEncoder().encode(css),
          visitor: declVisitor,
        });
      } catch (e) {}
    }

    // the accumulator now holds the complete TSugarCssJson from every settings
    // declaration, so export it deterministically to
    // `node_modules/.sugarcss/sugarcss.json` (with color shades applied).
    saveSugarcssJson(settings);
  }

  // pass 2: the full visitor used to actually compile every css file.
  const visitor = [sugarcss(settings)];
  if (ligningcss?.visitor) {
    visitor.push(ligningcss.visitor);
  }

  return {
    customAtRules: {
      ...(ligningcss?.customAtRules ?? {}),
      mixin: {
        prelude: '<custom-ident>',
        body: 'style-block',
      },
      include: {
        prelude: '<custom-ident>',
      },
    },
    visitor: composeVisitors(visitor),
    targets:
      ligningcss?.targets ?? browserslistToTargets(browserslist('>= 0.25%')),
  };
}

export default function sugarcss(
  settings: Partial<TSugarCssSettings> = {},
  opts: { declarationsOnly?: boolean } = {},
): any {
  const finalSettings: TSugarCssSettings = {
    ...env.settings,
    ...settings,
  };
  env.settings = finalSettings;
  env.functions[`s-color`] = colorFunction;
  env.functions[`s-font-family`] = fontFamilyFunction;
  env.functions[`s-scalable`] = scalableFunction;
  env.functions[`s-size`] = sizeFunction;
  env.functions[`s-space`] = spaceFunction;
  env.functions[`s-font`] = fontFunction;
  env.functions[`s-transition`] = transitionFunction;
  env.functions[`s-radius`] = radiusFunction;
  env.functions['s-container'] = containerFunction;
  env.functions['s-ease'] = easeFunction;
  env.functions['s-rem'] = remFunction;
  env.functions['s-zindex'] = zindexFunction;
  env.functions['s-weight'] = weight;
  env.functions['s-shadow'] = shadowFunction;
  env.functions['s-delay'] = delayFunction;
  env.functions['s-responsive'] = responsive;

  env.rules['s-scrollbar'] = scrollbarRule;
  env.rules['s-transition'] = transitionRule;
  env.rules['s-radius'] = radiusRule;
  env.rules['s-font'] = fontRule;
  env.rules['s-typo'] = typoRule;
  env.rules['s-fit'] = fitRule;
  env.rules['s-focus'] = focusRule;
  env.rules['s-map-color'] = mapColorRule;
  env.rules['s-container'] = containerRule;
  env.rules['s-grid'] = gridRule;
  env.rules['s-scale'] = scaleRule;
  env.rules['s-zindex'] = zindexRule;
  env.rules['s-weight'] = weightRule;
  env.rules['s-tooltip'] = tooltipRule;
  env.rules['s-visually-hidden'] = visuallyHiddenRule;
  env.rules['s-shadow'] = shadowRule;
  let mixins = new Map();

  const visitors = {
    Length(length) {
      // auto convert to rem
      if (env.settings.pxToRem && length.unit === 'px') {
        return {
          unit: 'rem',
          value: length.value * env.settings.remFactor,
        };
      }
      return length;
    },

    Function: {
      [`s-color`](v) {
        return colorFunction(v, finalSettings);
      },
      [`s-scalable`](v) {
        return scalableFunction(v, finalSettings);
      },
      [`s-space`](v) {
        return spaceFunction(v, finalSettings);
      },
      [`s-size`](v) {
        return sizeFunction(v, finalSettings);
      },
      [`s-font-family`](v) {
        return fontFamilyFunction(v, finalSettings);
      },
      [`s-font`](v) {
        return fontFunction(v, finalSettings);
      },
      [`s-transition`](v) {
        return transitionFunction(v, finalSettings);
      },
      [`s-radius`](v) {
        return radiusFunction(v, finalSettings);
      },
      ['s-container'](v) {
        return containerFunction(v, finalSettings);
      },
      ['s-ease'](v) {
        return easeFunction(v, finalSettings);
      },
      ['s-rem'](v) {
        return remFunction(v, finalSettings);
      },
      ['s-zindex'](v) {
        return zindexFunction(v, finalSettings);
      },
      ['s-weight'](v) {
        return weight(v, finalSettings);
      },
      ['s-delay'](v) {
        return delayFunction(v, finalSettings);
      },
      ['s-responsive'](v) {
        return responsive(v, finalSettings);
      },
      ['s-shadow'](v) {
        return shadowFunction(v, finalSettings);
      },
    },
    Declaration: {
      opacity(decl) {
        if (decl.value === 0 && finalSettings.opacityZeroValue !== undefined) {
          decl.value = finalSettings.opacityZeroValue;
          return decl;
        }
        // return nothing when unchanged so lightningcss keeps its original node.
        // returning the passed-in `decl` would force a re-deserialization that
        // fails on values lightningcss parsed itself but cannot round-trip,
        // e.g. `opacity: var(--x)` whose dashed-ident carries `from: null`.
      },
      custom(v) {
        if (v.name === 'custom') {
          console.log(JSON.stringify(v, null, 4));
        }
        switch (true) {
          case v.name.startsWith(`--s-color-`) &&
            v.name.match(/\-(h|s|l|a|o)$/) === null:
            return colorDeclaration(v, finalSettings);
          case v.name.startsWith(`--s-focus-`):
            return focusDeclaration(v, finalSettings);
          case v.name.startsWith(`--s-shade-`):
            return shadeDeclaration(v, finalSettings);
          case v.name.startsWith(`--s-media-`):
            return mediaDeclaration(v, finalSettings);
          case v.name.startsWith(`--s-ease-`):
            return easeDeclaration(v, finalSettings);
          case v.name.startsWith(`--s-space-`):
            return spaceDeclaration(v, finalSettings);
          case v.name === '--s-spaces':
            return spacesDeclaration(v, finalSettings);
          case v.name.startsWith('--s-size-'):
            return sizeDeclaration(v, finalSettings);
          case v.name === '--s-sizes':
            return sizesDeclaration(v, finalSettings);
          case v.name.startsWith(`--s-setting-`):
            return settingDeclaration(v, finalSettings);
          case v.name.startsWith(`--s-typo-`):
            return typoDeclaration(v, finalSettings);
          case v.name.startsWith(`--s-font-`) &&
            !v.name.startsWith(`--s-font-family-`):
            return fontDeclaration(v, finalSettings);
          case v.name.startsWith(`--s-font-family-`):
            return fontFamilyDeclaration(v, finalSettings);
          case v.name.startsWith(`--s-transition-`):
            return transitionDeclaration(v, finalSettings);
          case v.name.startsWith(`--s-radius-`):
            return radiusDeclaration(v, finalSettings);
          case v.name.startsWith(`--s-container-`):
            return containerDeclaration(v, finalSettings);
          case v.name.startsWith(`--s-grid-`):
            return gridDeclaration(v, finalSettings);
          case v.name.startsWith(`--s-shadow-`):
            return shadowDeclaration(v, finalSettings);
          case v.name.startsWith(`--s-delay-`):
            return delayDeclaration(v, finalSettings);
          case v.name.startsWith(`--s-responsive-breakpoints`):
            return responsiveBreakpointsDeclaration(v, finalSettings);
        }
      },
    },
    Rule: {
      unknown(rule) {
        try {
          switch (true) {
            case rule.name === `s-scrollbar`:
              return scrollbarRule(rule, finalSettings);
            case rule.name === `s-transition`:
              return transitionRule(rule, finalSettings);
            case rule.name === `s-radius`:
              return radiusRule(rule, finalSettings);
            case rule.name === `s-typo`:
              return typoRule(rule, finalSettings);
            case rule.name === `s-font`:
              return fontRule(rule, finalSettings);
            case rule.name === `s-fit`:
              return fitRule(rule, finalSettings);
            case rule.name === 's-focus':
              return focusRule(rule, finalSettings);
            case rule.name === `s-container`:
              return containerRule(rule, finalSettings);
            case rule.name === 's-map-color':
              return mapColorRule(rule, finalSettings);
            case rule.name === `s-grid`:
              return gridRule(rule, finalSettings);
            case rule.name === 's-scale':
              return scaleRule(rule, finalSettings);
            case rule.name === 's-zindex':
              return zindexRule(rule, finalSettings);
            case rule.name === 's-weight':
              return weightRule(rule, finalSettings);
            case rule.name === 's-tooltip':
              return tooltipRule(rule, finalSettings);
            case rule.name === 's-visually-hidden':
              return visuallyHiddenRule(rule, finalSettings);
            case rule.name === 's-shadow':
              return shadowRule(rule, finalSettings);
          }
        } catch (e) {
          console.error(e);
        }
      },
      custom: {
        mixin(rule) {
          if (rule.prelude.value === 'log') {
            console.log(JSON.stringify(rule, null, 2));
          }
          mixins.set(rule.prelude.value, rule.body.value);
          return [];
        },
        include(rule) {
          let ast = mixins.get(rule.prelude.value),
            newAst: any[] = [];

          if (!ast) {
            throw new Error(`Mixin ${rule.prelude.value} not found`);
          }

          // apply
          ast.forEach((rule) => {
            if (rule.type === 'unknown' && env.rules[rule.value?.name]) {
              const newRuleAst = env.rules[rule.value.name](rule.value);
              newAst = [...newAst, ...newRuleAst];
            } else {
              newAst.push(rule);
            }
          });
          return newAst;
        },
      },
      media(rule) {
        return mediaRule(rule, finalSettings);
      },
    },
  };

  // declarations-only mode (pass 1): expose only the Declaration dispatch so
  // the settings css can be replayed purely to populate the env singleton,
  // without functions/rules/mixins firing.
  if (opts.declarationsOnly) {
    return wrapVisitorReturns({ Declaration: visitors.Declaration });
  }

  return wrapVisitorReturns(visitors);
}
