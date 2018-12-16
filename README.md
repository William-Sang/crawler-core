## 开发环境搭建

1. 安装 puppeteer-core，然后自己设定 executablePath
2. 下载 chromium，访问 chrome://version 获得： executablePath
3. 安装必要依赖
```
yarn add ts-node typescript @types/node @types/puppeteer @types/puppeteer-core
```
4. 初始化 tsconfig
```
./node_modules/.bin/tsc --init
```

vs code 常用快捷键
