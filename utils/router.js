import { restoreUrl } from "./index";
import pagesJson from "@/pages.json";

// tabBar页面
const tabBarPagesMap = pagesJson.tabBar.list.map((i) => {
  return {
    type: "tabBarPage",
    name: i.name,
    path: `/${i.pagePath}`,
  };
});

// 二级页面
const subPagesMap = pagesJson.subPackages.flatMap((i) => {
  return i.pages.map((x) => {
    return {
      type: "subPage",
      name: x.name,
      path: `/${i.root}/${x.path}`,
    };
  });
});
const pagesMap = [...tabBarPagesMap, ...subPagesMap];
export function forward(name, query = {}) {
  const targetPage = pagesMap.find((i) => i.name === name);
  if (!targetPage) return;
  const isReplace = query.replace;
  delete query.replace;
  const { type, path } = targetPage;
  const url = restoreUrl(path, query);
  const params = { url };
  // uni.switchTab 不支持传参
  if (type === "tabBarPage") return uni.switchTab(params);
  if (!isReplace) return uni.navigateTo(params);
  uni.redirectTo(params);
}

export function back(delta) {
  uni.navigateBack({
    delta,
  });
}
