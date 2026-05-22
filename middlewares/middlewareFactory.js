const createMiddleware = (options = {}) => {
  return (req, res, next) => {
    if (options.logParams) {
      console.log(`Params: ${JSON.stringify(req.params)}`.gray);
    }
    if (options.logQuery) {
      console.log(`Query: ${JSON.stringify(req.query)}`.gray);
    }
    if (options.logBody) {
      console.log(`Body: ${JSON.stringify(req.body)}`.gray);
    }
    if (options.requiredRole) {
      const role = req.body.usertype || req.usertype;
      if (role !== options.requiredRole) {
        return res.status(403).send({
          success: false,
          message: `Access denied. ${options.requiredRole} role required.`,
        });
      }
    }
    if (options.checkHeaders) {
      for (const header of options.checkHeaders) {
        if (!req.headers[header]) {
          return res.status(400).send({
            success: false,
            message: `Missing required header: ${header}`,
          });
        }
      }
    }
    next();
  };
};

module.exports = createMiddleware;
