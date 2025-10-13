import { ensureDirSync } from '@blackbyte/sugar/fs';
import { nodeModulesDir } from '@blackbyte/sugar/package';
import fs from 'fs';
import { env } from '../sugarcss.js';
import { TSugarCssEnv } from '../sugarcss.types.js';

let saveTimeout: any = null;

export function savePersistentEnv(): void {
  clearTimeout(saveTimeout);

  const sugarCssPersistentDir = `${nodeModulesDir()}/.sugarcss`;
  const envPersistentFilePath = `${sugarCssPersistentDir}/env.json`;
  ensureDirSync(sugarCssPersistentDir);

  saveTimeout = setTimeout(() => {
    const finalEnv: Partial<TSugarCssEnv> = {};

    for (let [key, value] of Object.entries(env)) {
      if (env.persistentEnvs.includes(key)) {
        finalEnv[key] = value;
      }
    }

    if (!Object.keys(finalEnv).length) {
      // nothing to save
      return;
    }

    fs.writeFileSync(
      envPersistentFilePath,
      JSON.stringify(finalEnv, null, 2),
      'utf-8',
    );
  }, 1000);
}
