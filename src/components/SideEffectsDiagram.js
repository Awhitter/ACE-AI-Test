import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sideEffects = [
  { name: 'Dry Cough', description: 'Due to increased bradykinin levels', color: 'bg-red-500' },
  { name: 'Hyperkalemia', description: 'Elevated potassium levels in the blood', color: 'bg-yellow-500' },
  { name: 'Acute Kidney Injury', description: 'Sudden decrease in kidney function', color: 'bg-orange-500' },
  { name: 'Angioedema', description: 'Swelling of deep layers of skin', color: 'bg-purple-500' },
  { name: 'Hypotension', description: 'Low blood pressure, especially with first dose', color: 'bg-green-500' },
];

const SideEffectsDiagram = () => {
  const [selectedEffect, setSelectedEffect] = useState(null);

  return (
    <div className="my-12">
      <h3 className="text-2xl font-bold mb-6 text-blue-800">Side Effects of ACE Inhibitors</h3>
      <div className="flex flex-col md:flex-row justify-center items-center">
        <div className="relative w-80 h-80 mb-8 md:mb-0 md:mr-8">
          {sideEffects.map((effect, index) => {
            const angle = (index / sideEffects.length) * 2 * Math.PI;
            const x = Math.cos(angle) * 120 + 160;
            const y = Math.sin(angle) * 120 + 160;
            return (
              <motion.button
                key={effect.name}
                className={`absolute w-24 h-24 rounded-full ${effect.color} text-white flex items-center justify-center text-center p-2 cursor-pointer shadow-lg`}
                style={{ left: x - 48, top: y - 48 }}
                whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(0,0,0,0.2)' }}
                onClick={() => setSelectedEffect(effect)}
              >
                {effect.name}
              </motion.button>
            );
          })}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-40 h-40 rounded-full bg-white border-4 border-blue-500 flex items-center justify-center text-center p-4 shadow-lg">
              <span className="text-blue-800 font-bold">ACE Inhibitors</span>
            </div>
          </motion.div>
        </div>
        <AnimatePresence>
          {selectedEffect && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="md:w-1/2 p-6 bg-white rounded-lg shadow-xl border-l-4 border-blue-500"
            >
              <h4 className="font-bold text-xl mb-3 text-blue-800">{selectedEffect.name}</h4>
              <p className="text-gray-700 text-lg">{selectedEffect.description}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SideEffectsDiagram;
