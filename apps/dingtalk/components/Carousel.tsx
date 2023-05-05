'use client';

import { Button, Carousel } from 'nx-awesome-lib';
import React from 'react';

function Carousels() {
  return (
    <div className="">
      {/* <img
          src="Carousel1.jpg"
          alt=""
          className="z-0 max-h-screen w-full transform scale-125 -translate-x-24"
        /> */}
      <Carousel
        className="z-10 h-screen bg-red-500"
        images={[
          'Carousel1.jpg',
          'Carousel2.jpg',
          'Carousel3.png',
          'Carousel4.png',
          'Carousel5.jpg',
          'Carousel6.png',
          'Carousel7.png',
        ]}
      />
      {/* <div className="min-h-[160px]  border-gray-500 absolute bottom-0 z-40 w-full opacity-100 flex items-center justify-center gap-8 px-64 pb-16">
        <div className="flex flex-col flex-1 bg-white py-6 px-8 rounded-lg space-y-3">
          <p className="font-semibold text-xl">视频会议</p>
          <span className="font-light text-gray-400 text-sm">
            让高效会议自然发生
          </span>
          <div>
            <Button variant="outline">加入会议</Button>
          </div>
        </div>
        <div className="flex flex-col flex-1 bg-white py-6 px-8 rounded-lg space-y-3">
          <p className="font-semibold text-xl">钉钉搭</p>
          <span className="font-light text-gray-400 text-sm whitespace-nowrap">
            使用低代码宜搭，快速解决工作问题
          </span>
          <div>
            <Button variant="outline">创建应用</Button>
          </div>
        </div>
        <div className="flex flex-col flex-1 bg-white py-6 px-8 rounded-lg space-y-3">
          <p className="font-semibold text-xl">Teambition</p>
          <span className="font-light text-gray-400 text-sm whitespace-nowrap">
            Teambition轻松完成工作事
          </span>
          <div>
            <Button variant="outline">创建项目</Button>
          </div>
        </div>
        <div className="flex flex-col flex-1 bg-white py-6 px-8 rounded-lg space-y-3">
          <p className="font-semibold text-xl">钉钉文档</p>
          <span className="font-light text-gray-400 text-sm whitespace-nowrap">
            活的文档，链接万物
          </span>
          <div>
            <Button variant="outline">立即使用</Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 z-30 w-full h-64 backdrop-blur-xl bg-white/30"></div> */}
    </div>
  );
}

export default Carousels;
