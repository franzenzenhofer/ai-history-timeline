import { TimelineData } from '../types/timeline';

export class UpdateChecker {
  private lastCheckDate: string;
  private updateInterval: number = 24 * 60 * 60 * 1000; // 24 hours

  constructor() {
    this.lastCheckDate = localStorage.getItem('timeline-last-check') || '';
  }

  shouldCheckForUpdates(): boolean {
    if (!this.lastCheckDate) return true;
    
    const lastCheck = new Date(this.lastCheckDate).getTime();
    const now = Date.now();
    
    return (now - lastCheck) > this.updateInterval;
  }

  async checkForUpdates(currentVersion: string): Promise<boolean> {
    try {
      // In production, this would check against a version endpoint
      const response = await fetch('/api/version');
      if (!response.ok) return false;
      
      const { version } = await response.json();
      return version !== currentVersion;
    } catch {
      // Silently fail if update check fails
      return false;
    }
  }

  markChecked(): void {
    const now = new Date().toISOString();
    this.lastCheckDate = now;
    localStorage.setItem('timeline-last-check', now);
  }

  async fetchLatestData(): Promise<TimelineData | null> {
    try {
      // In production, this would fetch from a CDN-cached endpoint
      const response = await fetch('/data/timeline.json', {
        cache: 'no-cache'
      });
      
      if (!response.ok) return null;
      
      const data = await response.json() as TimelineData;
      return data;
    } catch {
      return null;
    }
  }

  notifyUpdateAvailable(): void {
    // Check if browser supports notifications
    if (!('Notification' in window)) return;

    // Request permission if needed
    if (Notification.permission === 'granted') {
      new Notification('AI Timeline Updated', {
        body: 'New AI developments have been added to the timeline!',
        icon: '/favicon.svg'
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('AI Timeline Updated', {
            body: 'New AI developments have been added to the timeline!',
            icon: '/favicon.svg'
          });
        }
      });
    }
  }
}