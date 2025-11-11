import type { Store } from "@/store";
import type { AppControlTree } from "@/types/base";
import React from "react";

export const ControlsContext =
    React.createContext<Store<AppControlTree> | null>(null);
