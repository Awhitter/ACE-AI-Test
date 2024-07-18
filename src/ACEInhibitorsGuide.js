import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Droplet, AlertTriangle, Stethoscope, BookOpen, Zap, PlusCircle, MinusCircle, CheckCircle, ArrowUp } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import Timeline from './components/Timeline';
import SideEffectsDiagram from './components/SideEffectsDiagram';
import DrugComparisonTable from './components/DrugComparisonTable';
import Quiz from './components/Quiz';

const Section = ({ title, icon: Icon, children, keyTakeaway, onComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView && !hasCompleted) {
      onComplete();
      setHasCompleted(true);
    }
  }, [inView, onComplete, hasCompleted]);

  return (
    <motion.div
      ref={ref}
      className="mb-12 rounded-3xl overflow-hidden shadow-2xl bg-white"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.button
        className="w-full text-left p-8 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 flex items-center justify-between focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <span className="flex items-center text-3xl font-extrabold text-white">
          <Icon className="w-10 h-10 mr-5 text-blue-100" />
          {title}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <ChevronDown className="w-8 h-8 text-blue-100" />
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {keyTakeaway && (
              <motion.div
                className="p-6 bg-gradient-to-r from-yellow-50 to-yellow-100 border-l-8 border-yellow-400"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <div className="flex items-center">
                  <span className="font-bold text-xl text-yellow-800">Key Takeaway:</span>
                </div>
                <p className="mt-2 text-yellow-900 text-lg">{keyTakeaway}</p>
              </motion.div>
            )}
            <div className="p-10 bg-gradient-to-b from-white to-blue-50">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FloatingActionButton = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.1 }}
    >
      <button
        onClick={scrollToTop}
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
      >
        <ArrowUp size={24} />
      </button>
    </motion.div>
  );
};

const ACEInhibitorsGuide = () => {
  const [completedSections, setCompletedSections] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedDrugs, setExpandedDrugs] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const updateCompletedSections = useCallback(() => {
    setCompletedSections(prev => Math.min(prev + 1, totalSections));
  }, []);

  const drugs = useMemo(() => [
    { 
      name: 'Lisinopril', 
      color: 'bg-gradient-to-r from-teal-100 to-teal-200 border-teal-500 text-teal-800',
      dosage: '10-40 mg daily',
      halfLife: '12 hours',
      renalExcretion: '100%',
      notes: 'Long-acting, once-daily dosing. No food interactions.'
    },
    { 
      name: 'Enalapril', 
      color: 'bg-gradient-to-r from-cyan-100 to-cyan-200 border-cyan-500 text-cyan-800',
      dosage: '5-40 mg daily (can be divided)',
      halfLife: '11 hours',
      renalExcretion: '88%',
      notes: 'Prodrug, converted to active form in liver. Can be used in pediatrics.'
    },
    { 
      name: 'Ramipril', 
      color: 'bg-gradient-to-r from-sky-100 to-sky-200 border-sky-500 text-sky-800',
      dosage: '2.5-20 mg daily',
      halfLife: '13-17 hours',
      renalExcretion: '60%',
      notes: 'High tissue affinity. Used in HOPE trial for cardiovascular risk reduction.'
    },
    { 
      name: 'Captopril', 
      color: 'bg-gradient-to-r from-blue-100 to-blue-200 border-blue-500 text-blue-800',
      dosage: '25-150 mg daily (divided doses)',
      halfLife: '2 hours',
      renalExcretion: '95%',
      notes: 'Short-acting. Take on empty stomach. Contains sulfhydryl group.'
    },
    { 
      name: 'Benazepril',
      color: 'bg-gradient-to-r from-indigo-100 to-indigo-200 border-indigo-500 text-indigo-800',
      dosage: '10-40 mg daily',
      halfLife: '10-11 hours',
      renalExcretion: '88%',
      notes: 'Prodrug. High lipophilicity, good tissue penetration.'
    }
  ], []);

  const totalSections = 5;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 min-h-screen text-white">
      <FloatingActionButton />
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="relative z-10 px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            <h1 className="text-7xl font-black mb-6 text-center leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                ACE Inhibitors
              </span>
            </h1>
            <p className="text-3xl text-center text-blue-200 mb-12 font-light">Essential knowledge for FNP ANCC Nurse Practitioner Exam</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="flex justify-center"
          >
            <a href="#content" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
              Start Learning
            </a>
          </motion.div>
        </div>
      </div>

      <div id="content" className="p-8">
        <motion.div 
          className="mb-12 bg-white rounded-2xl p-6 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-blue-800">Your Progress</h2>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-4"
              initial={{ width: 0 }}
              animate={{ width: `${(completedSections / totalSections) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </div>
          <p className="text-right mt-3 text-lg text-gray-600 font-semibold">{completedSections} of {totalSections} sections completed</p>
        </motion.div>

        <Section 
          title="Mechanism of Action" 
          icon={Zap}
          keyTakeaway="ACE Inhibitors end in '-pril' and work by blocking the conversion of Angiotensin I to II"
          onComplete={updateCompletedSections}
        >
          <p className="mb-6 text-gray-700 leading-relaxed text-lg">ACE Inhibitors work by blocking the conversion of Angiotensin I to Angiotensin II in the renin-angiotensin-aldosterone system (RAAS). This leads to several beneficial effects:</p>
          <ul className="list-disc pl-8 space-y-3 mb-8 text-gray-700 text-lg">
            <li>Decreased vasoconstriction</li>
            <li>Reduced aldosterone secretion</li>
            <li>Lowered blood pressure</li>
            <li>Decreased workload on the heart</li>
            <li>Improved blood flow to kidneys</li>
          </ul>
          <Timeline />
        </Section>

        <Section 
          title="Common ACE Inhibitors" 
          icon={Droplet}
          keyTakeaway="Remember the mnemonic 'LERCA-B' for key drugs: Lisinopril, Enalapril, Ramipril, Captopril, Benazepril. All ACE inhibitors end with '-pril'."
          onComplete={updateCompletedSections}
        >
          <p className="mb-8 text-gray-700 leading-relaxed text-xl">Key ACE Inhibitors to remember for the FNP exam (LERCA-B):</p>
          <DrugComparisonTable drugs={drugs} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8 max-w-6xl mx-auto">
            {drugs.map((drug, index) => (
              <motion.div
                key={drug.name}
                className={`p-6 rounded-2xl transition-all duration-300 ${drug.color} border-2 shadow-xl hover:shadow-2xl cursor-pointer`}
                whileHover={{scale: 1.03}}
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5, delay: index * 0.1}}
              >
                <motion.div
                  className="w-full"
                  animate={{ height: expandedDrugs[drug.name] ? 'auto' : '80px' }}
                  transition={{ duration: 0.3 }}
                >
                  <button
                    className="w-full text-left focus:outline-none"
                    onClick={() => setExpandedDrugs(prev => ({ ...prev, [drug.name]: !prev[drug.name] }))}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-2xl">{drug.name}</span>
                      {expandedDrugs[drug.name] ? <MinusCircle size={24} /> : <PlusCircle size={24} />}
                    </div>
                  </button>
                  <AnimatePresence>
                    {expandedDrugs[drug.name] && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="mt-6 space-y-3 text-lg">
                          <p><strong>Dosage:</strong> {drug.dosage}</p>
                          <p><strong>Half-life:</strong> {drug.halfLife}</p>
                          <p><strong>Renal Excretion:</strong> {drug.renalExcretion}</p>
                          <p><strong>Key Notes:</strong> {drug.notes}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section
          title="Clinical Indications"
          icon={BookOpen}
          keyTakeaway="ACE inhibitors are widely used in hypertension, heart failure, diabetic nephropathy, and other cardiovascular conditions."
          onComplete={updateCompletedSections}
        >
          <p className="mb-4 text-gray-700 leading-relaxed text-lg">
            ACE inhibitors are commonly prescribed for the following conditions:
          </p>
          <ul className="list-disc pl-8 mb-8 text-gray-700 leading-relaxed text-lg">
            <li>Hypertension</li>
            <li>Heart failure</li>
            <li>Diabetic nephropathy</li>
            <li>Myocardial infarction (heart attack)</li>
            <li>Left ventricular dysfunction</li>
            <li>Chronic kidney disease</li>
          </ul>
          <p className="mb-4 text-gray-700 leading-relaxed text-lg">
            In hypertension, ACE inhibitors are often used as first-line therapy or in combination with other antihypertensive medications. They are particularly effective in patients with diabetes, heart failure, or kidney disease.
          </p>
          <p className="mb-4 text-gray-700 leading-relaxed text-lg">
            In heart failure, ACE inhibitors have been shown to improve symptoms, reduce hospitalizations, and prolong survival. They are recommended for all patients with heart failure with reduced ejection fraction (HFrEF) unless contraindicated.
          </p>
          <p className="mb-4 text-gray-700 leading-relaxed text-lg">
            For patients with diabetic nephropathy, ACE inhibitors can slow the progression of kidney disease and reduce the risk of cardiovascular events.
          </p>
        </Section>

        <Section
          title="Side Effects and Precautions"
          icon={AlertTriangle}
          keyTakeaway="Common side effects include cough, hyperkalemia, and angioedema. ACE inhibitors are contraindicated in pregnancy."
          onComplete={updateCompletedSections}
        >
          <p className="mb-4 text-gray-700 leading-relaxed text-lg">
            While generally well-tolerated, ACE inhibitors can cause several side effects, including:
          </p>
          <ul className="list-disc pl-8 mb-8 text-gray-700 leading-relaxed text-lg">
            <li>Dry cough (up to 20% of patients)</li>
            <li>Hyperkalemia (especially in patients with renal impairment)</li>
            <li>Angioedema (rare but potentially life-threatening)</li>
            <li>Hypotension (more common in patients with heart failure or volume depletion)</li>
            <li>Acute kidney injury (in patients with renal artery stenosis)</li>
          </ul>
          <SideEffectsDiagram />
          <p className="mb-4 text-gray-700 leading-relaxed text-lg">
            ACE inhibitors are contraindicated in pregnancy, especially during the second and third trimesters, due to the risk of fetal renal damage and other congenital abnormalities.
          </p>
          <p className="mb-4 text-gray-700 leading-relaxed text-lg">
            Caution should be exercised in patients with renal impairment, as ACE inhibitors can further decrease renal function and cause hyperkalemia.
          </p>
        </Section>

        <Section
          title="Clinical Evidence and Guidelines"
          icon={Stethoscope}
          keyTakeaway="Landmark trials have demonstrated the benefits of ACE inhibitors in various cardiovascular conditions."
          onComplete={updateCompletedSections}
        >
          <p className="mb-4 text-gray-700 leading-relaxed text-lg">
            Several landmark clinical trials have established the efficacy and safety of ACE inhibitors in various cardiovascular conditions:
          </p>
          <ul className="list-disc pl-8 mb-8 text-gray-700 leading-relaxed text-lg">
            {[
              { trial: 'HOPE', detail: 'Ramipril reduced cardiovascular events in high-risk patients without heart failure or low ejection fraction.', reference: 'N Engl J Med. 2000;342(3):145-153.' },
              { trial: 'SOLVD', detail: 'Enalapril improved survival and reduced hospitalizations in patients with heart failure and reduced ejection fraction.', reference: 'N Engl J Med. 1991;325(5):293-302.' },
              { trial: 'AIRE', detail: 'Ramipril reduced mortality and cardiovascular events in patients with acute myocardial infarction and heart failure.', reference: 'Lancet. 1993;342(8875):821-828.' },
              { trial: 'IDNT', detail: 'Irbesartan (an ARB) and amlodipine were more effective than placebo in slowing the progression of diabetic nephropathy.', reference: 'N Engl J Med. 2001;345(12):851-860.' },
              { trial: 'ALLHAT', detail: 'Lisinopril was as effective as diuretics and calcium channel blockers in reducing cardiovascular events in hypertensive patients.', reference: 'JAMA. 2002;288(23):2981-2997.' }
            ].map(({ trial, detail, reference }) => (
              <motion.li
                key={trial}
                className="mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <span className="font-semibold text-green-700 text-xl">{trial}: </span>
                <span className="text-gray-700 text-lg">{detail}</span>
                <p className="text-sm text-gray-500 mt-2">Reference: {reference}</p>
              </motion.li>
            ))}
          </ul>
          <motion.div 
            className="p-8 bg-green-50 border-2 border-green-200 rounded-2xl shadow-xl"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="font-semibold mb-4 text-green-800 text-2xl">Clinical Practice Tip:</h3>
            <p className="text-gray-700 leading-relaxed text-lg">When initiating ACE inhibitors, start at a low dose and titrate up gradually while monitoring blood pressure, renal function, and potassium levels. In heart failure, aim for target doses used in clinical trials for optimal benefits.</p>
          </motion.div>
        </Section>

        <Section
          title="Test Your Knowledge"
          icon={CheckCircle}
          keyTakeaway="Reinforce your understanding of ACE Inhibitors with this interactive quiz."
          onComplete={updateCompletedSections}
        >
          <Quiz />
        </Section>
      </div>
    </div>
  );
};

export default ACEInhibitorsGuide;
