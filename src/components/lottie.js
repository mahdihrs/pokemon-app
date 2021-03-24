import Lottie from 'react-lottie';
import defaultLottiesOptions from '../utils/lotties';

export default function LottieComponent({ animationData, ...props }) {
  return (
    <Lottie
      options={defaultLottiesOptions({ animationData })}
      height={50}
      width={50}
      speed={0.35}
      {...props}
    />
  );
}