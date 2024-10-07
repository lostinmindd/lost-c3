import { Config } from "@Config";

const C3 = globalThis.C3;

class LostInstance extends globalThis.ISDKBehaviorInstanceBase<IWorldInstance> {
	/**
	 * Ready to use in this._trigger(this.PluginConditions.{functionName})
	 */
	readonly PluginConditions = C3.Plugins[Config.AddonId].Cnds;

	constructor() {
		super();
		
		const properties = this._getInitProperties();
		if (properties) {

		}

		// Opt-in to getting calls to _tick()
		//this._setTicking(true);

	}
	
	_release() {
		super._release();
	}

	/*
	_tick()
	{
		const dt = this.instance.dt;
		
		// ... code to run every tick for this behavior ...
	}
	*/
	
};

C3.Plugins[Config.AddonId].Instance = LostInstance;
export type { LostInstance as Instance };