/* eslint-disable no-undef */
const todo=require("../todo");

const {all,markAsComplete,add,overdue,dueToday,dueLater} = todo();

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

    test("Should retrieve overdue items", () => {
    add({ title: "Overdue task", dueDate: "2025-05-19", completed: false });
    const overdueItems = overdue();
    expect(overdueItems.length).toBeGreaterThan(0);
  });

  test("Should retrieve due today items", () => {
    const today = new Date().toISOString().split("T")[0];
    add({ title: "Today task", dueDate: today, completed: false });
    const dueTodayItems = dueToday();
    expect(dueTodayItems.some(todo => todo.dueDate === today)).toBe(true);
  });

  test("Should retrieve due later items", () => {
    add({ title: "Future task", dueDate: "2099-12-31", completed: false });
    const dueLaterItems = dueLater();
    expect(dueLaterItems.length).toBeGreaterThan(0);
  });
    
    
}
)