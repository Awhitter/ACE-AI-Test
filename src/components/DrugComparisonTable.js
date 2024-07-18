import React from 'react';
import { motion } from 'framer-motion';

const DrugComparisonTable = ({ drugs }) => {
  return (
    <div className="overflow-x-auto mb-12">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="p-3">Drug Name</th>
            <th className="p-3">Dosage</th>
            <th className="p-3">Half-life</th>
            <th className="p-3">Renal Excretion</th>
            <th className="p-3">Key Notes</th>
          </tr>
        </thead>
        <tbody>
          {drugs.map((drug, index) => (
            <motion.tr
              key={drug.name}
              className="hover:bg-blue-50 transition-colors duration-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <td className="p-3 border-b">{drug.name}</td>
              <td className="p-3 border-b">{drug.dosage}</td>
              <td className="p-3 border-b">{drug.halfLife}</td>
              <td className="p-3 border-b">{drug.renalExcretion}</td>
              <td className="p-3 border-b">{drug.notes}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DrugComparisonTable;
