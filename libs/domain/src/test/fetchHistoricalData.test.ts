import { fetchHistoricalData } from "../fetchs";
import { HttpClient } from "@monorepo/utils";

describe("fetchHistoricalData", () => {
  const mockHttpClient = {
    get: jest.fn(),
  } as jest.Mocked<HttpClient>;

  const baseUrl = "https://api.example.com";
  const currencyId = "EURUSD";

  afterEach(() => {
    jest.clearAllMocks(); 
  });

  it("should fetch and transform historical data correctly", async () => {
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

    expect(mockHttpClient.get).toHaveBeenCalledWith(
      `${baseUrl}/historic-data/${currencyId}`
    );

    expect(result).toEqual([
      { date: "2023-10-01", open: 1.2, high: 1.3, low: 1.1, close: 1.25 },
      { date: "2023-10-02", open: 1.25, high: 1.35, low: 1.15, close: 1.3 },
    ]);
  });

  it("should throw an error if baseUrl is invalid", async () => {
    const invalidBaseUrl = "invalid-url";

    await expect(
      fetchHistoricalData(mockHttpClient, invalidBaseUrl, currencyId)
    ).rejects.toThrow(`URL base inválida: ${invalidBaseUrl}`);
  });

  it("should throw an error if the API call fails", async () => {
    const mockError = new Error("Network error");
    mockHttpClient.get.mockRejectedValue(mockError);

    await expect(
      fetchHistoricalData(mockHttpClient, baseUrl, currencyId)
    ).rejects.toThrow("Network error");
  });

  it('should handle empty or invalid API response', async () => {
    const mockResponse = {
      data: {}, 
    };
  
    mockHttpClient.get.mockResolvedValue(mockResponse);
  
    const result = await fetchHistoricalData(mockHttpClient, baseUrl, currencyId);

    expect(result).toEqual([]);
  });

  it("should log an error if the API call fails", async () => {
    const mockError = new Error("Network error");
    mockHttpClient.get.mockRejectedValue(mockError);

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await expect(
      fetchHistoricalData(mockHttpClient, baseUrl, currencyId)
    ).rejects.toThrow("Network error");

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      `Error fetching historical data for ${currencyId}:`,
      mockError
    );

    consoleErrorSpy.mockRestore();
  });

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
