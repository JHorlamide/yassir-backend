import axios from "axios";
import config from "../../../config/config";
import { fetchAirQualityByCoordinate } from "../../../service/airQualityService";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchAndSaveAirQuality', () => {
  const apiKey = config.apiKey;
  const baseUrl = config.baseUrl;
  const mockPollutionData = {
    ts: "2024-08-26T20:00:00.000Z",
    aqius: 42,
    mainus: 'p2',
    aqicn: 12,
    maincn: 'p2',
  };

  const mockApiResponse = {
    status: 'success',
    data: {
      current: {
        pollution: mockPollutionData,
      },
    },
  };

  beforeEach(() => {
    (axios.get as jest.Mock).mockResolvedValue(mockPollutionData);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it('should fetch air quality data for given coordinates', async () => {
    const lat = 48.856613;
    const lon = 2.352222;

    mockedAxios.get.mockResolvedValue({
      status: 200,
      data: mockApiResponse,
    });

    const result = await fetchAirQualityByCoordinate({ lat, lon });

    expect(result).toEqual(mockPollutionData);
    expect(axios.get).toHaveBeenCalledWith(`${baseUrl}/nearest_city`, {
      params: { lat, lon, key: apiKey },
    });
  })

  it('should throw an error if the API call fails', async () => {
    const lat = 48.8566;
    const lon = 2.3522;

    (axios.get as jest.Mock).mockResolvedValue(new Error('API call failed'));

    await expect(fetchAirQualityByCoordinate({ lat, lon }))
      .rejects
      .toThrow('An unexpected error occurred while fetching air quality data.');
  });
});
