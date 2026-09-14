import { site } from '../data/site.js'

export const contactTopics = ['General enquiry', 'Aegis', 'Optima', 'Project collaboration', 'Career opportunity']
export function contactDraft(values) {
  return `To: ${site.email}\nFrom: ${values.name}\nReply to: ${values.email}\nTopic: ${values.topic}\n\n${values.message}`
}
export async function submitContact(values, signal) {
  const response = await fetch(site.formEndpoint, {
    method: 'POST', mode: 'cors', credentials: 'omit', redirect: 'error', signal,
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ name: values.name.trim(), email: values.email.trim(), message: values.message.trim(), topic: values.topic, _subject: `Zicotix website: ${values.topic}`, _template: 'table', _honey: values.website || '' }),
  })
  if (!response.ok) throw new Error('The delivery service could not accept this message. Your text is still here. Please copy it or try again later.')
  const result = await response.json()
  const message = String(result.message || '')
  if (/activat|confirm.*email|verif/i.test(message)) throw new Error('The destination inbox still needs verification. Your message is not confirmed delivered. Please copy your message and contact the email shown below.')
  if (result.success !== true && result.success !== 'true') throw new Error('The delivery service did not confirm acceptance. Your text has been preserved.')
  return { accepted: true }
}
export async function copyText(value) {
  if (!navigator.clipboard?.writeText) throw new Error('Copy is unavailable in this browser. Please select and copy the text manually.')
  await navigator.clipboard.writeText(value)
}
