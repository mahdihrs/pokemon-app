const lottiesOptions = ({ animationData, ...rest }) => ({
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  },
  ...rest
});

export default lottiesOptions;