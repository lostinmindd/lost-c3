import type { Lost } from "lost-lib";
import type { SDKInstanceClass } from "./instance.ts";

const C3 = globalThis.C3;

const Config: Lost.Config = {} as Lost.Config;

C3.Plugins[Config.AddonId].Exps = {};
