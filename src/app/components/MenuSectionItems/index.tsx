import { IMenuItem } from '@/app/constants/MENU_ITEMS';
import { FC } from 'react';

export const MenuSectionItems: FC<{
  items: IMenuItem[];
  isOpen: boolean;
}> = ({ items }) => {
  return (
    <div
      className={`w-full mx-auto flex flex-col p-6 gap-4 backdrop-blur-lg p-2 rounded-lg bg-black/10`}
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
};
