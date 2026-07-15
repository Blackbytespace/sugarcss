import { applyModifiers } from '@blackbyte/sugar/color';
import { ensureDirSync } from '@blackbyte/sugar/fs';
import { deepMerge } from '@blackbyte/sugar/object';
import fs from 'fs';
import path from 'path';
const _sugarcssJson = {};
export function setSugarcssJson(props) {
    deepMerge([_sugarcssJson, props], {
        clone: false,
    });
}
export function applyColorShades() {
    if (!_sugarcssJson.colors ||
        !Object.keys(_sugarcssJson.colors).length ||
        !_sugarcssJson.shades ||
        !Object.keys(_sugarcssJson.shades).length) {
        return;
    }
    for (let [colorName, colorValue] of Object.entries(_sugarcssJson.colors)) {
        if (!(colorValue === null || colorValue === void 0 ? void 0 : colorValue.shades)) {
            colorValue.shades = {};
        }
        for (let [shadeName, shadeModifiers] of Object.entries(_sugarcssJson.shades)) {
            // save back the color with shade
            colorValue.shades[shadeName] = applyModifiers(colorValue.hsla.string, shadeModifiers);
        }
    }
}
export function saveSugarcssJson(settings) {
    if (!Object.keys(_sugarcssJson).length || !(settings === null || settings === void 0 ? void 0 : settings.sugarcssJsonPath)) {
        // nothing to save
        return;
    }
    const dirPath = path.dirname(settings.sugarcssJsonPath);
    ensureDirSync(dirPath);
    applyColorShades();
    fs.writeFileSync(settings.sugarcssJsonPath, JSON.stringify(_sugarcssJson, null, 2), 'utf-8');
}
export default _sugarcssJson;
//# sourceMappingURL=sugarcssJson.js.map