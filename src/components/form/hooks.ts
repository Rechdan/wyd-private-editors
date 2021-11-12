import { useMemo } from "react";

import { UseUpload, UseUploadResponse } from "_/components/form/types";

export const useUpload: UseUpload = (onUpload, messages) => useMemo<UseUploadResponse>(() => ({ event: onUpload, messages }), [messages, onUpload]);
