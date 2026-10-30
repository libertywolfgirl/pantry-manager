import { create } from "xmlbuilder2";
import fs from "fs";

const BASE_URL = "http://localhost:5173";
const paths = ["/", "/pantry", "/recipes", "/login", "/register"];

async function getDynamicRoutes() {
  const token = process.env.SITEMAP_AUTH_TOKEN;
  if (!token) {
    throw new Error("SITEMAP_AUTH_TOKEN must be set to fetch recipe routes");
  }

  const response = await fetch("http://localhost:8000/api/recipes/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch recipes: ${response.status} ${response.statusText}`,
    );
  }

  const recipes = await response.json();
  if (
    !Array.isArray(recipes) ||
    recipes.some((recipe) => !Number.isInteger(recipe?.id))
  ) {
    throw new Error("Recipe API returned an invalid recipe list");
  }

  return recipes.map((recipe) => `/recipes/${recipe.id}`);
}

async function buildSitemap() {
  const dynamicPaths = await getDynamicRoutes();
  const allPaths = [...paths, ...dynamicPaths];

  const root = create({ version: "1.0", encoding: "UTF-8" }).ele("urlset", {
    xmlns: "http://sitemaps.org",
  });

  allPaths.forEach((path) => {
    root
      .ele("url")
      .ele("loc")
      .txt(`${BASE_URL}${path}`)
      .up()
      .ele("lastmod")
      .txt(new Date().toISOString().split("T")[0])
      .up()
      .ele("changefreq")
      .txt("daily")
      .up()
      .ele("priority")
      .txt(path === "/" ? "1.0" : "0.8")
      .up();
  });

  const xml = root.end({ prettyPrint: true });

  fs.writeFileSync("./public/sitemap.xml", xml);
  console.log("✅ sitemap.xml successfully generated in /public");
}

buildSitemap();
