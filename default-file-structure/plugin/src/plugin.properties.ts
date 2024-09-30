import { Lost, IntegerProperty} from "lost-c3-lib"; 

const PluginProperties: Lost.PluginProperty[] = [
    new IntegerProperty({
        Id: 'lostPluginProperty',
        Name: 'Lost Plugin Property',
        Description: 'This is my first  integer plugin property...',
        InitialValue: 0
    })
]

export { PluginProperties };