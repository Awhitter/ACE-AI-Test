import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const DrugComparisonTable = ({ drugs }) => {
  const [expandedDrug, setExpandedDrug] = useState(null);

  const toggleDrug = (drugName) => {
    setExpandedDrug(expandedDrug === drugName ? null : drugName);
  };

  return (
    <div className="overflow-x-auto mb-12">
      <table className="w-full text-left border-collapse shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <th className="p-4">Drug Name</th>
            <th className="p-4">Dosage</th>
            <th className="p-4">Half-life</th>
            <th className="p-4">Renal Excretion</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {drugs.map((drug, index) => (
            <React.Fragment key={drug.name}>
              <motion.tr
                className="bg-white hover:bg-blue-50 transition-colors duration-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <td className="p-4 border-b font-semibold text-blue-700">{drug.name}</td>
                <td className="p-4 border-b">{drug.dosage}</td>
                <td className="p-4 border-b">{drug.halfLife}</td>
                <td className="p-4 border-b">{drug.renalExcretion}</td>
                <td className="p-4 border-b">
                  <button
                    onClick={() => toggleDrug(drug.name)}
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    {expandedDrug === drug.name ? (
                      <>
                        <span className="mr-2">Hide Details</span>
                        <ChevronUp size={20} />
                      </>
                    ) : (
                      <>
                        <span className="mr-2">Show Details</span>
                        <ChevronDown size={20} />
                      </>
                    )}
                  </button>
                </td>
              </motion.tr>
              <AnimatePresence>
                {expandedDrug === drug.name && (
                  <motion.tr
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td colSpan="5" className="p-4 bg-blue-50">
                      <div className="text-gray-700">
                        <h4 className="font-semibold text-lg mb-2">Key Notes:</h4>
                        <p>{drug.notes}</p>
                      </div>
                    </td>
                  </motion.tr>
                )}
              </AnimatePresence>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DrugComparisonTable;
