import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (error, req, res, next) => {
  const errorObj = {
    statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: error.message || `Υπήρξε κάποιο πρόβλημα. Δοκιμάστε ξανά σε λίγο.`
  };
  if (error.name === 'ValidationError') {
    errorObj.statusCode = StatusCodes.BAD_REQUEST
    errorObj.message = Object.values(error.errors).map(err => err.message).join('. ')
  }
  if (error.code === 11000) {
    errorObj.statusCode = StatusCodes.BAD_REQUEST
    errorObj.message = `Αυτό το ${Object.keys(error.keyValue)} χρησιμοποιείται. Δοκιμάστε κάποιο άλλο.`
  }
  res.status(errorObj.statusCode).json(errorObj.message);
};

export default errorHandlerMiddleware;
