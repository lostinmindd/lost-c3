import { Lost, Action } from "lost-lib"; 
import type { Instance } from "@Instance";

class MyCategory extends Lost.Category {
    
    constructor() { super('myCategoryId', 'Category Name') };

    @Action({Id: '', Name: '', DisplayText: ''})
    myAction(this: Instance) {

        console.log('This is my first lost action');

    }

}

const Category = new MyCategory();
export { Category };