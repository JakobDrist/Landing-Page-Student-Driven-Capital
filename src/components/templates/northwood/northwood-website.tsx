"use client";

import {
  createElement,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import type { NorthwoodNode, NorthwoodPageData } from "./types";
import mobileHeader from "./data/mobile-header.json";
import tabletHeader from "./data/tablet-header.json";
import moreEntry from "./data/more-entry.json";
import "./northwood-runtime.css";

type NodeElement = Exclude<NorthwoodNode, string>;
const icon = (d: string) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={d} />
  </svg>
);
interface Company {
  el: HTMLElement;
  sector: string;
  stage: string;
  active: boolean;
  text: string;
}
function PortfolioFilters({
  root,
  style,
}: {
  root: () => HTMLElement | null;
  style?: CSSProperties;
}) {
  const [items, setItems] = useState<Company[]>([]),
    [sector, setSector] = useState(""),
    [stage, setStage] = useState(""),
    [status, setStatus] = useState("all"),
    [query, setQuery] = useState(""),
    [view, setView] = useState("grid");
  useEffect(() => {
    const host = root();
    if (!host) return;
    const records = [
      ...host.querySelectorAll<HTMLElement>(
        '[data-framer-name="Company Grid"], [data-framer-name="Company Rows"]',
      ),
    ].flatMap((grid) =>
      [...grid.children]
        .filter((el) => el.querySelector('[data-framer-name="Mark"]'))
        .map((el) => {
          const value = (name: string) =>
            el
              .querySelector(`[data-framer-name="${name}"]`)
              ?.textContent?.trim() || "";
          return {
            el: el as HTMLElement,
            sector: value("Sector"),
            stage: value("Stage").split(",")[0].trim(),
            active: !!el.querySelector('[data-framer-name="Dot"]'),
            text: `${
              el
                .querySelector('[data-framer-name="Logo Image"] img')
                ?.getAttribute("alt")
                ?.replace(/ logo$/i, "") || ""
            } ${el.querySelector("a")?.getAttribute("href")?.split("/").pop() || ""} ${value("Tagline")}`.toLowerCase(),
          };
        }),
    );
    // Company records are discovered from the mounted template DOM.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(records);
    const params = new URLSearchParams(location.search),
      initial = params.get("status") || location.hash.slice(1);
    if (["active", "exited"].includes(initial)) setStatus(initial);
    setQuery(params.get("q") || "");
    setSector(
      records.find(
        (item) =>
          item.sector.toLowerCase() === params.get("sector")?.toLowerCase(),
      )?.sector || "",
    );
    try {
      if (sessionStorage.getItem("northwood-view") === "list") setView("list");
    } catch {}
    const hash = () => {
      if (["active", "exited"].includes(location.hash.slice(1)))
        setStatus(location.hash.slice(1));
    };
    window.addEventListener("hashchange", hash);
    return () => window.removeEventListener("hashchange", hash);
    // The root callback resolves the owning template after its DOM has mounted.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    root()?.setAttribute("data-nw-view", view);
    try {
      sessionStorage.setItem("northwood-view", view);
    } catch {}
  }, [view, root]);
  const matches = (item: Company, skip?: string) =>
    (skip === "sector" || !sector || item.sector === sector) &&
    (skip === "stage" || !stage || item.stage === stage) &&
    (status === "all" || (status === "active") === item.active) &&
    query
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .every((word) => item.text.includes(word));
  useEffect(() => {
    items.forEach((item) => {
      item.el.style.display = matches(item) ? "" : "none";
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, sector, stage, status, query]);
  const count = (values: Company[]) =>
      new Set(values.map((item) => item.text)).size,
    total = count(items.filter((item) => matches(item)));
  return (
    <div className="nwf" style={style}>
      <form
        className="nwf-form"
        role="search"
        aria-label="Filter the portfolio"
        onSubmit={(event) => event.preventDefault()}
      >
        <label className="nwf-field">
          <span className="nwf-label">Sector</span>
          <select
            className="nwf-select"
            value={sector}
            onChange={(event) => setSector(event.target.value)}
          >
            <option value="">All sectors</option>
            {[
              "Fintech",
              "Climate",
              "Health",
              "Infrastructure",
              "Software",
              "Industrials",
            ].map((value) => (
              <option key={value} value={value}>
                {value} (
                {count(
                  items.filter(
                    (item) => item.sector === value && matches(item, "sector"),
                  ),
                )}
                )
              </option>
            ))}
          </select>
        </label>
        <label className="nwf-field">
          <span className="nwf-label">First investment</span>
          <select
            className="nwf-select"
            value={stage}
            onChange={(event) => setStage(event.target.value)}
          >
            <option value="">All stages</option>
            {["Pre-seed", "Seed", "Series A", "Series B", "Growth"]
              .filter((value) => items.some((item) => item.stage === value))
              .map((value) => (
                <option key={value} value={value}>
                  {value} (
                  {count(
                    items.filter(
                      (item) => item.stage === value && matches(item, "stage"),
                    ),
                  )}
                  )
                </option>
              ))}
          </select>
        </label>
        <fieldset className="nwf-field">
          <legend className="nwf-label" style={{ marginBottom: 6 }}>
            Status
          </legend>
          <div className="nwf-seg">
            {["all", "active", "exited"].map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={status === value}
                onClick={() => setStatus(value)}
              >
                {value[0].toUpperCase() + value.slice(1)}
              </button>
            ))}
          </div>
        </fieldset>
        <label className="nwf-field">
          <span className="nwf-label">Search</span>
          <span className="nwf-search">
            {icon("m21 21-4.34-4.34M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z")}
            <input
              className="nwf-input"
              type="search"
              placeholder="Company or keyword"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </span>
        </label>
      </form>
      <div className="nwf-bar">
        <p className="nwf-count" aria-live="polite">
          {items.length
            ? `${total} ${total === 1 ? "company" : "companies"}`
            : "\u00a0"}
        </p>
        <div className="nwf-views" role="group" aria-label="View">
          {["grid", "list"].map((value) => (
            <button
              key={value}
              type="button"
              aria-label={`${value === "grid" ? "Grid" : "List"} view`}
              aria-pressed={view === value}
              onClick={() => setView(value)}
            >
              {icon(
                value === "grid"
                  ? "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"
                  : "M3 6h.01M8 6h13M3 12h.01M8 12h13M3 18h.01M8 18h13",
              )}
            </button>
          ))}
        </div>
      </div>
      {items.length > 0 && total === 0 && (
        <p className="nwf-empty">
          No companies match these filters.
          <button
            type="button"
            onClick={() => {
              setSector("");
              setStage("");
              setStatus("all");
              setQuery("");
            }}
          >
            Clear filters
          </button>
        </p>
      )}
    </div>
  );
}
function InsightSearch({
  root,
  style,
}: {
  root: () => HTMLElement | null;
  style?: CSSProperties;
}) {
  const [query, setQuery] = useState("");
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if (
        event.key === "/" &&
        !(event.target as HTMLElement).matches(
          'input,textarea,select,[contenteditable="true"]',
        )
      ) {
        event.preventDefault();
        input.current?.focus();
      }
    };
    document.addEventListener("keydown", key);
    if (location.hash === "#search")
      input.current?.focus({ preventScroll: true });
    return () => document.removeEventListener("keydown", key);
  }, []);
  useEffect(() => {
    const host = root();
    if (!host) return;
    const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    let count = 0;
    host
      .querySelectorAll<HTMLElement>(
        '[data-framer-name="Entries"] > *, [data-framer-name="Lead Entry"] > *',
      )
      .forEach((el) => {
        const visible = words.every((word) =>
          el.textContent?.toLowerCase().includes(word),
        );
        el.style.display = visible ? "" : "none";
        if (visible) count++;
      });
    host
      .querySelectorAll<HTMLElement>('[data-framer-name="Lead Entry"]')
      .forEach((el) => {
        el.style.display =
          words.length &&
          !el.querySelector(':scope > *:not([style*="display: none"])')
            ? "none"
            : "";
      });
    host.toggleAttribute(
      "data-nw-search-empty",
      words.length > 0 && count === 0,
    );
  }, [query, root]);
  return (
    <div className="nws" style={style}>
      {icon("m21 21-4.34-4.34M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z")}
      <input
        ref={input}
        type="search"
        aria-label="Search insights"
        placeholder="Search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
    </div>
  );
}
function DemoForm({
  node,
  render,
}: {
  node: NodeElement;
  render: (node: NorthwoodNode, key: string) => ReactNode;
}) {
  const [submitted, setSubmitted] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (event.currentTarget.reportValidity()) setSubmitted(true);
  };
  const props = { ...node.props };
  delete props.key;
  return (
    <form {...props} onSubmit={submit}>
      {submitted ? (
        <p className="nw-form-result" role="status">
          Thank you. This preview saved no data and sent no message.
        </p>
      ) : (
        node.children.map((child, index) => render(child, String(index)))
      )}
    </form>
  );
}
/** Native React adaptation of Northwood's public pages; no Framer runtime. */
export function NorthwoodWebsite({
  page,
  basePath = "",
}: {
  page: NorthwoodPageData;
  basePath?: string;
}) {
  const host = useRef<HTMLDivElement>(null),
    [menuOpen, setMenuOpen] = useState(false);
  const [moreLoaded, setMoreLoaded] = useState(false);
  const root = useCallback(() => host.current, []);
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let previous = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      el.toggleAttribute("data-nw-scrolled", y > 8);
      if (
        y < 200 ||
        menuOpen ||
        el.querySelector("header")?.contains(document.activeElement)
      )
        el.removeAttribute("data-nw-header-hidden");
      else if (Math.abs(y - previous) > 6)
        el.toggleAttribute("data-nw-header-hidden", y > previous);
      previous = y;
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", scroll);
      cancelAnimationFrame(frame);
    };
  }, [menuOpen]);
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", escape);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", escape);
    };
  }, [menuOpen]);
  function render(node: NorthwoodNode, key: string): ReactNode {
    if (typeof node === "string") return node;
    const props = { ...node.props, key } as Record<string, unknown>;
    const name = props["data-framer-name"];
    if (props.className === "nwf")
      return (
        <PortfolioFilters
          key={key}
          root={root}
          style={props.style as CSSProperties}
        />
      );
    if (props.className === "nws")
      return (
        <InsightSearch
          key={key}
          root={root}
          style={props.style as CSSProperties}
        />
      );
    if (
      node.tag === "header" &&
      ["Phone", "Tablet"].includes(String(name)) &&
      menuOpen
    ) {
      node = (name === "Tablet"
        ? tabletHeader
        : mobileHeader) as NorthwoodNode as NodeElement;
      Object.assign(props, node.props);
    }
    if (node.tag === "a" && typeof props.href === "string") {
      const href = props.href;
      if (href.startsWith("/") && !href.startsWith("/templates/")) {
        props.href = basePath + href;
        const target = href.split(/[?#]/)[0];
        if (
          target !== "/" &&
          (page.path === target || page.path.startsWith(target + "/"))
        )
          props["aria-current"] = "page";
      }
      if (href.startsWith("#") && href.length > 1) {
        /* SVG/hash anchors stay local. */
      }
      if (props.target === "_blank") props.rel = "noopener noreferrer";
    }
    if (name === "Menu Toggle") {
      props.role = "button";
      props["aria-label"] = menuOpen ? "Close menu" : "Open menu";
      props["aria-expanded"] = menuOpen;
      props.onClick = () => setMenuOpen((value) => !value);
      props.onKeyDown = (event: ReactKeyboardEvent) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setMenuOpen((value) => !value);
        }
      };
    }
    if (
      node.tag === "button" &&
      node.children.some((child) => JSON.stringify(child).includes("Load More"))
    ) {
      if (moreLoaded) return null;
      props.type = "button";
      props.onClick = () => setMoreLoaded(true);
    }
    if (name === "Entries" && moreLoaded) {
      return createElement(
        node.tag,
        props,
        ...node.children.map((child, index) =>
          render(child, `${key}.${index}`),
        ),
        render(moreEntry as NorthwoodNode, `${key}.more`),
      );
    }
    if (node.tag === "form")
      return <DemoForm key={key} node={{ ...node, props }} render={render} />;
    if (node.tag === "img" && !(props.style as CSSProperties)?.objectFit) {
      props.loading = props.loading || "lazy";
    }
    return createElement(
      node.tag,
      props,
      ...node.children.map((child, index) => render(child, `${key}.${index}`)),
    );
  }
  return (
    <div
      data-northwood-template=""
      data-nw-page={page.path}
      ref={host}
      onFocusCapture={(event) => {
        if ((event.target as HTMLElement).closest("header"))
          host.current?.removeAttribute("data-nw-header-hidden");
      }}
    >
      {page.svg.map((node, index) => render(node, `svg${index}`))}
      {render(page.root, "page")}
    </div>
  );
}
