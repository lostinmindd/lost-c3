
type PlatformInfoExportType = "preview" | "html5" | "scirra-arcade" | "cordova-android" | "cordova-ios" | "nwjs" | "windows-webview2" | "macos-wkwebview" | "xbox-uwp-webview2" | "instant-games" | "playable-ad";
type PlatformInfoOSType = "windows" | "macos" | "linux" | "chrome-os" | "android" | "ios" | "unknown";
type PlatformInfoBrowserType = "chrome" | "chromium" | "edge" | "opera" | "nwjs" | "firefox" | "safari" | "unknown";
type PlatformInfoBrowserEngineType = "chromium" | "gecko" | "webkit";

/** Represents the Platform Info object.
 * @see {@link https://www.construct.net/make-games/manuals/construct-3/scripting/scripting-reference/plugin-interfaces/platform-info | IPlatformInfoObjectType documentation } */
declare class IPlatformInfoObjectType<InstType extends IInstance> extends IObjectType<InstType>
{
	readonly exportType: PlatformInfoExportType;
	readonly isMobile: boolean;
	readonly os: PlatformInfoOSType;
	readonly osVersion: string;
	readonly browser: PlatformInfoBrowserType;
	readonly browserVersion: string;
	readonly browserEngine: PlatformInfoBrowserEngineType;

	readonly renderer: string;
	readonly rendererDetail: string;

	readonly canvasCssWidth: number;
	readonly canvasCssHeight: number;
	readonly canvasDeviceWidth: number;
	readonly canvasDeviceHeight: number;
	readonly devicePixelRatio: number;
}
