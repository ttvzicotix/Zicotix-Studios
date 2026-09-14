import Dialog from './Dialog.jsx'
import SocialLinks from './SocialLinks.jsx'

export default function StudioDetails({ onClose, onContact }) {
  return <Dialog open onClose={onClose} title="Built by Andrew. Made to be useful." eyebrow="Behind Zicotix">
    <p className="dialog-lead">Engineering thinking. A builder's curiosity. Software that earns its place.</p>
    <p>I'm Andrew Gungoll, an Industrial Engineering & Management student at Oklahoma State University. Zicotix is the home for my independent work in intelligent software, optimization, and automation.</p>
    <p>The projects here bring together an interest in how real systems work and the tools to improve them: software, data, local AI, and hands-on experimentation. The visual style comes from a Zicotix identity I first made for my gaming channel years ago.</p>
    <div className="detail-feature-grid"><article><h3>Systems, not just interfaces</h3><p>Understanding the workflow comes before automating it. A beautiful screen should make a useful system easier to understand.</p></article><article><h3>Visible tradeoffs</h3><p>Evidence, assumptions, and uncertainty belong in the decision—not hidden behind a confident answer.</p></article><article><h3>Build, test, refine</h3><p>Start with an honest prototype. Test the important paths. Make it better without pretending it is finished.</p></article></div>
    <p className="scope-note">Aegis and Optima are ongoing independent projects. This site is a portfolio, not a claim that every planned capability is generally available.</p>
    <SocialLinks />
    <div className="dialog-actions"><button type="button" className="pill pill-primary" onClick={() => onContact('Career opportunity')}>Discuss an opportunity<span aria-hidden="true">↗</span></button></div>
  </Dialog>
}
