import { ComboParam, Deprecate, Lost } from "lost-lib";
import { StringParam } from "lost-lib"; 
import type { SDKInstanceClass } from "../addon/c3runtime/instance.ts";

const enum Actions {
    LOG_TO_CONSOLE = "log_to_console"
}
const enum Expressions {
    MESSAGE = "message"
}

export const Category: Lost.ICategory = {
    Id: 'main',
    Name: "Main",

    Actions: [
        {
            Id: Actions.LOG_TO_CONSOLE,
            Name: "Log to console",
            DisplayText: "Log to console message {0}",
            Options: {
                Script: LogToConsole,
                IsAsync: false,
                Highlight: false
            },
            Params: [
                new StringParam({
                    Id: "message",
                    Name: "Message",
                    Description: "Enter some message...",
                    InitialValue: "Message",
                    AutocompleteId: true
                })
            ]
        }
    ],
    Conditions: [],
    Expressions: [
        {
            Id: Expressions.MESSAGE,
            Name: 'Message',
            DisplayText: 'Message',
            Description: '',
            Options: {
                Script: GetMessage,
                ReturnType: 'string',
                Highlight: true,
                IsVariadicParameters: false
            },
            Params: [
                new StringParam({
                    Id: 'id',
                    Name: 'Name',
                    InitialValue: ''
                })
            ]
        }
    ]

}

function LogToConsole(this: SDKInstanceClass, message: string) {
}

function GetMessage() {
    return 'Message';
}