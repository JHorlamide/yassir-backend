import { Request, Response } from "express";
import { db } from "../../model/airQuality";
import responseHandler from "../../common/responseHandler";
import { fetchAirQualityByCoordinate } from "../../service/airQualityService";

class ApiController {
  async getAirQualityByLocation(req: Request, res: Response) {
    const { latitude, longitude } = req.query;

    // Validation for latitude and longitude could be handled in middleware for separation of concerns, 
    // but it's implemented here for simplicity and within the scope of this project.
    if (!latitude || !longitude) {
      return responseHandler.badRequest("Latitude and Longitude are both required", res);
    }

    const lat = parseFloat(latitude as string);
    const lon = parseFloat(longitude as string);

    try {
      const pollution = await fetchAirQualityByCoordinate({ lat, lon });

      const result = {
        pollution
      }

      responseHandler.successResponse(result, res);
    } catch (error: any) {
      responseHandler.serverError(error.message || "Failed to fetch air quality data", res);
    }
  }

  async getMostPopulated(req: Request, res: Response) {
    try {
      const mostPolluted = await db.airQuality.findOne()
        .sort('-pollution.aquis')
        .exec();

      if (mostPolluted) {
        const data = {
          datetime: mostPolluted.timestamp,
          aquis: mostPolluted.pollution?.aquis,
        }

        return responseHandler.successResponse(data, res);
      }

      responseHandler.successResponse({ data: "No data found" }, res);
    } catch (error: any) {
      responseHandler.serverError(error.message, res);
    }
  }
}

export default new ApiController();
