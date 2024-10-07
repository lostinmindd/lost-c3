import type { BehaviorConfig } from "lost-c3-lib";
import type { SDKInstanceClass } from "./instance.ts";

const C3 = globalThis.C3;

const Config = {} as BehaviorConfig;

C3.Behaviors[Config.AddonId].Acts = {};
