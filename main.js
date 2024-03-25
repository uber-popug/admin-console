import van from './libs/van/van-1.5.0.debug.js'
import vanx from './libs/van/vanx-0.4.0.js'
import {nanoid} from "./libs/nanoid.js";

const {form, input, h1, h3, strong, button, span, div, pre} = van.tags

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}


class Popug {
  constructor(id, title, tasks, balance) {
    this.id = id
    this.title = title
    this.tasks = tasks
    this.balance = balance
  }
}

class Task {
  constructor(title, price, assignedTo) {
    this.title = title
    this.price = price
    this.assignedTo = assignedTo
  }
}


const balance = van.state(100)

const popugs = vanx.reactive({})
const addPopug = (title) => {
  popugs[title] = new Popug(nanoid(), title, [], 0)
}
addPopug("Pa")
addPopug("Pb")

const tasks = vanx.reactive([])
const addTask = (title) => {
  const length = Object.keys(popugs).length
  const index = randomInteger(0, length - 1)
  const rawPopugs = vanx.raw(popugs)
  const rawPopug = Object.values(rawPopugs)[index]
  const rawPopugTitle = rawPopug.title
  const popug = popugs[rawPopugTitle]
  console.info("add task", length, index, rawPopugs, rawPopug, rawPopugTitle, popugs, popug)

  const task = new Task(title, 20, rawPopug.id)
  tasks.push(task)
  popug.tasks.push(task)
}


const PopugRow = (popug) => {
  console.info("enter popug row", popug, popug.val)
  return div({class: "popug-row"},
    strong({class: "popug-title"}, popug.val.title),
    strong({class: "actual-task"}, popug.val.actualTask),
    strong({class: "tasks-amount"}, popug.val.amountTasks),
    strong({class: "balance"}, popug.val.balance + "$")
  )
}

const App = () => {  
  const taskInput = input({type: "text", placeholder: "Введите текст задачи"})
  
  const onSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const taskTitle = taskInput.value
    addTask(taskTitle)
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
    vanx.list(div, popugs, p => PopugRow(p)),
    div(
      form(
        {onsubmit: onSubmit},
        taskInput
      )
    ),
    button("ПЕРЕНАЗНАЧИТЬ")
  )
}

//van.add(document.body, App())


class State {
  constructor() {
    this.text = vanx.reactive({title:"VanJS"})
    this.length = vanx.calc(() => this.text.title.length)
  }
}

const st = new State()

const DerivedState = () => {
  // const text = vanx.reactive({title:"VanJS"})
  // const length = vanx.calc(() => text.title.length)
    
  return span(
    "The length of ",
    input({type: "text", value: st.text.title, oninput: e => st.text.title = e.target.value}),
    " is ", st.length, ".",
  )
}

van.add(document.body, DerivedState())
