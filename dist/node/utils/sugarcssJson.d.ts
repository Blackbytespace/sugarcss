import { TSugarCssJson } from '../sugarcss.types.js';
declare const _sugarcssJson: Partial<TSugarCssJson>;
/**
 * Returns the content of the `node_modules/.sugarcss/sugarcss.json` file.
 * If the file does not exist, an empty object is returned.
 */
export declare function sugarcssJson(): Partial<TSugarCssJson>;
export declare function getSugarcssJson(): Partial<TSugarCssJson>;
export declare function setSugarcssJson(props: Partial<TSugarCssJson>): void;
export declare function applyColorShades(): void;
export declare function saveSugarcssJson(): void;
export default _sugarcssJson;
