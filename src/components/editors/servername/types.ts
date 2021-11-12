import { SubmitHandler } from "react-hook-form";

import { strServerName } from "_/components/editors/servername/structs";

// struct

export type StrServerName = ReturnType<typeof strServerName>;
export type StrServerNameForm = Omit<StrServerName, "buffer">;
export type StrServerNamePartialForm = Partial<StrServerNameForm>;

// form

export type FormOnSubmit = SubmitHandler<StrServerNamePartialForm>;
