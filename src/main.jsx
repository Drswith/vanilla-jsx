import './style.css';

// --- Simplified Reactivity System ---
let currentEffect = null;

function createSignal(initialValue) {
  let value = initialValue;
  const subscribers = new Set();

  const read = () => {
    if (currentEffect) {
      subscribers.add(currentEffect);
    }
    return value;
  };

  const write = (newValue) => {
    if (!Object.is(value, newValue)) {
      value = newValue;
      new Set(subscribers).forEach(effect => effect());
    }
  };

  return [read, write];
}

function createEffect(callback) {
  const effect = () => {
    currentEffect = effect;
    try {
      callback();
    } finally {
      currentEffect = null;
    }
  };
  effect();
}
// --- End Reactivity System ---

// JSX Factory function (hyperscript)
function h(tag, props, ...children) {
  // 1. Check if tag is a function (component)
  if (typeof tag === 'function') {
    // Call the function component, passing props and children
    // We merge children into props as 'props.children' for a common pattern
    // Pass props as the first argument, consistent with how components receive props.
    const componentProps = { ...props, children: children.flat() }; 
    return tag(componentProps);
  }

  // 2. If tag is a string (HTML element), proceed as before
  const element = document.createElement(tag);

  // Assign properties
  if (props) {
    for (const key in props) {
      // Skip 'children' prop as it's handled separately below
      if (key === 'children') continue; 

      if (key.startsWith('on') && typeof props[key] === 'function') {
        element.addEventListener(key.substring(2).toLowerCase(), props[key]);
      } else if (key === 'className') {
        element.setAttribute('class', props[key]);
      } else if (typeof props[key] === 'boolean' && props[key]) {
        element.setAttribute(key, '');
      } else if (props[key] != null && typeof props[key] !== 'boolean'){
        element.setAttribute(key, props[key]);
      }
    }
  }

  // Append children (handle children passed as rest parameters)
  children.flat().forEach(child => {
    appendChildNode(element, child);
  });

  return element;
}

// Helper to append nodes (handles text, nodes, and arrays potentially returned by components)
function appendChildNode(parent, child) {
    if (Array.isArray(child)) {
        child.forEach(nestedChild => appendChildNode(parent, nestedChild));
    } else if (typeof child === 'string' || typeof child === 'number') {
        parent.appendChild(document.createTextNode(child.toString()));
    } else if (child instanceof Node) {
        parent.appendChild(child);
    } else if (child != null && typeof child !== 'boolean') {
        // Handle potentially non-node values returned by components if necessary
        parent.appendChild(document.createTextNode(String(child)));
    }
}

// Fragment function (for <>...</>)
// No changes needed for Fragment itself, but its children are handled by h/appendChildNode
function Fragment(props) {
    // Fragment just returns its children, to be processed by the parent 'h' call
    return props.children;
}

// Get the app container
const app = document.getElementById('app');

// --- Simple Components ---
function DisplayCount(props) {
  // Component receives count value via props
  return <p>Count: {props.value}</p>; 
}

function IncrementButton(props) {
  // Component receives onClick handler via props
  return <button onClick={props.onClick}>Increment</button>;
}
// --- End Simple Components ---

// --- Reactive Counter Component (using child components) ---
function Counter() {
  const [count, setCount] = createSignal(0);

  const increment = () => {
    setCount(count() + 1);
  };

  createEffect(() => {
    const element = (
      <div>
        <h1>Vanilla JS Counter with JSX & Components</h1>
        {/* Use the DisplayCount component, passing count() as value prop */}
        <DisplayCount value={count()} /> 
        {/* Use the IncrementButton component, passing increment as onClick prop */}
        <IncrementButton onClick={increment} />
        <p><small>Reactivity & Components powered by custom h/createSignal/createEffect</small></p>
      </div>
    );

    if (app.firstChild) {
        app.replaceChild(element, app.firstChild);
    } else {
        app.appendChild(element);
    }
    console.log('Effect ran, count is:', count());
  });
}

// Initialize the counter component
Counter();

console.log('App initialized with reactive counter using components.');