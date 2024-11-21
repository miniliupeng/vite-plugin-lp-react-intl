
# 🌟 vite-plugin-babel-react-intl

    让你的 React 项目国际化更轻松！
    自动提取中文、插入国际化代码，并与 react-intl 无缝集成。开发者的福音！✨

🚀 **`vite-plugin-lp-react-intl`** 是一个 Vite 插件，用于自动化国际化处理，通过 Babel 插件将项目中的中文内容提取并转化为国际化代码。

## ✨ 特性

- 📦 自动检测项目中的中文文案。
- 🌍 将中文文案替换为 `react-intl` 的 `formatMessage` 调用。
- 📂 支持 TypeScript 和 JSX/TSX 文件。
- 🛠 可自定义文件过滤规则。

## 🛠 安装

```bash
# 使用 npm
npm install vite-plugin-lp-react-intl --save-dev

# 或者使用 yarn
yarn add vite-plugin-lp-react-intl --dev

# 或者使用 pnpm
pnpm add vite-plugin-lp-react-intl --save-dev

```


## ⚡ 快速开始

### 1. 配置 Vite 插件

在 `vite.config.ts` 中添加插件配置：

```typescript
import { defineConfig } from "vite";
import vitePluginLpReactIntl from "vite-plugin-lp-react-intl";

export default defineConfig({
  plugins: [
    vitePluginLpReactIntl({
      include: ["src/**/*.{js,jsx,ts,tsx}"], // 可选：包含某些文件
      exclude: ["src/excluded/**"], // 可选：排除某些文件
    }),
  ],
});
```

### 2. 使用效果

在你的项目中，当你运行 Vite 开发服务器时，插件会自动将如下代码：

```jsx
export default function App() {
  return <div>你好，世界！</div>;
}
```

转换为：

```jsx
import { defineMessages } from "react-intl";
import intl from "src/locales/intl";

const messages = defineMessages({
  helloWorld: { id: "你好，世界！" },
});

export default function App() {
  return <div>{intl.formatMessage(messages.helloWorld)}</div>;
}
```

## ⚙️ 配置选项

| 参数         | 类型           | 默认值            | 说明                             |
| ------------ | -------------- | ----------------- | -------------------------------- |
| `include`    | `string[]`     | `["src/**/*.{js,jsx,ts,tsx}"]` | 包含某些文件或路径               |
| `exclude`    | `string[]`     | `[]`              | 排除某些文件或路径               |

## 🤖 支持的文件类型

- `.js`
- `.jsx`
- `.ts`
- `.tsx`

## 📄 开发者提示

- 确保你的项目中已经安装了 `react-intl`。
- ⚡ 建议通过 [`lp-react-intl-cli`](https://www.npmjs.com/package/lp-react-intl-cli) 生成 `src/locales`文件夹和 `src/locales/intl.ts` 文件。并通过 `lp-react-intl-cli extract src`命令提取src目录下的所有文件中的中文内容到`json`文件中。
- 通过 `vitePluginLpReactIntl` 的配置项 `include` 可指定需要国际化的文件。
- 通过 `vitePluginLpReactIntl` 的配置项 `exclude` 可排除不需要国际化的文件。

## 🤝 贡献

欢迎贡献代码或提需求！请访问 [GitHub 仓库](https://github.com/miniliupeng/vite-plugin-lp-react-intl) 开启 Issue 或提交 PR。

## 📄 License

MIT © [刘鹏](https://github.com/miniliupeng)
