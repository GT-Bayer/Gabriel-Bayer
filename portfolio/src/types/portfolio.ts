export type Locale = 'en' | 'es';
export type Localized<T> = Record<Locale, T>;

export interface Project {
  id: 'careconnect' | 'bayer-scan';
  number: string;
  name: string;
  featured: boolean;
  category: Localized<string>;
  status: Localized<string>;
  title: Localized<string>;
  description: Localized<string>;
  scope: Localized<string>;
  approach: Localized<string>;
  context: Localized<string>;
  role?: Localized<string>;
  scanModes?: string[];
  stack: { label?: Localized<string>; technologies: string[] }[];
  repositories: { label: Localized<string>; url: string }[];
  demo?: string;
  preview: {
    src: string;
    alt: Localized<string>;
    frame: 'browser' | 'terminal';
    source: string;
    caption: Localized<string>;
    width: number;
    height: number;
  };
  diagram: {
    kind: 'concept' | 'system' | 'workflow';
    label: Localized<string>;
    caption?: Localized<string>;
    steps: { number: string; label: Localized<string>; detail: Localized<string> }[];
  };
}
