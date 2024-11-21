import { PluginOption } from "vite";
export default function myVitePlugin({ include, exclude, }?: {
    include?: string[];
    exclude?: string[];
}): PluginOption;
