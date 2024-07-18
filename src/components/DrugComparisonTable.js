import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Droplet, AlertTriangle, Stethoscope, BookOpen, Zap, PlusCircle, MinusCircle, Activity, Star, ArrowUp, CheckCircle } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

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
        <ChevronDown className={`w-8 h-8 text-white transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="p-8 pt-0"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <p className="text-gray-700 leading-relaxed mb-8">{keyTakeaway}</p>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ACEInhibitorsGuide = () => {
  const [completedSections, setCompletedSections] = useState([]);

  const updateCompletedSections = useCallback(() => {
    setCompletedSections((prevSections) => [...prevSections, Date.now()]);
  }, []);

  const totalSections = useMemo(() => {
    return React.Children.toArray(
      <div>
        <Section
          title="Introduction"
          icon={Droplet}
          keyTakeaway="ACE inhibitors are a class of medications used to treat various cardiovascular conditions, including hypertension, heart failure, and diabetic nephropathy."
          onComplete={updateCompletedSections}
        >
          <p className="text-gray-700 leading-relaxed mb-4">
            Angiotensin-converting enzyme (ACE) inhibitors are a widely used class of medications that work by inhibiting the activity of the ACE enzyme, which is responsible for converting angiotensin I to angiotensin II, a potent vasoconstrictor.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            By blocking the formation of angiotensin II, ACE inhibitors help to dilate blood vessels, reduce blood pressure, and improve blood flow. They are commonly prescribed for the treatment of hypertension, heart failure, diabetic nephropathy, and other cardiovascular conditions.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            This comprehensive guide will provide an overview of ACE inhibitors, their mechanisms of action, clinical indications, dosing considerations, and potential side effects. Additionally, we will explore the latest clinical evidence and guidelines for their use in various cardiovascular conditions.
          </p>
        </Section>

        <Section
          title="Mechanism of Action"
          icon={Stethoscope}
          keyTakeaway="ACE inhibitors block the conversion of angiotensin I to angiotensin II, leading to vasodilation and reduced blood pressure."
          onComplete={updateCompletedSections}
        >
          <p className="text-gray-700 leading-relaxed mb-4">
            The renin-angiotensin-aldosterone system (RAAS) plays a crucial role in regulating blood pressure and fluid balance in the body. The ACE enzyme is a key component of this system, responsible for converting the inactive angiotensin I into the potent vasoconstrictor angiotensin II.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            ACE inhibitors work by binding to and inhibiting the ACE enzyme, thereby preventing the formation of angiotensin II. This leads to a decrease in vasoconstriction, reduced blood pressure, and improved blood flow to various organs, including the heart, kidneys, and brain.
          </p>
          <InteractiveDiagram />
        </Section>

        <Section
          title="Clinical Indications"
          icon={BookOpen}
          keyTakeaway="ACE inhibitors are widely used for the treatment of hypertension, heart failure, diabetic nephropathy, and other cardiovascular conditions."
          onComplete={updateCompletedSections}
        >
          <p className="text-gray-700 leading-relaxed mb-4">
            ACE inhibitors are commonly prescribed for the following clinical indications:
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 ml-4">
            <li>Hypertension</li>
            <li>Heart failure</li>
            <li>Diabetic nephropathy</li>
            <li>Myocardial infarction (heart attack)</li>
            <li>Left ventricular dysfunction</li>
            <li>Prevention of cardiovascular events in high-risk patients</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            In addition to their primary indications, ACE inhibitors may also be used for other conditions, such as scleroderma renal crisis, proteinuria, and migraine prophylaxis.
          </p>
        </Section>

        <Section
          title="Dosing and Administration"
          icon={Zap}
          keyTakeaway="Proper dosing and monitoring are essential for the safe and effective use of ACE inhibitors."
          onComplete={updateCompletedSections}
        >
          <p className="text-gray-700 leading-relaxed mb-4">
            ACE inhibitors are available in various formulations, including tablets, capsules, and oral solutions. The specific dosage and administration schedule will depend on the individual patient's condition, age, and renal function.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            It is generally recommended to start with a low dose and gradually titrate upwards to achieve the desired therapeutic effect while monitoring for potential side effects. In some cases, such as heart failure, higher target doses may be required to achieve optimal benefits.
          </p>
          <DrugComparisonTable />
        </Section>

        <Section
          title="Side Effects and Precautions"
          icon={AlertTriangle}
          keyTakeaway="While generally well-tolerated, ACE inhibitors can cause side effects, and certain precautions should be taken."
          onComplete={updateCompletedSections}
        >
          <p className="text-gray-700 leading-relaxed mb-4">
            ACE inhibitors are generally well-tolerated, but like any medication, they can cause side effects. Common side effects include:
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 ml-4">
            <li>Cough</li>
            <li>Dizziness</li>
            <li>Headache</li>
            <li>Fatigue</li>
            <li>Hypotension (low blood pressure)</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            More serious side effects, such as angioedema (swelling of the face, lips, tongue, or throat), hyperkalemia (high potassium levels), and renal impairment, can also occur, although less frequently.
          </p>
          <SideEffectsDiagram />
        </Section>

        <Section
          title="Clinical Evidence and Guidelines"
          icon={Star}
          keyTakeaway="Numerous clinical trials and guidelines support the use of ACE inhibitors in various cardiovascular conditions."
          onComplete={updateCompletedSections}
        >
          <p className="text-gray-700 leading-relaxed mb-4">
            ACE inhibitors have been extensively studied in numerous clinical trials, demonstrating their efficacy and safety in various cardiovascular conditions. Some of the landmark trials include:
          </p>
          <Timeline />
          <p className="text-gray-700 leading-relaxed mb-4">
            Based on the clinical evidence, major guidelines from organizations such as the American Heart Association (AHA), the European Society of Cardiology (ESC), and the National Institute for Health and Care Excellence (NICE) recommend the use of ACE inhibitors in the management of hypertension, heart failure, and other cardiovascular conditions.
          </p>
          <ul className="list-none text-gray-700 leading-relaxed mb-4">
            {[
              {
                trial: 'HOPE Trial (2000)',
                detail: 'Ramipril reduced cardiovascular events in high-risk patients without heart failure or left ventricular dysfunction.',
                reference: 'N Engl J Med. 2000;342(3):145-153'
              },
              {
                trial: 'SOLVD Trial (1991, 1992)',
                detail: 'Enalapril improved survival and reduced hospitalizations in patients with heart failure.',
                reference: 'N Engl J Med. 1991;325(5):293-302, N Engl J Med. 1992;327(10):685-691'
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
    ).length;
  }, [updateCompletedSections]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8">ACE Inhibitors Guide</h1>
        <p className="text-gray-700 leading-relaxed mb-12">
          Welcome to our comprehensive guide on ACE inhibitors, a class of medications widely used in the treatment of various cardiovascular conditions. This guide will provide you with an in-depth understanding of ACE inhibitors, their mechanisms of action, clinical indications, dosing considerations, and potential side effects.
        </p>
        <div className="space-y-12">
          {totalSections > 0 && (
            <div className="mb-8">
              <p className="text-gray-700 mb-2">Sections Completed: {completedSections.length}/{totalSections}</p>
              <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${(completedSections.length / totalSections) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
          <div>
            <Section
              title="Introduction"
              icon={Droplet}
              keyTakeaway="ACE inhibitors are a class of medications used to treat various cardiovascular conditions, including hypertension, heart failure, and diabetic nephropathy."
              onComplete={updateCompletedSections}
            >
              <p className="text-gray-700 leading-relaxed mb-4">
                Angiotensin-converting enzyme (ACE) inhibitors are a widely used class of medications that work by inhibiting the activity of the ACE enzyme, which is responsible for converting angiotensin I to angiotensin II, a potent vasoconstrictor.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                By blocking the formation of angiotensin II, ACE inhibitors help to dilate blood vessels, reduce blood pressure, and improve blood flow. They are commonly prescribed for the treatment of hypertension, heart failure, diabetic nephropathy, and other cardiovascular conditions.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                This comprehensive guide will provide an overview of ACE inhibitors, their mechanisms of action, clinical indications, dosing considerations, and potential side effects. Additionally, we will explore the latest clinical evidence and guidelines for their use in various cardiovascular conditions.
              </p>
            </Section>

            <Section
              title="Mechanism of Action"
              icon={Stethoscope}
              keyTakeaway="ACE inhibitors block the conversion of angiotensin I to angiotensin II, leading to vasodilation and reduced blood pressure."
              onComplete={updateCompletedSections}
            >
              <p className="text-gray-700 leading-relaxed mb-4">
                The primary mechanism of action of ACE inhibitors is to block the conversion of angiotensin I to angiotensin II, a potent vasoconstrictor. This process is mediated by the angiotensin-converting enzyme (ACE), which is found primarily in the lungs and vascular endothelium.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                By inhibiting the formation of angiotensin II, ACE inhibitors cause vasodilation, which leads to a reduction in blood pressure. Additionally, ACE inhibitors decrease the secretion of aldosterone, a hormone that promotes sodium and water retention, further contributing to their blood pressure-lowering effects.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Beyond their effects on the renin-angiotensin-aldosterone system, ACE inhibitors also have other beneficial effects, such as improving endothelial function, reducing oxidative stress, and inhibiting the breakdown of bradykinin, a vasodilator.
              </p>
              <InteractiveDiagram />
              title="Clinical Indications"
              icon={BookOpen}
              keyTakeaway="ACE inhibitors are widely used in the treatment of hypertension, heart failure, diabetic nephropathy, and other cardiovascular conditions."
              onComplete={updateCompletedSections}
            {'>'}
              <p className="text-gray-700 leading-relaxed mb-4">
                ACE inhibitors are widely prescribed for various cardiovascular conditions, including:
              </p>
              <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4">
                <li>Hypertension</li>
                <li>Heart failure</li>
                <li>Diabetic nephropathy</li>
                <li>Myocardial infarction (heart attack)</li>
                <li>Left ventricular dysfunction</li>
                <li>Chronic kidney disease</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                In hypertension, ACE inhibitors are often used as first-line therapy or in combination with other antihypertensive medications. They are particularly effective in patients with diabetes, heart failure, or kidney disease.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                In heart failure, ACE inhibitors have been shown to improve symptoms, reduce hospitalizations, and prolong survival. They are recommended for all patients with heart failure with reduced ejection fraction (HFrEF) unless contraindicated.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                For patients with diabetic nephropathy, ACE inhibitors can slow the progression of kidney disease and reduce the risk of cardiovascular events.
              </p>
            </Section>

            <Section
              title="Dosing and Administration"
              icon={Zap}
              keyTakeaway="ACE inhibitors should be initiated at low doses and gradually titrated to achieve the desired therapeutic effect while monitoring for side effects."
              onComplete={updateCompletedSections}
            >
              <p className="text-gray-700 leading-relaxed mb-4">
                When initiating ACE inhibitor therapy, it is important to start with a low dose and gradually titrate upwards to achieve the desired therapeutic effect. This approach helps to minimize the risk of side effects, such as hypotension, cough, and renal impairment.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                The initial dose and titration schedule may vary depending on the specific ACE inhibitor, the patient's condition, and other factors such as age, renal function, and concomitant medications.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                It is essential to monitor blood pressure, renal function, and electrolyte levels (particularly potassium) during the initiation and titration phases, as well as during ongoing therapy with ACE inhibitors.
              </p>
              <DrugComparisonTable />
            </Section>

            <Section
              title="Side Effects and Precautions"
              icon={AlertTriangle}
              keyTakeaway="Common side effects of ACE inhibitors include cough, hypotension, and hyperkalemia. Monitoring and appropriate precautions are necessary."
              onComplete={updateCompletedSections}
            >
              <p className="text-gray-700 leading-relaxed mb-4">
                While ACE inhibitors are generally well-tolerated, they can cause several side effects that healthcare professionals should be aware of:
              </p>
              <SideEffectsDiagram />
              <p className="text-gray-700 leading-relaxed mb-4">
                One of the most common side effects of ACE inhibitors is a dry, persistent cough, which can be bothersome for some patients. Other potential side effects include hypotension, hyperkalemia, angioedema, and renal impairment.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                ACE inhibitors should be used with caution in patients with renal artery stenosis, as they can further impair renal function in these individuals. They are also contraindicated during pregnancy, particularly in the second and third trimesters, due to the risk of fetal harm.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                It is important to monitor patients closely for side effects and adjust the dosage or consider alternative treatments if necessary.
              </p>
            </Section>

            <Section
              title="Clinical Evidence and Guidelines"
              icon={Star}
              keyTakeaway="ACE inhibitors have a strong evidence base and are recommended in various clinical guidelines for the management of cardiovascular conditions."
              onComplete={updateCompletedSections}
            >
              <p className="text-gray-700 leading-relaxed mb-4">
                ACE inhibitors have been extensively studied in numerous clinical trials, and their efficacy and safety have been well-established in various cardiovascular conditions.
              </p>
              <Timeline />
              <p className="text-gray-700 leading-relaxed mb-4">
                Major clinical trials, such as the SOLVD, HOPE, and EUROPA trials, have demonstrated the benefits of ACE inhibitors in reducing cardiovascular events, hospitalizations, and mortality in patients with heart failure, hypertension, and coronary artery disease, respectively.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Based on this strong evidence, ACE inhibitors are recommended in various clinical guidelines for the management of hypertension, heart failure, diabetic nephropathy, and other cardiovascular conditions.
              </p>
              <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4">
                {[
                  { trial: 'SOLVD Trial', detail: 'Demonstrated the benefits of enalapril in reducing mortality and hospitalizations in patients with heart failure.', reference: 'SOLVD Investigators. Effect of enalapril on survival in patients with reduced left ventricular ejection fractions and congestive heart failure. N Engl J Med. 1991;325(5):293-302.' },
                  { trial: 'HOPE Trial', detail: 'Showed that ramipril reduced the risk of cardiovascular events in patients at high risk for cardiovascular disease.', reference: 'Yusuf S, et al. Effects of an angiotensin-converting-enzyme inhibitor, ramipril, on cardiovascular events in high-risk patients. N Engl J Med. 2000;342(3):145-153.' },
                  { trial: 'EUROPA Trial', detail: 'Demonstrated the benefits of perindopril in reducing cardiovascular events in patients with stable coronary artery disease.', reference: 'Fox KM, et al. Efficacy of perindopril in reduction of cardiovascular events among patients with stable coronary artery disease: randomised, double-blind, placebo-controlled, multicentre trial (the EUROPA study). Lancet. 2003;362(9386):782-788.' }
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
      </div>
    </div>
  );
};
    
export default ACEInhibitorsGuide;
import Timeline from '../Timeline';
import SideEffectsDiagram from '../SideEffectsDiagram';
import Quiz from '../Quiz';
