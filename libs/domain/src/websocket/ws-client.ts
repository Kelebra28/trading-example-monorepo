import { CurrencyData } from "@monorepo/utils";
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

  private static eventListeners = new Map<string, Set<Function>>();

  static addEventListener(event: string, callback: Function) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, new Set());
    }
    this.eventListeners.get(event)?.add(callback);
  }

  static removeEventListener(event: string, callback: Function) {
    this.eventListeners.get(event)?.delete(callback);
  }

  private static emit(event: string, ...args: any[]) {
    this.eventListeners.get(event)?.forEach(cb => cb(...args));
  }

  private static setupEventListeners() {
    if (!this.instance) return;

    this.instance.onopen = () => {
      this.emit('connect');
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
      this.emit('disconnect');
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