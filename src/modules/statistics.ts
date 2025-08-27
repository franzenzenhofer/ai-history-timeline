import { TimelineData } from '../types/timeline';
import { TimeUtils } from './time-utils';

export class TimelineStatistics {
  private container: HTMLElement | null;
  
  constructor(containerId: string = 'timeline-stats') {
    this.container = document.getElementById(containerId);
  }

  render(data: TimelineData): void {
    if (!this.container) {
      // Create container if it doesn't exist
      this.container = document.createElement('div');
      this.container.id = 'timeline-stats';
      this.container.className = 'timeline-stats';
      
      // Insert after the h1
      const title = document.querySelector('h1');
      if (title && title.parentNode) {
        title.parentNode.insertBefore(this.container, title.nextSibling);
      }
    }

    // Collect all events
    const allEvents = data.eras.flatMap(era => 
      era.events.map(event => ({ ...event, eraName: era.name }))
    );

    // Calculate statistics
    const stats = TimeUtils.getTimelineStats(allEvents);
    
    // Find recent events (last 90 days)
    const recentEvents = allEvents.filter(event => {
      const date = TimeUtils.parseEventDate(event.date);
      return date && TimeUtils.daysSince(event.date) <= 90;
    });

    // Create stats HTML
    const statsHtml = `
      <div class="stats-container">
        <div class="stats-row">
          <div class="stat-item">
            <span class="stat-value">${stats.totalEvents}</span>
            <span class="stat-label">Total Events</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">${stats.earliestYear}-${stats.latestYear}</span>
            <span class="stat-label">Years Covered</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">${stats.yearsSpanned}</span>
            <span class="stat-label">Years of AI History</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">${recentEvents.length}</span>
            <span class="stat-label">Recent Updates</span>
          </div>
        </div>
        ${recentEvents.length > 0 ? `
          <div class="recent-updates">
            <h3>Latest Additions</h3>
            <ul>
              ${recentEvents.slice(0, 3).map(event => `
                <li>
                  <strong>${event.date}</strong>: ${event.title}
                  <span class="time-ago">(${TimeUtils.getRelativeTime(event.date)})</span>
                </li>
              `).join('')}
            </ul>
          </div>
        ` : ''}
        <div class="last-updated">
          Last updated: ${data.metadata.lastUpdated} • Version ${data.metadata.version}
        </div>
      </div>
    `;

    this.container.innerHTML = statsHtml;
  }

  addStyles(): void {
    const style = document.createElement('style');
    style.textContent = `
      .timeline-stats {
        max-width: 1150px;
        margin: 0 auto 40px auto;
        padding: 0 20px;
      }
      
      .stats-container {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 16px;
        padding: 30px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      }
      
      .stats-row {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 30px;
        margin-bottom: 30px;
      }
      
      .stat-item {
        text-align: center;
      }
      
      .stat-value {
        display: block;
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 5px;
      }
      
      .stat-label {
        display: block;
        font-size: 0.9rem;
        opacity: 0.9;
      }
      
      .recent-updates {
        margin-top: 25px;
        padding-top: 25px;
        border-top: 1px solid rgba(255, 255, 255, 0.2);
      }
      
      .recent-updates h3 {
        margin: 0 0 15px 0;
        font-size: 1.1rem;
      }
      
      .recent-updates ul {
        list-style: none;
        padding: 0;
      }
      
      .recent-updates li {
        margin-bottom: 10px;
        font-size: 0.95rem;
      }
      
      .time-ago {
        opacity: 0.8;
        font-size: 0.85rem;
        margin-left: 5px;
      }
      
      .last-updated {
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px solid rgba(255, 255, 255, 0.2);
        text-align: center;
        font-size: 0.85rem;
        opacity: 0.8;
      }
      
      @media (max-width: 768px) {
        .stats-container {
          padding: 20px;
        }
        
        .stats-row {
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        
        .stat-value {
          font-size: 1.5rem;
        }
      }
    `;
    document.head.appendChild(style);
  }
}