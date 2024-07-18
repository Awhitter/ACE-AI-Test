import React, { useState, useEffect } from 'react';
import { ChevronDown, Droplet, AlertTriangle, Stethoscope, BookOpen, Zap, PlusCircle, MinusCircle, Activity, Star, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Section = ({ title, icon: Icon, children, keyTakeaway, onComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      onComplete();
    }
  }, [inView, onComplete]);

  return (
    <motion.div
      ref={ref}
      className="mb-8 rounded-2xl overflow-hidden shadow-xl bg-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.button
        className="w-full text-left p-6 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 transition-colors flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="flex items-center text-2xl font-bold text-white">
          <Icon className="w-8 h-8 mr-4 text-blue-200" />
          {title}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-7 h-7 text-blue-200" />
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {keyTakeaway && (
              <motion.div
                className="p-4 bg-yellow-100 border-l-4 border-yellow-500"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-600 mr-2" />
                  <span className="font-semibold text-yellow-800">Key Takeaway:</span>
                </div>
                <p className="mt-1 text-yellow-900">{keyTakeaway}</p>
              </motion.div>
            )}
            <div className="p-8 bg-gradient-to-b from-white to-blue-50">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const InteractiveDiagram = () => {
  const [, setHighlight] = useState(null);

  return (
    <motion.div
      className="mt-8 p-8 bg-gradient-to-br from-gray-100 to-blue-100 rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="font-bold mb-6 text-2xl text-blue-800">ACE Inhibitor Mechanism of Action:</h3>
      <div className="flex flex-col items-center space-y-8">
        <motion.div 
          className="relative w-full max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="absolute top-1/2 left-0 right-0 h-2 bg-gradient-to-r from-blue-300 via-blue-500 to-red-500 transform -translate-y-1/2"></div>
          <div className="flex justify-between items-center relative z-10">
            <motion.div 
              className="bg-blue-100 p-4 rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
              onMouseEnter={() => setHighlight('renin')}
              onMouseLeave={() => setHighlight(null)}
            >
              <p className="font-semibold text-blue-800">Renin</p>
            </motion.div>
            <motion.div 
              className="bg-blue-200 p-4 rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
              onMouseEnter={() => setHighlight('angiotensinogen')}
              onMouseLeave={() => setHighlight(null)}
            >
              <p className="font-semibold text-blue-800">Angiotensinogen</p>
            </motion.div>
            <motion.div 
              className="bg-blue-300 p-4 rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
              onMouseEnter={() => setHighlight('angiotensin1')}
              onMouseLeave={() => setHighlight(null)}
            >
              <p className="font-semibold text-blue-800">Angiotensin I</p>
            </motion.div>
            <motion.div 
              className="bg-red-300 p-4 rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
              onMouseEnter={() => setHighlight('angiotensin2')}
              onMouseLeave={() => setHighlight(null)}
            >
              <p className="font-semibold text-red-800">Angiotensin II</p>
            </motion.div>
          </div>
        </motion.div>
        <motion.div 
          className="bg-yellow-100 p-4 rounded-lg shadow-md"
          whileHover={{ scale: 1.05 }}
          onMouseEnter={() => setHighlight('ace')}
          onMouseLeave={() => setHighlight(null)}
        >
          <p className="font-semibold text-yellow-800">ACE (Angiotensin Converting Enzyme)</p>
        </motion.div>
      </div>
      <motion.div
        className="mt-8 p-4 bg-white bg-opacity-75 rounded-lg shadow-inner"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h4 className="font-semibold text-lg mb-2 text-gray-800">Key Points:</h4>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            ACE Inhibitors block the conversion of Angiotensin I to Angiotensin II
          </motion.li>
          <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            This leads to decreased vasoconstriction and reduced aldosterone secretion
          </motion.li>
          <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            Results in lowered blood pressure and decreased workload on the heart
          </motion.li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

const FloatingActionButton = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
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
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-50"
        style={{ scaleX }}
      />
    </>
  );
};

const ACEInhibitorsGuide = () => {
  const [expandedDrug, setExpandedDrug] = useState(null);
  const [completedSections, setCompletedSections] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const drugs = [
    { 
      name: 'Lisinopril', 
      color: 'bg-teal-100 border-teal-500 text-teal-800',
      dosage: '10-40 mg daily',
      halfLife: '12 hours',
      renalExcretion: '100%',
      notes: 'Long-acting, once-daily dosing. No food interactions.'
    },
    { 
      name: 'Enalapril', 
      color: 'bg-cyan-100 border-cyan-500 text-cyan-800',
      dosage: '5-40 mg daily (can be divided)',
      halfLife: '11 hours',
      renalExcretion: '88%',
      notes: 'Prodrug, converted to active form in liver. Can be used in pediatrics.'
    },
    { 
      name: 'Ramipril', 
      color: 'bg-sky-100 border-sky-500 text-sky-800',
      dosage: '2.5-20 mg daily',
      halfLife: '13-17 hours',
      renalExcretion: '60%',
      notes: 'High tissue affinity. Used in HOPE trial for cardiovascular risk reduction.'
    },
    { 
      name: 'Captopril', 
      color: 'bg-blue-100 border-blue-500 text-blue-800',
      dosage: '25-150 mg daily (divided doses)',
      halfLife: '2 hours',
      renalExcretion: '95%',
      notes: 'Short-acting. Take on empty stomach. Contains sulfhydryl group.'
    },
    { 
      name: 'Benazepril',
      color: 'bg-indigo-100 border-indigo-500 text-indigo-800',
      dosage: '10-40 mg daily',
      halfLife: '10-11 hours',
      renalExcretion: '88%',
      notes: 'Prodrug. High lipophilicity, good tissue penetration.'
    }
  ];

  const totalSections = 4;

  const updateCompletedSections = () => {
    setCompletedSections(prev => Math.min(prev + 1, totalSections));
  };

  return (
    <div className="max-w-7xl mx-auto p-8 bg-gradient-to-br from-gray-50 to-blue-100 min-h-screen text-gray-800">
      <FloatingActionButton />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h1 className="text-6xl font-extrabold mb-4 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-cyan-600">
            ACE Inhibitors: FNP Exam Prep Guide
          </span>
        </h1>
        <p className="text-2xl text-center text-gray-700 mb-16 font-light">Master the essentials for your FNP ANCC Nurse Practitioner Licensing Exam</p>
      </motion.div>

      <div className="mb-8 bg-white rounded-lg p-4 shadow-md">
        <h2 className="text-2xl font-bold mb-2 text-blue-800">Your Progress</h2>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <motion.div
            className="bg-blue-600 h-2.5 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(completedSections / totalSections) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p className="text-right mt-2 text-gray-600">{completedSections} of {totalSections} sections completed</p>
      </div>

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
      </Section>

      <Section 
        title="Common ACE Inhibitors" 
        icon={Droplet}
        keyTakeaway="Remember the mnemonic 'LERCA-B' for key drugs: Lisinopril, Enalapril, Ramipril, Captopril, Benazepril. All ACE inhibitors end with '-pril'."
        onComplete={updateCompletedSections}
      >
        <p className="mb-8 text-gray-700 leading-relaxed text-xl">Key ACE Inhibitors to remember for the FNP exam (LERCA-B):</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {drugs.map((drug, index) => (
            <motion.div
              key={drug.name}
              className={`p-6 rounded-2xl transition-all duration-300 ${drug.color} border-2 shadow-xl hover:shadow-2xl`}
              whileHover={{scale: 1.03}}
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.5, delay: index * 0.1}}
            >
              <button
                className="w-full text-left focus:outline-none"
                onClick={() => setExpandedDrug(expandedDrug === drug.name ? null : drug.name)}
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-2xl">{drug.name}</span>
                  {expandedDrug === drug.name ? <MinusCircle size={24} /> : <PlusCircle size={24} />}
                </div>
              </button>
              <AnimatePresence>
                {expandedDrug === drug.name && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto'}}
                    exit={{ opacity: 0, height: 0 }}
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

      {/* Key Takeaways section removed as it's now integrated into each section */}
    </div>
  );
};

export default ACEInhibitorsGuide;
