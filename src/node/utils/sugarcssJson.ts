import { applyModifiers } from '@blackbyte/sugar/color';
import { ensureDirSync } from '@blackbyte/sugar/fs';
import { deepMerge } from '@blackbyte/sugar/object';
import { nodeModulesDir } from '@blackbyte/sugar/package';
import fs from 'fs';
import { TSugarCssJson } from '../sugarcss.types.js';

const _sugarcssJson: Partial<TSugarCssJson> = {};

/**
 * Returns the content of the `node_modules/.sugarcss/sugarcss.json` file.
 * If the file does not exist, an empty object is returned.
 */
export function sugarcssJson(): Partial<TSugarCssJson> {
  const sugarCssPersistentDir = `${nodeModulesDir({
    checkExistence: false,
  })}/.sugarcss`;
  const sugarcssPersistentFilePath = `${sugarCssPersistentDir}/sugarcss.json`;
  if (!fs.existsSync(sugarcssPersistentFilePath)) {
    return {};
  }
  return JSON.parse(fs.readFileSync(sugarcssPersistentFilePath, 'utf-8'));
}

export function getSugarcssJson(): Partial<TSugarCssJson> {
  return sugarcssJson();
}

export function setSugarcssJson(props: Partial<TSugarCssJson>) {
  deepMerge([_sugarcssJson, props], {
    clone: false,
  });
}

export function applyColorShades(): void {
  if (
    !_sugarcssJson.colors ||
    !Object.keys(_sugarcssJson.colors).length ||
    !_sugarcssJson.shades ||
    !Object.keys(_sugarcssJson.shades).length
  ) {
    return;
  }

  for (let [colorName, colorValue] of Object.entries(_sugarcssJson.colors)) {
    if (!colorValue?.shades) {
      colorValue.shades = {};
    }
    for (let [shadeName, shadeModifiers] of Object.entries(
      _sugarcssJson.shades!,
    )) {
      // save back the color with shade
      colorValue.shades[shadeName] = applyModifiers(
        colorValue.hsla.string,
        shadeModifiers,
      );
    }
  }
}

export function saveSugarcssJson(): void {
  if (!Object.keys(_sugarcssJson).length) {
    // nothing to save
    return;
  }

  const sugarCssPersistentDir = `${nodeModulesDir({
    checkExistence: false,
  })}/.sugarcss`;
  const sugarcssPersistentFilePath = `${sugarCssPersistentDir}/sugarcss.json`;
  ensureDirSync(sugarCssPersistentDir);

  applyColorShades();

  fs.writeFileSync(
    sugarcssPersistentFilePath,
    JSON.stringify(_sugarcssJson, null, 2),
    'utf-8',
  );
}

export default _sugarcssJson;
