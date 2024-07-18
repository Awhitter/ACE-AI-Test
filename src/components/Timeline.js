import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ChevronRight } from 'lucide-react';

const timelineEvents = [
  { year: 1965, event: 'Discovery of ACE Inhibitors', details: 'Researchers at the Squibb Institute for Medical Research discover the first ACE inhibitor.' },
  { year: 1975, event: 'Captopril developed', details: 'Captopril, the first orally active ACE inhibitor, is developed.' },
  { year: 1981, event: 'Captopril approved by FDA', details: 'The FDA approves Captopril, marking the beginning of ACE inhibitors in clinical use.' },
  { year: 1985, event: 'Enalapril introduced', details: 'Enalapril, a longer-acting ACE inhibitor, is introduced to the market.' },
  { year: 1990, event: 'Lisinopril approved', details: 'Lisinopril, a lysine-analog ACE inhibitor with once-daily dosing, is approved.' },
  { year: 2000, event: 'HOPE trial results published', details: 'The Heart Outcomes Prevention Evaluation (HOPE) trial demonstrates cardiovascular benefits of ACE inhibitors beyond blood pressure lowering.' },
];

const Timeline = () => {
  const [expandedEvent, setExpandedEvent] = useState(null);

  return (
    <div className="my-12 relative">
      <h3 className="text-2xl font-bold mb-6 text-blue-800">ACE Inhibitors Timeline</h3>
      <div className="absolute left-4 top-14 bottom-0 w-0.5 bg-blue-300"></div>
      {timelineEvents.map((event, index) => (
        <motion.div
          key={event.year}
          className="mb-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex items-center">
            <div className="bg-blue-500 rounded-full p-2 mr-4 z-10">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div 
              className="bg-white p-4 rounded-lg shadow-md flex-grow cursor-pointer hover:bg-blue-50 transition-colors duration-200"
              onClick={() => setExpandedEvent(expandedEvent === event.year ? null : event.year)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-bold text-blue-600">{event.year}</span>
                  <p className="text-gray-700">{event.event}</p>
                </div>
                <ChevronRight className={`w-5 h-5 text-blue-500 transition-transform duration-200 ${expandedEvent === event.year ? 'transform rotate-90' : ''}`} />
              </div>
            </div>
          </div>
          <AnimatePresence>
            {expandedEvent === event.year && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="ml-16 mt-2 bg-blue-50 p-4 rounded-lg"
              >
                <p className="text-gray-700">{event.details}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

export default Timeline;
