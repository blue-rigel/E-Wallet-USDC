module.exports = {
  // ...
  transformIgnorePatterns: ['/node_modules/(?!axios)'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    "axios": "axios/dist/node/axios.cjs"
  }
};
