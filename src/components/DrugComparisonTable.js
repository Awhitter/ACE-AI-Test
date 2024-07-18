import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';

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
      details: 'Lisinopril is a long-acting ACE inhibitor. It does not require activation by hepatic metabolism, making it a good choice for patients with liver impairment.'
    },
    {
      name: 'Enalapril',
      dosage: '5-40 mg once or twice daily',
      halfLife: '11 hours (enalaprilat)',
      renalExcretion: '88%',
      foodEffect: 'No significant effect',
      details: 'Enalapril is a prodrug that is converted to its active form, enalaprilat, in the liver. It has a long history of use and well-established efficacy in hypertension and heart failure.'
    },
    {
      name: 'Ramipril',
      dosage: '2.5-20 mg once daily',
      halfLife: '13-17 hours',
      renalExcretion: '60%',
      foodEffect: 'Absorption is reduced by 25-30%',
      details: 'Ramipril has shown benefits in reducing cardiovascular events in high-risk patients, as demonstrated in the HOPE trial. It is often preferred in patients with cardiovascular risk factors.'
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Drug</th>
            <th className="py-3 px-4 text-left">Dosage</th>
            <th className="py-3 px-4 text-left">Half-life</th>
            <th className="py-3 px-4 text-left">Renal Excretion</th>
            <th className="py-3 px-4 text-left">Food Effect</th>
            <th className="py-3 px-4 text-left">Details</th>
          </tr>
        </thead>
        <tbody>
          {drugs.map((drug) => (
            <React.Fragment key={drug.name}>
              <tr className="border-b hover:bg-blue-50 transition-colors duration-200">
                <td className="py-3 px-4">{drug.name}</td>
                <td className="py-3 px-4">{drug.dosage}</td>
                <td className="py-3 px-4">{drug.halfLife}</td>
                <td className="py-3 px-4">{drug.renalExcretion}</td>
                <td className="py-3 px-4">{drug.foodEffect}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => toggleDrug(drug.name)}
                    className="text-blue-500 hover:text-blue-700 focus:outline-none"
                  >
                    {expandedDrug === drug.name ? 'Hide Details' : 'Show Details'}
                    <ChevronDown
                      className={`inline-block ml-1 w-4 h-4 transition-transform duration-200 ${
                        expandedDrug === drug.name ? 'transform rotate-180' : ''
                      }`}
                    />
                  </button>
                </td>
              </tr>
              {expandedDrug === drug.name && (
                <motion.tr
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <td colSpan="6" className="py-3 px-4 bg-blue-50">
                    <p className="text-gray-700">{drug.details}</p>
                  </td>
                </motion.tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DrugComparisonTable;
