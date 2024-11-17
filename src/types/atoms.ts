import {atom, PrimitiveAtom} from "jotai/index";

export const gridVal: PrimitiveAtom<boolean>  = atom<boolean>(false);
export const searchTermAtom: PrimitiveAtom<string> = atom<string>("");
export const relevanceAtom: PrimitiveAtom<boolean> = atom<boolean>(false);
export const dateAtom: PrimitiveAtom<boolean> = atom<boolean>(false);