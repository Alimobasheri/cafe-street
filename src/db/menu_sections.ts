export type MenuSection = {
  id: number; // Primary key
  name: string; // Unique identifier, e.g., 'warm_drink'
  label: string; // Display label, e.g., 'Warm Drinks'
  label_fn: string; // Persian translation
  image?: string; // Optional path to image
  label_color: string; // e.g., 'text-dark-neon-green'
  drop_shadow: string; // e.g., 'drop-shadow-dark-neon-green'
  has_sub_sections: boolean; // Indicates if the section has sub-sections
  order: number; // Order of the section in the menu
};
