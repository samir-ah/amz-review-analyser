import { PropsWithChildren } from 'react';
import Lottie from 'react-lottie-player/dist/LottiePlayerLight';
import animationPath from '../../assets/8026-taking-notes.json';

type Props = PropsWithChildren<{}>;
const AddContentAnimation = ({ children }: Props) => {
  return (
    <div>
      <div className='mt-6 text-center '>{children}</div>
      <Lottie loop animationData={animationPath} play style={{ height: '300px' }} />
    </div>
  );
};

export default AddContentAnimation;
