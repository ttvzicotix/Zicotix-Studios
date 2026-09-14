import { useEffect, useRef } from 'react'

export default function Dialog({ open, onClose, title, eyebrow, children, className = '' }) {
  const dialog = useRef(null)
  const titleId = `dialog-title-${eyebrow?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'details'}`
  useEffect(() => {
    if (!open) return
    const previous = document.activeElement
    const node = dialog.current
    const scrollY = window.scrollY
    const body = document.body
    const prior = { position: body.style.position, top: body.style.top, width: body.style.width, overflow: body.style.overflow }
    node.showModal()
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.width = '100%'
    body.style.overflow = 'hidden'
    return () => {
      node.close()
      Object.assign(body.style, prior)
      const style = document.documentElement.style.scrollBehavior
      document.documentElement.style.scrollBehavior = 'auto'
      window.scrollTo(0, scrollY)
      document.documentElement.style.scrollBehavior = style
      if (previous instanceof HTMLElement && previous.isConnected) previous.focus({ preventScroll: true })
    }
  }, [open])
  return (
    <dialog ref={dialog} className={`detail-dialog ${className}`} aria-labelledby={titleId} onKeyDown={(event) => {
      if (event.key !== 'Tab') return
      const nodes = [...dialog.current.querySelectorAll('button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]')].filter((node) => node.tabIndex >= 0 && node.getClientRects().length > 0)
      const first = nodes[0], last = nodes[nodes.length - 1]
      if (!first) { event.preventDefault(); return }
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }} onCancel={(event) => { event.preventDefault(); onClose() }} onClick={(event) => {
      if (event.target !== dialog.current) return
      const bounds = dialog.current.getBoundingClientRect()
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose()
    }}>
      <div className="dialog-header">
        <div><p className="dialog-eyebrow">{eyebrow}</p><h2 id={titleId}>{title}</h2></div>
        <button type="button" className="dialog-close" aria-label="Close panel" onClick={onClose} autoFocus><span aria-hidden="true">×</span></button>
      </div>
      <div className="dialog-body">{children}</div>
    </dialog>
  )
}
