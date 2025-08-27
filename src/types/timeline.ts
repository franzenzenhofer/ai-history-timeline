export interface Link {
  text: string;
  url: string;
}

export interface TimelineEvent {
  date: string;
  title: string;
  description?: string;
  sectionTitle?: string;
  details?: string[];
  additionalText?: string;
  links?: Link[];
  spacing?: 'medium' | 'large' | 'xlarge';
}

export interface Era {
  id: string;
  name: string;
  period: string;
  events: TimelineEvent[];
}

export interface TimelineMetadata {
  lastUpdated: string;
  version: string;
  sources: string[];
}

export interface TimelineData {
  eras: Era[];
  metadata: TimelineMetadata;
}

export interface NavLink {
  href: string;
  text: string;
}