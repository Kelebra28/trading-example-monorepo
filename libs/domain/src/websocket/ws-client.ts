import { CurrencyData } from "@utils/types";
export class WSClient {
  private static instance: WebSocket | null = null;
  private static listeners = new Set<(data: CurrencyData) => void>();
  private static retries = 0;
  private static MAX_RETRIES = 5;
  
  static connect(url: string) {
    if (!this.instance || this.instance.readyState === WebSocket.CLOSED) {
      this.instance = new WebSocket(url);
      this.setupEventListeners();
    }
  }

  private static setupEventListeners() {
    if (!this.instance) return;

    this.instance.onopen = () => {
      console.log('WebSocket connection established');
      this.retries = 0; 
    };

    this.instance.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.validateData(data);
        this.listeners.forEach(cb => cb(data));
      } catch (error) {
        console.error('Invalid WebSocket data:', error);
      }
    };

    this.instance.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    this.instance.onclose = () => {
      console.log('WebSocket connection closed');
      if (this.retries < this.MAX_RETRIES) {
        setTimeout(() => {
          this.connect(this.instance?.url || '');
          this.retries++;
        }, 3000);
      } else {
        console.error('Max retries reached. Giving up.');
      }
    };
  }
  private static validateData(data: any): asserts data is CurrencyData {
    if (!data?.pair || typeof data?.point !== 'number') {
      throw new Error('Invalid WebSocket data format');
    }
  }

  static subscribe(callback: (data: CurrencyData) => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  static getConnectionState(): string {
    if (!this.instance) return 'CLOSED';
    switch (this.instance.readyState) {
      case WebSocket.CONNECTING:
        return 'CONNECTING';
      case WebSocket.OPEN:
        return 'OPEN';
      case WebSocket.CLOSING:
        return 'CLOSING';
      case WebSocket.CLOSED:
        return 'CLOSED';
      default:
        return 'UNKNOWN';
    }
  }
}