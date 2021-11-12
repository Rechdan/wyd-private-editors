import { SubmitHandler } from "react-hook-form";

import { strServerListBr, strServerListGlobal } from "_/components/editors/serverlist/structs";

// struct

export type StrServerListGlobal = ReturnType<typeof strServerListGlobal>;
export type StrServerListGlobalForm = Omit<StrServerListGlobal, "buffer">;

export type StrServerListBr = ReturnType<typeof strServerListBr>;
export type StrServerListBrForm = Omit<StrServerListBr, "buffer">;

export type StrServerListAny = StrServerListGlobal & StrServerListBr;
export type StrServerListAnyForm = StrServerListGlobalForm & StrServerListBrForm;
export type StrServerListAnyPartialForm = Partial<StrServerListAnyForm>;

// versions

export type VersionGlobal = "global";
export type VersionBr = "br";

export type Versions = VersionGlobal | VersionBr;

// struct helper

export type StructGlobal = Record<VersionGlobal, (buffer?: Buffer) => StrServerListGlobal>;
export type StructBr = Record<VersionBr, (buffer?: Buffer) => StrServerListBr>;
export type Struct = StructGlobal & StructBr;

export type StructsSize = Record<Versions, number>;

export type StructsKey = Record<Versions, number[]>;

export type StructEncDevGlobal = Record<VersionGlobal, (buffer: Buffer) => void>;
export type StructEncDevBr = Record<VersionBr, (buffer: Buffer) => void>;
export type StructsEncDev = StructEncDevGlobal & StructEncDevBr;

// form

export type FormDefaultGlobal = Record<VersionGlobal, (struct: StrServerListGlobal) => StrServerListGlobalForm>;
export type FormDefaultBr = Record<VersionBr, (struct: StrServerListBr) => StrServerListBrForm>;
export type FormDefault = FormDefaultGlobal & FormDefaultBr;

export type FormOnSubmit = SubmitHandler<Partial<StrServerListGlobalForm & StrServerListBrForm>>;
