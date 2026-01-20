import { createMemo, createSignal, render } from 'vanilla-jsx'
import './style.css'

// Get the app container
const app = document.getElementById('app')!

// --- Simple Components (SolidJS style) ---

// In SolidJS style, props should NOT be destructured to preserve reactivity
// Use props.value (as accessor) instead of destructuring { value }
interface DisplayCountProps {
  value: () => number // Accessor type - a function that returns the value
}

function DisplayCount(props: DisplayCountProps) {
  // Pass the accessor directly to JSX - it will be called reactively
  return (
    <p>
      Count:
      {props.value}
    </p>
  )
}

interface IncrementButtonProps {
  onClick: () => void
}

function IncrementButton(props: IncrementButtonProps) {
  // onClick (camelCase) - delegated event, case-insensitive
  return <button onClick={props.onClick}>Increment</button>
}

interface DecrementButtonProps {
  onClick: () => void
}

function DecrementButton(props: DecrementButtonProps) {
  // onclick (lowercase) - also works! SolidJS delegated events are case-insensitive
  return <button onclick={props.onClick}>Decrement</button>
}

// --- End Simple Components ---

// --- Main Counter Component (SolidJS style) ---
// Component runs ONCE, only the reactive parts update
function Counter() {
  const [count, setCount] = createSignal(0)

  // Derived/computed value using createMemo
  const doubled = createMemo(() => count() * 2)
  const isEven = createMemo(() => count() % 2 === 0)

  const increment = () => setCount((c: number) => c + 1)
  const decrement = () => setCount((c: number) => c - 1)
  const reset = () => setCount(0)

  // This JSX runs ONCE - only the {count}, {doubled}, etc. parts update reactively
  return (
    <div className="counter-app">
      <h1>Vanilla JSX Counter</h1>
      <p className="description">
        <small>SolidJS-style fine-grained reactivity - components run once, only DOM nodes update</small>
      </p>

      <div className="counter-display">
        {/* Pass accessor (the getter function itself) to child component */}
        <DisplayCount value={count} />
        <p>
          Doubled:
          {doubled}
        </p>
        <p>
          Is Even:
          {() => isEven() ? 'Yes' : 'No'}
        </p>
      </div>

      <div className="counter-controls">
        <DecrementButton onClick={decrement} />
        <button onClick={reset}>Reset</button>
        <IncrementButton onClick={increment} />
      </div>

      {/* Dynamic class example */}
      <p className={() => isEven() ? 'status even' : 'status odd'}>
        Status:
        {' '}
        {() => isEven() ? 'Even number' : 'Odd number'}
      </p>
    </div>
  )
}

// --- Input Example Component ---
function InputExample() {
  const [text, setText] = createSignal('')
  const charCount = createMemo(() => text().length)

  return (
    <div className="input-example">
      <h2>Reactive Input</h2>
      {/* onInput (delegated event) - for immediate feedback */}
      <input
        type="text"
        placeholder="Type something..."
        oninput={(e: Event) => setText((e.target as HTMLInputElement).value)}
      />
      <p>
        You typed:
        {text}
      </p>
      <p>
        Character count:
        {charCount}
      </p>
    </div>
  )
}

// --- Event Binding Example (SolidJS style) ---
function EventBindingExample() {
  // Handler that receives bound data as first argument
  const handleClick = (data: string, event: MouseEvent) => {
    console.log('Bound data:', data)
    console.log('Event:', event.type)
    alert(`Clicked with data: ${data}`)
  }

  return (
    <div className="event-binding-example">
      <h2>Event Binding</h2>
      <p><small>SolidJS-style bound events: [handler, data]</small></p>
      {/* Bound event syntax: onClick={[handler, data]} */}
      <button onClick={[handleClick, 'Hello from button 1!']}>Button 1</button>
      <button onclick={[handleClick, 'Hello from button 2!']}>Button 2</button>
    </div>
  )
}

// --- Native Event Example ---
function NativeEventExample() {
  const handleScroll = (e: Event) => {
    console.log('Scroll event (native):', (e.target as HTMLElement).scrollTop)
  }

  return (
    <div className="native-event-example">
      <h2>Native Events</h2>
      <p><small>Use on:eventname for native events (case-sensitive, direct binding)</small></p>
      {/* on:scroll - native event, not delegated */}
      <div
        on:scroll={handleScroll}
        style="height: 100px; overflow-y: auto; border: 1px solid #ccc; padding: 10px;"
      >
        <p>Scroll me!</p>
        <p>Line 2</p>
        <p>Line 3</p>
        <p>Line 4</p>
        <p>Line 5</p>
        <p>Line 6</p>
        <p>Line 7</p>
        <p>Line 8</p>
      </div>
    </div>
  )
}

// --- App Component ---
function App() {
  return (
    <div className="app">
      <Counter />
      <hr />
      <InputExample />
      <hr />
      <EventBindingExample />
      <hr />
      <NativeEventExample />
    </div>
  )
}

// Render the app - this runs ONCE
render(() => <App />, app)

console.log('App initialized with SolidJS-style fine-grained reactivity.')
