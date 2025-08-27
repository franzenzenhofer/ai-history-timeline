import { TimelineData } from '../types/timeline';

export class DataLoader {
  private dataCache: TimelineData | null = null;
  private dataUrl: string;

  constructor(dataUrl: string = '/data/timeline.json') {
    this.dataUrl = dataUrl;
  }

  async loadTimelineData(): Promise<TimelineData> {
    if (this.dataCache) {
      return this.dataCache;
    }

    try {
      const response = await fetch(this.dataUrl);
      if (!response.ok) {
        throw new Error(`Failed to load timeline data: ${response.statusText}`);
      }
      
      const data = await response.json() as TimelineData;
      this.validateData(data);
      this.dataCache = data;
      return data;
    } catch (error) {
      console.error('Error loading timeline data:', error);
      throw error;
    }
  }

  private validateData(data: TimelineData): void {
    if (!data.eras || !Array.isArray(data.eras)) {
      throw new Error('Invalid timeline data: missing eras array');
    }
    
    if (!data.metadata) {
      throw new Error('Invalid timeline data: missing metadata');
    }

    data.eras.forEach((era, index) => {
      if (!era.id || !era.name || !era.period || !era.events) {
        throw new Error(`Invalid era at index ${index}`);
      }
    });
  }

  clearCache(): void {
    this.dataCache = null;
  }

  async updateData(newData: Partial<TimelineData>): Promise<TimelineData> {
    const currentData = await this.loadTimelineData();
    const updatedData = {
      ...currentData,
      ...newData,
      metadata: {
        ...currentData.metadata,
        ...newData.metadata,
        lastUpdated: new Date().toISOString().split('T')[0]
      }
    };
    
    this.dataCache = updatedData;
    return updatedData;
  }
}