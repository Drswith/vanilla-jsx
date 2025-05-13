import { h as originalH, Fragment } from './h';

let jsx = (tag, props) => {
  const { children, ...restProps } = props || {};
  return originalH(tag, restProps, ...(Array.isArray(children) ? children : (children != null ? [children] : [])));
};

let jsxs = jsx;

export { originalH as h, Fragment, jsx, jsxs };
