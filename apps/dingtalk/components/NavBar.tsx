'use client';

import { Button } from 'nx-awesome-lib';

function NavBar() {
  return (
    <nav>
      <div className="flex justify-between">
        <div>钉钉</div>
        <div>
          <ul className="ctx">
            <Button type="drop" as="a">
              产品功能
            </Button>
            <Button type="drop" as="a">
              解决方案
            </Button>
            <Button type="nav" as="a">
              客户案例
            </Button>
            <Button type="drop" as="a">
              开放平台
            </Button>
            <Button type="drop" as="a">
              了解钉钉
            </Button>
            <Button type="nav" as="a">
              增值服务
            </Button>
          </ul>
        </div>
        <div>
          <ul className="ctx">
            <li>加入会议</li>
            <li>注册钉钉</li>
            <li>
              <Button>下载钉钉</Button>
            </li>
            <li>登录</li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
