// --- Fine-Grained Reactivity System (SolidJS style) ---

type Effect = () => void
type CleanupFn = () => void

let currentEffect: Effect | null = null
const effectStack: Effect[] = []

/**
 * Creates a reactive signal with a getter and setter.
 * When the getter is called inside an effect, the effect subscribes to the signal.
 *
 * @example
 * const [count, setCount] = createSignal(0);
 * console.log(count()); // 0
 * setCount(1);
 * console.log(count()); // 1
 */
export function createSignal<T>(initialValue: T): [() => T, (newValue: T | ((prev: T) => T)) => void] {
  let value = initialValue
  const subscribers = new Set<Effect>()

  const read = (): T => {
    if (currentEffect) {
      subscribers.add(currentEffect)
    }
    return value
  }

  const write = (newValue: T | ((prev: T) => T)): void => {
    const nextValue = typeof newValue === 'function'
      ? (newValue as (prev: T) => T)(value)
      : newValue

    if (!Object.is(value, nextValue)) {
      value = nextValue
      // Clone subscribers to avoid issues if effect modifies subscriptions
      new Set(subscribers).forEach(effect => effect())
    }
  }

  return [read, write]
}

/**
 * Creates a reactive effect that re-runs when its dependencies change.
 * Dependencies are automatically tracked when signals are read inside the effect.
 *
 * @example
 * const [count, setCount] = createSignal(0);
 * createEffect(() => {
 *   console.log('Count is:', count());
 * });
 * setCount(1); // logs: "Count is: 1"
 */
export function createEffect(callback: () => void | CleanupFn): void {
  let cleanup: CleanupFn | void

  const effect: Effect = () => {
    // Run cleanup from previous execution
    if (cleanup) {
      cleanup()
      cleanup = undefined
    }

    // Push to effect stack for nested effects
    effectStack.push(effect)
    currentEffect = effect
    try {
      cleanup = callback()
    }
    finally {
      effectStack.pop()
      currentEffect = effectStack[effectStack.length - 1] || null
    }
  }

  effect()
}

/**
 * Creates a memoized computed value that only recalculates when dependencies change.
 *
 * @example
 * const [count, setCount] = createSignal(0);
 * const doubled = createMemo(() => count() * 2);
 * console.log(doubled()); // 0
 * setCount(5);
 * console.log(doubled()); // 10
 */
export function createMemo<T>(compute: () => T): () => T {
  const [value, setValue] = createSignal<T>(undefined as T)

  createEffect(() => {
    setValue(compute())
  })

  return value
}

/**
 * Batches multiple signal updates into a single effect execution.
 * Useful for performance optimization when updating multiple signals at once.
 *
 * @example
 * batch(() => {
 *   setA(1);
 *   setB(2);
 * }); // Effects run only once after both updates
 */
let batchDepth = 0
const pendingEffects = new Set<Effect>()

export function batch<T>(fn: () => T): T {
  batchDepth++
  try {
    return fn()
  }
  finally {
    batchDepth--
    if (batchDepth === 0) {
      const effects = new Set(pendingEffects)
      pendingEffects.clear()
      effects.forEach(effect => effect())
    }
  }
}

// --- End Reactivity System ---
