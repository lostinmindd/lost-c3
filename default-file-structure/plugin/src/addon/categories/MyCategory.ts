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
    doAction(this: Instance) {  };


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
    onDone(this: Instance) {  };


    /**
     * Expressions
     */
    @Expression({
        Id: `IsDone`,
        Name: `IsDone`,
        DisplayText: `IsDone`,
        Description: `Is something done`,
        ReturnType: 'string'
    })
    IsDone(this: Instance) { };

}
const Category = new MyCategory();
export { Category };