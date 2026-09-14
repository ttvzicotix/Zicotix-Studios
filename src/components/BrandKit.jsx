import { useState } from 'react'
import Dialog from './Dialog.jsx'
import { copyText } from '../lib/contact.js'
import catalog from '../../public/brand/downloads.json'
import '../brand-kit.css'
const assetUrl = (name) => `${import.meta.env.BASE_URL}brand/${name}`
const palette = [['Near black','#050407'],['White','#F7F5FA'],['Electric violet','#B523FF'],['Magenta','#E044FF'],['Deep violet','#6D1BC7']]

export default function BrandKit({ onClose }) {
  const [category, setCategory] = useState('social')
  const [message, setMessage] = useState('')
  async function copyColor(hex) {
    try { await copyText(hex); setMessage(`${hex} copied`) }
    catch { setMessage(`Copy this color: ${hex}`) }
  }
  return <Dialog open onClose={onClose} title="The Zicotix identity." eyebrow="Brand kit / 01" className="brand-dialog">
    <p className="dialog-lead">Original mark. Night-sky palette.<br />Ready for the next thing you build.</p>
    <div className="brand-download-bar"><a className="pill pill-primary" href={assetUrl(catalog.archive)} download>Download complete kit <span aria-hidden="true">↓</span></a><span className="fine-print">PNG + JPEG + SVG + profile copy</span></div>
    <div className="brand-filters" role="group" aria-label="Brand asset category">
      <button type="button" aria-pressed={category === 'social'} onClick={() => setCategory('social')}>Profile & banners</button>
      <button type="button" aria-pressed={category === 'logos'} onClick={() => setCategory('logos')}>Logo files</button>
    </div>
    <div className="brand-asset-grid">
      {catalog.assets.filter((asset) => asset.category === category).map((asset) => <article key={asset.id} className={`brand-asset brand-asset-${asset.id}`}>
        <div className={`brand-preview ${category === 'logos' ? 'brand-checkerboard' : ''}`}><img src={assetUrl(asset.preview)} alt={`${asset.title} preview`} width={asset.width} height={asset.height} loading="lazy" decoding="async" /></div>
        <div className="brand-asset-copy"><span className="brand-size">{asset.size}</span><h3>{asset.title}</h3><p>{asset.description}</p><div className="brand-file-links">{Object.entries(asset.files).map(([format, file]) => <a key={format} href={assetUrl(file)} download aria-label={`Download ${asset.title} as ${format}`}>{format}<span aria-hidden="true">↓</span></a>)}</div></div>
      </article>)}
    </div>
    <section className="brand-palette" aria-labelledby="brand-palette-title"><h3 id="brand-palette-title">A little color. A lot of character.</h3><div className="brand-swatches">{palette.map(([name, hex]) => <button type="button" key={hex} onClick={() => copyColor(hex)} aria-label={`Copy ${name}: ${hex}`}><span style={{backgroundColor:hex}} /><strong>{name}</strong><code>{hex}</code></button>)}</div><p className="fine-print" role="status">{message || 'Select a swatch to copy its hex color.'}</p></section>
    <p className="fine-print">PNG logos have transparent backgrounds; JPEG versions include a background. Check each social platform's crop preview before saving.</p>
    <div className="dialog-actions"><a href={assetUrl('SOCIAL-BIOS.txt')} download className="text-link">Download bio drafts <span aria-hidden="true">↓</span></a><a href={assetUrl('palette.json')} download className="text-link">Color palette <span aria-hidden="true">↓</span></a></div>
  </Dialog>
}
