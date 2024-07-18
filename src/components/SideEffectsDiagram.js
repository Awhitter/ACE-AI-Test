import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sideEffects = [
  { name: 'Dry Cough', description: 'Due to increased bradykinin levels' },
  { name: 'Hyperkalemia', description: 'Elevated potassium levels in the blood' },
  { name: 'Acute Kidney Injury', description: 'Sudden decrease in kidney function' },
  { name: 'Angioedema', description: 'Swelling of deep layers of skin' },
  { name: 'Hypotension', description: 'Low blood pressure, especially with first dose' },
];

const SideEffectsDiagram = () => {
  const [selectedEffect, setSelectedEffect] = useState(null);

  return (
    <div className="my-12">
      <h3 className="text-2xl font-bold mb-6 text-blue-800">Side Effects of ACE Inhibitors</h3>
      <div className="flex justify-center items-center">
        <div className="relative w-80 h-80">
          {sideEffects.map((effect, index) => {
            const angle = (index / sideEffects.length) * 2 * Math.PI;
            const x = Math.cos(angle) * 120 + 160;
            const y = Math.sin(angle) * 120 + 160;
            return (
              <motion.button
                key={effect.name}
                className="absolute w-20 h-20 rounded-full bg-blue-500 text-white flex items-center justify-center text-center p-2 cursor-pointer"
                style={{ left: x - 40, top: y - 40 }}
                whileHover={{ scale: 1.1 }}
                onClick={() => setSelectedEffect(effect)}
              >
                {effect.name}
              </motion.button>
            );
          })}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-40 rounded-full bg-white border-4 border-blue-500 flex items-center justify-center text-center p-4">
              <span className="text-blue-800 font-bold">ACE Inhibitors</span>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {selectedEffect && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-8 p-4 bg-blue-100 rounded-lg"
          >
            <h4 className="font-bold text-lg mb-2">{selectedEffect.name}</h4>
            <p>{selectedEffect.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SideEffectsDiagram;
