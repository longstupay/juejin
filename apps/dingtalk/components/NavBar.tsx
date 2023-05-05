'use client';

import { Button, MenuButton } from 'nx-awesome-lib';
import { Item } from 'react-stately';

function NavBar() {
  return (
    <nav className="w-full min-h-[80px] bg-white fixed flex items-center z-50">
      <div className="flex justify-between w-full items-center px-8">
        <div className="text-dk-primary">
          钉钉<span>让进步发生</span>
        </div>
        <div>
          <ul className="flex items-center justify-center">
            <li>
              <Button variant="drop" as="a">
                产品功能
              </Button>
            </li>
            <li>
              <MenuButton
                variant="drop"
                label="解决方案"
                onAction={(key) => alert(key)}
              >
                <Item key="retail">零售</Item>
                <Item key="manufacture">制造</Item>
                <Item key="finance">金融</Item>
                <Item key="medical">医疗</Item>
                <Item key="traffic">交通</Item>
                <Item key="university">高校</Item>
              </MenuButton>
            </li>
            <li>
              <Button variant="nav" as="a">
                客户案例
              </Button>
            </li>
            <li>
              <MenuButton
                variant="drop"
                label="开放平台"
                onAction={(key) => alert(key)}
              >
                <Item key="detail">了解开放平台</Item>
                <Item key="paas">钉钉PaaS</Item>
                <Item key="doc">文档&帮助</Item>
                <Item key="community">开发者社区</Item>
                <Item key="ecology">生态&合作</Item>
              </MenuButton>
            </li>
            <li className="m-0 p-0">
              <MenuButton
                variant="drop"
                label="了解钉钉"
                onAction={(key) => alert(key)}
              >
                <Item key="help">帮助中心</Item>
                <Item key="news">新闻资讯</Item>
                <Item key="drill">钉钉培训</Item>
                <Item key="cloud">云钉一体</Item>
                <Item key="release">钉钉发布会</Item>
                <Item key="newfeat">新功能推荐</Item>
                <Item key="ad">广告合作</Item>
              </MenuButton>
            </li>
            <li className="">
              <Button variant="nav" as="a">
                增值服务
              </Button>
            </li>
          </ul>
        </div>
        <div>
          <ul className="ctx gap-4">
            <li>
              <Button variant="outline">加入会议</Button>
            </li>
            <li>
              <Button variant="outline">注册钉钉</Button>
            </li>
            <li>
              <Button>下载钉钉</Button>
            </li>
            <li>
              <Button variant="nav">登录</Button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
