import { createEffect } from './reactivity'

// Type definitions
type Accessor<T> = () => T
type MaybeAccessor<T> = T | Accessor<T>
type Child = Node | string | number | boolean | null | undefined | Child[] | Accessor<unknown>

// JSX namespace declaration for TypeScript
declare global {
  // eslint-disable-next-line ts/no-namespace
  namespace JSX {
    type Element = HTMLElement | SVGElement | DocumentFragment | Child[]

    interface IntrinsicElements {
      // HTML Elements
      a: HTMLAttributes<HTMLAnchorElement>
      abbr: HTMLAttributes<HTMLElement>
      address: HTMLAttributes<HTMLElement>
      area: HTMLAttributes<HTMLAreaElement>
      article: HTMLAttributes<HTMLElement>
      aside: HTMLAttributes<HTMLElement>
      audio: HTMLAttributes<HTMLAudioElement>
      b: HTMLAttributes<HTMLElement>
      base: HTMLAttributes<HTMLBaseElement>
      bdi: HTMLAttributes<HTMLElement>
      bdo: HTMLAttributes<HTMLElement>
      blockquote: HTMLAttributes<HTMLQuoteElement>
      body: HTMLAttributes<HTMLBodyElement>
      br: HTMLAttributes<HTMLBRElement>
      button: HTMLAttributes<HTMLButtonElement>
      canvas: HTMLAttributes<HTMLCanvasElement>
      caption: HTMLAttributes<HTMLTableCaptionElement>
      cite: HTMLAttributes<HTMLElement>
      code: HTMLAttributes<HTMLElement>
      col: HTMLAttributes<HTMLTableColElement>
      colgroup: HTMLAttributes<HTMLTableColElement>
      data: HTMLAttributes<HTMLDataElement>
      datalist: HTMLAttributes<HTMLDataListElement>
      dd: HTMLAttributes<HTMLElement>
      del: HTMLAttributes<HTMLModElement>
      details: HTMLAttributes<HTMLDetailsElement>
      dfn: HTMLAttributes<HTMLElement>
      dialog: HTMLAttributes<HTMLDialogElement>
      div: HTMLAttributes<HTMLDivElement>
      dl: HTMLAttributes<HTMLDListElement>
      dt: HTMLAttributes<HTMLElement>
      em: HTMLAttributes<HTMLElement>
      embed: HTMLAttributes<HTMLEmbedElement>
      fieldset: HTMLAttributes<HTMLFieldSetElement>
      figcaption: HTMLAttributes<HTMLElement>
      figure: HTMLAttributes<HTMLElement>
      footer: HTMLAttributes<HTMLElement>
      form: HTMLAttributes<HTMLFormElement>
      h1: HTMLAttributes<HTMLHeadingElement>
      h2: HTMLAttributes<HTMLHeadingElement>
      h3: HTMLAttributes<HTMLHeadingElement>
      h4: HTMLAttributes<HTMLHeadingElement>
      h5: HTMLAttributes<HTMLHeadingElement>
      h6: HTMLAttributes<HTMLHeadingElement>
      head: HTMLAttributes<HTMLHeadElement>
      header: HTMLAttributes<HTMLElement>
      hgroup: HTMLAttributes<HTMLElement>
      hr: HTMLAttributes<HTMLHRElement>
      html: HTMLAttributes<HTMLHtmlElement>
      i: HTMLAttributes<HTMLElement>
      iframe: HTMLAttributes<HTMLIFrameElement>
      img: HTMLAttributes<HTMLImageElement>
      input: HTMLAttributes<HTMLInputElement>
      ins: HTMLAttributes<HTMLModElement>
      kbd: HTMLAttributes<HTMLElement>
      label: HTMLAttributes<HTMLLabelElement>
      legend: HTMLAttributes<HTMLLegendElement>
      li: HTMLAttributes<HTMLLIElement>
      link: HTMLAttributes<HTMLLinkElement>
      main: HTMLAttributes<HTMLElement>
      map: HTMLAttributes<HTMLMapElement>
      mark: HTMLAttributes<HTMLElement>
      menu: HTMLAttributes<HTMLMenuElement>
      meta: HTMLAttributes<HTMLMetaElement>
      meter: HTMLAttributes<HTMLMeterElement>
      nav: HTMLAttributes<HTMLElement>
      noscript: HTMLAttributes<HTMLElement>
      object: HTMLAttributes<HTMLObjectElement>
      ol: HTMLAttributes<HTMLOListElement>
      optgroup: HTMLAttributes<HTMLOptGroupElement>
      option: HTMLAttributes<HTMLOptionElement>
      output: HTMLAttributes<HTMLOutputElement>
      p: HTMLAttributes<HTMLParagraphElement>
      picture: HTMLAttributes<HTMLPictureElement>
      pre: HTMLAttributes<HTMLPreElement>
      progress: HTMLAttributes<HTMLProgressElement>
      q: HTMLAttributes<HTMLQuoteElement>
      rp: HTMLAttributes<HTMLElement>
      rt: HTMLAttributes<HTMLElement>
      ruby: HTMLAttributes<HTMLElement>
      s: HTMLAttributes<HTMLElement>
      samp: HTMLAttributes<HTMLElement>
      script: HTMLAttributes<HTMLScriptElement>
      search: HTMLAttributes<HTMLElement>
      section: HTMLAttributes<HTMLElement>
      select: HTMLAttributes<HTMLSelectElement>
      slot: HTMLAttributes<HTMLSlotElement>
      small: HTMLAttributes<HTMLElement>
      source: HTMLAttributes<HTMLSourceElement>
      span: HTMLAttributes<HTMLSpanElement>
      strong: HTMLAttributes<HTMLElement>
      style: HTMLAttributes<HTMLStyleElement>
      sub: HTMLAttributes<HTMLElement>
      summary: HTMLAttributes<HTMLElement>
      sup: HTMLAttributes<HTMLElement>
      table: HTMLAttributes<HTMLTableElement>
      tbody: HTMLAttributes<HTMLTableSectionElement>
      td: HTMLAttributes<HTMLTableCellElement>
      template: HTMLAttributes<HTMLTemplateElement>
      textarea: HTMLAttributes<HTMLTextAreaElement>
      tfoot: HTMLAttributes<HTMLTableSectionElement>
      th: HTMLAttributes<HTMLTableCellElement>
      thead: HTMLAttributes<HTMLTableSectionElement>
      time: HTMLAttributes<HTMLTimeElement>
      title: HTMLAttributes<HTMLTitleElement>
      tr: HTMLAttributes<HTMLTableRowElement>
      track: HTMLAttributes<HTMLTrackElement>
      u: HTMLAttributes<HTMLElement>
      ul: HTMLAttributes<HTMLUListElement>
      var: HTMLAttributes<HTMLElement>
      video: HTMLAttributes<HTMLVideoElement>
      wbr: HTMLAttributes<HTMLElement>

      // SVG Elements
      svg: SVGAttributes<SVGSVGElement>
      path: SVGAttributes<SVGPathElement>
      circle: SVGAttributes<SVGCircleElement>
      rect: SVGAttributes<SVGRectElement>
      line: SVGAttributes<SVGLineElement>
      polyline: SVGAttributes<SVGPolylineElement>
      polygon: SVGAttributes<SVGPolygonElement>
      ellipse: SVGAttributes<SVGEllipseElement>
      text: SVGAttributes<SVGTextElement>
      g: SVGAttributes<SVGGElement>
      defs: SVGAttributes<SVGDefsElement>
      use: SVGAttributes<SVGUseElement>
      symbol: SVGAttributes<SVGSymbolElement>
      clipPath: SVGAttributes<SVGClipPathElement>
      mask: SVGAttributes<SVGMaskElement>
      image: SVGAttributes<SVGImageElement>
      foreignObject: SVGAttributes<SVGForeignObjectElement>
      linearGradient: SVGAttributes<SVGLinearGradientElement>
      radialGradient: SVGAttributes<SVGRadialGradientElement>
      stop: SVGAttributes<SVGStopElement>
      pattern: SVGAttributes<SVGPatternElement>
      filter: SVGAttributes<SVGFilterElement>
      feBlend: SVGAttributes<SVGFEBlendElement>
      feColorMatrix: SVGAttributes<SVGFEColorMatrixElement>
      feComponentTransfer: SVGAttributes<SVGFEComponentTransferElement>
      feComposite: SVGAttributes<SVGFECompositeElement>
      feConvolveMatrix: SVGAttributes<SVGFEConvolveMatrixElement>
      feDiffuseLighting: SVGAttributes<SVGFEDiffuseLightingElement>
      feDisplacementMap: SVGAttributes<SVGFEDisplacementMapElement>
      feDropShadow: SVGAttributes<SVGFEDropShadowElement>
      feFlood: SVGAttributes<SVGFEFloodElement>
      feFuncA: SVGAttributes<SVGFEFuncAElement>
      feFuncB: SVGAttributes<SVGFEFuncBElement>
      feFuncG: SVGAttributes<SVGFEFuncGElement>
      feFuncR: SVGAttributes<SVGFEFuncRElement>
      feGaussianBlur: SVGAttributes<SVGFEGaussianBlurElement>
      feImage: SVGAttributes<SVGFEImageElement>
      feMerge: SVGAttributes<SVGFEMergeElement>
      feMergeNode: SVGAttributes<SVGFEMergeNodeElement>
      feMorphology: SVGAttributes<SVGFEMorphologyElement>
      feOffset: SVGAttributes<SVGFEOffsetElement>
      fePointLight: SVGAttributes<SVGFEPointLightElement>
      feSpecularLighting: SVGAttributes<SVGFESpecularLightingElement>
      feSpotLight: SVGAttributes<SVGFESpotLightElement>
      feTile: SVGAttributes<SVGFETileElement>
      feTurbulence: SVGAttributes<SVGFETurbulenceElement>
      animate: SVGAttributes<SVGAnimateElement>
      animateMotion: SVGAttributes<SVGAnimateMotionElement>
      animateTransform: SVGAttributes<SVGAnimateTransformElement>
      set: SVGAttributes<SVGSetElement>
      marker: SVGAttributes<SVGMarkerElement>
      metadata: SVGAttributes<SVGMetadataElement>
      mpath: SVGAttributes<SVGMPathElement>
      switch: SVGAttributes<SVGSwitchElement>
      desc: SVGAttributes<SVGDescElement>
      view: SVGAttributes<SVGViewElement>
    }

    // Event handler types (SolidJS style)
    // Supports: function handler OR [handler, data] bound form

    type EventHandler<E extends Event = Event> = ((event: E) => void) | [handler: (data: any, event: E) => void, data: any]

    // Base HTML attributes interface
    interface HTMLAttributes<T extends EventTarget = EventTarget> {
      // Standard HTML attributes
      'accessKey'?: MaybeAccessor<string>
      'className'?: MaybeAccessor<string>
      'class'?: MaybeAccessor<string>
      'contentEditable'?: MaybeAccessor<boolean | 'inherit' | 'plaintext-only'>
      'dir'?: MaybeAccessor<'ltr' | 'rtl' | 'auto'>
      'draggable'?: MaybeAccessor<boolean>
      'hidden'?: MaybeAccessor<boolean>
      'id'?: MaybeAccessor<string>
      'lang'?: MaybeAccessor<string>
      'placeholder'?: MaybeAccessor<string>
      'slot'?: MaybeAccessor<string>
      'spellcheck'?: MaybeAccessor<boolean>
      'style'?: MaybeAccessor<string | Partial<CSSStyleDeclaration>>
      'tabIndex'?: MaybeAccessor<number>
      'title'?: MaybeAccessor<string>
      'translate'?: MaybeAccessor<'yes' | 'no'>

      // Form attributes
      'disabled'?: MaybeAccessor<boolean>
      'name'?: MaybeAccessor<string>
      'type'?: MaybeAccessor<string>
      'value'?: MaybeAccessor<string | number>
      'checked'?: MaybeAccessor<boolean>
      'readonly'?: MaybeAccessor<boolean>
      'required'?: MaybeAccessor<boolean>
      'min'?: MaybeAccessor<string | number>
      'max'?: MaybeAccessor<string | number>
      'step'?: MaybeAccessor<string | number>
      'pattern'?: MaybeAccessor<string>
      'maxLength'?: MaybeAccessor<number>
      'minLength'?: MaybeAccessor<number>
      'multiple'?: MaybeAccessor<boolean>
      'accept'?: MaybeAccessor<string>
      'autocomplete'?: MaybeAccessor<string>
      'autofocus'?: MaybeAccessor<boolean>
      'for'?: MaybeAccessor<string>
      'htmlFor'?: MaybeAccessor<string>
      'form'?: MaybeAccessor<string>
      'action'?: MaybeAccessor<string>
      'method'?: MaybeAccessor<string>
      'enctype'?: MaybeAccessor<string>
      'novalidate'?: MaybeAccessor<boolean>
      'target'?: MaybeAccessor<string>
      'rows'?: MaybeAccessor<number>
      'cols'?: MaybeAccessor<number>

      // Link/media attributes
      'href'?: MaybeAccessor<string>
      'src'?: MaybeAccessor<string>
      'alt'?: MaybeAccessor<string>
      'width'?: MaybeAccessor<string | number>
      'height'?: MaybeAccessor<string | number>
      'rel'?: MaybeAccessor<string>
      'download'?: MaybeAccessor<boolean | string>
      'crossOrigin'?: MaybeAccessor<'anonymous' | 'use-credentials'>
      'loading'?: MaybeAccessor<'eager' | 'lazy'>
      'decoding'?: MaybeAccessor<'sync' | 'async' | 'auto'>

      // Media attributes
      'autoplay'?: MaybeAccessor<boolean>
      'controls'?: MaybeAccessor<boolean>
      'loop'?: MaybeAccessor<boolean>
      'muted'?: MaybeAccessor<boolean>
      'preload'?: MaybeAccessor<'none' | 'metadata' | 'auto'>
      'poster'?: MaybeAccessor<string>

      // Table attributes
      'colspan'?: MaybeAccessor<number>
      'rowspan'?: MaybeAccessor<number>
      'scope'?: MaybeAccessor<string>

      // ARIA attributes
      'role'?: MaybeAccessor<string>
      'aria-label'?: MaybeAccessor<string>
      'aria-labelledby'?: MaybeAccessor<string>
      'aria-describedby'?: MaybeAccessor<string>
      'aria-hidden'?: MaybeAccessor<boolean>
      'aria-expanded'?: MaybeAccessor<boolean>
      'aria-selected'?: MaybeAccessor<boolean>
      'aria-checked'?: MaybeAccessor<boolean | 'mixed'>
      'aria-disabled'?: MaybeAccessor<boolean>
      'aria-live'?: MaybeAccessor<'off' | 'polite' | 'assertive'>
      'aria-atomic'?: MaybeAccessor<boolean>
      'aria-busy'?: MaybeAccessor<boolean>
      'aria-controls'?: MaybeAccessor<string>
      'aria-current'?: MaybeAccessor<boolean | 'page' | 'step' | 'location' | 'date' | 'time'>
      'aria-haspopup'?: MaybeAccessor<boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog'>
      'aria-pressed'?: MaybeAccessor<boolean | 'mixed'>

      // Data attributes
      [key: `data-${string}`]: MaybeAccessor<string | number | boolean | undefined>

      // Ref
      'ref'?: (el: T) => void

      // ==========================================
      // Delegated Events (camelCase) - SolidJS style
      // These are case-insensitive: onClick === onclick
      // Attached to document for better performance
      // ==========================================

      // Mouse events (delegated)
      'onClick'?: EventHandler<MouseEvent>
      'onclick'?: EventHandler<MouseEvent>
      'onDblClick'?: EventHandler<MouseEvent>
      'ondblclick'?: EventHandler<MouseEvent>
      'onMouseDown'?: EventHandler<MouseEvent>
      'onmousedown'?: EventHandler<MouseEvent>
      'onMouseUp'?: EventHandler<MouseEvent>
      'onmouseup'?: EventHandler<MouseEvent>
      'onMouseMove'?: EventHandler<MouseEvent>
      'onmousemove'?: EventHandler<MouseEvent>
      'onMouseOver'?: EventHandler<MouseEvent>
      'onmouseover'?: EventHandler<MouseEvent>
      'onMouseOut'?: EventHandler<MouseEvent>
      'onmouseout'?: EventHandler<MouseEvent>
      'onContextMenu'?: EventHandler<MouseEvent>
      'oncontextmenu'?: EventHandler<MouseEvent>

      // Keyboard events (delegated)
      'onKeyDown'?: EventHandler<KeyboardEvent>
      'onkeydown'?: EventHandler<KeyboardEvent>
      'onKeyUp'?: EventHandler<KeyboardEvent>
      'onkeyup'?: EventHandler<KeyboardEvent>

      // Focus events (delegated)
      'onFocusIn'?: EventHandler<FocusEvent>
      'onfocusin'?: EventHandler<FocusEvent>
      'onFocusOut'?: EventHandler<FocusEvent>
      'onfocusout'?: EventHandler<FocusEvent>

      // Input events (delegated)
      'onInput'?: EventHandler<Event>
      'oninput'?: EventHandler<Event>
      'onBeforeInput'?: EventHandler<InputEvent>
      'onbeforeinput'?: EventHandler<InputEvent>

      // Touch events (delegated)
      'onTouchStart'?: EventHandler<TouchEvent>
      'ontouchstart'?: EventHandler<TouchEvent>
      'onTouchEnd'?: EventHandler<TouchEvent>
      'ontouchend'?: EventHandler<TouchEvent>
      'onTouchMove'?: EventHandler<TouchEvent>
      'ontouchmove'?: EventHandler<TouchEvent>

      // Pointer events (delegated)
      'onPointerDown'?: EventHandler<PointerEvent>
      'onpointerdown'?: EventHandler<PointerEvent>
      'onPointerUp'?: EventHandler<PointerEvent>
      'onpointerup'?: EventHandler<PointerEvent>
      'onPointerMove'?: EventHandler<PointerEvent>
      'onpointermove'?: EventHandler<PointerEvent>
      'onPointerOver'?: EventHandler<PointerEvent>
      'onpointerover'?: EventHandler<PointerEvent>
      'onPointerOut'?: EventHandler<PointerEvent>
      'onpointerout'?: EventHandler<PointerEvent>

      // ==========================================
      // Non-delegated Events (attached to element)
      // ==========================================

      // Mouse events (non-delegated)
      'onMouseEnter'?: EventHandler<MouseEvent>
      'onmouseenter'?: EventHandler<MouseEvent>
      'onMouseLeave'?: EventHandler<MouseEvent>
      'onmouseleave'?: EventHandler<MouseEvent>

      // Focus events (non-delegated)
      'onFocus'?: EventHandler<FocusEvent>
      'onfocus'?: EventHandler<FocusEvent>
      'onBlur'?: EventHandler<FocusEvent>
      'onblur'?: EventHandler<FocusEvent>

      // Form events
      'onChange'?: EventHandler<Event>
      'onchange'?: EventHandler<Event>
      'onSubmit'?: EventHandler<SubmitEvent>
      'onsubmit'?: EventHandler<SubmitEvent>
      'onReset'?: EventHandler<Event>
      'onreset'?: EventHandler<Event>
      'onInvalid'?: EventHandler<Event>
      'oninvalid'?: EventHandler<Event>

      // Keyboard events (non-delegated)
      'onKeyPress'?: EventHandler<KeyboardEvent>
      'onkeypress'?: EventHandler<KeyboardEvent>

      // Scroll/Wheel events
      'onScroll'?: EventHandler<Event>
      'onscroll'?: EventHandler<Event>
      'onWheel'?: EventHandler<WheelEvent>
      'onwheel'?: EventHandler<WheelEvent>

      // Drag events
      'onDrag'?: EventHandler<DragEvent>
      'ondrag'?: EventHandler<DragEvent>
      'onDragEnd'?: EventHandler<DragEvent>
      'ondragend'?: EventHandler<DragEvent>
      'onDragEnter'?: EventHandler<DragEvent>
      'ondragenter'?: EventHandler<DragEvent>
      'onDragLeave'?: EventHandler<DragEvent>
      'ondragleave'?: EventHandler<DragEvent>
      'onDragOver'?: EventHandler<DragEvent>
      'ondragover'?: EventHandler<DragEvent>
      'onDragStart'?: EventHandler<DragEvent>
      'ondragstart'?: EventHandler<DragEvent>
      'onDrop'?: EventHandler<DragEvent>
      'ondrop'?: EventHandler<DragEvent>

      // Touch events (non-delegated)
      'onTouchCancel'?: EventHandler<TouchEvent>
      'ontouchcancel'?: EventHandler<TouchEvent>

      // Pointer events (non-delegated)
      'onPointerEnter'?: EventHandler<PointerEvent>
      'onpointerenter'?: EventHandler<PointerEvent>
      'onPointerLeave'?: EventHandler<PointerEvent>
      'onpointerleave'?: EventHandler<PointerEvent>
      'onPointerCancel'?: EventHandler<PointerEvent>
      'onpointercancel'?: EventHandler<PointerEvent>

      // Animation events
      'onAnimationStart'?: EventHandler<AnimationEvent>
      'onanimationstart'?: EventHandler<AnimationEvent>
      'onAnimationEnd'?: EventHandler<AnimationEvent>
      'onanimationend'?: EventHandler<AnimationEvent>
      'onAnimationIteration'?: EventHandler<AnimationEvent>
      'onanimationiteration'?: EventHandler<AnimationEvent>

      // Transition events
      'onTransitionStart'?: EventHandler<TransitionEvent>
      'ontransitionstart'?: EventHandler<TransitionEvent>
      'onTransitionEnd'?: EventHandler<TransitionEvent>
      'ontransitionend'?: EventHandler<TransitionEvent>
      'onTransitionRun'?: EventHandler<TransitionEvent>
      'ontransitionrun'?: EventHandler<TransitionEvent>
      'onTransitionCancel'?: EventHandler<TransitionEvent>
      'ontransitioncancel'?: EventHandler<TransitionEvent>

      // Resource events
      'onLoad'?: EventHandler<Event>
      'onload'?: EventHandler<Event>
      'onError'?: EventHandler<Event>
      'onerror'?: EventHandler<Event>
      'onAbort'?: EventHandler<Event>
      'onabort'?: EventHandler<Event>

      // Media events
      'onPlay'?: EventHandler<Event>
      'onplay'?: EventHandler<Event>
      'onPause'?: EventHandler<Event>
      'onpause'?: EventHandler<Event>
      'onEnded'?: EventHandler<Event>
      'onended'?: EventHandler<Event>
      'onVolumeChange'?: EventHandler<Event>
      'onvolumechange'?: EventHandler<Event>
      'onTimeUpdate'?: EventHandler<Event>
      'ontimeupdate'?: EventHandler<Event>
      'onSeeking'?: EventHandler<Event>
      'onseeking'?: EventHandler<Event>
      'onSeeked'?: EventHandler<Event>
      'onseeked'?: EventHandler<Event>
      'onDurationChange'?: EventHandler<Event>
      'ondurationchange'?: EventHandler<Event>
      'onLoadedData'?: EventHandler<Event>
      'onloadeddata'?: EventHandler<Event>
      'onLoadedMetadata'?: EventHandler<Event>
      'onloadedmetadata'?: EventHandler<Event>
      'onCanPlay'?: EventHandler<Event>
      'oncanplay'?: EventHandler<Event>
      'onCanPlayThrough'?: EventHandler<Event>
      'oncanplaythrough'?: EventHandler<Event>
      'onRateChange'?: EventHandler<Event>
      'onratechange'?: EventHandler<Event>
      'onStalled'?: EventHandler<Event>
      'onstalled'?: EventHandler<Event>
      'onSuspend'?: EventHandler<Event>
      'onsuspend'?: EventHandler<Event>
      'onWaiting'?: EventHandler<Event>
      'onwaiting'?: EventHandler<Event>
      'onProgress'?: EventHandler<Event>
      'onprogress'?: EventHandler<Event>
      'onEmptied'?: EventHandler<Event>
      'onemptied'?: EventHandler<Event>

      // Clipboard events
      'onCopy'?: EventHandler<ClipboardEvent>
      'oncopy'?: EventHandler<ClipboardEvent>
      'onCut'?: EventHandler<ClipboardEvent>
      'oncut'?: EventHandler<ClipboardEvent>
      'onPaste'?: EventHandler<ClipboardEvent>
      'onpaste'?: EventHandler<ClipboardEvent>

      // Other events
      'onSelect'?: EventHandler<Event>
      'onselect'?: EventHandler<Event>
      'onResize'?: EventHandler<UIEvent>
      'onresize'?: EventHandler<UIEvent>

      // ==========================================
      // Native Events (on:eventname) - case-sensitive
      // Use for custom events or when you need stopPropagation
      // ==========================================
      [key: `on:${string}`]: EventHandler<Event>

      // Children
      'children'?: Child | Child[]
    }

    // SVG attributes interface
    interface SVGAttributes<T extends SVGElement = SVGElement> extends HTMLAttributes<T> {
      // Common SVG attributes
      'viewBox'?: MaybeAccessor<string>
      'xmlns'?: MaybeAccessor<string>
      'fill'?: MaybeAccessor<string>
      'stroke'?: MaybeAccessor<string>
      'strokeWidth'?: MaybeAccessor<string | number>
      'stroke-width'?: MaybeAccessor<string | number>
      'strokeLinecap'?: MaybeAccessor<'butt' | 'round' | 'square'>
      'stroke-linecap'?: MaybeAccessor<'butt' | 'round' | 'square'>
      'strokeLinejoin'?: MaybeAccessor<'miter' | 'round' | 'bevel'>
      'stroke-linejoin'?: MaybeAccessor<'miter' | 'round' | 'bevel'>
      'strokeDasharray'?: MaybeAccessor<string>
      'stroke-dasharray'?: MaybeAccessor<string>
      'strokeDashoffset'?: MaybeAccessor<string | number>
      'stroke-dashoffset'?: MaybeAccessor<string | number>
      'strokeOpacity'?: MaybeAccessor<string | number>
      'stroke-opacity'?: MaybeAccessor<string | number>
      'fillOpacity'?: MaybeAccessor<string | number>
      'fill-opacity'?: MaybeAccessor<string | number>
      'fillRule'?: MaybeAccessor<'nonzero' | 'evenodd'>
      'fill-rule'?: MaybeAccessor<'nonzero' | 'evenodd'>
      'opacity'?: MaybeAccessor<string | number>
      'transform'?: MaybeAccessor<string>
      'd'?: MaybeAccessor<string>
      'cx'?: MaybeAccessor<string | number>
      'cy'?: MaybeAccessor<string | number>
      'r'?: MaybeAccessor<string | number>
      'rx'?: MaybeAccessor<string | number>
      'ry'?: MaybeAccessor<string | number>
      'x'?: MaybeAccessor<string | number>
      'y'?: MaybeAccessor<string | number>
      'x1'?: MaybeAccessor<string | number>
      'y1'?: MaybeAccessor<string | number>
      'x2'?: MaybeAccessor<string | number>
      'y2'?: MaybeAccessor<string | number>
      'points'?: MaybeAccessor<string>
      'pathLength'?: MaybeAccessor<number>
      'preserveAspectRatio'?: MaybeAccessor<string>
      'textAnchor'?: MaybeAccessor<'start' | 'middle' | 'end'>
      'text-anchor'?: MaybeAccessor<'start' | 'middle' | 'end'>
      'dominantBaseline'?: MaybeAccessor<string>
      'dominant-baseline'?: MaybeAccessor<string>
      'clipPath'?: MaybeAccessor<string>
      'clip-path'?: MaybeAccessor<string>
      'markerStart'?: MaybeAccessor<string>
      'marker-start'?: MaybeAccessor<string>
      'markerMid'?: MaybeAccessor<string>
      'marker-mid'?: MaybeAccessor<string>
      'markerEnd'?: MaybeAccessor<string>
      'marker-end'?: MaybeAccessor<string>
    }
  }
}

type Props = {
  children?: Child | Child[]
  className?: MaybeAccessor<string>
  style?: MaybeAccessor<string | Partial<CSSStyleDeclaration>>
  ref?: (el: Element) => void
  [key: string]: unknown
} | null

type Component<P = Props> = (props: P) => Node | Child[]

type Tag = string | Component

// Check if value is a function (potential accessor/signal getter)
function isFunction(val: unknown): val is Accessor<unknown> {
  return typeof val === 'function'
}

// Helper to append nodes (handles text, nodes, arrays, and reactive accessors)
function appendChildNode(parent: Element, child: Child): void {
  if (child == null || typeof child === 'boolean')
    return

  if (Array.isArray(child)) {
    child.forEach(nested => appendChildNode(parent, nested))
    return
  }

  // Handle reactive accessor (signal getter or derived function)
  if (isFunction(child)) {
    // Create a text node placeholder
    const textNode = document.createTextNode('')
    parent.appendChild(textNode)

    // Create effect to update text content reactively
    createEffect(() => {
      const value = child()
      textNode.textContent = value == null || typeof value === 'boolean' ? '' : String(value)
    })
    return
  }

  if (child instanceof Node) {
    parent.appendChild(child)
    return
  }

  // Static text/number
  parent.appendChild(document.createTextNode(String(child)))
}

// SolidJS delegated events list (attached to document, not element)
// https://docs.solidjs.com/concepts/components/event-handlers#list-of-delegated-events
const DELEGATED_EVENTS = new Set([
  'beforeinput',
  'click',
  'dblclick',
  'contextmenu',
  'focusin',
  'focusout',
  'input',
  'keydown',
  'keyup',
  'mousedown',
  'mousemove',
  'mouseout',
  'mouseover',
  'mouseup',
  'pointerdown',
  'pointermove',
  'pointerout',
  'pointerover',
  'pointerup',
  'touchend',
  'touchmove',
  'touchstart',
])

// Event delegation: attach handler to document, dispatch to target
const delegatedHandlers = new Map<string, boolean>()

function setupDelegatedEvent(eventName: string): void {
  if (delegatedHandlers.has(eventName))
    return
  delegatedHandlers.set(eventName, true)

  document.addEventListener(eventName, (e: Event) => {
    const target = e.target as Element | null
    if (!target)
      return

    // Walk up the DOM tree to find handlers
    let node: Element | null = target
    while (node) {
      const handler = (node as unknown as Record<string, unknown>)[`__handler_${eventName}`]
      if (handler) {
        if (Array.isArray(handler)) {
          // Bound event: [handler, data]
          (handler[0] as (data: unknown, event: Event) => void)(handler[1], e)
        }
        else if (typeof handler === 'function') {
          (handler as EventListener)(e)
        }
      }
      // Stop if propagation was stopped
      if (e.cancelBubble)
        break
      node = node.parentElement
    }
  })
}

// Apply a property to an element (handles reactive and static values)
function applyProp(el: Element, key: string, val: unknown): void {
  // Handle ref
  if (key === 'ref' && isFunction(val)) {
    (val as (el: Element) => void)(el)
    return
  }

  // Handle native events: on:click, on:customEvent (case-sensitive, direct binding)
  if (key.startsWith('on:')) {
    const eventName = key.substring(3) // Keep original case
    if (isFunction(val)) {
      el.addEventListener(eventName, val as EventListener)
    }
    else if (Array.isArray(val) && typeof val[0] === 'function') {
      // Bound event: [handler, data]
      el.addEventListener(eventName, (e: Event) => {
        (val[0] as (data: unknown, event: Event) => void)(val[1], e)
      })
    }
    return
  }

  // Handle delegated events: onClick, onclick (case-insensitive for common events)
  if (key.startsWith('on') && key.length > 2) {
    const eventName = key.substring(2).toLowerCase()

    // Check if this is a delegated event
    if (DELEGATED_EVENTS.has(eventName)) {
      // Setup delegation if not already done
      setupDelegatedEvent(eventName)

      // Store handler on element for delegation
      if (isFunction(val) || Array.isArray(val)) {
        (el as unknown as Record<string, unknown>)[`__handler_${eventName}`] = val
      }
    }
    else {
      // Non-delegated event: attach directly to element
      if (isFunction(val)) {
        el.addEventListener(eventName, val as EventListener)
      }
      else if (Array.isArray(val) && typeof val[0] === 'function') {
        // Bound event: [handler, data]
        el.addEventListener(eventName, (e: Event) => {
          (val[0] as (data: unknown, event: Event) => void)(val[1], e)
        })
      }
    }
    return
  }

  // Handle className
  if (key === 'className' || key === 'class') {
    if (isFunction(val)) {
      createEffect(() => {
        el.setAttribute('class', String(val()))
      })
    }
    else if (val != null) {
      el.setAttribute('class', String(val))
    }
    return
  }

  // Handle style
  if (key === 'style') {
    if (isFunction(val)) {
      createEffect(() => {
        applyStyle(el as HTMLElement, val())
      })
    }
    else {
      applyStyle(el as HTMLElement, val)
    }
    return
  }

  // Handle other attributes (may be reactive)
  if (isFunction(val)) {
    createEffect(() => {
      const v = val()
      if (typeof v === 'boolean') {
        if (v)
          el.setAttribute(key, '')
        else el.removeAttribute(key)
      }
      else if (v == null) {
        el.removeAttribute(key)
      }
      else {
        el.setAttribute(key, String(v))
      }
    })
  }
  else if (typeof val === 'boolean') {
    if (val)
      el.setAttribute(key, '')
  }
  else if (val != null) {
    el.setAttribute(key, String(val))
  }
}

// Apply style object or string to element
function applyStyle(el: HTMLElement, style: unknown): void {
  if (style == null) {
    el.removeAttribute('style')
    return
  }
  if (typeof style === 'string') {
    el.setAttribute('style', style)
    return
  }
  if (typeof style === 'object') {
    for (const [prop, value] of Object.entries(style as Record<string, unknown>)) {
      if (value == null) {
        el.style.removeProperty(prop)
      }
      else {
        el.style.setProperty(prop, String(value))
      }
    }
  }
}

// JSX Factory function (hyperscript) - SolidJS style
function h(tag: Tag, props: Props, ...children: Child[]): Node | Child[] {
  // 1. Check if tag is a function (component)
  if (typeof tag === 'function') {
    // Pass props as-is to preserve reactivity (don't unwrap!)
    const componentProps = { ...props, children: children.flat() }
    return tag(componentProps)
  }

  // 2. If tag is a string (HTML element)
  const el = document.createElement(tag)

  // Apply properties
  if (props) {
    for (const key in props) {
      if (key === 'children')
        continue
      applyProp(el, key, props[key])
    }
  }

  // Append children (handle children passed as rest parameters)
  children.flat().forEach(child => appendChildNode(el, child))

  return el
}

// Fragment function
function Fragment(props: Props): Child[] {
  return (props?.children ?? []) as Child[]
}

/**
 * Renders a component into a container element.
 *
 * @example
 * render(() => <App />, document.getElementById('app')!);
 */
function render(component: () => Node | Child[], container: Element): void {
  const result = component()
  if (Array.isArray(result)) {
    result.forEach((child) => {
      if (child instanceof Node)
        container.appendChild(child)
    })
  }
  else if (result instanceof Node) {
    container.appendChild(result)
  }
}

export { Fragment, h, render }
export type { Accessor, Child, Component, MaybeAccessor, Props, Tag }
