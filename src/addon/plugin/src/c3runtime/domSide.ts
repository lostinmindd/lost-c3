"use strict";
import type { Lost } from "lost-c3-lib";

{
	const Config: Lost.Config = {} as Lost.Config;

	const HANDLER_CLASS = class ExampleDOMHandler extends globalThis.DOMHandler
	{
		constructor(iRuntime: IRuntimeInterface)
		{
			super(iRuntime, Config.AddonId);
			

			this.AddRuntimeMessageHandlers([]);
		}

	};

	globalThis.RuntimeInterface.AddDOMHandlerClass(HANDLER_CLASS);
}