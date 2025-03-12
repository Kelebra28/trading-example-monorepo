import { axiosClient } from '../data_sorce';
import axios from 'axios';

// Mockear axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('axiosClient', () => {
  const url = 'https://api.example.com/data';

  afterEach(() => {
    jest.clearAllMocks(); // Limpiar mocks después de cada prueba
  });

  // Prueba 1: Debe realizar una solicitud GET y devolver los datos correctamente
  it('should make a GET request and return the data', async () => {
    const mockResponse = {
      data: { key: 'value' }, // Datos simulados de la API
    };

    // Mockear la respuesta de axios
    mockedAxios.get.mockResolvedValue(mockResponse);

    const result = await axiosClient.get<{ key: string }>(url);

    // Verificar que axios.get fue llamado con la URL correcta
    expect(mockedAxios.get).toHaveBeenCalledWith(url);

    // Verificar que los datos se devuelven en el formato correcto
    expect(result).toEqual({ data: { key: 'value' } });
  });

  // Prueba 2: Debe manejar errores correctamente
  it('should handle errors', async () => {
    const mockError = new Error('Network error');

    // Mockear un error en axios
    mockedAxios.get.mockRejectedValue(mockError);

    // Verificar que la función lanza el error
    await expect(axiosClient.get(url)).rejects.toThrow('Network error');

    // Verificar que axios.get fue llamado con la URL correcta
    expect(mockedAxios.get).toHaveBeenCalledWith(url);
  });

  // Prueba 3: Debe devolver un objeto con la propiedad "data" incluso si la respuesta de axios es vacía
  it('should return an object with the "data" property even if the axios response is empty', async () => {
    const mockResponse = {
      data: {}, // Respuesta vacía
    };

    // Mockear la respuesta de axios
    mockedAxios.get.mockResolvedValue(mockResponse);

    const result = await axiosClient.get(url);

    // Verificar que los datos se devuelven en el formato correcto
    expect(result).toEqual({ data: {} });
  });
});