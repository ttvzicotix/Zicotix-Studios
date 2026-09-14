import { useEffect, useRef, useState } from 'react'
import Dialog from './Dialog.jsx'
import { site } from '../data/site.js'
import { contactDraft, contactTopics, copyText, submitContact } from '../lib/contact.js'

export default function ContactForm({ topic = 'General enquiry', onClose }) {
  const [values, setValues] = useState({ name: '', email: '', topic: contactTopics.includes(topic) ? topic : 'General enquiry', message: '', website: '' })
  const [state, setState] = useState('idle')
  const [feedback, setFeedback] = useState('')
  const [copyFeedback, setCopyFeedback] = useState('')
  const [manualCopy, setManualCopy] = useState(false)
  const controller = useRef(null)
  const timer = useRef(null)
  const active = useRef(true)
  const pending = useRef(false)
  useEffect(() => { active.current = true; return () => { active.current = false; clearTimeout(timer.current); controller.current?.abort() } }, [])
  function close() {
    if (state === 'sending' && !window.confirm('A send request is in progress. Closing cannot undo a message already accepted by the service. Close anyway?')) return
    if (state !== 'accepted' && values.message.trim() && !window.confirm('Close this form and discard the draft?')) return
    onClose()
  }
  function update(event) {
    const { name, value } = event.target
    setValues((previous) => ({ ...previous, [name]: value }))
    if (state !== 'sending') { setState('idle'); setFeedback('') }
  }
  async function send(event) {
    event.preventDefault()
    if (pending.current || state === 'accepted') return
    if (values.website) { setState('error'); setFeedback('This submission could not be processed.'); return }
    if (!values.name.trim() || !values.message.trim()) { setState('error'); setFeedback('Please enter your name and message.'); return }
    pending.current = true; setState('sending'); setFeedback('Sending your message…')
    controller.current = new AbortController()
    timer.current = setTimeout(() => controller.current?.abort(), 15000)
    try {
      await submitContact(values, controller.current.signal)
      if (active.current) {
        setState('accepted')
        setFeedback('The delivery service accepted your message. Thank you for reaching out. This confirms service acceptance, not inbox receipt.')
      }
    } catch (error) {
      if (active.current) {
        setState('error')
        setFeedback(error.name === 'AbortError' ? 'The request timed out. Delivery is unknown, so we have not retried automatically. Your draft is still here.' : error.message)
      }
    } finally { clearTimeout(timer.current); pending.current = false }
  }
  async function copyDraft() {
    try { await copyText(contactDraft(values)); setCopyFeedback('Message copied. Nothing was sent.') }
    catch { setManualCopy(true); setCopyFeedback('Select and copy the prepared message below. Nothing was sent.') }
  }
  return <Dialog open onClose={close} title="Let's make something useful." eyebrow="Start a conversation" className="contact-dialog">
    <p className="dialog-intro">A project, an opportunity, or a question. Tell Andrew what you have in mind.</p>
    {!site.contactDeliveryVerified && <p className="delivery-notice">New contact form: inbox verification is pending. Copy your draft for urgent enquiries; do not rely on this form for time-sensitive delivery yet.</p>}
    <form onSubmit={send} className="contact-form" aria-label="Contact Zicotix" aria-busy={state === 'sending'}>
      <fieldset disabled={state === 'sending' || state === 'accepted'}>
        <legend className="sr-only">Your contact details</legend>
        <div className="form-row">
          <label>Your name <span aria-hidden="true">*</span><input name="name" autoComplete="name" required maxLength={100} value={values.name} onChange={update} placeholder="Your name" /></label>
          <label>Email address <span aria-hidden="true">*</span><input type="email" name="email" autoComplete="email" inputMode="email" required maxLength={254} value={values.email} onChange={update} placeholder="you@example.com" /></label>
        </div>
        <label>What is this about?<select name="topic" value={values.topic} onChange={update}>{contactTopics.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Your message <span aria-hidden="true">*</span><textarea name="message" required minLength={10} maxLength={4000} rows={5} value={values.message} onChange={update} placeholder="The idea, the problem, or the opportunity…" /></label>
        <span className="character-count">{values.message.length} / 4,000</span>
        <label className="form-trap" aria-hidden="true">Leave empty<input name="website" autoComplete="off" tabIndex={-1} value={values.website} onChange={update} /></label>
        <label className="consent-check"><input type="checkbox" required name="consent" /><span>I agree to send these details to Zicotix through FormSubmit so Andrew can respond. Do not include passwords or sensitive information. <a href="https://formsubmit.co/privacy.pdf" target="_blank" rel="noopener noreferrer">FormSubmit privacy</a>.</span></label>
      </fieldset>
      <div className="form-buttons"><button type="submit" className="pill pill-primary" disabled={state === 'sending' || state === 'accepted'}>{state === 'sending' ? 'Sending…' : state === 'accepted' ? 'Accepted by service' : 'Send message'}<span aria-hidden="true">↗</span></button><button className="pill" type="button" onClick={copyDraft}>Copy message</button></div>
      <p className={`form-feedback ${state}`} role="status" aria-live="polite">{feedback}</p>
      <p role="status" className="fine-print">{copyFeedback}</p>
      {manualCopy && <textarea className="manual-copy" aria-label="Prepared message for manual copying" readOnly value={contactDraft(values)} onFocus={(event) => event.target.select()} rows={6} />}
    </form>
    <div className="contact-fallback"><span>Direct address</span><a href={`mailto:${site.email}`}>{site.email}</a><span className="fine-print">The email link opens your mail app only when you choose it.</span></div>
  </Dialog>
}
