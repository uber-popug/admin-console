import van from './van/van-1.5.0.debug.js'

const {h1, h3, strong, button, span, div, pre} = van.tags


class Popug {
  constructor(title, tasks, balance) {
    this.title = title;
    this.tasks = van.state(tasks);
    this.balance = van.state(balance);
  }
}


const PopugRow = (popug) => {
  const actualTask = (popug.tasks[0] ?? {}).title
  return div({class: "popug-row"},
    strong(popug.title),
    strong({class: "actual-task"}, actualTask),
    strong(popug.tasks.val.length),
    strong(popug.balance.val + "$")
  )
}

const App = () => {
  const balance = van.state(100)
  
  const popugs = van.state([
    new Popug("1", [], 0),
    new Popug("2", [], 0),
  ])
  
  return div(
    h1("aTES"),
    h3(span("Balance: ", balance)),
    div({class: "popug-row"},
      strong("Попуг"),
      strong({class: "actual-task"}, "Текущая задача"),
      strong("Всего задач"),
      strong("Баланс")
    ),
    div(popugs.val.map(PopugRow)),
    span(
      //button({onclick: add}, "Add")
    )
  )
}

van.add(document.body, App())
