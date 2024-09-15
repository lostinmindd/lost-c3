![alt text](https://github.com/lostinmindd/lost-c3/blob/main/lost-cover.jpg?raw=true)
<div align="center">
  <h3>
    Library for easy making Construct 3 Addons. <br />
  </h3>
</div>

Lost is a...

## Key features:

- Instant config creation
- Easy Actions, Conditions, Expressions defining
- Fast build and bundle addon into .c3addon file
- Real-time test addon in Construct 3 by server implementation feature


# 🚀 Quickstart

Install global lost-c3 library by using `npm i lost-c3 -g`

Create a bare-bones Lost Addon by using `lost-c3 create-addon --plugin`:
Now only `--plugin argument is only available to create plugin structure`
_Behaviors and other will be available in future._

```
npm i lost-c3 -g
lost-c3 create-addon --plugin
npm run build
```

# 🚀 Documentation

After using `lost-c3 create-addon --plugin` we get default file structure for creating addon.

## Addon File Structure

``` bash
├── build/                      # Final built folder (creates automatically after build)
├── node_modules/               # 'node_modules' folder
├── src/                        # Main addon folder
│   ├── addon/                  # Construct 3 Typescript based addon folder
│       ├── c3runtime/
│           ├── actions.ts      # NOTE! Changes will not applied!
│           ├── conditions.ts   # NOTE! Changes will not applied!
│           ├── domSide.ts
│           ├── expressions.ts  # NOTE! Changes will not applied!
│           ├── instance.ts
│           ├── plugin.ts
│           └── type.ts
│       ├── ts-defs/
│       ├── instance.ts
│       ├── plugin.ts
│       └── type.ts
│   ├── categories/             # Addon categories folder
│       └── Main.ts             # Main category file
│   ├── libs/                   # Addon libraries folder (only .js libraries, use .d.ts files)
│   ├── icon.svg                # Addon icon file (only image/svg format!)
│   ├── lost.config.ts          # Lost addon config file
│   └── plugin.properties.ts    # Plugin properties file
├── package.json                # 'package.json' file
├── tsconfig.json               # 'tsconfig.json' file
```

## Config Setup

Let's setup _`lost.config.ts`_ file at first.

```typescript
import { Lost } from "lost-lib";

export const LostConfig: Lost.IConfig = {
    RemoveExportInJSFiles: true, // Set to true to remove error after building project

    AddonId: "addon_id",
    Type: "plugin", // Addon type: plugin, behavior
    Category: "general",
    IsSingleGlobal: true,
    AddonName: "Addon for Construct 3", // Shows in addon install dialog
    AddonDescription: "Addon description...", // Shows in addon install dialog
    Version: "1.0.0.0",
    Author: "YourName",
    WebsiteURL: "https://addon.com",
    DocsURL: "https://docs.addon.com",
    ObjectName: "MyLostPlugin", // Applying when creates an plugin object
    Scripts: [] // Add your scripts/libraries here 
}
```
Check more info about using scripts OR libraries in your addon:
_[Using custom libraries/scripts](#-using-custom-libraries/scripts)_

## Using custom libraries/scripts

It's available to use custom scripts or libraries in your addon.

- Add any library file (_`library.js`)_ into _`src/libs/`_ folder.

> [!IMPORTANT]
> You should update _`lost.config.ts`_ file and add your script here.

Example 

```typescript
import { Lost } from "lost-lib";

export const LostConfig: Lost.IConfig = {
    RemoveExportInJSFiles: true,

    AddonId: "addon_id",
    Type: "plugin",
    Category: "general",
    IsSingleGlobal: true,
    AddonName: "Addon for Construct 3",
    AddonDescription: "Addon description...",
    Version: "1.0.0.0",
    Author: "lostinmind",
    WebsiteURL: "https://addon.com",
    DocsURL: "https://docs.addon.com",
    ObjectName: "MyLostPlugin",
    Scripts: [
        {FileName: 'lib.js', Type: 'external-runtime-script'}
    ]
}
```

In that case we added new object in _`Scripts`_ property. That object has some own properties:

```typescript
- FileName: string // Use only file name. Example: lib.js
- Type: "external-runtime-script" | "copy-to-output" | "inline-script" | "external-dom-script"
```

> [!NOTE]
> Useful information for choosing _`Type`_ property value:
> https://www.construct.net/en/make-games/manuals/addon-sdk/reference/specifying-dependencies#internalH1Link0

> [!TIP]
> It's recommended to use _`.d.ts`_ files to easy code writing.
> You can also move them into _`src/libs/`_ folder.

> [!WARNING]
> If you passed adding script into _`lost.config.ts`_ file. The script will be automatically added with __Type: _"external-dom-script"___

> [!WARNING]
> Use only .js libraries.

## Creating category

To create category you should create new  __`CategoryName.ts`__ file in _`src/categories`_ folder.
Then you can use code snippet __`!CC`__ to create default Category structure or copy-paste below script.

```typescript
import { Lost, Deprecate } from 'lost-lib';
import type { SDKInstanceClass } from '../addon/c3runtime/instance.ts';

// Use enums to define Actions, Conditions OR Expressions Ids
const enum Actions {}
const enum Conditions {}
const enum Expressions {}

// To mark any Action, Condition OR Expression as Deprecated
// You can choose one of available options
// - Wrap the entire Action, Condition, Expression in the Deprecate() function
// - In Action, Condition, Expression 'Options' property you can set IsDeprecated: true

export const Category: Lost.ICategory = {
    Id: 'main',
    Name: 'Main',

    Actions: [],
    Conditions: [],
    Expressions: [],
}
```

> [!TIP]
> Use enums to define _Actions_, _Conditions_, _Expressions_ Ids.
> It will help you to easy track your code and save it clear.

> [!CAUTION]
> DO NOT CHANGE __`Category`__ VARIABLE NAME!'

### Create action

To create actions for your addon you should use _`Actions[]`_ property in __`Category`__ variable.

Example

```typescript
import { Lost, StringParam } from 'lost-lib';

const enum Actions {
    LOG_TO_CONSOLE = "log_to_console"
}

export const Category: Lost.ICategory = {
    Id: 'main',
    Name: 'Main',
    Actions: [
        {
            Id: Actions.LOG_TO_CONSOLE,
            /**
             * The name that appears in the action picker dialog
             */
            Name: 'Log to console',
            /**
             * The text that appears in the event sheet. 
             * You can use simple BBCode tags like [b] and [i], and use {0}, {1} etc. as parameter placeholders. 
             * (There must be one parameter placeholder per parameter.) 
             */
            DisplayText: 'Log {0} to console',
            /**
             * A description of the action or condition, which appears as a tip at the top of the condition/action picker dialog.
             */
            Description: 'Action description',
            Options: {
                /**
                 * Set to true to highlight the ACE in the condition/action/*expression picker dialogs. This should only be used for the most regularly used ACEs, to help users pick them out from the list easily.
                 */
                Highlight: true,
                IsAsync: false,
                /**
                 * Function that will be called
                 */
                Script: LogToConsole
            },
            /**
             * Use Params property if you need to assign action parameters
             */
            Params: [
                new StringParam({
                    Id: 'message',
                    Name: 'Message',
                    Description: 'Enter your message...',
                    InitialValue: '"Some message"'
                })
            ]
        }
    ]
}

function LogToConsole(message: string) {
    console.log(message);
}
```

> [!TIP]
> It's recommended to create functions outside _Action.Options_
> It will help you to easy track your code and save it clear.

> [!WARNING]
> It's important to use {0}, {1} as parameter placeholders inside _DisplayText_ property if you have any parameters inside your function (excluding _this_ parameter as _SDKInstanceClass_ Type)

### Create condition

To create conditions for your addon you should use _`Conditions[]`_ property in __`Category`__ variable.

Example

```typescript
import { Lost, ComboParam } from 'lost-lib';

const enum Conditions {
    ON_EVENT = 'on_event'
}

export const Category: Lost.ICategory = {
    Id: 'main',
    Name: 'Main',
    Conditions: [
        {
            Id: Conditions.ON_EVENT,
            Name: 'On event',
            DisplayText: 'On event {0}',
            Options: {
                Highlight: true,
                IsTrigger: true,
                IsCompatibleWithTriggers: false,
                IsFakeTrigger: false,
                IsInvertible: false,
                IsLooping: false,
                IsStatic: false,
                Script: OnEvent
            },
            Params: [
                new ComboParam({
                    Id: 'events',
                    Name: 'Event',
                    Items: [
                        {Id: 'open', Name: 'Open'},
                        {Id: 'close', Name: 'Close'}
                    ],
                    /**
                     * Use any item id to use as iniial value
                     * If passed, library will automatically set initial value to the first item
                     */
                    InitialValue: 'open'
                })
            ]
        }
    ]
}

function OnEvent(eventIndex: number) {
    /**
     * When it's a ComboParam, in function you get item index
     */
    switch(eventIndex) {
        case 0:
            // 'open' event
            break;
        case 1:
            // 'close' event
            break;
    }
}
```

> [!TIP]
> It's recommended to create functions outside _Conditions.Options_
> It will help you to easy track your code and save it clear.

> [!WARNING]
> It's important to use {0}, {1} as parameter placeholders inside _DisplayText_ property if you have any parameters inside your function (excluding _this_ parameter as _SDKInstanceClass_ Type)

### Create expression

To create expressions for your addon you should use _`Expressions[]`_ property in __`Category`__ variable.

Example

```typescript
import { Lost, StringParam, NumberParam, AnyParam } from 'lost-lib';

export const Category: Lost.ICategory = {
    Id: 'main',
    Name: 'Main',
    Expressions: [
        {
            Id: Expressions.GET_VALUE,
            /**
             * Name will not be used, but required
             */
            Name: 'GetValue',
            DisplayText: 'GetValue',
            Options: {
                ReturnType: 'string',
                /**
                 * If true, Construct 3 will allow the user to enter any number of parameters beyond those defined. 
                 * In other words the parameters (if any) listed in "params" are required, but this flag enables adding further "any" type parameters beyond the end.
                 */
                IsVariadicParameters: false,
                Script: GetValue
            }
        }
    ]
}

function GetValue() {
    return 'some value';
}
```

> [!TIP]
> It's recommended to create functions outside _Expressions.Options_
> It will help you to easy track your code and save it clear.

> [!TIP]
> It's recommended to name _DisplayText_ property without spaces
> Because if you name _DisplayText_ with spaces it will not correctly display expression after user close expressions window.

> [!CAUTION]
> Lost library isn't checking parameters that you use in Expressions at that moment. But you must use only __StringParam__ OR __NumberParam__ OR __AnyParam__

### Deprecating _Actions_, _Conditions_, _Expressions_

> [!CAUTION]
> Do not delete any actions, conditions, expressions from your category file.
> Because it can break projects that are using your addon inside.
>
> Read more info: https://www.construct.net/en/make-games/manuals/addon-sdk/guide/defining-aces#internalH1Link0

How to mark any Action, Condition OR Expression as deprecated?
You can use one of available ways:

- Wrap the entire Action, Condition, Expression in the Deprecate() function

Example
 ```typescript
import { Lost, Deprecate } from 'lost-lib';
import type { SDKInstanceClass } from '../addon/c3runtime/instance.ts';

// Use enums to define Actions, Conditions OR Expressions Ids
const enum Actions {
    LOG_TO_CONSOLE = "log_to_console"
}

export const Category: Lost.ICategory = {
    Id: 'main',
    Name: 'Main',
    Actions: [
        Deprecate({
            Id: Actions.LOG_TO_CONSOLE,

            Name: 'Log to console',
            DisplayText: 'Log {0} to console',
            Description: 'Action description',
            Options: {
                Highlight: true,
                IsAsync: false,
                Script: LogToConsole
            },
            Params: [
                new StringParam({
                    Id: 'message',
                    Name: 'Message',
                    Description: 'Enter your message...',
                    InitialValue: '"Some message"'
                })
            ]
        })
    ]
}

function LogToConsole(message: string) {
    console.log(message);
}
```

- In Action, Condition, Expression 'Options' property you can set IsDeprecated: true

Example
 ```typescript
import { Lost, Deprecate } from 'lost-lib';
import type { SDKInstanceClass } from '../addon/c3runtime/instance.ts';

// Use enums to define Actions, Conditions OR Expressions Ids
const enum Actions {
    LOG_TO_CONSOLE = "log_to_console"
}

export const Category: Lost.ICategory = {
    Id: 'main',
    Name: 'Main',
    Actions: [
        {
            Id: Actions.LOG_TO_CONSOLE,

            Name: 'Log to console',
            DisplayText: 'Log {0} to console',
            Description: 'Action description',
            Options: {
                IsDeprecated: true,
                Highlight: true,
                IsAsync: false,
                Script: LogToConsole
            },
            Params: [
                new StringParam({
                    Id: 'message',
                    Name: 'Message',
                    Description: 'Enter your message...',
                    InitialValue: '"Some message"'
                })
            ]
        }
    ]
}

function LogToConsole(message: string) {
    console.log(message);
}
```

## Using Instance and DOM Calls

Also you have an ability to use instance AND domSide scripts classes to implement your custom logic to addon.
Main instance class is available at path _`src/addon/c3runtime/instance.ts`_.
Main domSide class is available at path _`src/addon/c3runtime/domSide.ts`_

> [!IMPORTANT]
> To use domSide scripts read some more info from official Construct Addon SDK Docs
>
> DOM Calls Docs: https://www.construct.net/en/make-games/manuals/addon-sdk/guide/runtime-scripts/sdk-v2#internalH1Link0
>
> DOM Class Docs: https://www.construct.net/en/make-games/manuals/addon-sdk/runtime-reference/base-classes/domelementhandler

> [!NOTE]
> Example of using instance inside function
>
>_instance.ts_
> ```typescript
>const C3 = globalThis.C3;
>
>const PLUGIN_ID = 'addon_id'
>
>class LInstance extends globalThis.ISDKInstanceBase {
>	myVar: string = '';
>	readonly PluginConditions = C3.Plugins[PLUGIN_ID].Cnds;
>
>	constructor() {
>		super({ domComponentId: PLUGIN_ID });
>
>		const properties = this._getInitProperties();
>		if (properties) {
>
>		}
>		// Post to the DOM
>		// this.runtime.addLoadPromise(
>		// 	this._postToDOMAsync("").then(data_ => {
>		// 		const data = data_ as JSONObject;
>		// 	})
>		// );
>	}
>	
>	_release() {
>		super._release();
>	}
>	
>};
>
>C3.Plugins[PLUGIN_ID].Instance = LInstance;
>
>export type { LInstance as SDKInstanceClass };
> ```
>
>_Category.ts_
> ```typescript
> function MyScript(this: SDKInstanceClass) {
>     console.log(this.myVar);
> }
> ```

#

# License

MIT