

module.exports ={
  PORT: process.env.PORT || process.env.APP_PORT_SERVER,
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/netmore',
  JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '2h',
}

