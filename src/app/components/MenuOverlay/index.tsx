'use client';

import { FC, PropsWithChildren } from 'react';
import { motion } from 'framer-motion';

export const MenuOverlay: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="w-full max-w-md h-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full backdrop-blur-sm bg-black/60"
      >
        {children}
      </motion.div>
    </main>
  );
};
