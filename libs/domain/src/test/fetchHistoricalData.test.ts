import { fetchHistoricalData } from "../fetchs";
import { HttpClient, HistoricalData } from "@utils/types";

describe("fetchHistoricalData", () => {
  const mockHttpClient = {
    get: jest.fn(),
  } as jest.Mocked<HttpClient>;

  const baseUrl = "https://api.example.com";
  const currencyId = "EURUSD";

  afterEach(() => {
    jest.clearAllMocks(); // Limpiar mocks después de cada prueba
  });

  // Prueba 1: Debe obtener y transformar los datos históricos correctamente
  it("should fetch and transform historical data correctly", async () => {
    // Mock de la respuesta de la API
    const mockResponse = {
      data: {
        "Time Series FX": {
          "2023-10-01": { open: 1.2, high: 1.3, low: 1.1, close: 1.25 },
          "2023-10-02": { open: 1.25, high: 1.35, low: 1.15, close: 1.3 },
        },
      },
    };

    mockHttpClient.get.mockResolvedValue(mockResponse);

    const result = await fetchHistoricalData(
      mockHttpClient,
      baseUrl,
      currencyId
    );

    // Verificar que se llamó a httpClient.get con la URL correcta
    expect(mockHttpClient.get).toHaveBeenCalledWith(
      `${baseUrl}/historic-data/${currencyId}`
    );

    // Verificar que los datos se transformaron correctamente
    expect(result).toEqual([
      { date: "2023-10-01", open: 1.2, high: 1.3, low: 1.1, close: 1.25 },
      { date: "2023-10-02", open: 1.25, high: 1.35, low: 1.15, close: 1.3 },
    ]);
  });

  // Prueba 2: Debe lanzar un error si la URL base no es válida
  it("should throw an error if baseUrl is invalid", async () => {
    const invalidBaseUrl = "invalid-url";

    await expect(
      fetchHistoricalData(mockHttpClient, invalidBaseUrl, currencyId)
    ).rejects.toThrow(`URL base inválida: ${invalidBaseUrl}`);
  });

  // Prueba 3: Debe lanzar un error si la API devuelve un error
  it("should throw an error if the API call fails", async () => {
    const mockError = new Error("Network error");
    mockHttpClient.get.mockRejectedValue(mockError);

    await expect(
      fetchHistoricalData(mockHttpClient, baseUrl, currencyId)
    ).rejects.toThrow("Network error");
  });

  // Prueba 4: Debe manejar una respuesta vacía o inválida de la API
  it('should handle empty or invalid API response', async () => {
    const mockResponse = {
      data: {}, 
    };
  
    mockHttpClient.get.mockResolvedValue(mockResponse);
  
    const result = await fetchHistoricalData(mockHttpClient, baseUrl, currencyId);

    expect(result).toEqual([]);
  });
  // Prueba 5: Debe registrar un error en la consola si la API falla
  it("should log an error if the API call fails", async () => {
    const mockError = new Error("Network error");
    mockHttpClient.get.mockRejectedValue(mockError);

    // Mockear console.error
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await expect(
      fetchHistoricalData(mockHttpClient, baseUrl, currencyId)
    ).rejects.toThrow("Network error");

    // Verificar que console.error fue llamado con el mensaje correcto
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      `Error fetching historical data for ${currencyId}:`,
      mockError
    );

    // Restaurar console.error
    consoleErrorSpy.mockRestore();
  });

  // Prueba 6: Debe construir la URL correctamente
  it("should construct the URL correctly", async () => {
    const mockResponse = {
      data: {
        "Time Series FX": {
          "2023-10-01": { open: 1.2, high: 1.3, low: 1.1, close: 1.25 },
        },
      },
    };

    mockHttpClient.get.mockResolvedValue(mockResponse);

    await fetchHistoricalData(mockHttpClient, baseUrl, currencyId);

    // Verificar que la URL se construyó correctamente
    expect(mockHttpClient.get).toHaveBeenCalledWith(
      `${baseUrl}/historic-data/${currencyId}`
    );
  });

  it("should return data in the correct HistoricalData format", async () => {
    const mockResponse = {
      data: {
        "Time Series FX": {
          "2023-10-01": {
            open: 1.0924905830384222,
            high: 1.0860209119944928,
            low: 1.1081389856415889,
            close: 1.0861917010322626,
          },
        },
      },
    };

    mockHttpClient.get.mockResolvedValue(mockResponse);

    const result = await fetchHistoricalData(
      mockHttpClient,
      baseUrl,
      currencyId
    );

    // Verificar que cada objeto tiene el formato correcto
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          date: expect.any(String),
          open: expect.any(Number),
          high: expect.any(Number),
          low: expect.any(Number),
          close: expect.any(Number),
        }),
      ])
    );
  });
});
