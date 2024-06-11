import { ApplicationError } from "../utils/index.js";

export const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof ApplicationError) {
    return res.status(err.statusCode).json({message:err.message});
  }
  return res.status(500).json({message:"Internal server error"});
};
