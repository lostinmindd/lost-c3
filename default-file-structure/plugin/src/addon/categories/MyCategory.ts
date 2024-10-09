import { LostCategory, Action, Condition, Expression } from 'lost-c3-lib';
import type { Instance } from '@Instance';

class MyCategory extends LostCategory {

    constructor() {
        super({Id: 'myCategory', Name: 'My Category', Deprecated: false, InDevelopment: false});
    };

    /**
     * Actions
     */
    @Action({
        Id: `doAction`,
        Name: `Do action`,
        DisplayText: `Do action`,
        Description: `Do something...`,
    })
    doAction(this: Instance) { console.log('Do something') };


    /**
     * Conditions
     */
    @Condition({
        Id: `onDone`,
        Name: `On done`,
        DisplayText: `On done`,
        Description: `On something done...`,
        IsTrigger: true
    })
    onDone(this: Instance) { return true };


    /**
     * Expressions
     */
    @Expression({
        Id: `IsDone`,
        Name: `IsDone`,
        Description: `Is something done`,
        ReturnType: 'string'
    })
    IsDone(this: Instance) { return 'string'};

}
const Category = new MyCategory();
export { Category };