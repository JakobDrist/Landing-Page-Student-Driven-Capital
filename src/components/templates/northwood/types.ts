export type NorthwoodNode =
  | string
  | { tag: string; props: Record<string, unknown>; children: NorthwoodNode[] };
export interface NorthwoodPageData {
  path: string;
  title: string;
  root: NorthwoodNode;
  svg: NorthwoodNode[];
}
