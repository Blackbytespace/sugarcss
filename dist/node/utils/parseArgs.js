import { set } from '@blackbyte/sugar/object';
import { env } from '../sugarcss.js';
import toString from './toString.js';
import __parsedArgsToRawValues from './parsedArgsToRawValues.js';
export default function parseArgs(args, schema = [], settings) {
    var _a;
    const finalSettings = Object.assign({ separator: ['comma'], resolve: true, debug: false }, (settings !== null && settings !== void 0 ? settings : {}));
    if (!finalSettings.separator.length) {
        finalSettings.separator = ['comma'];
    }
    const separators = Array.isArray(finalSettings.separator)
        ? finalSettings.separator
        : [finalSettings.separator];
    const resultArgs = {};
    let dashedArg;
    let argId = 0, currentProp = (_a = schema === null || schema === void 0 ? void 0 : schema[argId]) !== null && _a !== void 0 ? _a : `arg${argId}`;
    // track consecutive separators so that a sequence like `, ` (a comma token
    // followed by a white-space token, both declared as separators) only advances
    // to the next argument once instead of skipping a slot.
    let lastWasSeparator = false;
    const handleArg = (arg) => {
        var _a, _b, _c;
        if (finalSettings.debug) {
            console.log('arg:', arg);
        }
        // some tokens to avoid
        const avoid = [
            'parenthesis-block',
            'close-parenthesis',
            'comment',
            'colon',
            'semicolon',
        ];
        if (!separators.includes('white-space')) {
            avoid.push('white-space');
        }
        if (avoid.includes(arg.value.type)) {
            return;
        }
        if (separators.includes(arg.value.type)) {
            if (finalSettings.debug) {
                console.log('separator');
            }
            if (!lastWasSeparator) {
                argId++;
                currentProp = (_a = schema === null || schema === void 0 ? void 0 : schema[argId]) !== null && _a !== void 0 ? _a : `arg${argId}`;
            }
            lastWasSeparator = true;
            return;
        }
        lastWasSeparator = false;
        if (arg.type === 'dashed-ident') {
            // flag that we are in a dashed ident
            if (!dashedArg) {
                dashedArg = currentProp;
            }
            // handle dashed ident like (--darken 10) etc...
            if (resultArgs[dashedArg] === undefined) {
                resultArgs[dashedArg] = {};
            }
            currentProp = `${dashedArg}.${arg.value.replace(/-{1,2}/g, '')}`;
            if (finalSettings.debug) {
                console.log('dashed', currentProp);
            }
        }
        else if (arg.type === 'function' && arg.value.name === 'cubic-bezier') {
            arg.rawValue = toString(arg);
            set(resultArgs, currentProp, arg);
        }
        else if (arg.type === 'function' && env.functions[arg.value.name]) {
            const v = env.functions[arg.value.name](arg.value);
            if (finalSettings.debug) {
                console.log('function', currentProp, v);
            }
            // get the raw value
            arg.rawValue = (_b = v.raw) !== null && _b !== void 0 ? _b : v;
            // set the resulting value
            set(resultArgs, currentProp, arg);
            // a function like `s-size(p)` is self-delimiting (it ends with `)`), so it
            // already advances to the next argument. mark it as a separator so the
            // white-space token lightningcss emits right after it is collapsed instead
            // of advancing a second time and skipping a slot.
            currentProp = (_c = schema === null || schema === void 0 ? void 0 : schema[argId + 1]) !== null && _c !== void 0 ? _c : `arg${argId + 1}`;
            argId++;
            lastWasSeparator = true;
        }
        else {
            if (finalSettings.debug) {
                console.log('h', currentProp, arg);
            }
            // get the raw value
            arg.rawValue = arg.value.value;
            // handle others
            set(resultArgs, currentProp, arg);
        }
    };
    for (let [i, arg] of args.entries()) {
        handleArg(arg);
    }
    const values = __parsedArgsToRawValues(resultArgs);
    return {
        ast: resultArgs,
        values,
    };
}
//# sourceMappingURL=parseArgs.js.map