"use strict";
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
export {};
