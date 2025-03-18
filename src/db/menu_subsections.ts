export type MenuSubsection = {
  id: number;
  section_id: number; // Foreign key referencing menu_sections(id)
  name: string; // e.g., 'burger'
  label: string; // e.g., 'Burgers'
  label_fn: string; // Persian translation
  image?: string; // Optional image path
  label_color: string;
  drop_shadow: string;
};
