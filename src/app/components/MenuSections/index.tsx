'use client';

import { MENU_SECTIONS } from '@/app/constants/MENU_SECTIONS';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { MenuSectionItems } from '../MenuSectionItems';
import logo from '@/app/logo.png';
import ArrowLeft from '@/app/icons/ArrowLeft';

export const MenuSections = () => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);
  const sectionsHeight = useRef<number[]>([]);
  useEffect(() => {
    if (!!ref.current) {
      if (!!selectedSection) {
        const index = MENU_SECTIONS.findIndex(
          (section) => section.name === selectedSection
        );
        ref.current.scrollTop = sectionsHeight.current[index];
      } else {
        ref.current.scrollTop = 0;
      }
    }
  }, [selectedSection]);

  useEffect(() => {
    if (!!ref.current) {
      const heights = Array.from(ref.current.children).map((child) => {
        return child.getBoundingClientRect().top - 130;
      });
      sectionsHeight.current = heights;
    }
  }, []);
  const sections = useMemo(() => {
    return MENU_SECTIONS.map((section) => {
      const isOpen = section.name === selectedSection;
      return (
        <motion.div key={section.name}>
          <a
            className={`p-2 text-right text-white font-light flex flex-row-reverse justify-start items-center gap-2  text-xl brightness-125 ${
              isOpen ? 'animate-flicker' : ''
            } ${
              !!selectedSection && !isOpen && 'opacity-60'
            } transition-opacity duration-300`}
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
            <div className="flex flex-row-reverse items-baseline gap-2 bg-black/50 p-1 rounded-lg">
              <span className={`text-nowrap ${section.drop_shadow}`}>
                {section.label_fn}
              </span>
              <div
                className={`transition-all duration-300 ${
                  isOpen ? '-rotate-90' : ''
                }`}
              >
                <ArrowLeft width={8} height={8} />
              </div>
            </div>
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
      <div className={`w-full h-[100px] flex justify-center items-center z-10`}>
        <Image
          src={logo}
          alt="logo"
          width={0}
          height={100}
          className="rounded-full animate-ringShadowColorCycle"
        />
      </div>
      <div
        ref={ref}
        className={`flex flex-col overflow-y-auto pb-[300px] scroll-smooth transition-all duration-1000 ease-in-out`}
      >
        {sections}
      </div>
    </div>
  );
};
