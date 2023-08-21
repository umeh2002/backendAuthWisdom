import express, { Application, NextFunction, Response, Request } from "express";
import cors from "cors";
import { STATUS, errorFile } from "./error/errorFile";
import { errorHandler } from "./error/errorHandler";
import authRouter from "./router/authRouter"

export const mainApp = (app: Application) => {
  app.use(express.json());
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "DELETE", "PATCH"],
    })
  );
  app.all(
    "*",
    (error: errorFile, req: Request, res: Response, next: NextFunction) => {
      next(
        new errorFile({
          errorMessage: "This will be as a result of endpoint misplacement",
          errorName: "Endpoint misplacement error",
          errorStatus: STATUS.BAD,
          errorSuccess: false,
        })
      );
    }
  );
  app.use(errorHandler);
  app.get("/", (req: Request, res: Response) => {
    try {
      return res.status(STATUS.OK).json({
        message: "Sucessfully consuming Francis Uzoigwe's API",
      });
    } catch (error) {
      return res.status(STATUS.BAD).json({
        message: "Unable to get our api",
      });
    }
  });

  app.use("/api/v1",authRouter)
};
