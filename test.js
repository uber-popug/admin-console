import van from "./libs/van/van-1.5.0.debug.js";

const {button, div, input, sup} = van.tags

// Create a new state object with init value 1
const Content = ({counter}) => {
// Log whenever the value of the state is updated
  van.derive(() => console.log(`Counter: ${counter.value.val}`))

// Derived state
  const counterSquared = van.derive(() => counter.value.val * counter.value.val)

// Used as a child node
  const dom1 = div(counter.value)

// Used as a property
  const dom2 = input({type: "number", value: counter.value, disabled: true})

// Used in a state-derived property
  const dom3 = div({style: () => `font-size: ${counter.value.val}em;`}, "Text")

// Used in a state-derived child
  const dom4 = div(counter.value, sup(2), () => ` = ${counterSquared.value.val}`)

// Button to increment the value of the state

  return div(
    dom1, dom2, dom3, dom4
  )
}

const Actions = ({counter}) => {
  const inc = () => {
    console.info("counter inc")
    ++counter.value.val
  }

  const incrementBtn = button({onclick: inc}, "Increment")
  const resetBtn = button({onclick: () => counter.value.val = 1}, "Reset")

  return div(
    incrementBtn, resetBtn
  )
}


class Counter {
  constructor() {
    this.value = van.state(1)
  }
}

const App = () => {
  const counter = new Counter()
  return div(
    Content({counter}),
    Actions({counter})
  )
}

van.add(document.body, App())
