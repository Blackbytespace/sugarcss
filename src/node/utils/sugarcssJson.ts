import { applyModifiers } from '@blackbyte/sugar/color';
import { ensureDirSync } from '@blackbyte/sugar/fs';
import { deepMerge } from '@blackbyte/sugar/object';
import fs from 'fs';
import path from 'path';
import { TSugarCssJson, TSugarCssSettings } from '../sugarcss.types.js';

const _sugarcssJson: Partial<TSugarCssJson> = {};

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

export function saveSugarcssJson(settings?: Partial<TSugarCssSettings>): void {
  if (!Object.keys(_sugarcssJson).length || !settings?.sugarcssJsonPath) {
    // nothing to save
    return;
  }
  const dirPath = path.dirname(settings.sugarcssJsonPath);

  ensureDirSync(dirPath);

  applyColorShades();

  fs.writeFileSync(
    settings.sugarcssJsonPath,
    JSON.stringify(_sugarcssJson, null, 2),
    'utf-8',
  );
}

export default _sugarcssJson;
