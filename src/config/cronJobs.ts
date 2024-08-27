import cron from "node-cron";
import { db } from "../model/airQuality";
import { fetchAirQualityByCoordinate } from "../service/airQualityService";
import { onError } from "./requestLogger";

async function fetchAndSaveParisAirQuality() {
  const PARIS_LATITUDE = 48.856613;
  const PARIS_LONGITUDE = 2.352222;

  try {
    const pollution = await fetchAirQualityByCoordinate({
      lat: PARIS_LATITUDE,
      lon: PARIS_LONGITUDE
    });

    if (!pollution) {
      onError("Failed to fetch data");
      return;
    }

    const airQuality = new db.airQuality({
      timestamp: new Date(),
      ...pollution
    });

    await airQuality.save();
  } catch (error) {
    console.error('Failed to fetch or save Paris air quality data', error);
  }
}

// CRON job to check air quality for Paris every 1 minute
export function startParisAirQualityCron() {
  cron.schedule('* * * * *', fetchAndSaveParisAirQuality);
}