export interface SwipeFuncProps {
  images: string[];
}

export interface AnimateSwipeComponentProps {
  images: string[];
  imageIndex: number;
  direction: number;
  page: number;
  paginate: (newDirection: number) => void;
  swipeConfidenceThreshold: number;
  swipePower: (offset: number, velocity: number) => number;
}
