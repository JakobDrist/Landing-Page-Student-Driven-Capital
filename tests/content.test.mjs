import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const readJson = async (file) => JSON.parse(await readFile(file, "utf8"));
const routes = await readJson("src/content/routes.json");
const names = [
  "site",
  "home",
  "companies",
  "people",
  "sectors",
  "articles",
  "pages",
  "partnerships",
];
const data = Object.fromEntries(
  await Promise.all(
    names.map(async (name) => [
      name,
      await readJson(`src/content/data/${name}.json`),
    ]),
  ),
);
function walk(value, visit) {
  if (Array.isArray(value)) for (const item of value) walk(item, visit);
  else if (value && typeof value === "object") {
    visit(value);
    for (const child of Object.values(value)) walk(child, visit);
  }
}

test("every entity has a unique slug and a corresponding public route", () => {
  const paths = new Set(routes.map((route) => route.path));
  assert.equal(paths.size, routes.length);
  assert(paths.has("/"));
  for (const name of ["companies", "people", "sectors", "articles"]) {
    const items = data[name];
    assert.equal(
      new Set(items.map((item) => item.slug)).size,
      items.length,
      name,
    );
    for (const item of items) assert(paths.has(item.href), item.href);
  }
});

test("internal content links resolve to a known route", () => {
  const paths = new Set(routes.map((route) => route.path));
  walk(data, (object) => {
    if (typeof object.href === "string" && object.href.startsWith("/")) {
      assert(paths.has(object.href.split(/[?#]/)[0]), object.href);
    }
  });
});

test("all referenced media exists locally", async () => {
  const sources = new Set();
  walk(data, (object) => {
    if (typeof object.src === "string") sources.add(object.src);
  });
  assert(sources.size > 0);
  await Promise.all(
    [...sources].map(async (source) => {
      assert(source.startsWith("/images/"), source);
      await access(path.join("public", source));
    }),
  );
});

test("content contains business data rather than exported HTML trees", () => {
  walk(data, (object) => {
    for (const key of [
      "tag",
      "props",
      "className",
      "children",
      "dangerouslySetInnerHTML",
    ])
      assert(!(key in object), key);
  });
  for (const company of data.companies) {
    assert(company.name);
    assert(company.stage);
    assert.match(company.firstYear, /^20\d{2}$/);
    assert(company.story.length);
  }
  for (const person of data.people) {
    assert(person.name);
    assert(person.bio.length);
  }
  for (const article of data.articles) {
    assert(article.title);
    assert(article.body.length);
    assert(article.authors.length);
  }
});

test("all homepage and profile relationships refer to existing entities", () => {
  const verify = (ids, items) => {
    const known = new Set(items.map((item) => item.slug));
    for (const id of ids) assert(known.has(id), id);
  };
  verify(data.home.companies.items, data.companies);
  verify(data.home.journal.items, data.articles);
  for (const person of data.people) {
    verify(person.companies, data.companies);
    verify(person.articles, data.articles);
  }
  for (const article of data.articles) {
    verify(article.authors, data.people);
    verify(article.related, data.articles);
  }
  for (const sector of data.sectors) {
    verify(sector.companies, data.companies);
    verify(sector.people, data.people);
    verify(sector.articles, data.articles);
  }
});

test("the pitch questions are not duplicated across responsive variants", () => {
  const questions = data.pages.pitch.questions;
  assert.equal(new Set(questions).size, questions.length);
});
