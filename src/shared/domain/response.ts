import type { Response as ExpressResponse } from "express";

export interface Response {
  status: number;
  success: boolean;
  message: string;
  data?: any;
}

export function response(res: ExpressResponse, response: Response): ExpressResponse {
  const { status, success, message, data } = response;
  return res.status(status).json({
    status,
    success,
    message,
    data,
  });
}
