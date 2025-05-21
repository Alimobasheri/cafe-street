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
        {(() => {
          const placed: MenuItem[] = [];
          const unplaced: MenuItem[] = [];

          items.forEach((item) => {
            if (item.order_index != null) {
              placed[item.order_index] = item; // Put at specific index
            } else {
              unplaced.push(item); // Keep original order
            }
          });

          const finalList = [];
          let unplacedIndex = 0;

          // Use the longer length of either list to make sure all elements are included
          const maxLength = Math.max(placed.length, items.length);

          for (
            let i = 0;
            i < maxLength || unplacedIndex < unplaced.length;
            i++
          ) {
            if (placed[i]) {
              finalList.push(placed[i]);
            } else if (unplacedIndex < unplaced.length) {
              finalList.push(unplaced[unplacedIndex++]);
            }
          }

          return finalList.map((item) => (
            <div
              key={item.name}
              className="w-full flex flex-row-reverse justify-between items-center"
            >
              <span className="drop-shadow-text-shadow">{item.label_fn}</span>
              <span className="drop-shadow-text-shadow">
                {!!item.price && `${item.price}T`}
              </span>
            </div>
          ));
        })()}
      </div>
    );
  } else if (!!subsections) {
    return subsections.map((section) => (
      <div
        key={section.name}
        className={`w-full mx-auto mb-2 flex flex-col p-6 gap-4 p-2 rounded-lg bg-black/60`}
      >
        <h1 className="text-xl font-bold">{section.label_fn}</h1>
        {(() => {
          const filteredItems = items.filter(
            (item) => item.subsection_id === section.id
          );

          const placed: MenuItem[] = [];
          const unplaced: MenuItem[] = [];

          filteredItems.forEach((item) => {
            if (item.order_index != null) {
              placed[item.order_index] = item; // This places it directly at that index
            } else {
              unplaced.push(item);
            }
          });

          // Fill in gaps with unplaced items, preserving their order
          const finalList: MenuItem[] = [];
          let unplacedIndex = 0;

          for (
            let i = 0;
            i < placed.length || unplacedIndex < unplaced.length;
            i++
          ) {
            if (placed[i]) {
              finalList.push(placed[i]);
            } else if (unplacedIndex < unplaced.length) {
              finalList.push(unplaced[unplacedIndex++]);
            }
          }

          return finalList.map((item) => (
            <div
              key={item.name}
              className="w-full flex flex-row-reverse justify-between items-center"
            >
              <span className="drop-shadow-text-shadow">{item.label_fn}</span>
              <span className="drop-shadow-text-shadow">
                {!!item.price && `${item.price}T`}
              </span>
            </div>
          ));
        })()}
      </div>
    ));
  }
};
