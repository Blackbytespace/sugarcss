// @ts-nocheck

import { isPlainObject } from '@blackbyte/sugar/is';
import { parse } from '@blackbyte/sugar/string';

export default function parsedArgsToRawValues(args: any): any {
  const rawValues: any = {};

  for (let [key, value] of Object.entries(args)) {
    if (isPlainObject(value)) {
      if (value.rawValue !== undefined) {
        rawValues[key] = parse(value.rawValue);
        delete value.rawValue;
        if (isPlainObject(rawValues[key])) {
          rawValues[key] = parsedArgsToRawValues(rawValues[key]);
        }
      } else {
        rawValues[key] = parsedArgsToRawValues(value);
      }
    }
  }

  return rawValues;
}
