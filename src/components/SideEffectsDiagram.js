import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Droplet, Activity, Frown, ArrowDown } from 'lucide-react';

const sideEffects = [
  { name: 'Dry Cough', description: 'Due to increased bradykinin levels', color: 'bg-red-500', icon: AlertTriangle },
  { name: 'Hyperkalemia', description: 'Elevated potassium levels in the blood', color: 'bg-yellow-500', icon: Droplet },
  { name: 'Acute Kidney Injury', description: 'Sudden decrease in kidney function', color: 'bg-orange-500', icon: Activity },
  { name: 'Angioedema', description: 'Swelling of deep layers of skin', color: 'bg-purple-500', icon: Frown },
  { name: 'Hypotension', description: 'Low blood pressure, especially with first dose', color: 'bg-green-500', icon: ArrowDown },
];

const SideEffectsDiagram = () => {
  const [selectedEffect, setSelectedEffect] = useState(null);

  return (
    <div className="my-12 bg-white rounded-3xl shadow-2xl p-8">
      <h3 className="text-3xl font-bold mb-8 text-blue-800 text-center">Side Effects of ACE Inhibitors</h3>
      <div className="flex flex-col lg:flex-row justify-center items-center">
        <div className="relative w-96 h-96 mb-8 lg:mb-0 lg:mr-8">
          {sideEffects.map((effect, index) => {
            const angle = (index / sideEffects.length) * 2 * Math.PI;
            const x = Math.cos(angle) * 140 + 192;
            const y = Math.sin(angle) * 140 + 192;
            return (
              <motion.button
                key={effect.name}
                className={`absolute w-28 h-28 rounded-2xl ${effect.color} text-white flex flex-col items-center justify-center text-center p-2 cursor-pointer shadow-lg`}
                style={{ left: x - 56, top: y - 56 }}
                whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(0,0,0,0.3)' }}
                onClick={() => setSelectedEffect(effect)}
              >
                <effect.icon className="w-8 h-8 mb-2" />
                <span className="text-sm font-semibold">{effect.name}</span>
              </motion.button>
            );
          })}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-center p-4 shadow-lg">
              <span className="text-white font-bold text-xl">ACE Inhibitors</span>
            </div>
          </motion.div>
        </div>
        <AnimatePresence>
          {selectedEffect && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="lg:w-1/2 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl border-l-4 border-blue-500"
            >
              <div className="flex items-center mb-4">
                <selectedEffect.icon className={`w-8 h-8 mr-3 ${selectedEffect.color.replace('bg-', 'text-')}`} />
                <h4 className="font-bold text-2xl text-blue-800">{selectedEffect.name}</h4>
              </div>
              <p className="text-gray-700 text-lg">{selectedEffect.description}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SideEffectsDiagram;
