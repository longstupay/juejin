'use client';

import { Button } from 'nx-awesome-lib';

function NavBar() {
  return (
    <nav className="w-full min-h-[80px] bg-white fixed flex items-center">
      <div className="flex justify-between w-full items-center px-8">
        <div className="text-dk-primary">
          钉钉<span>让进步发生</span>
        </div>
        <div>
          <ul className="ctx">
            <li>
              <Button variant="drop" as="a">
                产品功能
              </Button>
            </li>
            <li>
              <Button variant="drop" as="a">
                解决方案
              </Button>
            </li>
            <li>
              <Button variant="nav" as="a">
                客户案例
              </Button>
            </li>
            <li>
              <Button variant="drop" as="a">
                开放平台
              </Button>
            </li>
            <li>
              <Button variant="drop" as="a">
                了解钉钉
              </Button>
            </li>
            <li>
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
