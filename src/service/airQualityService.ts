import axios, { AxiosError } from 'axios';
import config from '../config/config';

/**
 * Fetches and returns air quality data for a given coordinate.
 * @param {number} lat - Latitude of the location.
 * @param {number} lon - Longitude of the location.
 * @returns {Promise<PollutionData>} Air quality data.
 * @throws Will throw an error if the API request fails or returns invalid data.
 */
type Params = {
  lat: number;
  lon: number;
}

type PollutionData = {
  ts: string;
  aqius: number;
  mainus: string;
  aqicn: number;
  maincn: string;
}

type AirQualityResponse = {
  data: {
    status: string;
    current: {
      pollution: PollutionData;
    };
  };
}

export async function fetchAirQualityByCoordinate(params: Params): Promise<PollutionData> {
  const { baseUrl, apiKey } = config;
  const { lat, lon } = params;

  // Validate latitude and longitude values
  if (!lat || !lon) {
    throw new Error('Invalid input: latitude and longitude are required.');
  }

  if (isNaN(lat) || lat < -90 || lat > 90) {
    throw new Error("Invalid Latitude. It must be a numerical value within the range [-90, 90]");
  }

  if (isNaN(lon) || lon < -180 || lon > 180) {
    throw new Error("Invalid Longitude. It must be a numerical value within the range [-180, 180]");
  }

  try {
    const response = await axios.get<AirQualityResponse>(`${baseUrl}/nearest_city`, {
      params: { lat, lon, key: apiKey },
    });

    // Check if the response and required data exist
    if (response.status !== 200 || !response.data?.data?.current?.pollution) {
      throw new Error(`Failed to fetch air quality data for lat=${lat}, lon=${lon}`);
    }

    return response.data.data.current.pollution;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      throw new Error(`API error: ${axiosError.message}`);
    } else {
      console.error('Unexpected error occurred: ', error);
      throw new Error('An unexpected error occurred while fetching air quality data.');
    }
  }
}
