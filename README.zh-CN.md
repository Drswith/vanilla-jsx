# vanilla-jsx

[English](./README.md) | **[简体中文](./README.zh-CN.md)**

一个轻量级的库，用于使用 JavaScript/TypeScript 和 JSX/TSX 语法构建用户界面，具有 SolidJS 风格的细粒度响应式系统。

## ✨ 特性

- ⚡️ **细粒度响应式** - SolidJS 风格的 signals 和 effects，组件只运行一次，只有 DOM 节点更新
- 🍦 **无虚拟 DOM** - 直接 DOM 操作，性能更佳
- 📦 **超小体积** - 零依赖，极小的打包体积
- 🎯 **完整 TypeScript 支持** - 完整的 JSX 类型定义
- 🔧 **事件委托** - 支持委托事件和原生事件的高效事件处理
- 🎨 **响应式属性** - 动态 class、style 和属性绑定

## 📦 安装

```bash
npm install vanilla-jsx
# 或者
pnpm add vanilla-jsx
# 或者
yarn add vanilla-jsx
```

## 🚀 快速开始

### 配置 JSX

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

### 基本示例

```tsx
import { createSignal, render } from 'vanilla-jsx'

function Counter() {
  const [count, setCount] = createSignal(0)

  return (
    <div>
      <p>计数: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>增加</button>
    </div>
  )
}

render(() => <Counter />, document.getElementById('app')!)
```

## 📖 API 参考

### 响应式

#### `createSignal<T>(initialValue: T)`

创建一个带有 getter 和 setter 的响应式信号。

```tsx
const [count, setCount] = createSignal(0)

// 读取值
console.log(count()) // 0

// 更新值
setCount(1)
setCount(prev => prev + 1)
```

#### `createEffect(callback)`

创建一个响应式效果，当依赖项变化时重新运行。

```tsx
const [count, setCount] = createSignal(0)

createEffect(() => {
  console.log('计数变化:', count())
})

setCount(1) // 输出: "计数变化: 1"
```

#### `createMemo<T>(compute)`

创建一个记忆化的计算值，只有当依赖项变化时才重新计算。

```tsx
const [count, setCount] = createSignal(0)
const doubled = createMemo(() => count() * 2)

console.log(doubled()) // 0
setCount(5)
console.log(doubled()) // 10
```

#### `batch(fn)`

将多个信号更新批处理为单个效果执行。

```tsx
batch(() => {
  setA(1)
  setB(2)
}) // 两次更新后效果只运行一次
```

### 渲染

#### `render(component, container)`

将组件渲染到容器元素中。

```tsx
render(() => <App />, document.getElementById('app')!)
```

### 事件处理

#### 委托事件

常用事件被委托以获得更好的性能。同时支持驼峰命名和小写。

```tsx
<button onClick={() => console.log('点击了')}>点击我</button>
<button onclick={() => console.log('点击了')}>点击我</button>
```

**委托事件列表：**
`beforeinput`, `click`, `dblclick`, `contextmenu`, `focusin`, `focusout`, `input`, `keydown`, `keyup`, `mousedown`, `mousemove`, `mouseout`, `mouseover`, `mouseup`, `pointerdown`, `pointermove`, `pointerout`, `pointerover`, `pointerup`, `touchend`, `touchmove`, `touchstart`

#### 绑定事件

SolidJS 风格的带数据参数的绑定事件。

```tsx
const handleClick = (data: string, event: MouseEvent) => {
  console.log('数据:', data, '事件:', event.type)
}

<button onClick={[handleClick, '你好!']}>点击我</button>
```

#### 原生事件

使用 `on:eventname` 绑定原生事件（大小写敏感，直接绑定）。

```tsx
<div on:scroll={e => console.log('滚动了')}>滚动我</div>
```

### 响应式属性

属性可以接受访问器函数以实现响应式更新。

```tsx
const [isActive, setIsActive] = createSignal(false)

<div className={() => isActive() ? 'active' : 'inactive'}>
  状态: {() => isActive() ? '激活' : '未激活'}
</div>
```

### 组件

组件是接收 props 的函数。**重要：** 不要解构 props 以保持响应式。

```tsx
interface DisplayProps {
  value: () => number // 访问器类型
}

function Display(props: DisplayProps) {
  // ✅ 直接传递访问器
  return <p>值: {props.value}</p>
}

function App() {
  const [count, setCount] = createSignal(0)
  // 将信号 getter（访问器）传递给子组件
  return <Display value={count} />
}
```

## 📜 可用脚本

| 脚本 | 描述 |
| --- | --- |
| `pnpm dev` | 启动开发模式并监听文件变化 |
| `pnpm build` | 构建生产版本 |
| `pnpm test` | 运行测试 |
| `pnpm test:coverage` | 运行测试并生成覆盖率报告 |
| `pnpm lint` | 运行 ESLint |
| `pnpm lint:fix` | 运行 ESLint 并自动修复 |

## 📄 许可证

[MIT](./LICENSE)

## 🤝 贡献

欢迎贡献！对于重大更改，请先打开一个 issue 来讨论您想要更改的内容。
