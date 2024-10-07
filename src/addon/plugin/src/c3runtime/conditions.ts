import type { PluginConfig } from "lost-c3-lib";
import type { SDKInstanceClass } from "./instance.ts";

const C3 = globalThis.C3;

const Config = {} as PluginConfig;

C3.Plugins[Config.AddonId].Cnds = {};
