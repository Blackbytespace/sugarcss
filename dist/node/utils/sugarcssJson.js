import { applyModifiers } from '@blackbyte/sugar/color';
import { ensureDirSync } from '@blackbyte/sugar/fs';
import { deepMerge } from '@blackbyte/sugar/object';
import { nodeModulesDir } from '@blackbyte/sugar/package';
import fs from 'fs';
const sugarcssJson = {};
let saveTimeout = null;
export function resetSugarcssJson() {
    for (let [key, value] of Object.entries(sugarcssJson)) {
        delete sugarcssJson[key];
    }
}
export function getSugarcssJson() {
    const sugarCssPersistentDir = `${nodeModulesDir({
        checkExistence: false,
    })}/.sugarcss`;
    const sugarcssPersistentFilePath = `${sugarCssPersistentDir}/sugarcss.json`;
    if (!fs.existsSync(sugarcssPersistentFilePath)) {
        return sugarcssJson;
    }
    const json = JSON.parse(fs.readFileSync(sugarcssPersistentFilePath, 'utf-8'));
    return json;
}
export function setSugarcssJson(props) {
    deepMerge([sugarcssJson, props], {
        clone: false,
    });
}
export function applyColorShades() {
    if (!sugarcssJson.colors ||
        !Object.keys(sugarcssJson.colors).length ||
        !sugarcssJson.shades ||
        !Object.keys(sugarcssJson.shades).length) {
        return;
    }
    for (let [colorName, colorValue] of Object.entries(sugarcssJson.colors)) {
        if (!(colorValue === null || colorValue === void 0 ? void 0 : colorValue.shades)) {
            colorValue.shades = {};
        }
        for (let [shadeName, shadeModifiers] of Object.entries(sugarcssJson.shades)) {
            // save back the color with shade
            colorValue.shades[shadeName] = applyModifiers(colorValue.hsla.string, shadeModifiers);
        }
    }
}
export function saveSugarcssJson(timeout = 1000) {
    clearTimeout(saveTimeout);
    const sugarCssPersistentDir = `${nodeModulesDir({
        checkExistence: false,
    })}/.sugarcss`;
    const sugarcssPersistentFilePath = `${sugarCssPersistentDir}/sugarcss.json`;
    ensureDirSync(sugarCssPersistentDir);
    saveTimeout = setTimeout(() => {
        if (!Object.keys(sugarcssJson).length) {
            // nothing to save
            return;
        }
        applyColorShades();
        fs.writeFileSync(sugarcssPersistentFilePath, JSON.stringify(sugarcssJson, null, 2), 'utf-8');
    }, timeout);
}
export default sugarcssJson;
//# sourceMappingURL=sugarcssJson.js.map