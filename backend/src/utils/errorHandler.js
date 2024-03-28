export const errorHandler = (err, res, statusCode) => {
  console.error(err);
  res.status(statusCode).json({ message: "Error occurred" });
};
