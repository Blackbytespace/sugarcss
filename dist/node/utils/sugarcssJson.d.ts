import { TSugarCssJson } from '../sugarcss.types.js';
declare const sugarcssJson: Partial<TSugarCssJson>;
export declare function resetSugarcssJson(): void;
export declare function getSugarcssJson(): Partial<TSugarCssJson>;
export declare function setSugarcssJson(props: Partial<TSugarCssJson>): void;
export declare function applyColorShades(): void;
export declare function saveSugarcssJson(timeout?: number): void;
export default sugarcssJson;
