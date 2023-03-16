import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (error, req, res, next) => {
  console.log(error);
  const defaultError = {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message: `Υπήρξε το εξής πρόβλημα: ${error}`
  };
  res.status(defaultError.statusCode).json({ msg: error.message });
};

export default errorHandlerMiddleware;
