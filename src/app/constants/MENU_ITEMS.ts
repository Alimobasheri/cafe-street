export interface IMenuItem {
  name: string;
  label: string;
  label_fn: string;
  price: number | null;
}

export const WARM_DRINKS_ITEMS: IMenuItem[] = [
  {
    name: 'hot_chocolate',
    label: 'Hot Chocolate',
    label_fn: 'هات چاکلت',
    price: 89000,
  },
  {
    name: 'masala_chai_premium',
    label: 'Masala Chai Premium',
    label_fn: 'چای ماسالا پرمیوم',
    price: 87000,
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
    price: 104000,
  },
  {
    name: 'honey_milk_cinnamon',
    label: 'Honey Milk Cinnamon',
    label_fn: 'شیر عسل دارچین',
    price: 109000,
  },
];

export const WARM_CAFFEINE_ITEMS: IMenuItem[] = [
  {
    name: 'spresso_single',
    label: 'Single Spresso',
    label_fn: 'اسپرسو سینگل',
    price: 57000,
  },
  {
    name: 'spresso_double',
    label: 'Double Spresso',
    label_fn: 'اسپرسو دبل',
    price: 64000,
  },
  {
    name: 'spresso_mocchiaato',
    label: 'Mocchiato Spresso',
    label_fn: 'اسپرسو ماکیاتو',
    price: 72000,
  },
  {
    name: 'americano',
    label: 'Americano',
    label_fn: 'آمریکانو',
    price: 74000,
  },
  {
    name: 'cappuccine',
    label: 'Cappuccino',
    label_fn: 'کاپوچینو',
    price: 87000,
  },
  {
    name: 'latte',
    label: 'Latte',
    label_fn: 'لاته',
    price: 88000,
  },
  {
    name: 'latte_cinnamon',
    label: 'Latte & Cinnamon',
    label_fn: 'لاته دارچین',
    price: 93000,
  },
  {
    name: 'latte_vanilla',
    label: 'Latte & Vanilla',
    label_fn: 'لاته وانیل',
    price: 97000,
  },
  {
    name: 'nescafe',
    label: 'Nescafe',
    label_fn: 'نسکافه',
    price: 78000,
  },
  {
    name: 'mocha',
    label: 'Mocha',
    label_fn: 'موکا',
    price: 98000,
  },
  {
    name: 'caramel_machiato',
    label: 'Caramel Machiato',
    label_fn: 'کارامل ماکیاتو',
    price: 98000,
  },
  {
    name: 'french',
    label: 'French',
    label_fn: 'فرانسه',
    price: 86000,
  },
  {
    name: 'turk',
    label: 'Turk',
    label_fn: 'ترک',
    price: 64000,
  },
];

export const COLD_CAFFEINE_ITEMS: IMenuItem[] = [
  {
    name: 'ice_americano',
    label: 'Iced Americano',
    label_fn: 'آیس آمریکانو',
    price: 74000,
  },
  {
    name: 'ice_mocha',
    label: 'Iced Mocha',
    label_fn: 'آیس موکا',
    price: 98000,
  },
  {
    name: 'ice_caramel_machiato',
    label: 'Iced Caramel Machiato',
    label_fn: 'آیس کارامل ماکیاتو',
    price: 98000,
  },
  {
    name: 'ice_latte',
    label: 'Iced Latte',
    label_fn: 'آیس لاته',
    price: 88000,
  },
  {
    name: 'coke_spresso',
    label: 'Coke Espresso',
    label_fn: 'کوک اسپرسو',
    price: 99000,
  },
  {
    name: 'affogato',
    label: 'Affogato',
    label_fn: 'آفوگاتو',
    price: 94000,
  },
  {
    name: 'ice_tea',
    label: 'Iced Tea',
    label_fn: 'آیس تی',
    price: 59000,
  },
];

export const TEA_HERBAL_ITEMS: IMenuItem[] = [
  {
    name: 'black_tea',
    label: 'Black Tea',
    label_fn: 'چای سیاه ساده',
    price: 49000,
  },
  {
    name: 'cinnamon_tea',
    label: 'Cinnamon & Rose Tea',
    label_fn: 'چای دارچین و گل سرخ',
    price: 64000,
  },
  {
    name: 'green_tea',
    label: 'Green Tea',
    label_fn: 'چای سبز',
    price: 68000,
  },
  {
    name: 'cold_herbal',
    label: 'Cold Herbal Drink',
    label_fn: 'دمنوش سرماخوردگی',
    price: 89000,
  },
  {
    name: 'herbal_tea_aramesh',
    label: 'Herbal Tea Aramesh',
    label_fn: 'دمنوش آرامش',
    price: 89000,
  },
  {
    name: 'herbal_tea_gol_gav_zaban',
    label: 'Herbal Tea Gol Gav Zabaan',
    label_fn: 'دمنوش گل گاو زبان',
    price: 96000,
  },
  {
    name: 'herbal_tea_neshat',
    label: 'Herbal Tea Neshaat',
    label_fn: 'دمنوش نشاط',
    price: 92000,
  },
  {
    name: 'herbal_tea_pooneh',
    label: 'Herbal Tea Pooneh',
    label_fn: 'دمنوش پونه',
    price: 92000,
  },
  {
    name: 'special_tea_pooneh',
    label: 'special Tea Pooneh',
    label_fn: 'دمنوش مخصوص حال شما',
    price: 96000,
  },
];

export const MOCKTAILS_ITEMS: IMenuItem[] = [
  {
    name: 'lemonade',
    label: 'Lemonade',
    label_fn: 'لیموناد',
    price: 79000,
  },
  {
    name: 'mohito',
    label: 'Mohito',
    label_fn: 'موهیتو',
    price: 84000,
  },
  {
    name: 'pinacolada',
    label: 'Pinacolada',
    label_fn: 'پیناکولادا (پوره نارگیل - آناناس - سیب)',
    price: 149000,
  },
  {
    name: 'mango',
    label: 'Mango',
    label_fn: 'منگو (آب گازدار - لیموی تازه - نعنا - یخ - انبه)',
    price: 144000,
  },
  {
    name: 'red_lemon',
    label: 'Red Lemon',
    label_fn: 'رد لمن (توت فرنگی - لیمو ترش - آب گازدار - یخ)',
    price: 146000,
  },
  {
    name: 'tornado_twist',
    label: 'Tornado Twist',
    label_fn: 'تورنادو تویست (توت‌فرنگی - پرتقال - گریپ فروت)',
    price: 124000,
  },
];

export const SHAKES_SMOOTHIES_ITEMS: IMenuItem[] = [
  {
    name: 'chocolate_shake',
    label: 'Chocolate Shake',
    label_fn: 'شیک شکلات',
    price: 144000,
  },
  {
    name: 'banana_chocolate_shake',
    label: 'Banana & Chocolate Shake',
    label_fn: 'شیک موزشکلات',
    price: 149000,
  },
  {
    name: 'peanut_shake',
    label: 'Peanut Shake',
    label_fn: 'شیک بادام‌زمینی',
    price: 149000,
  },
  {
    name: 'strawberry_shake',
    label: 'Strawberry Shake',
    label_fn: 'شیک توت‌‌ فرنگی',
    price: 144000,
  },
  {
    name: 'mango_shake',
    label: 'Mango Shake',
    label_fn: 'شیک انبه',
    price: 144000,
  },
  {
    name: 'berry_mango_shake',
    label: 'Berry Mango Shake',
    label_fn: 'شیک بری‌منگو (توت‌فرنگی - انبه - بستنی - شیر)',
    price: 149000,
  },
  {
    name: 'berry_mango_shake',
    label: 'Berry Mango Shake',
    label_fn: 'شیک بنانابوست (شیر - بستنی - اسپرسو دبل - موز)',
    price: 162000,
  },
  {
    name: 'vanilla_shake',
    label: 'Vanilla Shake',
    label_fn: 'شیک وانیل',
    price: 139000,
  },
  {
    name: 'mad_shake',
    label: 'Mad Shake',
    label_fn: 'مد شیک (بستنی - شیر - اسپرسو دبل)',
    price: 156000,
  },
];

export const SNACKS_ITEMS: IMenuItem[] = [
  {
    name: 'fries',
    label: 'French Fries',
    label_fn: 'سیب‌زمینی ساده',
    price: 145000,
  },
  {
    name: 'street_fries',
    label: 'Street Special Fries',
    label_fn: 'سیب‌زمینی ویژه استریت',
    price: 198000,
  },
  {
    name: 'fries_alfredo',
    label: 'French Fries with Alfredo Sauce',
    label_fn: 'سیب‌زمینی با سس آلفردو',
    price: 188000,
  },
  {
    name: 'chips_cheese',
    label: 'Chips with Cheese',
    label_fn: 'چیپس و پنیر',
    price: 180000,
  },
  {
    name: 'hot_chips',
    label: 'Hot Chips',
    label_fn: 'هات چیپس پپرونی',
    price: 188000,
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
];

export const BURGER_ITEMS: IMenuItem[] = [
  {
    name: 'classic_burger',
    label: 'Classic Burger',
    label_fn: 'برگر کلاسیک',
    price: 255000,
  },
  {
    name: 'cheese_burger',
    label: 'Cheese Burger',
    label_fn: 'چیزبرگر',
    price: 275000,
  },
  {
    name: 'mushroom_burger',
    label: 'Mushroom Burger',
    label_fn: 'ماشروم برگر',
    price: 285000,
  },
  {
    name: 'double_burger',
    label: 'Double Burger',
    label_fn: 'دبل برگر',
    price: 425000,
  },
];

export const PIZZA_ITEMS: IMenuItem[] = [
  {
    name: 'pizza_pepperoni',
    label: 'Pizza with Peperoni',
    label_fn: 'پیتزا پپرونی',
    price: 235000,
  },
  {
    name: 'street_premium_pizza',
    label: 'Street Special Pizza',
    label_fn: 'پیتزا مخصوص استریت',
    price: 260000,
  },
  {
    name: 'pizza_garlic_steak',
    label: 'Pizza with Garlic and Steak',
    label_fn: 'پیتزا سیر و استیک',
    price: 380000,
  },
  {
    name: 'pizza_chicken',
    label: 'Pizza with Chicken',
    label_fn: 'پیتزا چیکن',
    price: 320000,
  },
];

export const PENINI_ITEMS: IMenuItem[] = [
  {
    name: 'penini_chicken',
    label: 'Penini with Chicken',
    label_fn: 'پنینی مرغ',
    price: 220000,
  },
  {
    name: 'penini_tuna',
    label: 'Penini with Tuna',
    label_fn: 'پنینی تن ماهی',
    price: 230000,
  },
  {
    name: 'penini_beef',
    label: 'Penini with Beef',
    label_fn: 'پنینی گوشت',
    price: 260000,
  },
];

export const CEASAR_SALAD_ITEMS: IMenuItem[] = [
  {
    name: 'grilled_chicken_caesar_salad',
    label: 'Grilled Chicken Caesar Salad',
    label_fn: 'سالاد سزار با مرغ گریل',
    price: 245000,
  },
  {
    name: 'toasted_chicken_caesar_salad',
    label: 'Toasted Chicken Caesar Salad',
    label_fn: 'سالاد سزار با مرغ سوخاری',
    price: 265000,
  },
];

export const PASTA_ITEMS: IMenuItem[] = [
  {
    name: 'pasta_alfredo',
    label: 'Pasta with Alfredo Sauce',
    label_fn: 'پاستا آلفردو',
    price: 245000,
  },
  {
    name: 'pasta_beacon',
    label: 'Pasta with Beacon',
    label_fn: 'پاستا بیکن',
    price: 228000,
  },
];

export const FOOD_ITEMS: IMenuItem[] = [
  {
    name: 'classic_burger',
    label: 'Classic Burger',
    label_fn: 'برگر کلاسیک',
    price: 235000,
  },
  {
    name: 'cheese_burger',
    label: 'Cheese Burger',
    label_fn: 'چیزبرگر',
    price: 255000,
  },
  {
    name: 'mushroom_burger',
    label: 'Mushroom Burger',
    label_fn: 'ماشروم برگر',
    price: 265000,
  },
  {
    name: 'double_burger',
    label: 'Double Burger',
    label_fn: 'دبل برگر',
    price: 388000,
  },
  {
    name: 'pizza_pepperoni',
    label: 'Pizza with Peperoni',
    label_fn: 'پیتزا پپرونی',
    price: 235000,
  },
  {
    name: 'street_premium_pizza',
    label: 'Street Special Pizza',
    label_fn: 'پیتزا مخصوص استریت',
    price: 260000,
  },
  {
    name: 'pizza_garlic_steak',
    label: 'Pizza with Garlic and Steak',
    label_fn: 'پیتزا سیر و استیک',
    price: 380000,
  },
  {
    name: 'pizza_chicken',
    label: 'Pizza with Chicken',
    label_fn: 'پیتزا چیکن',
    price: 320000,
  },
  {
    name: 'penini_chicken',
    label: 'Penini with Chicken',
    label_fn: 'پنینی مرغ',
    price: 220000,
  },
  {
    name: 'penini_tuna',
    label: 'Penini with Tuna',
    label_fn: 'پنینی تن ماهی',
    price: 230000,
  },
  {
    name: 'penini_beef',
    label: 'Penini with Beef',
    label_fn: 'پنینی گوشت',
    price: 260000,
  },
  {
    name: 'grilled_chicken_caesar_salad',
    label: 'Grilled Chicken Caesar Salad',
    label_fn: 'سالاد سزار با مرغ گریل',
    price: 210000,
  },
  {
    name: 'toasted_chicken_caesar_salad',
    label: 'Toasted Chicken Caesar Salad',
    label_fn: 'سالاد سزار با مرغ سوخاری',
    price: 225000,
  },
  {
    name: 'pasta_alfredo',
    label: 'Pasta with Alfredo Sauce',
    label_fn: 'پاستا آلفردو',
    price: 210000,
  },
  {
    name: 'pasta_beacon',
    label: 'Pasta with Beacon',
    label_fn: 'پاستا بیکن',
    price: 198000,
  },
];

export const DRINKS_ITEMS: IMenuItem[] = [
  {
    name: ' mineral_water',
    label: 'Mineral Water',
    label_fn: 'آب معدنی',
    price: null,
  },
  {
    name: 'coca_cola',
    label: 'Coca Cola',
    label_fn: 'نوشابه کوکا',
    price: null,
  },
  {
    name: 'coca_zero',
    label: 'Coca Cola Zero',
    label_fn: 'نوشابه کوکا زیرو',
    price: null,
  },
];

export const YALDA_ITEMS: IMenuItem[] = [
  {
    name: 'chelle_mocktail',
    label: 'Chelle Mocktail',
    label_fn: 'موکتل شب چله (انار - سودا - لیمو و ...)',
    price: 110000,
  },
  {
    name: 'latte_pumpkin',
    label: 'Latte Pumpkin',
    label_fn: 'لته پامپکین اسپایس (لته کدو‌حلوایی استارباکس)',
    price: 90000,
  },
  {
    name: 'yalda_salad',
    label: 'Yalda Salad',
    label_fn: 'سالاد یلدا (فیله‌مرغ - انار - ذرت - گردو - سس مخصوص)',
    price: 185000,
  },
];
