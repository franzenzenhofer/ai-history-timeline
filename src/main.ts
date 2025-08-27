import './styles/variables.css';
import './styles/base.css';
import './styles/navigation.css';
import './styles/timeline.css';

import { DataLoader } from './modules/data-loader';
import { Navigation } from './modules/navigation';
import { TimelineRenderer } from './modules/timeline-renderer';
import { TimelineData } from './types/timeline';

class AIHistoryTimeline {
  private dataLoader: DataLoader;
  private navigation: Navigation;
  private timelineRenderer: TimelineRenderer;
  private isInitialized: boolean = false;

  constructor() {
    this.dataLoader = new DataLoader();
    this.navigation = new Navigation('sticky-nav');
    this.timelineRenderer = new TimelineRenderer('timeline-container');
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) {
      console.warn('Timeline already initialized');
      return;
    }

    try {
      // Show loading state
      this.showLoading();

      // Load timeline data
      const timelineData = await this.dataLoader.loadTimelineData();

      // Render components
      this.renderTimeline(timelineData);

      // Set up event listeners
      this.setupEventListeners();

      // Add scroll animations
      this.timelineRenderer.addScrollAnimations();

      // Update metadata
      this.updateMetadata(timelineData);

      this.isInitialized = true;
      this.hideLoading();

    } catch (error) {
      console.error('Failed to initialize timeline:', error);
      this.showError('Failed to load timeline. Please refresh the page.');
    }
  }

  private renderTimeline(data: TimelineData): void {
    // Render navigation
    this.navigation.render(data.eras);

    // Render timeline events
    this.timelineRenderer.render(data.eras);
  }

  private setupEventListeners(): void {
    // Scroll progress indicator
    this.setupScrollProgress();

    // Active section highlighting
    window.addEventListener('scroll', () => {
      this.navigation.highlightActiveSection();
      this.updateScrollProgress();
    });

    // Smooth scroll polyfill for older browsers
    this.polyfillSmoothScroll();
  }

  private setupScrollProgress(): void {
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    indicator.innerHTML = '<div class="scroll-indicator-progress"></div>';
    document.body.appendChild(indicator);
  }

  private updateScrollProgress(): void {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    const progress = document.querySelector('.scroll-indicator-progress') as HTMLElement;
    if (progress) {
      progress.style.width = `${scrolled}%`;
    }
  }

  private updateMetadata(data: TimelineData): void {
    // Update page metadata
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        `Comprehensive timeline of AI development from 1950 to ${new Date().getFullYear()}. Last updated: ${data.metadata.lastUpdated}`);
    }

    // Add version info to console
    console.info(`AI History Timeline v${data.metadata.version}`);
    console.info(`Last updated: ${data.metadata.lastUpdated}`);
  }

  private showLoading(): void {
    const container = document.getElementById('timeline-container');
    if (container) {
      container.classList.add('loading');
      container.innerHTML = '<div class="loading-message">Loading timeline data...</div>';
    }
  }

  private hideLoading(): void {
    const container = document.getElementById('timeline-container');
    if (container) {
      container.classList.remove('loading');
    }
  }

  private showError(message: string): void {
    const container = document.getElementById('timeline-container');
    if (container) {
      container.innerHTML = `<div class="error">${message}</div>`;
    }
  }

  private polyfillSmoothScroll(): void {
    // Simple smooth scroll polyfill
    if (!('scrollBehavior' in document.documentElement.style)) {
      const anchors = document.querySelectorAll('a[href^="#"]');
      anchors.forEach(anchor => {
        anchor.addEventListener('click', (e: Event) => {
          e.preventDefault();
          const target = anchor.getAttribute('href');
          if (target) {
            const element = document.querySelector(target);
            element?.scrollIntoView({ behavior: 'smooth' });
          }
        });
      });
    }
  }

  // Public method to refresh data
  async refresh(): Promise<void> {
    this.dataLoader.clearCache();
    this.isInitialized = false;
    await this.initialize();
  }

  // Public method to get current data
  async getData(): Promise<TimelineData> {
    return await this.dataLoader.loadTimelineData();
  }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const timeline = new AIHistoryTimeline();
    timeline.initialize();
    
    // Make instance available globally for debugging
    (window as any).aiTimeline = timeline;
  });
} else {
  const timeline = new AIHistoryTimeline();
  timeline.initialize();
  (window as any).aiTimeline = timeline;
}

export default AIHistoryTimeline;