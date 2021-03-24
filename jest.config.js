module.exports = async () => {
  return {
    verbose: true,
    transform: {
      "\\.[jt]sx?$": "babel-jest"
    },
  };
};
