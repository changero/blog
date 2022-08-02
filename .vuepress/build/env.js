const isProduction = process.env.NODE_ENV === 'production';
const buildWithSUrge = process.env.BUILD_ENV === 'surge';

module.exports = {
  isProduction,
  buildWithSUrge,
};
