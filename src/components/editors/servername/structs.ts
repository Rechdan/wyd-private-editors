import newStruct from "typed-buffer-struct";

export const strServerName = newStruct()
  /* 0 a 98   = 99 */ .array("name", (b) => b.string(11, 9))
  /* 99 a 142 = 44 */ .array("sort", (b) => b.uint(11))
  .build();
