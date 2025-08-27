import { TimelineEvent, Era, Link } from '../types/timeline';

export class TimelineRenderer {
  private container: HTMLElement;
  private eventIndex: number = 0;

  constructor(containerId: string = 'timeline-container') {
    const element = document.getElementById(containerId);
    if (!element) {
      throw new Error(`Timeline container #${containerId} not found`);
    }
    this.container = element;
  }

  render(eras: Era[]): void {
    this.container.innerHTML = '';
    this.eventIndex = 0;
    
    eras.forEach((era, eraIndex) => {
      era.events.forEach((event, eventIndex) => {
        const isFirstInEra = eventIndex === 0;
        const eventElement = this.createEventElement(event, era.id, isFirstInEra);
        this.container.appendChild(eventElement);
        this.eventIndex++;
      });
    });
  }

  private createEventElement(event: TimelineEvent, eraId: string, isFirstInEra: boolean): HTMLElement {
    const eventDiv = document.createElement('div');
    const side = this.eventIndex % 2 === 0 ? 'left' : 'right';
    
    const classes = ['timeline-event', side];
    if (!isFirstInEra && event.spacing) {
      classes.push(`space-${event.spacing}`);
    }
    
    eventDiv.className = classes.join(' ');
    if (isFirstInEra) {
      eventDiv.id = eraId;
    }

    const contentDiv = this.createContentElement(event);
    eventDiv.appendChild(contentDiv);
    
    return eventDiv;
  }

  private createContentElement(event: TimelineEvent): HTMLElement {
    const contentDiv = document.createElement('div');
    contentDiv.className = 'content';

    // Date heading
    const dateHeading = document.createElement('h2');
    dateHeading.textContent = event.date;
    contentDiv.appendChild(dateHeading);

    // Section title if exists
    if (event.sectionTitle) {
      const sectionTitle = document.createElement('h3');
      sectionTitle.textContent = event.sectionTitle;
      contentDiv.appendChild(sectionTitle);
    }

    // Main description or details
    if (event.description) {
      const description = document.createElement('p');
      description.innerHTML = this.processText(event.description, event.links);
      contentDiv.appendChild(description);
    }

    if (event.details) {
      const list = document.createElement('ul');
      event.details.forEach(detail => {
        const item = document.createElement('li');
        item.innerHTML = this.processText(detail, event.links);
        list.appendChild(item);
      });
      contentDiv.appendChild(list);
    }

    // Additional text if exists
    if (event.additionalText) {
      const additionalPara = document.createElement('p');
      additionalPara.innerHTML = this.processText(event.additionalText, event.links);
      contentDiv.appendChild(additionalPara);
    }

    return contentDiv;
  }

  private processText(text: string, links?: Link[]): string {
    if (!links || links.length === 0) {
      return text;
    }

    let processedText = text;
    links.forEach(link => {
      const linkHtml = `<strong><a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.text}</a></strong>`;
      processedText = processedText.replace(link.text, linkHtml);
    });

    return processedText;
  }

  addScrollAnimations(): void {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const events = this.container.querySelectorAll('.timeline-event');
    events.forEach(event => observer.observe(event));
  }
}