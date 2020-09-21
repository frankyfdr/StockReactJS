const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/info",
    createProxyMiddleware({
      target: "https://query1.finance.yahoo.com",

      pathRewrite: {
        "/info": "",
      },
    })
  );
  app.use(
    "/logo",
    createProxyMiddleware({
      target: "https://finance.yahoo.com",
      pathRewrite: {
        "/logo": "",
      },
    })
  );
  app.use(
    "/lookup",
    createProxyMiddleware({
      target: "https://query2.finance.yahoo.com",
      pathRewrite: {
        "/lookup": "",
      },
    })
  );
};

/*
  "proxy": "https://query1.finance.yahoo.com",
  app.use(
    "/logo/",
    createProxyMiddleware({
      target: "http://finance.yahoo.com",
    })
  );

  app.use(
    "/lookup/",
    createProxyMiddleware({
      target: "http://query2.finance.yahoo.com",
    })
  );

  };

 app.use(
    createProxyMiddleware("/logo/", {
      target: "https://finance.yahoo.com",
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware("/lookup/", {
      target: "https://query2.finance.yahoo.com",
      changeOrigin: true,
    })
  );
*/
