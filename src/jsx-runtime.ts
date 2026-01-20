import type { Child, Props, Tag } from './h'
import { Fragment, h as originalH } from './h'

type JSXProps = Props & {
  children?: Child | Child[]
}

function jsx(tag: Tag, props: JSXProps): Node | Child[] {
  const { children, ...restProps } = props || {}
  return originalH(
    tag,
    restProps,
    ...(Array.isArray(children) ? children : children != null ? [children] : []),
  )
}

const jsxs = jsx

export { Fragment, originalH as h, jsx, jsxs }
