import newStruct from "typed-buffer-struct";

export const strServerName = newStruct()
  /* 0 a 98   = 99 */ .array("name", 11, (b) => b.string(9))
  /* 99 a 142 = 44 */ .array("sort", 11, (b) => b.uint())
  .build();
