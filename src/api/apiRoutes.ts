import { Application } from "express";
import { CommonRoutesConfig } from "../common/commonRouteConfig";
import ApiController from "./controller/apiController";
import config from "../config/config";

const API_PREFIX = config.prefix;

export class ApiRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, "ApiRoutes");
  }

  configureRoutes() {
    /***
    * @router  GET: /api/air-quality
    * @desc    Get air quality data based on the given lat & long
    * @para { latitude: string, longitude: string }
    * @access  Public
    * ***/
    this.app.get(`${API_PREFIX}/air-quality`, [
      ApiController.getAirQualityByLocation
    ])

    /***
    * @router  GET: /api/most-polluted
    * @desc    Get the datetime when Paris was most polluted
    * @access  Public
    * ***/
    this.app.get(`${API_PREFIX}/most-polluted`, [
      ApiController.getMostPopulated
    ])

    return this.app;
  }
}
