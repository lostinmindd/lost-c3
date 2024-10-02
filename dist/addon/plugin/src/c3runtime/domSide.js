"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
{
    const Config = {};
    const HANDLER_CLASS = class ExampleDOMHandler extends globalThis.DOMHandler {
        constructor(iRuntime) {
            super(iRuntime, Config.AddonId);
            this.AddRuntimeMessageHandlers([]);
        }
    };
    globalThis.RuntimeInterface.AddDOMHandlerClass(HANDLER_CLASS);
}
