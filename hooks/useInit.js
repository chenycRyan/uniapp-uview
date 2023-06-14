import { parseUrl } from "../utils/index";

export function useInit() {
  const pages = getCurrentPages();

  const page = pages[pages.length - 1];
  console.log(page);
  const { fullPath } = page.$page;

  const {
    name: pageName,
    path: pagePath,
    query: pageQuery,
  } = parseUrl(fullPath);
  return {
    pageName,
    pagePath,
    pageQuery,
  };
}
