const saveFile = (fileName: string, buffer: Buffer) => {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([buffer], { type: "application/octet-stream" }));
  link.download = fileName;
  link.click();
  link.remove();
};

export default saveFile;
