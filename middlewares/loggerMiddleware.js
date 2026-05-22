const colors = require("colors");

const loggerMiddleware = (req, res, next) => {
  const start = Date.now();
  const { method, url } = req;

  res.on("finish", () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    const statusColor =
      status >= 500 ? "red" : status >= 400 ? "yellow" : "green";
    console.log(
      `${method} ${url} ${String(status)[statusColor]} ${duration}ms`.cyan
    );
  });

  next();
};

module.exports = loggerMiddleware;
