import van from './van/van-1.5.0.debug.js'

const {form, input, h1, h3, strong, button, span, div, pre} = van.tags

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}


class Task {
  constructor(title, popug, price) {
    this.title = title
    this.popug = popug
    this.price = price
  }
}

class Popug {
  constructor(title, tasks, balance) {
    this.title = title
    this.tasks = van.state(tasks)
    this.actualTask = van.derive(() => this.tasks.val[0] ?? {})
    this.balance = van.state(balance)
    van.derive(() => console.info(`Tasks: ${this.tasks.val}`))
    van.derive(() => console.info(`Actual task: ${this.actualTask.val}`))
  }
}


const PopugRow = (popug) => {
  return div({class: "popug-row"},
    strong({class: "popug-title"}, popug.title),
    strong({class: "actual-task"}, popug.actualTask.title),
    strong({class: "tasks-amount"}, popug.tasks.val.length),
    strong({class: "balance"}, popug.balance.val + "$")
  )
}


const balance = van.state(100)

const tasks = van.state([])
van.derive(() => console.log(`tasks changed: ${tasks}`))

const popugs = van.state([
  new Popug("1", [], 0),
  new Popug("2", [], 0),
])

const App = () => {
  const taskInput = input({type: "text", placeholder: "Введите текст задачи"})
  const onSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const taskTitle = taskInput.value
    const index = randomInteger(0, popugs.val.length - 1)
    const assignedPopug = popugs.val[index]
    const task = new Task(taskTitle, assignedPopug, 20)
    console.info("onsubmit", index, popugs.val, assignedPopug, task)
    assignedPopug.tasks.val.push(task)
    assignedPopug.balance.val -= task.price
    tasks.val = [...tasks.val, task]
    console.info("onsubmit", task, assignedPopug, tasks)
  }

  return div(
    h1("aTES"),
    h3(span("Баланс: ", balance)),
    div({class: "popug-row"},
      strong({class: "popug-title"}, "Попуг"),
      strong({class: "actual-task"}, "Текущая задача"),
      strong({class: "tasks-amount"}, "Всего задач"),
      strong({class: "balance"}, "Баланс")
    ),
    div(popugs.val.map(PopugRow)),
    div(
      form(
        {onsubmit: onSubmit},
        taskInput
      )
    ),
    button("ПЕРЕНАЗНАЧИТЬ")
  )
}

van.add(document.body, App())
