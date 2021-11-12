export type FormUploadState = "none" | "success" | "error";

export type FormOnUpload = (buffer: Buffer) => FormUploadState;

export type UseUploadMessagesResponse = {
  upload: string;
  success?: string;
  error?: string;
};

export type UseUploadResponse = {
  event: FormOnUpload;
  messages?: UseUploadMessagesResponse;
};

export type UseUpload = (onUpload: FormOnUpload, messages: UseUploadMessagesResponse) => UseUploadResponse;
