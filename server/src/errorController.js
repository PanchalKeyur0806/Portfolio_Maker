export const errorHandler = (err, req, res, next) => {
  const { message } = err;

  res.status(400).json({
    status: "Failed",
    message,
  });
};
