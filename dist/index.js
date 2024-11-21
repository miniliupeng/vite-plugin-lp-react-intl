var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createFilter } from "vite";
import { transformAsync } from "@babel/core";
import babelPluginReactIntl from "babel-plugin-lp-react-intl"; // 引入自动国际化插件
export default function vitePluginLpReactIntl({ include = ["src/**/*.{js,jsx,ts,tsx}"], exclude = [], } = {}) {
    // 只处理 .js, .jsx, .ts, .tsx 文件，排除 excludeFiles 中的文件
    const filter = createFilter(include, exclude); // 只匹配 src 目录下的 .js, .jsx, .ts, .tsx 文件
    return {
        name: "vite-plugin-lp-react-intl",
        enforce: "pre", // 在 vite 的默认插件之前执行，如babel，esbuild，swc 转换之前调用
        transform(code, id) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!filter(id))
                    return null; // 跳过不匹配的文件
                // 使用 Babel 进行代码转换，注入我们的插件
                const result = yield transformAsync(code, {
                    filename: id,
                    plugins: [babelPluginReactIntl()],
                    presets: ["@babel/preset-typescript"],
                    sourceMaps: true,
                });
                return {
                    code: (result === null || result === void 0 ? void 0 : result.code) || code,
                    map: (result === null || result === void 0 ? void 0 : result.map) || null,
                };
            });
        },
    };
}
