import { deepMerge } from '@blackbyte/sugar/object';
import { saveSugarcssJson } from './saveSugarcssJson.js';
import sugarcssJson from './sugarcssJson.js';
export default function (props) {
    deepMerge([sugarcssJson, props], {
        clone: false,
    });
    saveSugarcssJson();
}
//# sourceMappingURL=setSugarcssJson.js.map