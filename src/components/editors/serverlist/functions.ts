export const encode = (buffer: Buffer, key: number[]) => {
  const keyLength = key.length;
  for (let i = 0; i < 10; ++i) {
    for (let j = 0; j < 11; ++j) {
      for (let k = 64 - keyLength; k < 64; ++k) {
        buffer[704 * i + 64 * j + k] += key[63 - k];
      }
    }
  }
  return buffer;
};

export const decode = (buffer: Buffer, key: number[]) => {
  const keyLength = key.length;
  for (let i = 0; i < 10; ++i) {
    for (let j = 0; j < 11; ++j) {
      for (let k = 64 - keyLength; k < 64; ++k) {
        buffer[704 * i + 64 * j + k] -= key[63 - k];
      }
    }
  }
  return buffer;
};
