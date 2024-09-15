"use strict";
{
	const PLUGIN_ID = 'lost_';

	// This class handles messages from the runtime, which may be in a Web Worker.
	const HANDLER_CLASS = class ExampleDOMHandler extends globalThis.DOMHandler
	{
		constructor(iRuntime: IRuntimeInterface)
		{
			super(iRuntime, PLUGIN_ID);
			
			// This provides a table of message names to functions to call for those messages.
			this.AddRuntimeMessageHandlers([

			]);
		}
		
	};

	globalThis.RuntimeInterface.AddDOMHandlerClass(HANDLER_CLASS);
}