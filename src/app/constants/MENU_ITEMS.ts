export interface IMenuItem {
  name: string;
  label: string;
  label_fn: string;
  price: number;
}

export const WARM_DRINKS_ITEMS: IMenuItem[] = [
  {
    name: 'hot_chocolate',
    label: 'Hot Chocolate',
    label_fn: 'هات چاکلت',
    price: 82000,
  },
  {
    name: 'masala_chai_premium',
    label: 'Masala Chai Premium',
    label_fn: 'چای ماسالا پرمیوم',
    price: 72000,
  },
  {
    name: 'pink_chocolate',
    label: 'Pink Chocolate',
    label_fn: 'پینک چاکلت',
    price: 82000,
  },
  {
    name: 'honey_milk',
    label: 'Honey Milk',
    label_fn: 'شیرعسل',
    price: 74000,
  },
  {
    name: 'honey_milk_cinnamon',
    label: 'Honey Milk Cinnamon',
    label_fn: 'شیر عسل دارچین',
    price: 78000,
  },
];

export const WARM_CAFFEINE_ITEMS: IMenuItem[] = [
  {
    name: 'spresso_single',
    label: 'Single Spresso',
    label_fn: 'اسپرسو سینگل',
    price: 49000,
  },
  {
    name: 'spresso_double',
    label: 'Double Spresso',
    label_fn: 'اسپرسو دبل',
    price: 55000,
  },
  {
    name: 'americano',
    label: 'Americano',
    label_fn: 'آمریکانو',
    price: 59000,
  },
  {
    name: 'latte',
    label: 'Latte',
    label_fn: 'لاته',
    price: 74000,
  },
  {
    name: 'cappuccine',
    label: 'Cappuccino',
    label_fn: 'کاپوچینو',
    price: 72000,
  },
  {
    name: 'nescafe',
    label: 'Nescafe',
    label_fn: 'نسکافه',
    price: 72000,
  },
  {
    name: 'latte_cinnamon',
    label: 'Latte & Cinnamon',
    label_fn: 'لاته دارچین',
    price: 82000,
  },
  {
    name: 'mocha',
    label: 'Mocha',
    label_fn: 'موکا',
    price: 89000,
  },
  {
    name: 'caramel_machiato',
    label: 'Caramel Machiato',
    label_fn: 'کارامل ماکیاتو',
    price: 89000,
  },
  {
    name: 'turk',
    label: 'Turk',
    label_fn: 'ترک',
    price: 57000,
  },
];

export const COLD_CAFFEINE_ITEMS: IMenuItem[] = [
  {
    name: 'ice_americano',
    label: 'Iced Americano',
    label_fn: 'آیس آمریکانو',
    price: 59000,
  },
  {
    name: 'ice_mocha',
    label: 'Iced Mocha',
    label_fn: 'آیس موکا',
    price: 89000,
  },
  {
    name: 'ice_caramel_machiato',
    label: 'Iced Caramel Machiato',
    label_fn: 'آیس کارامل ماکیاتو',
    price: 89000,
  },
  {
    name: 'ice_latte',
    label: 'Iced Latte',
    label_fn: 'آیس لاته',
    price: 74000,
  },
  {
    name: 'affogato',
    label: 'Affogato',
    label_fn: 'آفوگاتو',
    price: 79000,
  },
  {
    name: 'ice_tea',
    label: 'Iced Tea',
    label_fn: 'آیس تی',
    price: 55000,
  },
];

export const TEA_HERBAL_ITEMS: IMenuItem[] = [
  {
    name: 'black_tea',
    label: 'Black Tea',
    label_fn: 'چای سیاه ساده',
    price: 45000,
  },
  {
    name: 'cinnamon_tea',
    label: 'Cinnamon & Rose Tea',
    label_fn: 'چای دارچین و گل سرخ',
    price: 55000,
  },
  {
    name: 'green_tea',
    label: 'Green Tea',
    label_fn: 'چای سبز',
    price: 59000,
  },
  {
    name: 'cold_herbal',
    label: 'Cold Herbal Drink',
    label_fn: 'دمنوش سرماخوردگی',
    price: 79000,
  },
  {
    name: 'herbal_tea_1',
    label: 'Herbal Tea 1',
    label_fn: 'دمنوش',
    price: 79000,
  },
  {
    name: 'herbal_tea_2',
    label: 'Herbal Tea',
    label_fn: 'دمنوش',
    price: 89000,
  },
];

export const MOCKTAILS_ITEMS: IMenuItem[] = [
  {
    name: 'lemonade',
    label: 'Lemonade',
    label_fn: 'لیموناد',
    price: 68000,
  },
  {
    name: 'mohito',
    label: 'Mohito',
    label_fn: 'موهیتو',
    price: 75000,
  },
  {
    name: 'pinacolada',
    label: 'Pinacolada',
    label_fn: 'پیناکولادا',
    price: 138000,
  },
  {
    name: 'tornado_twist',
    label: 'Tornado Twist',
    label_fn: 'تورنادو تویست',
    price: 116000,
  },
];

export const SHAKES_SMOOTHIES_ITEMS: IMenuItem[] = [
  {
    name: 'chocolate_shake',
    label: 'Chocolate Shake',
    label_fn: 'شیک شکلات',
    price: 122000,
  },
  {
    name: 'banana_chocolate_shake',
    label: 'Banana & Chocolate Shake',
    label_fn: 'شیک موزشکلات',
    price: 134000,
  },
  {
    name: 'peanut_shake',
    label: 'Peanut Shake',
    label_fn: 'شیک بادام‌زمینی',
    price: 128000,
  },
  {
    name: 'strawberry_shake',
    label: 'Strawberry Shake',
    label_fn: 'شیک توت‌‌ فرنگی',
    price: 124000,
  },
  {
    name: 'vanilla_shake',
    label: 'Vanilla Shake',
    label_fn: 'شیک وانیل',
    price: 122000,
  },
];

export const SNACKS_ITEMS: IMenuItem[] = [
  {
    name: 'street_fries',
    label: 'Street Special Fries',
    label_fn: 'سیب‌زمینی ویژه استریت',
    price: 164000,
  },
  {
    name: 'fries_alfredo',
    label: 'French Fries with Alfredo Sauce',
    label_fn: 'سیب‌زمینی با سس آلفردو',
    price: 168000,
  },
  {
    name: 'zhambon_toast',
    label: 'Jambon Toast',
    label_fn: 'تست ژامبون',
    price: 158000,
  },
  {
    name: 'beacon_toast',
    label: 'Beacon Toast',
    label_fn: 'تست بیکن',
    price: 168000,
  },
  {
    name: 'chips_cheese',
    label: 'Chips with Cheese',
    label_fn: 'چیپس و پنیر',
    price: 158000,
  },
  {
    name: 'hot_chips',
    label: 'Hot Chips',
    label_fn: 'هات چیپس',
    price: 178000,
  },
];
