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

## Creating category

To create category you should create new  __`CategoryName.ts`__ file in _`src/categories`_ folder.
Then you can use code snippet __`!CC`__ to create default Category structure or copy-paste below script.

```
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

```
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

deprecate//
# License

MIT