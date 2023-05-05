import { wrap } from 'popmotion';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { AnimateSwipeComponentProps, SwipeFuncProps } from './interface';

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

export function UseSwiper({
  images,
}: SwipeFuncProps): AnimateSwipeComponentProps {
  const [[page, direction], setPage] = useState([0, 0]);

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return {
    images,
    imageIndex,
    direction,
    page,
    paginate,
    swipeConfidenceThreshold,
    swipePower,
  };
}

export function AnimateSwipeComponent({
  images,
  imageIndex,
  direction,
  page,
  paginate,
  swipeConfidenceThreshold,
  swipePower,
}: AnimateSwipeComponentProps) {
  return (
    <>
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={page}
          src={images[imageIndex]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        />
      </AnimatePresence>
    </>
  );
}
