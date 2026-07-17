import { readdir, stat, writeFile, mkdir, copyFile } from "node:fs/promises";
import path from "node:path";

const siteUrl = "https://research-it.ru";
const pagesDir = path.join(process.cwd(), "src", "pages");
const publicPath = path.join(process.cwd(), "public", "sitemap.xml");
const outPath = path.join(process.cwd(), "out", "sitemap.xml");
const ignoredSegments = new Set(["api"]);
const ignoredPages = new Set(["_app", "_document", "404"]);

const formatDate = (date) => date.toISOString().slice(0, 10);

const routeFromFile = (filePath) => {
  const relativePath = path.relative(pagesDir, filePath);
  const parsedPath = path.parse(relativePath);
  const extension = parsedPath.ext.toLowerCase();

  if (![".js", ".jsx", ".ts", ".tsx"].includes(extension)) {
    return null;
  }

  const segments = relativePath
    .slice(0, -extension.length)
    .split(path.sep)
    .filter(Boolean);

  if (segments.some((segment) => ignoredSegments.has(segment))) {
    return null;
  }

  const pageName = segments.at(-1);

  if (!pageName || ignoredPages.has(pageName)) {
    return null;
  }

  const routeSegments = pageName === "index" ? segments.slice(0, -1) : segments;
  const routePath = routeSegments.length === 0 ? "/" : `/${routeSegments.join("/")}/`;

  if (routePath.includes("[") || routePath.includes("]")) {
    return null;
  }

  return routePath;
};

const collectPageFiles = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectPageFiles(entryPath)));
      continue;
    }

    files.push(entryPath);
  }

  return files;
};

const createSitemap = async () => {
  const pageFiles = await collectPageFiles(pagesDir);
  const routes = new Map();

  for (const file of pageFiles) {
    const route = routeFromFile(file);

    if (!route) {
      continue;
    }

    const fileStat = await stat(file);
    routes.set(route, formatDate(fileStat.mtime));
  }

  const urls = [...routes.entries()]
    .sort(([routeA], [routeB]) => routeA.localeCompare(routeB))
    .map(([route, lastmod]) => {
      const loc = route === "/" ? `${siteUrl}/` : `${siteUrl}${route}`;

      return [
        "  <url>",
        `    <loc>${loc}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        "    <changefreq>weekly</changefreq>",
        route === "/"
          ? "    <priority>1.0</priority>"
          : "    <priority>0.8</priority>",
        "  </url>",
      ].join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    "</urlset>",
    "",
  ].join("\n");
};

const sitemap = await createSitemap();

await writeFile(publicPath, sitemap, "utf8");

try {
  await mkdir(path.dirname(outPath), { recursive: true });
  await copyFile(publicPath, outPath);
} catch {
  // The out directory is absent before the first static export.
}

console.log("Generated sitemap.xml");
