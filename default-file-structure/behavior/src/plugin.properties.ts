import { IntegerProperty, PluginProperty } from "lost-c3-lib"; 

const PluginProperties: PluginProperty[] = [
    new IntegerProperty({
        Id: 'lostPluginProperty',
        Name: 'Lost Plugin Property',
        Description: 'This is my first integer plugin property...',
        InitialValue: 0
    })
]

export { PluginProperties };