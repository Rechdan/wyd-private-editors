export type FormUploadState = "none" | "success" | "error";

export type FormOnUpload = (buffer: Buffer) => FormUploadState;
