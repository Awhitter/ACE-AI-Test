import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

const timelineEvents = [
  { year: 1965, event: 'Discovery of ACE Inhibitors' },
  { year: 1975, event: 'Captopril developed' },
  { year: 1981, event: 'Captopril approved by FDA' },
  { year: 1985, event: 'Enalapril introduced' },
  { year: 1990, event: 'Lisinopril approved' },
  { year: 2000, event: 'HOPE trial results published' },
];

const Timeline = () => {
  return (
    <div className="my-12 relative">
      <h3 className="text-2xl font-bold mb-6 text-blue-800">ACE Inhibitors Timeline</h3>
      <div className="absolute left-4 top-14 bottom-0 w-0.5 bg-blue-300"></div>
      {timelineEvents.map((event, index) => (
        <motion.div
          key={event.year}
          className="mb-8 flex items-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="bg-blue-500 rounded-full p-2 mr-4 z-10">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md flex-grow">
            <span className="font-bold text-blue-600">{event.year}</span>
            <p className="text-gray-700">{event.event}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Timeline;
