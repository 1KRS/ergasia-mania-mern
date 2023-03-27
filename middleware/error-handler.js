import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (error, req, res, next) => {
  console.log(error.message);
  const errorObj = {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message: error.message || `Υπήρξε κάποιο πρόβλημα. Δοκιμάστε ξανά σε λίγο. (Error Handler Middleware)`
  };
  if (error.name === 'ValidationError') {
    errorObj.statusCode = StatusCodes.BAD_REQUEST
    errorObj.message = Object.values(error.errors).map(err => err.message).join('. ')
  }
  if (error.code === 11000) {
    errorObj.statusCode = StatusCodes.BAD_REQUEST
    errorObj.message = `Αυτό το ${Object.keys(error.keyValue)} χρησιμοποιείται. Δοκιμάστε κάποιο άλλο. (Error Handler Middleware)`
  }
  res.status(errorObj.statusCode).json(errorObj.message);
  // res.status(errorObj.statusCode).json({ msg: error }); // Βλέπεις όλο το μήνυμα 
};

export default errorHandlerMiddleware;
