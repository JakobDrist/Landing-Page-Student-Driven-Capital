export interface Media {
  src: string;
  alt: string;
}
export interface ContentLink {
  label: string;
  href: string;
}
export interface InlineRun {
  text: string;
  href?: string;
  bold?: boolean;
  italic?: boolean;
}
export type RichTextBlock =
  | { kind: "paragraph" | "heading" | "quote"; runs: InlineRun[] }
  | { kind: "list"; ordered: boolean; items: InlineRun[][] }
  | { kind: "table"; rows: InlineRun[][][] };
export type ArticleCategory = "essays" | "letters" | "playbooks" | "news";

export interface Fact {
  links?: ContentLink[];
  label: string;
  value: string;
  href?: string | null;
}
export interface Figure {
  value: string;
  label: string;
}
export interface CompanySummary {
  slug: string;
  name: string;
  href: string;
  logo: Media;
  tagline: string;
  sector: string;
  stage: string;
  firstYear: string;
  cardStatus: string;
  active: boolean;
  searchText: string;
}
export interface Company extends Omit<CompanySummary, "searchText"> {
  status: string;
  story: RichTextBlock[];
  facts: Fact[];
  leadPartner: ContentLink;
  partnerImage: Media;
  founders: { name: string; role: string }[];
  fundingHeading: string;
  raised: string;
  rounds: {
    date: string;
    name: string;
    amount: string;
    badge: string;
    lead: string;
  }[];
  exit: { year: string; label: string } | null;
  related: string[];
}
export interface Person {
  slug: string;
  href: string;
  name: string;
  role: string;
  group: string;
  image: Media;
  bio: RichTextBlock[];
  facts: Fact[];
  contacts: ContentLink[];
  companies: string[];
  articles: string[];
  next: ContentLink | null;
}
export interface ArticleSummary {
  slug: string;
  href: string;
  title: string;
  category: string;
  date: string;
  description: string;
  byline: string;
  cover: Media | null;
  coverLabel: string;
}
export interface Article extends ArticleSummary {
  previous: ContentLink | null;
  next: ContentLink | null;
  authors: string[];
  caption: string;
  body: RichTextBlock[];
  related: string[];
}
export interface Sector {
  slug: string;
  href: string;
  name: string;
  description: string;
  introduction: string;
  stats: Figure[];
  approach: string;
  themes: { title: string; text: string }[];
  companies: string[];
  people: string[];
  articles: string[];
  closing: { title: string; text: string };
}
export interface FormField {
  name: string;
  label: string;
  type: string;
  required: boolean;
  placeholder: string;
  options: { label: string; value: string }[];
  fullWidth: boolean;
}
export interface FormDefinition {
  heading: string;
  fields: FormField[];
  submit: string;
}
