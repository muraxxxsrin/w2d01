/* eslint-disable no-undef */
const todo=require("../todo");

const {all,markAsComplete,add} = todo();

describe("Todo test suite",()=>{
    test("Should add a todo",()=>{
        expect(all.length).toBe(0);
        add({title:"Test todo",dueDate:"2023-03-20",completed:false});
        expect(all.length).toBe(1); 
    })

    test("Should mark a todo as complete",()=>{
        expect(all[0].completed).toBe(false);
        markAsComplete(0);
        expect(all[0].completed).toBe(true);
    })
    
}
)