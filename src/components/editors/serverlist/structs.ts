import newStruct from "typed-buffer-struct";

export const strServerListServer = newStruct()
  /* 0 a 63   = 64  */ .string("address", 64)
  /* 64 a 703 = 640 */ .array("ip", (b) => b.string(10, 64))
  .build();

export const strServerListGlobal = newStruct()
  /* 0 a 3    = 4    */ .uint("key")
  /* 4 a 7043 = 7040 */ .array("server", (b) => b.struct(10, strServerListServer))
  .build();

export const strServerListBr = newStruct()
  /* 0 a 7039 = 7040 */ .array("server", (b) => b.struct(10, strServerListServer))
  .build();

export const strServerName = newStruct()
  /* 0 a 98   = 99 */ .array("name", (b) => b.string(11, 9))
  /* 99 a 142 = 44 */ .array("sort", (b) => b.uint(11))
  .build();
