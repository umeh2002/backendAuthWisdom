import { Request, Response, NextFunction } from "express";
import { STATUS, errorFile } from "./errorFile";

export const handleError = async (error: errorFile, res: Response) => {
  return res.status(STATUS.BAD).json({
    errorName: error.errorName,
    errorMessage: error.errorMessage,
    errorStatus: error.errorStatus,
    errorSuccess: error.errorSuccess,
    errorStack: error.stack,
    error,
  });
};

export const errorHandler = (
  error: errorFile,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  handleError(error, res);
};
