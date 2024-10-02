"use strict";
import { Config } from "@Config";

{

	const HANDLER_CLASS = class ExampleDOMHandler extends globalThis.DOMHandler
	{
		constructor(iRuntime: IRuntimeInterface)
		{
			super(iRuntime, Config.AddonId);
			

			this.AddRuntimeMessageHandlers([
				["get-something", () => this.GetSomething()]
            ]);
		}

        GetSomething() {
            return {
                data: "something..."
            };
        }
	};

	globalThis.RuntimeInterface.AddDOMHandlerClass(HANDLER_CLASS);
}