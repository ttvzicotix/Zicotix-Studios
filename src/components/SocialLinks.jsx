import { socials } from '../data/site.js'

function SocialIcon({ name }) {
  const common = { width: 19, height: 19, viewBox: '0 0 24 24', 'aria-hidden': true, focusable: false }
  if (name === 'Instagram') return <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".9" fill="currentColor" stroke="none" /></svg>
  if (name === 'YouTube') return <svg {...common} fill="currentColor"><path d="M21.5 7a2.8 2.8 0 0 0-2-2C17.7 4.5 12 4.5 12 4.5s-5.7 0-7.5.5a2.8 2.8 0 0 0-2 2A29 29 0 0 0 2 12a29 29 0 0 0 .5 5 2.8 2.8 0 0 0 2 2c1.8.5 7.5.5 7.5.5s5.7 0 7.5-.5a2.8 2.8 0 0 0 2-2 29 29 0 0 0 .5-5 29 29 0 0 0-.5-5ZM10 15.5v-7l6 3.5-6 3.5Z" /></svg>
  const paths = {
    GitHub: 'M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.75-1.32-3.75-1.32-.5-1.29-1.23-1.63-1.23-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.59 1.21 3.22.92.1-.72.39-1.21.71-1.49-2.48-.28-5.09-1.24-5.09-5.51 0-1.22.44-2.22 1.15-3-.11-.28-.5-1.42.11-2.96 0 0 .93-.3 3.06 1.14a10.6 10.6 0 0 1 5.57 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.54.23 2.68.12 2.96.71.78 1.14 1.78 1.14 3 0 4.28-2.61 5.22-5.1 5.5.4.35.75 1.03.75 2.07v3.09c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z',
    TikTok: 'M16 2h-3v13a3 3 0 1 1-3-3V9a6 6 0 1 0 6 6V8a8 8 0 0 0 5 2V7a5 5 0 0 1-5-5Z',
  }
  return <svg {...common}><path fill="currentColor" d={paths[name] || ''} /></svg>
}

export default function SocialLinks({ className = '' }) {
  return <div className={`social-links ${className}`} role="group" aria-label="Zicotix social profiles">
    {socials.map(({ name, handle, url }) => <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={`${name}: ${handle} (opens new tab)`} title={`${name} ${handle}`}><SocialIcon name={name} /><span>{name}</span><span className="social-arrow" aria-hidden="true">↗</span></a>)}
  </div>
}
