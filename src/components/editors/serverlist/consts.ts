import { clone } from "lodash";

import CONFIG from "_/config";

import { decode, encode } from "_/components/editors/serverlist/functions";
import { strServerListBr, strServerListGlobal } from "_/components/editors/serverlist/structs";
import { FormDefault, Struct, StructsEncDev, StructsKey, StructsSize } from "_/components/editors/serverlist/types";

// struct

export const STRUCT: Struct = {
  global: (buffer) => strServerListGlobal(buffer),
  br: (buffer) => strServerListBr(buffer),
};

export const STRUCTS_SIZE: StructsSize = {
  global: strServerListGlobal.size,
  br: strServerListBr.size,
};

export const STRUCTS_KEY: StructsKey = {
  global: CONFIG.keys.serverlist.global,
  br: CONFIG.keys.serverlist.br,
};

export const STRUCTS_ENCODE: StructsEncDev = {
  global: (buffer) => encode(buffer.slice(4), STRUCTS_KEY["global"]),
  br: (buffer) => encode(buffer, STRUCTS_KEY["br"]),
};

export const STRUCTS_DECODE: StructsEncDev = {
  global: (buffer) => decode(buffer.slice(4), STRUCTS_KEY["global"]),
  br: (buffer) => decode(buffer, STRUCTS_KEY["br"]),
};

// form

export const FORM_DEFAULTS: FormDefault = {
  global: ({ key, server }) => clone({ key, server }),
  br: ({ server }) => clone({ server }),
};
