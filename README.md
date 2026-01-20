# vanilla-jsx

**[English](./README.md)** | [简体中文](./README.zh-CN.md)

A lightweight library for building user interfaces with JavaScript/TypeScript and JSX/TSX syntax, featuring SolidJS-style fine-grained reactivity.

## ✨ Features

- ⚡️ **Fine-Grained Reactivity** - SolidJS-style signals and effects, components run once, only DOM nodes update
- 🍦 **No Virtual DOM** - Direct DOM manipulation for better performance
- 📦 **Tiny Bundle Size** - Zero dependencies, minimal footprint
- 🎯 **Full TypeScript Support** - Complete type definitions for JSX
- 🔧 **Event Delegation** - Efficient event handling with delegated and native event support
- 🎨 **Reactive Attributes** - Dynamic class, style, and attribute bindings

## 📦 Installation

```bash
npm install vanilla-jsx
# or
pnpm add vanilla-jsx
# or
yarn add vanilla-jsx
```

## 🚀 Quick Start

### Configure JSX

**tsconfig.json:**

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "vanilla-jsx"
  }
}
```

**vite.config.ts:**

```ts
import { defineConfig } from 'vite'

export default defineConfig({
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'vanilla-jsx',
  },
})
```

### Basic Example

```tsx
import { createSignal, render } from 'vanilla-jsx'

function Counter() {
  const [count, setCount] = createSignal(0)

  return (
    <div>
      <p>
        Count:
        {count}
      </p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  )
}

render(() => <Counter />, document.getElementById('app')!)
```

## 📖 API Reference

### Reactivity

#### `createSignal<T>(initialValue: T)`

Creates a reactive signal with a getter and setter.

```tsx
const [count, setCount] = createSignal(0)

// Read value
console.log(count()) // 0

// Update value
setCount(1)
setCount(prev => prev + 1)
```

#### `createEffect(callback)`

Creates a reactive effect that re-runs when its dependencies change.

```tsx
const [count, setCount] = createSignal(0)

createEffect(() => {
  console.log('Count changed:', count())
})

setCount(1) // logs: "Count changed: 1"
```

#### `createMemo<T>(compute)`

Creates a memoized computed value that only recalculates when dependencies change.

```tsx
const [count, setCount] = createSignal(0)
const doubled = createMemo(() => count() * 2)

console.log(doubled()) // 0
setCount(5)
console.log(doubled()) // 10
```

#### `batch(fn)`

Batches multiple signal updates into a single effect execution.

```tsx
batch(() => {
  setA(1)
  setB(2)
}) // Effects run only once after both updates
```

### Rendering

#### `render(component, container)`

Renders a component into a container element.

```tsx
render(() => <App />, document.getElementById('app')!)
```

### Event Handling

#### Delegated Events

Common events are delegated for better performance. Both camelCase and lowercase are supported.

```tsx
<button onClick={() => console.log('clicked')}>Click me</button>
<button onclick={() => console.log('clicked')}>Click me</button>
```

**Delegated events list:**
`beforeinput`, `click`, `dblclick`, `contextmenu`, `focusin`, `focusout`, `input`, `keydown`, `keyup`, `mousedown`, `mousemove`, `mouseout`, `mouseover`, `mouseup`, `pointerdown`, `pointermove`, `pointerout`, `pointerover`, `pointerup`, `touchend`, `touchmove`, `touchstart`

#### Bound Events

SolidJS-style bound events with data parameter.

```tsx
function handleClick(data: string, event: MouseEvent) {
  console.log('Data:', data, 'Event:', event.type)
}

<button onClick={[handleClick, 'Hello!']}>Click me</button>
```

#### Native Events

Use `on:eventname` for native events (case-sensitive, direct binding).

```tsx
<div on:scroll={e => console.log('scrolled')}>Scroll me</div>
```

### Reactive Attributes

Attributes can accept accessor functions for reactive updates.

```tsx
const [isActive, setIsActive] = createSignal(false)

<div className={() => isActive() ? 'active' : 'inactive'}>
  Status: {() => isActive() ? 'Active' : 'Inactive'}
</div>
```

### Components

Components are functions that receive props. **Important:** Do not destructure props to preserve reactivity.

```tsx
interface DisplayProps {
  value: () => number // Accessor type
}

function Display(props: DisplayProps) {
  // ✅ Pass accessor directly
  return (
    <p>
      Value:
      {props.value}
    </p>
  )
}

function App() {
  const [count, setCount] = createSignal(0)
  // Pass the signal getter (accessor) to child component
  return <Display value={count} />
}
```

## 📜 Scripts

| Script | Description |
| --- | --- |
| `pnpm dev` | Start development mode with watch |
| `pnpm build` | Build the library for production |
| `pnpm test` | Run tests |
| `pnpm test:coverage` | Run tests with coverage report |
| `pnpm lint` | Run ESLint |
| `pnpm lint:fix` | Run ESLint with auto-fix |

## 📄 License

[MIT](./LICENSE)

## 🤝 Contributing

Contributions are welcome! Please open an issue first to discuss what you would like to change.
