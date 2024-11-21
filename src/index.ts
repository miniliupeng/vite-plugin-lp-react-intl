import { createFilter, PluginOption } from "vite";
import { transformAsync } from "@babel/core";
import babelPluginReactIntl from "babel-plugin-lp-react-intl"; // 引入自动国际化插件

export default function myVitePlugin(): PluginOption {
  // 只处理 .js, .jsx, .ts, .tsx 文件，排除 excludeFiles 中的文件
  const filter = createFilter(["src/**/*.{js,jsx,ts,tsx}"]); // 只匹配 src 目录下的 .js, .jsx, .ts, .tsx 文件
  return {
    name: "vite-plugin-babel-react-intl",
    enforce: "pre", // 在 vite 的默认插件之前执行，如babel，esbuild，swc 转换之前调用
    async transform(code, id) {
      if (!filter(id)) return null; // 跳过不匹配的文件
      // 使用 Babel 进行代码转换，注入我们的插件
      const result = await transformAsync(code, {
        filename: id,
        plugins: [babelPluginReactIntl()],
        presets: ["@babel/preset-typescript"],
        sourceMaps: true,
      });

      return {
        code: result?.code || code,
        map: result?.map || null,
      };
    },
  };
}
