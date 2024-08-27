import { Response } from "express";
import HttpStatus from "http-status";

/**
 * A class for handling HTTP responses with generic data type T.
 * Provides methods for successful, failure, and error responses.
 */
class ResponseHandler<T extends object> {
  public successResponse(result: T, res: Response): Response {
    return res
      .status(HttpStatus.OK)
      .json({ status: "Success", result })
  }

  public notFoundResponse(message: string, res: Response): Response {
    return res
      .status(HttpStatus.NOT_FOUND)
      .json({ status: "Failure", message })
  }

  public badRequest(message: string, res: Response): Response {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ status: "Failure", message })
  }

  public serverError(message: any, res: Response) {
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ status: HttpStatus.INTERNAL_SERVER_ERROR, message })
  }
}

export default new ResponseHandler();
