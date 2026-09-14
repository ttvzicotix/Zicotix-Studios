import { socials } from '../data/site.js'
const icons = {
  GitHub: 'M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.75-1.32-3.75-1.32-.5-1.29-1.23-1.63-1.23-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.59 1.21 3.22.92.1-.72.39-1.21.71-1.49-2.48-.28-5.09-1.24-5.09-5.51 0-1.22.44-2.22 1.15-3-.11-.28-.5-1.42.11-2.96 0 0 .93-.3 3.06 1.14a10.6 10.6 0 0 1 5.57 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.54.23 2.68.12 2.96.71.78 1.14 1.78 1.14 3 0 4.28-2.61 5.22-5.1 5.5.4.35.75 1.03.75 2.07v3.09c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z',
  TikTok: 'M16 2h-3v13a3 3 0 1 1-3-3V9a6 6 0 1 0 6 6V8a8 8 0 0 0 5 2V7a5 5 0 0 1-5-5Z',
}
export default function SocialLinks({ className = '' }) {
  return <div className={`social-links ${className}`} aria-label="Zicotix social profiles">{socials.map(({ name, handle, url }) => <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={`${name}: ${handle} (opens new tab)`}><svg width="19" height="19" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d={icons[name]} /></svg><span>{name}</span><span className="social-arrow" aria-hidden="true">↗</span></a>)}</div>
}
