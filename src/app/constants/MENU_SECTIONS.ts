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
  COLD_CAFFEINE_ITEMS,
  DRINKS_ITEMS,
  FOOD_ITEMS,
  MOCKTAILS_ITEMS,
  SHAKES_SMOOTHIES_ITEMS,
  SNACKS_ITEMS,
  TEA_HERBAL_ITEMS,
  WARM_CAFFEINE_ITEMS,
  WARM_DRINKS_ITEMS,
} from './MENU_ITEMS';

export const MENU_SECTIONS = [
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
  },
  {
    name: 'tea_herbals',
    label: 'Tea & Herbal',
    label_fn: 'چای و دمنوش‌ها',
    image: TeaHerbals,
    items: TEA_HERBAL_ITEMS,
    label_color: 'text-dark-neon-yellow',
    drop_shadow: 'drop-shadow-dark-neon-yellow',
  },
  {
    name: 'shake_smoothies',
    label: 'Shake Smoothies',
    label_fn: 'شیک و اسموتی',
    image: ShakeSmoothies,
    items: SHAKES_SMOOTHIES_ITEMS,
    label_color: 'text-dark-neon-green',
    drop_shadow: 'drop-shadow-dark-neon-green',
  },
  {
    name: 'mocktails',
    label: 'Mocktails',
    label_fn: 'موکتل‌ها',
    image: Mocktails,
    items: MOCKTAILS_ITEMS,
    label_color: 'text-dark-neon-yellow',
    drop_shadow: 'drop-shadow-dark-neon-yellow',
  },
  {
    name: 'snacks',
    label: 'Snacks',
    label_fn: 'میان وعده',
    image: Snacks,
    items: SNACKS_ITEMS,
    label_color: 'text-dark-neon-pink',
    drop_shadow: 'drop-shadow-dark-neon-pink',
  },
  {
    name: 'food',
    label: 'Food',
    label_fn: 'غذاها',
    image: Food,
    items: FOOD_ITEMS,
    label_color: 'text-dark-neon-green',
    drop_shadow: 'drop-shadow-dark-neon-green',
  },
  {
    name: 'drinks',
    label: 'Drinks',
    label_fn: 'نوشیدنی‌ها',
    image: Drinks,
    items: DRINKS_ITEMS,
    label_color: 'text-dark-neon-blue',
    drop_shadow: 'drop-shadow-dark-neon-blue',
  },
];
