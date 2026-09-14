import { useRef, useState } from 'react'
import Dialog from './Dialog.jsx'
import { projectDetails } from '../data/site.js'
import ShareProjectLink from './ShareProjectLink.jsx'

export default function ProjectDetails({ id, onClose, onContact }) {
  const project = projectDetails[id]
  const [tab, setTab] = useState('Overview')
  const buttons = useRef([])
  const tabs = ['Overview', 'Workflow', 'Direction']
  if (!project) return null
  const changeTab = (event, index) => {
    let next = index
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length
    else if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = tabs.length - 1
    else return
    event.preventDefault(); setTab(tabs[next]); buttons.current[next].focus()
  }
  return <Dialog open onClose={onClose} title={project.name} eyebrow={project.category}>
    <p className="status-label"><span />{project.status}</p>
    <p className="dialog-lead">{project.introduction}</p>
    <div role="tablist" aria-label={`${project.name} details`} className="detail-tabs">
      {tabs.map((name, index) => <button key={name} ref={(node) => { buttons.current[index] = node }} type="button" role="tab" id={`${id}-tab-${name}`} aria-controls={`${id}-panel`} aria-selected={tab === name} tabIndex={tab === name ? 0 : -1} onKeyDown={(event) => changeTab(event, index)} onClick={() => setTab(name)}>{name}</button>)}
    </div>
    <section role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${tab}`} tabIndex={0} className="detail-tabpanel">
      {tab === 'Overview' && <><p>{project.overview}</p><div className="detail-feature-grid">{project.features.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div></>}
      {tab === 'Workflow' && <><p className="example-question">{project.example}</p><ol className="workflow-list">{project.workflow.map(([title, body], index) => <li key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{body}</p></div></li>)}</ol><p className="fine-print">{project.exampleNote}</p></>}
      {tab === 'Direction' && <><h3>Where it is heading</h3><ul className="roadmap-list">{project.roadmap.map((item) => <li key={item}>{item}</li>)}</ul><p className="scope-note">{project.boundaries}</p><div className="tags detail-tags">{project.tech.map((item) => <span key={item}>{item}</span>)}</div></>}
    </section>
    <ShareProjectLink projectId={id} />
    <div className="dialog-actions"><button type="button" className="pill pill-primary" onClick={() => onContact(project.name)}>Talk about {project.name}<span aria-hidden="true">↗</span></button>{project.link && <a href={project.link.url} target="_blank" rel="noopener noreferrer" className="text-link">{project.link.label}<span aria-hidden="true">↗</span></a>}</div>
  </Dialog>
}
