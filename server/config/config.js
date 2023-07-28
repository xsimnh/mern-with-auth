module.exports = {
  secret: "secret",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || "27017",
  DB_URL: "",
  JWT_SECRET: "secret",
  JWT_EXPIRY: 86400000,
  JWT_ISSUER: "RMS",
  JWT_AUDIENCE: "RMS_XH",
  JWT_ALG: "HS256",
};
