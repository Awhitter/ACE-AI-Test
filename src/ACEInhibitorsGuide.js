import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ChevronDown, Droplet, AlertTriangle, Stethoscope, BookOpen, Zap, PlusCircle, MinusCircle, Activity, Star, ArrowUp, Clock, CheckCircle, Frown, ArrowDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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

  const toggleOpen = useCallback(() => setIsOpen(prev => !prev), []);

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
        onClick={toggleOpen}
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
                  <Star className="w-6 h-6 text-yellow-600 mr-3" />
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

const InteractiveDiagram = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { label: 'Renin', description: 'Released by kidneys in response to low blood pressure' },
    { label: 'Angiotensinogen', description: 'Precursor protein produced by the liver' },
    { label: 'Angiotensin I', description: 'Inactive decapeptide formed from angiotensinogen' },
    { label: 'ACE', description: 'Angiotensin Converting Enzyme, target of ACE inhibitors' },
    { label: 'Angiotensin II', description: 'Active octapeptide, potent vasoconstrictor' },
  ];

  const nextStep = () => setActiveStep((prev) => (prev + 1) % steps.length);
  const prevStep = () => setActiveStep((prev) => (prev - 1 + steps.length) % steps.length);

  return (
    <motion.div
      className="mt-12 p-8 bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl shadow-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="font-bold mb-8 text-3xl text-blue-900 text-center">ACE Inhibitor Mechanism of Action</h3>
      <div className="relative mb-12">
        <div className="flex justify-center items-center space-x-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.label}
              className={`w-40 h-40 rounded-full flex items-center justify-center ${
                index === activeStep ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
              } border-4 border-blue-500 cursor-pointer transition-colors duration-300`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveStep(index)}
            >
              <span className="text-lg font-semibold text-center px-2">{step.label}</span>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <motion.p
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="text-xl text-gray-700"
          >
            {steps[activeStep].description}
          </motion.p>
        </div>
      </div>
      <div className="flex justify-center space-x-4 mt-8">
        <button
          onClick={prevStep}
          className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300"
        >
          Previous
        </button>
        <button
          onClick={nextStep}
          className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300"
        >
          Next
        </button>
      </div>
      <motion.div
        className="mt-12 p-6 bg-white bg-opacity-90 rounded-2xl shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <h4 className="font-semibold text-xl mb-4 text-blue-900">Key Points:</h4>
        <ul className="space-y-4 text-gray-700">
          {[
            "ACE Inhibitors block the conversion of Angiotensin I to Angiotensin II",
            "This leads to decreased vasoconstriction and reduced aldosterone secretion",
            "Results in lowered blood pressure and decreased workload on the heart",
            "ACE Inhibitors also increase bradykinin levels, contributing to their beneficial effects"
          ].map((point, index) => (
            <motion.li
              key={index}
              className="flex items-start"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
            >
              <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>{point}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
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
  const [expandedDrugs, setExpandedDrugs] = useState({});
  const [completedSections, setCompletedSections] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
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

  const totalSections = 4;

  return (
    <div className="max-w-7xl mx-auto bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 min-h-screen text-white">
      <FloatingActionButton />
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-400"></div>
        </div>
      ) : (
        <>
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
        <InteractiveDiagram />
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
        icon={Stethoscope}
        keyTakeaway="First-line for hypertension, heart failure with reduced EF, and diabetic nephropathy"
        onComplete={updateCompletedSections}
      >
        <ul className="space-y-6 mb-10">
          {[
            { condition: 'Hypertension', detail: 'First-line treatment, especially in diabetes or CKD', icon: Activity },
            { condition: 'Heart Failure', detail: 'Reduces mortality and hospitalizations in HFrEF', icon: Activity },
            { condition: 'Diabetic Nephropathy', detail: 'Slows progression of kidney disease', icon: Droplet },
            { condition: 'Post-Myocardial Infarction', detail: 'Improves survival and ventricular remodeling', icon: Zap },
          ].map(({ condition, detail, icon: Icon }, index) => (
            <motion.li 
              key={index} 
              className="bg-white p-6 rounded-2xl shadow-lg flex items-start space-x-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Icon className="w-8 h-8 text-blue-500 mt-1 flex-shrink-0" />
              <div>
                <span className="font-semibold text-blue-800 text-xl">{condition}: </span>
                <span className="text-gray-700 text-lg">{detail}</span>
              </div>
            </motion.li>
          ))}
        </ul>
        <motion.div 
          className="p-8 bg-blue-50 border-2 border-blue-200 rounded-2xl shadow-xl"
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="font-semibold mb-4 text-blue-800 text-2xl">Clinical Pearl:</h3>
          <p className="text-gray-700 leading-relaxed text-lg">ACE Inhibitors are particularly beneficial in patients with diabetes and hypertension due to their renoprotective effects, independent of blood pressure lowering. They are also preferred in patients with left ventricular dysfunction or heart failure with reduced ejection fraction (HFrEF).</p>
        </motion.div>
      </Section>

      <Section 
        title="Side Effects and Monitoring" 
        icon={AlertTriangle}
        keyTakeaway="Key side effects: dry cough, hyperkalemia, acute kidney injury, angioedema. Monitor renal function, potassium, and blood pressure regularly."
        onComplete={updateCompletedSections}
      >
        <p className="mb-8 text-gray-700 leading-relaxed text-xl">Key side effects and monitoring parameters for ACE Inhibitors:</p>
        <SideEffectsDiagram />
        <ul className="space-y-6 mb-10">
          {[
            { effect: 'Dry cough', detail: 'Due to increased bradykinin levels. May require switching to ARB.' },
            { effect: 'Hyperkalemia', detail: 'Monitor potassium levels, especially in renal impairment or with K+ supplements.' },
            { effect: 'Acute kidney injury', detail: 'Monitor creatinine and eGFR. Risk increases with volume depletion.' },
            { effect: 'Angioedema', detail: 'Rare but potentially serious. Requires immediate discontinuation.' },
            { effect: 'First-dose hypotension', detail: 'Start at low dose, especially in elderly or volume-depleted patients.' }
          ].map(({ effect, detail }, index) => (
            <motion.li 
              key={index} 
              className="bg-white p-6 rounded-2xl shadow-lg border-l-8 border-red-500"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="font-semibold text-red-600 text-xl">{effect}: </span>
              <span className="text-gray-700 text-lg">{detail}</span>
            </motion.li>
          ))}
        </ul>
        <motion.div 
          className="p-8 bg-red-50 border-2 border-red-200 rounded-2xl shadow-xl"
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="font-semibold mb-4 text-red-800 text-2xl">Critical Safety Note:</h3>
          <p className="text-gray-700 leading-relaxed text-lg">ACE Inhibitors are <strong>contraindicated in pregnancy</strong> (all trimesters) due to the risk of fetal renal damage and other congenital abnormalities. They should be discontinued immediately if pregnancy is detected or planned.</p>
        </motion.div>
      </Section>

      <Section 
        title="Evidence-Based Practice" 
        icon={BookOpen}
        keyTakeaway="Provide cardiovascular and renal protection beyond blood pressure lowering. Contraindicated in pregnancy and bilateral renal artery stenosis."
        onComplete={updateCompletedSections}
      >
        <p className="mb-8 text-gray-700 leading-relaxed text-xl">Key clinical trials and guidelines:</p>
        <ul className="space-y-6 mb-10">
          {[
            { 
              trial: 'HOPE Trial (2000)', 
              detail: 'Ramipril reduced cardiovascular events in high-risk patients without left ventricular dysfunction.',
              reference: 'N Engl J Med. 2000;342(3):145-153'
            },
            { 
              trial: 'SOLVD Treatment Trial (1991)', 
              detail: 'Enalapril reduced mortality and hospitalizations in patients with heart failure.',
              reference: 'N Engl J Med. 1991;325(5):293-302'
            },
            { 
              trial: 'ADVANCE Trial (2007)', 
              detail: 'Perindopril-indapamide combination reduced major macro and microvascular events in type 2 diabetes.',
              reference: 'Lancet. 2007;370(9590):829-840'
            },
          ].map(({ trial, detail, reference }, index) => (
            <motion.li 
              key={index} 
              className="bg-white p-6 rounded-2xl shadow-lg border-l-8 border-green-500"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
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
  );
};

export default ACEInhibitorsGuide;
