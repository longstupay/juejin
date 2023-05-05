import { useState } from 'react';
import { motion } from 'framer-motion';
import BaseSwiper from './base-swiper';

export type CarouselData = Array<{
  title: string;
  paragraph: string;
  button: Array<{
    lable: string;
    variant: string;
  }> | null;
}>;

const data: CarouselData = [
  {
    title: '钉钉让进步发生',
    paragraph: '6亿人的选择',
    button: null,
  },
  {
    title: '智能协同之春',
    paragraph: '2023春季钉峰会',
    button: [
      {
        lable: '立即查看',
        variant: 'primary',
      },
      {
        lable: '探索加入',
        variant: 'primary',
      },
    ],
  },
  {
    title: '想象力就是生产力',
    paragraph: '首届钉钉AIGC大赛',
    button: [
      {
        lable: '立即查看',
        variant: 'primary',
      },
      {
        lable: '查看往届',
        variant: 'primary',
      },
    ],
  },
  {
    title: '一站式企业迁移解决方案',
    paragraph: '企业数字资产迁移，顺畅无忧',
    button: [
      {
        lable: '立即查看',
        variant: 'primary',
      },
    ],
  },
  {
    title: '阿里邮箱-钉钉融合版',
    paragraph: '钉+邮，深度融合，随时随地助力企业高效办公',
    button: [
      {
        lable: '立即查看',
        variant: 'primary',
      },
    ],
  },
  {
    title: '钉钉专业版',
    paragraph: '满足中小企业数字化升级需求，灵活开放的数字化生产力平台',
    button: [
      {
        lable: '立即预约',
        variant: 'primary',
      },
    ],
  },
  {
    title: '钉钉专属版',
    paragraph: '企业专属、安全、开放的数字化办公',
    button: [
      {
        lable: '立即预约',
        variant: 'primary',
      },
    ],
  },
];

interface CarouselProps {
  images: any;
  className?: string;
}

export const Carousel = ({ images, className: cls }: CarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    console.log('handlePrev', images.length, activeIndex);
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    console.log('handleNext', images.length, activeIndex);
    setActiveIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    // <div className={`relative w-full h-80 ` + cls}>
    //   {images.map((image: any, index: any) => (
    //     <motion.img
    //       key={index}
    //       src={image}
    //       alt=""
    //       className={`absolute inset-0 w-full h-full object-cover transform md:scale-125 md:-translate-x-24 md:translate-y-40 ${
    //         index === activeIndex ? 'opacity-100' : 'opacity-0'
    //       }`}
    //     />
    //   ))}
    //   <button
    //     className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-200 rounded-full p-2"
    //     onClick={handlePrev}
    //   >
    //     <span className="inline-block h-8 w-8">
    //       <svg
    //         xmlns="http://www.w3.org/2000/svg"
    //         fill="none"
    //         viewBox="0 0 24 24"
    //         stroke-width="1.5"
    //         stroke="currentColor"
    //         className="h-6 w-6"
    //       >
    //         <path
    //           stroke-linecap="round"
    //           stroke-linejoin="round"
    //           d="M15.75 19.5L8.25 12l7.5-7.5"
    //         />
    //       </svg>
    //     </span>
    //   </button>
    //   <button
    //     className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-200 rounded-full p-2"
    //     onClick={handleNext}
    //   >
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       fill="none"
    //       viewBox="0 0 24 24"
    //       stroke-width="1.5"
    //       stroke="currentColor"
    //       className="h-6 w-6"
    //     >
    //       <path
    //         stroke-linecap="round"
    //         stroke-linejoin="round"
    //         d="M8.25 4.5l7.5 7.5-7.5 7.5"
    //       />
    //     </svg>
    //   </button>
    // </div>
    <BaseSwiper />
  );
};

export default Carousel;
