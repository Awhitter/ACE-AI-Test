import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Pill, Clock, Droplet, Coffee } from 'lucide-react';

const DrugComparisonTable = () => {
  const [expandedDrug, setExpandedDrug] = useState(null);

  const toggleDrug = (drug) => {
    setExpandedDrug(expandedDrug === drug ? null : drug);
  };

  const drugs = [
    {
      name: 'Lisinopril',
      dosage: '10-40 mg once daily',
      halfLife: '12 hours',
      renalExcretion: '100%',
      foodEffect: 'No significant effect',
      details: 'Lisinopril is a long-acting ACE inhibitor. It does not require activation by hepatic metabolism, making it a good choice for patients with liver impairment.',
      color: 'blue'
    },
    {
      name: 'Enalapril',
      dosage: '5-40 mg once or twice daily',
      halfLife: '11 hours (enalaprilat)',
      renalExcretion: '88%',
      foodEffect: 'No significant effect',
      details: 'Enalapril is a prodrug that is converted to its active form, enalaprilat, in the liver. It has a long history of use and well-established efficacy in hypertension and heart failure.',
      color: 'green'
    },
    {
      name: 'Ramipril',
      dosage: '2.5-20 mg once daily',
      halfLife: '13-17 hours',
      renalExcretion: '60%',
      foodEffect: 'Absorption is reduced by 25-30%',
      details: 'Ramipril has shown benefits in reducing cardiovascular events in high-risk patients, as demonstrated in the HOPE trial. It is often preferred in patients with cardiovascular risk factors.',
      color: 'purple'
    },
  ];

  return (
    <div className="overflow-x-auto bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold mb-4 text-blue-800">ACE Inhibitor Comparison</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {drugs.map((drug) => (
          <motion.div
            key={drug.name}
            className={`bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-${drug.color}-500`}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className={`bg-${drug.color}-100 p-4`}>
              <h4 className={`text-xl font-bold text-${drug.color}-700 mb-2`}>{drug.name}</h4>
              <div className="flex items-center text-gray-600 mb-2">
                <Pill className="w-5 h-5 mr-2" />
                <span>{drug.dosage}</span>
              </div>
              <div className="flex items-center text-gray-600 mb-2">
                <Clock className="w-5 h-5 mr-2" />
                <span>Half-life: {drug.halfLife}</span>
              </div>
              <div className="flex items-center text-gray-600 mb-2">
                <Droplet className="w-5 h-5 mr-2" />
                <span>Renal Excretion: {drug.renalExcretion}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Coffee className="w-5 h-5 mr-2" />
                <span>Food Effect: {drug.foodEffect}</span>
              </div>
            </div>
            <div className="p-4">
              <button
                onClick={() => toggleDrug(drug.name)}
                className={`w-full text-${drug.color}-600 hover:text-${drug.color}-800 focus:outline-none flex items-center justify-center`}
              >
                <span>{expandedDrug === drug.name ? 'Hide Details' : 'Show Details'}</span>
                <ChevronDown
                  className={`ml-1 w-5 h-5 transition-transform duration-200 ${
                    expandedDrug === drug.name ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {expandedDrug === drug.name && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="mt-4 text-gray-700">{drug.details}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DrugComparisonTable;
