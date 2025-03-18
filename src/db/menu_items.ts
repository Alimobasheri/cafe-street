export type MenuItem = {
  id: number;
  section_id: number;
  subsection_id: number | null; // Nullable for items without subsections
  name: string; // Unique
  label: string;
  label_fn: string; // Persian translation
  price: number; // Must be >= 0
};
