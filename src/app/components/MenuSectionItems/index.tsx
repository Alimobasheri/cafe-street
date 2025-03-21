import { MenuItem, MenuSubsection } from '@/db';
import { FC } from 'react';

export const MenuSectionItems: FC<{
  items: MenuItem[];
  has_sub_sections?: boolean;
  subsections?: MenuSubsection[];
}> = ({ items, has_sub_sections, subsections }) => {
  if (!has_sub_sections) {
    return (
      <div
        className={`w-full mx-auto flex flex-col p-6 gap-4  p-2 rounded-lg bg-black/60`}
      >
        {items.map((item) => (
          <div
            key={item.name}
            className="w-full flex flex-row-reverse justify-between items-center "
          >
            <span className="drop-shadow-text-shadow">{item.label_fn}</span>
            <span className="drop-shadow-text-shadow">
              {!!item.price && `${item.price}T`}
            </span>
          </div>
        ))}
      </div>
    );
  } else if (!!subsections) {
    return subsections.map((section) => (
      <div
        key={section.name}
        className={`w-full mx-auto mb-2 flex flex-col p-6 gap-4 p-2 rounded-lg bg-black/60`}
      >
        <h1 className="text-xl font-bold">{section.label_fn}</h1>
        {items
          .filter((item) => item.subsection_id === section.id)
          .map((item) => (
            <div
              key={item.name}
              className="w-full flex flex-row-reverse justify-between items-center "
            >
              <span className="drop-shadow-text-shadow">{item.label_fn}</span>
              <span className="drop-shadow-text-shadow">
                {!!item.price && `${item.price}T`}
              </span>
            </div>
          ))}
      </div>
    ));
  }
};
