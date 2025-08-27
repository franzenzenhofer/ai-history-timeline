import { Era, NavLink } from '../types/timeline';

export class Navigation {
  private container: HTMLElement;
  private links: NavLink[] = [];

  constructor(containerId: string = 'sticky-nav') {
    const element = document.getElementById(containerId);
    if (!element) {
      throw new Error(`Navigation container #${containerId} not found`);
    }
    this.container = element;
  }

  generateLinks(eras: Era[]): NavLink[] {
    return eras.map(era => ({
      href: `#${era.id}`,
      text: era.period
    }));
  }

  render(eras: Era[]): void {
    this.links = this.generateLinks(eras);
    
    const navLinksContainer = document.createElement('div');
    navLinksContainer.className = 'nav-links';
    
    this.links.forEach(link => {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.textContent = link.text;
      anchor.addEventListener('click', this.handleLinkClick.bind(this));
      navLinksContainer.appendChild(anchor);
    });
    
    this.container.innerHTML = '';
    this.container.appendChild(navLinksContainer);
  }

  private handleLinkClick(event: Event): void {
    const target = event.target as HTMLAnchorElement;
    const href = target.getAttribute('href');
    if (href?.startsWith('#')) {
      event.preventDefault();
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  highlightActiveSection(): void {
    const sections = document.querySelectorAll('.timeline-event[id]');
    const scrollPosition = window.scrollY + 100;

    let currentSection = '';
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      if (scrollPosition >= top) {
        currentSection = section.id;
      }
    });

    const links = this.container.querySelectorAll('a');
    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }
}