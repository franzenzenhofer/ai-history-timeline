export class TimeUtils {
  /**
   * Calculate days since an event
   */
  static daysSince(dateString: string): number {
    const eventDate = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - eventDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  /**
   * Format relative time for recent events
   */
  static getRelativeTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    }
  }

  /**
   * Check if event is recent (within last 90 days)
   */
  static isRecent(dateString: string): boolean {
    return this.daysSince(dateString) <= 90;
  }

  /**
   * Parse various date formats
   */
  static parseEventDate(dateString: string): Date | null {
    // Handle various formats: "Jan 2025", "2025", "Q1 2025", etc.
    const patterns = [
      /^(\w+)\s+(\d{4})$/, // "Jan 2025"
      /^(\d{4})$/, // "2025"
      /^Q(\d)\s+(\d{4})$/, // "Q1 2025"
      /^(\d{4})-(\d{2})$/, // "2025-01"
      /^(\d{4})-(\d{2})-(\d{2})$/, // "2025-01-27"
    ];

    // Month name to number mapping
    const months: { [key: string]: number } = {
      'Jan': 0, 'January': 0,
      'Feb': 1, 'February': 1,
      'Mar': 2, 'March': 2,
      'Apr': 3, 'April': 3,
      'May': 4,
      'Jun': 5, 'June': 5,
      'Jul': 6, 'July': 6,
      'Aug': 7, 'August': 7,
      'Sep': 8, 'Sept': 8, 'September': 8,
      'Oct': 9, 'October': 9,
      'Nov': 10, 'November': 10,
      'Dec': 11, 'December': 11
    };

    // Try "Month Year" format
    if (patterns[0].test(dateString)) {
      const match = dateString.match(patterns[0]);
      if (match) {
        const monthNum = months[match[1]];
        if (monthNum !== undefined) {
          return new Date(parseInt(match[2]), monthNum, 1);
        }
      }
    }

    // Try "Year" format
    if (patterns[1].test(dateString)) {
      const match = dateString.match(patterns[1]);
      if (match) {
        return new Date(parseInt(match[1]), 0, 1);
      }
    }

    // Try ISO date format
    if (patterns[4].test(dateString)) {
      return new Date(dateString);
    }

    return null;
  }

  /**
   * Format date for display
   */
  static formatDate(date: Date, format: 'short' | 'long' = 'short'): string {
    if (format === 'long') {
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  }

  /**
   * Calculate timeline statistics
   */
  static getTimelineStats(events: Array<{ date: string }>): {
    totalEvents: number;
    earliestYear: number;
    latestYear: number;
    yearsSpanned: number;
    eventsPerDecade: Map<string, number>;
  } {
    const years = events
      .map(e => {
        const date = this.parseEventDate(e.date);
        return date ? date.getFullYear() : null;
      })
      .filter(year => year !== null) as number[];

    const earliestYear = Math.min(...years);
    const latestYear = Math.max(...years);
    
    // Count events per decade
    const eventsPerDecade = new Map<string, number>();
    years.forEach(year => {
      const decade = `${Math.floor(year / 10) * 10}s`;
      eventsPerDecade.set(decade, (eventsPerDecade.get(decade) || 0) + 1);
    });

    return {
      totalEvents: events.length,
      earliestYear,
      latestYear,
      yearsSpanned: latestYear - earliestYear,
      eventsPerDecade
    };
  }
}