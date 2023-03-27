import newStruct from "typed-buffer-struct";

export const strServerListServer = newStruct()
  /* 0 a 63   = 64  */ .string("address", 64)
  /* 64 a 703 = 640 */ .array("ip", 10, (b) => b.string(64))
  .build();

export const strServerListGlobal = newStruct()
  /* 0 a 3    = 4    */ .uint("key")
  /* 4 a 7043 = 7040 */ .array("server", 10, (b) => b.struct(strServerListServer))
  .build();

export const strServerListBr = newStruct()
  /* 0 a 7039 = 7040 */ .array("server", 10, (b) => b.struct(strServerListServer))
  .build();
