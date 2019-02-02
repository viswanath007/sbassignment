const config = {
  mongoURL: process.env.MLAB_MONGO_URL || 'mongodb://wishnu:broadpit700S,@ds157809.mlab.com:57809/mydb?authSource=mydb',
  port: process.env.PORT || 5000,
};

export default config;
