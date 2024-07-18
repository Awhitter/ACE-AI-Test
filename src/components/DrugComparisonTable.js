import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pill, Clock, Droplet, Coffee, Heart, AlertTriangle, ThumbsUp, ThumbsDown } from 'lucide-react';

const DrugComparisonTable = () => {
  const [hoveredDrug, setHoveredDrug] = useState(null);

  const drugs = [
    {
      name: 'Lisinopril',
      dosage: '10-40 mg daily',
      halfLife: '12 hours',
      renalExcretion: '100%',
      foodEffect: 'No significant effect',
      details: 'Long-acting, once-daily dosing. No food interactions.',
      pros: 'Once-daily dosing, good for patients with liver impairment',
      cons: 'May cause dry cough, less effective in African American patients',
      color: 'blue'
    },
    {
      name: 'Enalapril',
      dosage: '5-40 mg daily (can be divided)',
      halfLife: '11 hours',
      renalExcretion: '88%',
      foodEffect: 'No significant effect',
      details: 'Prodrug, converted to active form in liver. Can be used in pediatrics.',
      pros: 'Well-established efficacy, can be used in children',
      cons: 'Twice-daily dosing may be needed for some patients',
      color: 'green'
    },
    {
      name: 'Ramipril',
      dosage: '2.5-20 mg daily',
      halfLife: '13-17 hours',
      renalExcretion: '60%',
      foodEffect: 'Absorption is reduced by 25-30%',
      details: 'High tissue affinity. Used in HOPE trial for cardiovascular risk reduction.',
      pros: 'Proven cardiovascular benefits in high-risk patients',
      cons: 'Food affects absorption, may need to be taken on an empty stomach',
      color: 'purple'
    },
    {
      name: 'Captopril',
      dosage: '25-150 mg daily (divided doses)',
      halfLife: '2 hours',
      renalExcretion: '95%',
      foodEffect: 'Absorption is reduced by 30-40%',
      details: 'Short-acting. Take on empty stomach. Contains sulfhydryl group.',
      pros: 'Rapid onset of action, useful in hypertensive emergencies',
      cons: 'Multiple daily doses required, food interactions',
      color: 'red'
    },
    {
      name: 'Benazepril',
      dosage: '10-40 mg daily',
      halfLife: '10-11 hours',
      renalExcretion: '88%',
      foodEffect: 'No significant effect',
      details: 'Prodrug. High lipophilicity, good tissue penetration.',
      pros: 'Once-daily dosing, good tissue penetration',
      cons: 'Less clinical trial data compared to other ACE inhibitors',
      color: 'yellow'
    },
  ];

  return (
    <div className="overflow-x-auto bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg p-6">
      <h3 className="text-3xl font-bold mb-6 text-blue-800 text-center">ACE Inhibitor Comparison</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {drugs.map((drug) => (
          <motion.div
            key={drug.name}
            className={`bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-${drug.color}-500 hover:shadow-xl transition-shadow duration-300`}
            onMouseEnter={() => setHoveredDrug(drug.name)}
            onMouseLeave={() => setHoveredDrug(null)}
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
            <AnimatePresence>
              {hoveredDrug === drug.name && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 bg-gray-50"
                >
                  <div className="flex items-center text-gray-700 mb-2">
                    <Heart className="w-5 h-5 mr-2 text-red-500" />
                    <span className="font-semibold">Key Notes:</span>
                  </div>
                  <p className="text-gray-600 mb-4">{drug.details}</p>
                  <div className="flex items-center text-gray-700 mb-2">
                    <ThumbsUp className="w-5 h-5 mr-2 text-green-500" />
                    <span className="font-semibold">Pros:</span>
                  </div>
                  <p className="text-gray-600 mb-4">{drug.pros}</p>
                  <div className="flex items-center text-gray-700 mb-2">
                    <ThumbsDown className="w-5 h-5 mr-2 text-red-500" />
                    <span className="font-semibold">Cons:</span>
                  </div>
                  <p className="text-gray-600">{drug.cons}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
      <div className="mt-8 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
        <div className="flex items-center mb-2">
          <AlertTriangle className="w-6 h-6 text-yellow-600 mr-2" />
          <span className="text-lg font-semibold text-yellow-800">Important Note:</span>
        </div>
        <p className="text-yellow-700">
          All ACE inhibitors end with the suffix '-pril'. They are contraindicated in pregnancy and should be used with caution in patients with renal artery stenosis or hyperkalemia.
        </p>
      </div>
    </div>
  );
};

export default DrugComparisonTable;
