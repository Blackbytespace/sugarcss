import { ensureDirSync } from '@blackbyte/sugar/fs';
import { nodeModulesDir } from '@blackbyte/sugar/package';
import fs from 'fs';
// read the "envs" saved on disk to avoid issue with
// some lightningcss integrations that launch a complete
// new process of this and does not load the `sugarcss.css` file.
// this is only used to have persistent envs accross multiple
// executions of sugarcss (like medias and grids)
export function loadPersistentEnv() {
    const sugarCssPersistentDir = `${nodeModulesDir()}/.sugarcss`;
    const envPersistentFilePath = `${sugarCssPersistentDir}/env.json`;
    ensureDirSync(sugarCssPersistentDir);
    if (fs.existsSync(envPersistentFilePath)) {
        try {
            const persistentEnv = JSON.parse(fs.readFileSync(envPersistentFilePath, 'utf-8'));
            return persistentEnv;
        }
        catch (error) { }
    }
    return {};
}
//# sourceMappingURL=loadPersistentEnv.js.map