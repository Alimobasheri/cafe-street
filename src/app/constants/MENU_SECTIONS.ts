import WarmDrinks from '@/app/warm_drinks.png';
import WarmCaffeine from '@/app/warm_caffeine.png';
import ColdCaffeine from '@/app/cold_caffeine.png';
import TeaHerbals from '@/app/tea_herbal.png';
import ShakeSmoothies from '@/app/shakes.png';
import Mocktails from '@/app/mocktails.png';
import Snacks from '@/app/snacks.png';
import Food from '@/app/food.png';
import Drinks from '@/app/drinks.png';
import {
  BURGER_ITEMS,
  CEASAR_SALAD_ITEMS,
  COLD_CAFFEINE_ITEMS,
  DRINKS_ITEMS,
  FOOD_ITEMS,
  IMenuItem,
  MOCKTAILS_ITEMS,
  PASTA_ITEMS,
  PENINI_ITEMS,
  SHAKES_SMOOTHIES_ITEMS,
  SNACKS_ITEMS,
  TEA_HERBAL_ITEMS,
  WARM_CAFFEINE_ITEMS,
  WARM_DRINKS_ITEMS,
} from './MENU_ITEMS';
import { StaticImageData } from 'next/image';

export interface IMenuSection {
  name: string;
  label: string;
  label_fn: string;
  image: StaticImageData | null;
  items: IMenuItem[];
  label_color: string;
  drop_shadow: string;
  has_sub_sections?: boolean;
  subsections?: IMenuSection[];
}

export const FOOD_SUB_SECTIONS: IMenuSection[] = [
  {
    name: 'burger',
    label: 'Burgers',
    label_fn: 'برگر',
    image: null,
    items: BURGER_ITEMS,
    label_color: 'text-dark-neon-green',
    drop_shadow: 'drop-shadow-dark-neon-green',
  },
  {
    name: 'penini',
    label: 'Penini',
    label_fn: 'پنینی',
    image: null,
    items: PENINI_ITEMS,
    label_color: 'text-dark-neon-green',
    drop_shadow: 'drop-shadow-dark-neon-green',
  },
  {
    name: 'ceasar_salad',
    label: 'Ceasar Salad',
    label_fn: 'سالاد سزار',
    image: null,
    items: CEASAR_SALAD_ITEMS,
    label_color: 'text-dark-neon-pink',
    drop_shadow: 'drop-shadow-dark-neon-pink',
  },
  {
    name: 'pasta',
    label: 'Pasta',
    label_fn: 'پاستا',
    image: null,
    items: PASTA_ITEMS,
    label_color: 'text-dark-neon-green',
    drop_shadow: 'drop-shadow-dark-neon-green',
  },
];

export const MENU_SECTIONS: IMenuSection[] = [
  {
    name: 'warm_drink',
    label: 'Warm Drinks',
    label_fn: 'نوشیدنی‌های گرم',
    image: WarmDrinks,
    items: WARM_DRINKS_ITEMS,
    label_color: 'text-dark-neon-green',
    drop_shadow: 'drop-shadow-dark-neon-green',
  },
  {
    name: 'warm_caffeine',
    label: 'Warm Caffeine Bar',
    label_fn: 'کافئین بار گرم',
    image: WarmCaffeine,
    items: WARM_CAFFEINE_ITEMS,
    label_color: 'text-dark-neon-pink',
    drop_shadow: 'drop-shadow-dark-neon-pink',
  },
  {
    name: 'cold_caffeine',
    label: 'Cold Caffeine Bar',
    label_fn: 'کافئین بار سرد',
    image: ColdCaffeine,
    items: COLD_CAFFEINE_ITEMS,
    label_color: 'text-dark-neon-blue',
    drop_shadow: 'drop-shadow-dark-neon-blue',
    has_sub_sections: false,
  },
  {
    name: 'tea_herbals',
    label: 'Tea & Herbal',
    label_fn: 'چای و دمنوش‌ها',
    image: TeaHerbals,
    items: TEA_HERBAL_ITEMS,
    label_color: 'text-dark-neon-yellow',
    drop_shadow: 'drop-shadow-dark-neon-yellow',
    has_sub_sections: false,
  },
  {
    name: 'shake_smoothies',
    label: 'Shake Smoothies',
    label_fn: 'شیک و اسموتی',
    image: ShakeSmoothies,
    items: SHAKES_SMOOTHIES_ITEMS,
    label_color: 'text-dark-neon-green',
    drop_shadow: 'drop-shadow-dark-neon-green',
    has_sub_sections: false,
  },
  {
    name: 'mocktails',
    label: 'Mocktails',
    label_fn: 'موکتل‌ها',
    image: Mocktails,
    items: MOCKTAILS_ITEMS,
    label_color: 'text-dark-neon-yellow',
    drop_shadow: 'drop-shadow-dark-neon-yellow',
    has_sub_sections: false,
  },
  {
    name: 'snacks',
    label: 'Snacks',
    label_fn: 'میان وعده',
    image: Snacks,
    items: SNACKS_ITEMS,
    label_color: 'text-dark-neon-pink',
    drop_shadow: 'drop-shadow-dark-neon-pink',
    has_sub_sections: false,
  },
  {
    name: 'food',
    label: 'Food',
    label_fn: 'غذاها',
    image: Food,
    items: FOOD_ITEMS,
    label_color: 'text-dark-neon-green',
    drop_shadow: 'drop-shadow-dark-neon-green',
    has_sub_sections: true,
    subsections: FOOD_SUB_SECTIONS,
  },
  {
    name: 'drinks',
    label: 'Drinks',
    label_fn: 'نوشیدنی‌ها',
    image: Drinks,
    items: DRINKS_ITEMS,
    label_color: 'text-dark-neon-blue',
    drop_shadow: 'drop-shadow-dark-neon-blue',
    has_sub_sections: false,
  },
];
