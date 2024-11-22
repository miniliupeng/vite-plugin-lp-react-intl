import { createFilter, PluginOption } from "vite";
import { transformSync } from "@babel/core";
import babelPluginLpReactIntl from "babel-plugin-lp-react-intl"; // 引入自动国际化插件
import prettier from "prettier";

export default function vitePluginLpReactIntl({
  include = ["src/**/*.{js,jsx,ts,tsx}"],
  exclude = [],
}: { include?: string[]; exclude?: string[] } = {}): PluginOption {
  // 只处理 .js, .jsx, .ts, .tsx 文件，排除 excludeFiles 中的文件
  const filter = createFilter(include, exclude); // 只匹配 src 目录下的 .js, .jsx, .ts, .tsx 文件
  return {
    name: "vite-plugin-lp-react-intl",
    enforce: "pre", // 在 vite 的默认插件之前执行，如babel，esbuild，swc 转换之前调用
    async transform(code, id) {
      if (!filter(id)) return null; // 跳过不匹配的文件
      // 使用 Babel 进行代码转换，注入我们的插件

      const res = transformSync(code, {
        plugins: [babelPluginLpReactIntl],
        retainLines: true,
        presets: ["@babel/preset-typescript"],
        filename: id
      });

      const formatedCode = await prettier.format(res?.code!, {
        filepath: id,
      });

      return {
        code: formatedCode || code,
        map: res?.map || null,
      };
    },
  };
}
