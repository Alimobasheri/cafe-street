import { FC, PropsWithChildren } from 'react';
import { motion } from 'framer-motion';

export const MenuOverlay: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="w-full h-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full rounded-lg shadow-lg rounded-xl bg-black/10 shadow-lg ring-1 ring-black/5 backdrop-blur-sm"
      >
        {children}
      </motion.div>
    </main>
  );
};
