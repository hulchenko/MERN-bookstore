const notFound = (req, res, next) => {
  // Backup error, used only if errorHandler won't be able to handle the error
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (error, req, res, next) => {
  // Overwrites default Express error handler: https://expressjs.com/en/guide/error-handling.html
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode; // Mongoose returns 200 for "Cast to ObjectId failed" error
  let message = error.message;

  // Modify if the message is Mongoose non-existing ObjectId error:
  if (error.name === "CastError" && error.kind === "ObjectId") {
    message = "Resource not found";
    statusCode = 404; // 500 by default
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? "Hidden" : error.stack,
  });
};

export { notFound, errorHandler };
