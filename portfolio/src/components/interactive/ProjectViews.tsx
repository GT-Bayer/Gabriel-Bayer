import { useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import type { Locale, Project } from '../../types/portfolio';
import type { Dictionary } from '../../i18n/en';

type View = 'project' | 'system';

interface Props {
  project: Project;
  locale: Locale;
  labels: Dictionary['work'];
  previewSrc: string;
}

export default function ProjectViews({ project, locale, labels, previewSrc }: Props) {
  const [view, setView] = useState<View>('project');
  const tabRefs = useRef<Record<View, HTMLButtonElement | null>>({ project: null, system: null });
  const id = project.id;
  const captureHost = new URL(project.preview.source).hostname;

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    let next: View;
    if (event.key === 'Home') next = 'project';
    else if (event.key === 'End') next = 'system';
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') next = view === 'project' ? 'system' : 'project';
    else return;
    event.preventDefault();
    setView(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <div className="project-views" data-view={view}>
      <div className="sheet-viewbar">
        <span className="mono sheet-record">{labels.record} / {project.number}—{view === 'project' ? 'A' : 'B'}</span>
        <div className="sheet-tabs" role="tablist" aria-label={`${labels.viewLabel} — ${project.name}`}>
          {(['project', 'system'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              id={`${id}-tab-${tab}`}
              aria-controls={`${id}-panel-${tab}`}
              aria-selected={view === tab}
              tabIndex={view === tab ? 0 : -1}
              ref={(element) => { tabRefs.current[tab] = element; }}
              onClick={() => setView(tab)}
              onKeyDown={onTabKeyDown}
            >
              <span className="tab-index" aria-hidden="true">{tab === 'project' ? '01' : '02'}</span>
              {tab === 'project' ? labels.projectView : labels.systemView}
              <span className="tab-mark" aria-hidden="true">{view === tab ? '−' : '+'}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="sheet-content-grid">
        <div className="sheet-specification">
          <div className="sheet-summary">
            <p className="sheet-tagline">{project.title[locale]}</p>
            <p className="sheet-description">{project.description[locale]}</p>
          </div>

          <dl className="sheet-metadata">
            <div className="spec-field spec-status"><dt>{labels.status}</dt><dd><i aria-hidden="true" />{project.status[locale]}</dd></div>
            <div className="spec-field"><dt>{labels.surface}</dt><dd>{project.preview.frame === 'browser' ? labels.webApplication : 'Linux CLI'}</dd></div>
            {project.role ? (
              <div className="spec-field spec-wide"><dt>{labels.role}</dt><dd>{project.role[locale]}</dd></div>
            ) : (
              <div className="spec-field spec-wide"><dt>{labels.context}</dt><dd>{project.context[locale]}</dd></div>
            )}
          </dl>

          <div className="sheet-stack">
            <span className="mono sheet-section-label">{labels.stack}</span>
            {project.stack.map((group, index) => (
              <div className="sheet-stack-group" key={group.label?.en ?? index}>
                {group.label ? <span className="mono">{group.label[locale]}</span> : null}
                <ul>{group.technologies.map((tool) => <li key={tool}>{tool}</li>)}</ul>
              </div>
            ))}
          </div>

          {project.scanModes ? (
            <div className="sheet-modes">
              <h4 className="mono sheet-section-label">{labels.scanModes}</h4>
              <ul>{project.scanModes.map((mode, index) => <li key={mode}><span aria-hidden="true">0{index + 1}</span>{mode}</li>)}</ul>
            </div>
          ) : null}

          <div className="sheet-links">
            {project.demo ? <a className="sheet-link sheet-link-primary" href={project.demo} target="_blank" rel="noopener noreferrer">{labels.demo}<span aria-hidden="true">↗</span></a> : null}
            {project.repositories.map((repository) => <a className="sheet-link" key={repository.url} href={repository.url} target="_blank" rel="noopener noreferrer" aria-label={`${repository.label[locale]} — ${project.name}`}>{repository.label[locale]}<span aria-hidden="true">↗</span></a>)}
          </div>
        </div>

        <div className="sheet-panels">
          <section
            className="project-panel"
            id={`${id}-panel-project`}
            role="tabpanel"
            aria-labelledby={`${id}-tab-project`}
            tabIndex={0}
            hidden={view !== 'project'}
          >
            <div className={`capture-frame capture-frame-${project.preview.frame}`}>
              <div className="capture-toolbar">
                <span className="frame-controls" aria-hidden="true"><i /><i /><i /></span>
                <span className="mono">{project.preview.frame === 'browser' ? captureHost : 'bayer-scan / Linux'}</span>
                <a href={previewSrc} target="_blank" rel="noopener noreferrer" aria-label={`${labels.openCapture} — ${project.name}`}>↗</a>
              </div>
              <a className="capture-image-link" href={previewSrc} target="_blank" rel="noopener noreferrer" aria-label={`${labels.openCapture} — ${project.name}`}>
                <img src={previewSrc} alt={project.preview.alt[locale]} width={project.preview.width} height={project.preview.height} loading="lazy" decoding="async" />
              </a>
              <div className="capture-caption mono"><span>{project.preview.caption[locale]}</span><span aria-hidden="true">CAP. {project.number}</span></div>
            </div>
            <dl className="capture-ledger">
              <div><dt>{labels.evidence}</dt><dd>{labels.realCapture}</dd></div>
              <div><dt>{labels.source}</dt><dd><a href={project.preview.source} target="_blank" rel="noopener noreferrer">{project.preview.frame === 'browser' ? labels.liveDemo : 'GitHub'} ↗</a></dd></div>
              <div><dt>{labels.format}</dt><dd>{project.preview.width} × {project.preview.height}</dd></div>
            </dl>
          </section>

          <section
            className="project-panel system-panel"
            id={`${id}-panel-system`}
            role="tabpanel"
            aria-labelledby={`${id}-tab-system`}
            tabIndex={0}
            hidden={view !== 'system'}
          >
            <div className="system-heading"><span className="mono">{project.diagram.kind === 'workflow' ? labels.workflow : labels.architecture} / {project.number}—B</span><span aria-hidden="true">↓</span></div>
            <h4>{project.diagram.label[locale]}</h4>
            <ol className="system-flow">
              {project.diagram.steps.map((step, index) => (
                <li key={step.number}>
                  <span className="system-node-index mono">{step.number}</span>
                  <div><strong>{step.label[locale]}</strong><span>{step.detail[locale]}</span></div>
                  <span className="system-node-arrow" aria-hidden="true">{index < project.diagram.steps.length - 1 ? '↓' : '■'}</span>
                </li>
              ))}
            </ol>
            <p className="system-caption mono">{project.diagram.caption?.[locale]}</p>
          </section>
        </div>
      </div>
      <div className="sheet-footnote mono"><span>{labels.record} / {project.id}</span><span>{view === 'project' ? labels.projectView : labels.systemView} <span aria-hidden="true">↳</span></span></div>
    </div>
  );
}
