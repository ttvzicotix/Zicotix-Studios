import { useState } from 'react'
import { site } from '../data/site.js'
import { copyText } from '../lib/contact.js'

/** Copy a deep link without sharing form data or any page query parameters. */
export default function ShareProjectLink({ projectId }) {
  const [feedback, setFeedback] = useState('')
  const [manual, setManual] = useState(false)
  const url = new URL(site.url)
  url.searchParams.set('project', projectId)
  url.hash = projectId
  const shareUrl = url.toString()
  async function copy() {
    try { await copyText(shareUrl); setFeedback('Project link copied') }
    catch { setManual(true); setFeedback('Select and copy the project link below') }
  }
  return <div className="project-share">
    <button type="button" className="copy-email" onClick={copy}>Copy project link</button>
    <span className="fine-print" role="status">{feedback}</span>
    {manual && <input className="share-link-input" aria-label="Project link for copying" value={shareUrl} readOnly onFocus={(event) => event.target.select()} />}
  </div>
}
