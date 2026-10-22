import { useState } from 'react';

interface Props {
  email: string;
  labels: {
    send: string;
    copy: string;
    copied: string;
    copying: string;
    copyError: string;
    copySuccess: string;
  };
}

export default function ContactActions({ email, labels }: Props) {
  const [status, setStatus] = useState<'idle' | 'copying' | 'copied' | 'error'>('idle');

  async function copyEmail() {
    setStatus('copying');
    try {
      await navigator.clipboard.writeText(email);
      setStatus('copied');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="contact-actions">
      <div className="contact-buttons">
        <a className="button button-ink" href={`mailto:${email}`}>
          {labels.send}<span aria-hidden="true">↗</span>
        </a>
        <button className="button button-contact-copy" type="button" onClick={copyEmail} disabled={status === 'copying'}>
          {status === 'copying' ? labels.copying : status === 'copied' ? labels.copied : labels.copy}
          <span aria-hidden="true">{status === 'copied' ? '✓' : '⧉'}</span>
        </button>
      </div>
      <p className="copy-status mono" role="status" aria-live="polite" aria-atomic="true">
        {status === 'copied' ? labels.copySuccess : status === 'error' ? labels.copyError : ''}
      </p>
    </div>
  );
}
