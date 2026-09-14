export default function FAQ({ onContact }) {
  const items = [
    ['Can I use Aegis or Optima today?', 'Both are active development projects. Aegis is private, and the Optima public lab is at foundation stage. Get in touch to discuss the work or ask about a demonstration; there is no public agent login or hosted solver here.'],
    ['Is this site running an AI model?', 'No. This is a React portfolio with a lightweight visual layer. Browsing it does not connect you to Aegis, run an AI session, or spend model credits.'],
    ['Where are the Decision Packs?', 'The four-pack decision-intelligence bundle is planned at $44. It is not on sale yet. When it is ready, a separate storefront will handle checkout and downloads; this site will link to it.'],
    ['Does the site work without animation?', 'Yes. Use Pause atmosphere in the hero or your device’s reduced-motion setting. The text, project details, navigation, and contact form remain usable.'],
  ]
  return <section className="faq section" id="questions" aria-labelledby="faq-title"><div className="faq-layout"><div data-reveal><p className="kicker">A LITTLE MORE CONTEXT</p><h2 id="faq-title">Good questions.<br /><span>Clear answers.</span></h2><button type="button" className="text-link" onClick={() => onContact('General enquiry')}>Ask something else<span aria-hidden="true">↗</span></button></div><div className="faq-items">{items.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></div></section>
}
