// Helper to append nodes (handles text, nodes, and arrays potentially returned by components)
let appendChildNode = (parent, child) => {
  if (child == null || typeof child === 'boolean') return;
  if (Array.isArray(child)) child.forEach(nested => appendChildNode(parent, nested));
  else if (child instanceof Node) parent.appendChild(child);
  else parent.appendChild(document.createTextNode(child));
}

// JSX Factory function (hyperscript)
let h = (tag, props, ...children) => {
  // 1. Check if tag is a function (component)
  if (typeof tag === 'function') {
    const componentProps = { ...props, children: children.flat() };
    return tag(componentProps);
  }

  // 2. If tag is a string (HTML element)
  const el = document.createElement(tag);

  // Assign properties
  if (props) {
    for (const key in props) {
      if (key === 'children') continue;
      const val = props[key];

      if (key.startsWith('on') && typeof val === 'function') el.addEventListener(key.substring(2).toLowerCase(), val);
      else if (key === 'className') el.setAttribute('class', val);
      else if (typeof val === 'boolean' && val) el.setAttribute(key, '');
      else if (val != null && typeof val !== 'boolean')el.setAttribute(key, val);
    }
  }

  // Append children (handle children passed as rest parameters)
  children.flat().forEach(child => appendChildNode(el, child));

  return el;
}

// Fragment function
let Fragment = (props) => props.children;

export { h , Fragment}
