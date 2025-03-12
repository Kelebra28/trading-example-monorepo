import { WSClient } from "../websocket/ws-client";
import { CurrencyData } from "@utils/types";


class MockWebSocket {
  static CONNECTING = 0;
  static OPEN = 1;
  static CLOSING = 2;
  static CLOSED = 3;

  static instances: MockWebSocket[] = [];
  onopen: () => void = () => {};
  onmessage: (event: { data: string }) => void = () => {};
  onerror: (error: Event) => void = () => {};
  onclose: () => void = () => {};
  readyState: number = MockWebSocket.CONNECTING;
  url: string;

  constructor(url: string) {
    this.url = url;
    MockWebSocket.instances.push(this);
  }

  close() {
    this.readyState = MockWebSocket.CLOSED;
    this.onclose();
  }

  simulateOpen() {
    this.readyState = MockWebSocket.OPEN;
    this.onopen();
  }

  simulateMessage(data: any) {
    this.onmessage({ data: JSON.stringify(data) });
  }

  simulateError(error: Event) {
    this.onerror(error);
  }

  simulateClose() {
    this.readyState = MockWebSocket.CLOSED;
    this.onclose();
  }
}

// 2. Reemplazar WebSocket global ANTES de cualquier importación
global.WebSocket = MockWebSocket as any;

describe("WSClient", () => {
  const url = "ws://example.com";

  beforeEach(() => {
    // 3. Resetear todas las instancias y estados estáticos
    MockWebSocket.instances = [];
    WSClient["listeners"].clear();
    WSClient["retries"] = 0;
    WSClient["instance"] = null; // Forzar nueva conexión en cada prueba
  });

  it("should establish a WebSocket connection", () => {
    WSClient.connect(url);
    expect(MockWebSocket.instances.length).toBe(1);
    expect(MockWebSocket.instances[0].url).toBe(url);
  });

  it("should handle the onopen event", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    
    WSClient.connect(url);
    const instance = MockWebSocket.instances[0];
    instance.simulateOpen();

    expect(consoleSpy).toHaveBeenCalledWith("WebSocket connection established");
    expect(WSClient["retries"]).toBe(0);
    consoleSpy.mockRestore();
  });

  it("should handle the onmessage event with valid data", () => {
    const mockData: CurrencyData = { pair: "EURUSD", point: 1.2, currency: "EUR" };
    const callback = jest.fn();

    WSClient.connect(url);
    WSClient.subscribe(callback);
    
    const instance = MockWebSocket.instances[0];
    instance.simulateMessage(mockData);

    expect(callback).toHaveBeenCalledWith(mockData);
  });

  it("should handle the onmessage event with invalid data", () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    const invalidData = { pair: "EURUSD" }; // Sin 'point'

    WSClient.connect(url);
    const instance = MockWebSocket.instances[0];
    instance.simulateMessage(invalidData);

    expect(consoleSpy).toHaveBeenCalledWith("Invalid WebSocket data:", expect.any(Error));
    consoleSpy.mockRestore();
  });

  it("should handle the onerror event", () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    const mockError = new Event("error");

    WSClient.connect(url);
    const instance = MockWebSocket.instances[0];
    instance.simulateError(mockError);

    expect(consoleSpy).toHaveBeenCalledWith("WebSocket error:", mockError);
    consoleSpy.mockRestore();
  });

  it("should handle the onclose event and reconnect", () => {
    jest.useFakeTimers();
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    WSClient.connect(url);
    const instance = MockWebSocket.instances[0];
    instance.simulateClose();

    expect(consoleSpy).toHaveBeenCalledWith("WebSocket connection closed");
    
    jest.advanceTimersByTime(3000);
    expect(MockWebSocket.instances.length).toBe(2); // Nueva instancia tras reconexión

    consoleSpy.mockRestore();
    jest.useRealTimers();
  });

  it("should stop reconnecting after MAX_RETRIES", () => {
    jest.useFakeTimers();
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    WSClient.connect(url);
    let instance = MockWebSocket.instances[0];

    // Simular MAX_RETRIES cierres + 1 para superar el límite
    for (let i = 0; i <= WSClient["MAX_RETRIES"]; i++) {
      instance.simulateClose();
      jest.advanceTimersByTime(3000);
      instance = MockWebSocket.instances[MockWebSocket.instances.length - 1]; // Última instancia
    }

    expect(consoleSpy).toHaveBeenCalledWith("Max retries reached. Giving up.");
    consoleSpy.mockRestore();
    jest.useRealTimers();
  });

  it("should add and remove listeners", () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    const unsubscribe1 = WSClient.subscribe(callback1);
    const unsubscribe2 = WSClient.subscribe(callback2);

    expect(WSClient["listeners"].size).toBe(2);

    unsubscribe1();
    expect(WSClient["listeners"].size).toBe(1);

    unsubscribe2();
    expect(WSClient["listeners"].size).toBe(0);
  });

  it("should report the connection state correctly", () => {
    WSClient.connect(url);
    const instance = MockWebSocket.instances[0];

    expect(WSClient.getConnectionState()).toBe("CONNECTING");

    instance.simulateOpen();
    expect(WSClient.getConnectionState()).toBe("OPEN");

    instance.simulateClose();
    expect(WSClient.getConnectionState()).toBe("CLOSED");
  });
});