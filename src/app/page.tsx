import { MenuOverlay } from './components/MenuOverlay';
import { MenuSections } from './components/MenuSections';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
export default async function Home() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: menuSections, error: menuSectionsError } = await supabase
    .from('menu_sections')
    .select('*');

  const { data: menuSubsections, error: menuSubsectionsError } = await supabase
    .from('menu_subsections')
    .select('*');

  const { data: menuItems, error: menuItemsError } = await supabase
    .from('menu_items')
    .select('*');

  if (menuSectionsError || menuSubsectionsError || menuItemsError) {
    console.error('Error fetching data:', {
      menuSectionsError,
      menuSubsectionsError,
      menuItemsError,
    });
  }
  if (!menuSections || !menuSubsections || !menuItems) {
    return <div>Could not connect to database, pease try again.</div>;
  }
  return (
    <div className="flex flex-col justify-center items-center font-[family-name:var(--font-geist-sans)] absolute top-0 left-0 w-full h-screen max-h-screen">
      <MenuOverlay>
        <MenuSections {...{ menuSections, menuSubsections, menuItems }} />
      </MenuOverlay>
      {/* <div className="w-[100px] h-[100px] absolute bottom-[100px] left-[25%]">
        <Image src={MenuBoard} alt="Menu" width={100} height={100} />
      </div> */}
      {/* <footer className="flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer> */}
    </div>
  );
}
