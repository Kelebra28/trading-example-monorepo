import { axiosClient } from '../data_sorce';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('axiosClient', () => {
  const url = 'https://api.example.com/data';

  afterEach(() => {
    jest.clearAllMocks(); 
  });

  it('should make a GET request and return the data', async () => {
    const mockResponse = {
      data: { key: 'value' }, 
    };

    mockedAxios.get.mockResolvedValue(mockResponse);

    const result = await axiosClient.get<{ key: string }>(url);

    
    expect(mockedAxios.get).toHaveBeenCalledWith(url);

    expect(result).toEqual({ data: { key: 'value' } });
  });

  it('should handle errors', async () => {
    const mockError = new Error('Network error');

    mockedAxios.get.mockRejectedValue(mockError);

    await expect(axiosClient.get(url)).rejects.toThrow('Network error');

    expect(mockedAxios.get).toHaveBeenCalledWith(url);
  });


  it('should return an object with the "data" property even if the axios response is empty', async () => {
    const mockResponse = {
      data: {}, 
    };

    mockedAxios.get.mockResolvedValue(mockResponse);

    const result = await axiosClient.get(url);

    expect(result).toEqual({ data: {} });
  });
});