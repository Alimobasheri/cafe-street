'use client';

import { MENU_SECTIONS } from '@/app/constants/MENU_SECTIONS';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { MenuSectionItems } from '../MenuSectionItems';

export const MenuSections = () => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const sections = useMemo(() => {
    return MENU_SECTIONS.map((section) => {
      const isOpen = section.name === selectedSection;
      return (
        <motion.div key={section.name}>
          <a
            className={`p-2 text-right text-white font-light flex flex-row-reverse justify-start items-center gap-2  text-2xl brightness-125 ${
              isOpen ? 'animate-flicker' : ''
            }`}
            onClick={() => {
              if (isOpen) setSelectedSection(null);
              else setSelectedSection(section.name);
            }}
          >
            {!!section.image && (
              <span className={`min-w-[40px]`}>
                <Image
                  src={section.image}
                  alt={section.label}
                  width={40}
                  height={40}
                  className={`transition-transform duration-500 ${
                    isOpen ? 'scale-125' : 'scale-100'
                  }`}
                />
              </span>
            )}
            <span className={`text-nowrap ${section.drop_shadow} contrast-150`}>
              {section.label_fn}
            </span>
          </a>
          <div
            className={`w-full transition-transform duration-100 origin-top overflow-hidden justify-center items-center ${
              !isOpen ? 'h-0' : 'h-auto'
            }`}
          >
            <MenuSectionItems
              has_sub_sections={section.has_sub_sections}
              subsections={section.subsections}
              items={section.items}
            />
          </div>
        </motion.div>
      );
    });
  }, [selectedSection]);
  return (
    <div
      className={`w-full max-h-screen flex flex-col p-2 transition-all duration-300 `}
    >
      <h1 className={`text-6xl font-bold py-2 text-center`}>STREET CAFE</h1>
      <div
        className={`flex flex-col overflow-y-auto pb-20 scroll-smooth transition-all duration-1000 ease-in-out`}
      >
        {sections}
      </div>
    </div>
  );
};
