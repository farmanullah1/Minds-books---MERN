import { useSpring } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';

export const useScrollReveal = (options = {}) => {
  const { threshold = 0.12, delay = 0, direction = 'up' } = options;
  const [ref, inView] = useInView({ threshold, triggerOnce: true });
  const offsets = {
    up:    { from: 'translateY(28px)', to: 'translateY(0px)' },
    left:  { from: 'translateX(-28px)', to: 'translateX(0px)' },
    right: { from: 'translateX(28px)', to: 'translateX(0px)' }
  };
  const { from, to } = offsets[direction] || offsets.up;
  const style = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? to : from,
    delay: inView ? delay : 0,
    config: { tension: 180, friction: 22 }
  });
  return { ref, style };
};
