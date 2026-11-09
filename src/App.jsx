import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { menuCourses } from './data/menuData';
import WelcomeStep from './components/WelcomeStep';
import CourseStep from './components/CourseStep';
import ReviewStep from './components/ReviewStep';
import SuccessStep from './components/SuccessStep';

export default function App() {
  // steps: 'welcome' | 'course' | 'review' | 'success'
  const [step, setStep] = useState('welcome');
  const [courseIndex, setCourseIndex] = useState(0);
  const [guestName, setGuestName] = useState('');
  const [selections, setSelections] = useState({});
  const [notasAlergias, setNotasAlergias] = useState('');
  const [submittedPayload, setSubmittedPayload] = useState(null);

  const scrollToTop = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  const handleStart = (name) => {
    setGuestName(name);
    setCourseIndex(0);
    setStep('course');
    scrollToTop();
  };

  const advanceFromCourse = (courseId, courseData) => {
    setSelections((prev) => ({
      ...prev,
      [courseId]: courseData
    }));

    if (courseIndex < menuCourses.length - 1) {
      setCourseIndex((prev) => prev + 1);
    } else {
      setStep('review');
    }
    scrollToTop();
  };

  const handleBackFromCourse = () => {
    if (courseIndex > 0) {
      setCourseIndex((prev) => prev - 1);
    } else {
      setStep('welcome');
    }
    scrollToTop();
  };

  const handleBackFromReview = () => {
    setCourseIndex(menuCourses.length - 1);
    setStep('course');
    scrollToTop();
  };

  const handleSuccess = (payload, notes) => {
    setSubmittedPayload(payload);
    setNotasAlergias(notes);
    setStep('success');
    scrollToTop();
  };

  const currentCourse = menuCourses[courseIndex];
  const currentStep =
    step === 'course' && currentCourse ? currentCourse.id : step;

  const isDarkSurface = step === 'welcome' || step === 'success';

  return (
    <div
      className={`min-h-screen bg-[#FAF8F5] text-stone-900 transition-colors duration-300 ${
        isDarkSurface ? '!bg-[#1c2821]' : '!bg-[#b7dfd2]'
      }`}
    >
      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={scrollToTop}
      >
        {step === 'welcome' && (
          <WelcomeStep
            key={currentStep}
            stepKey={currentStep}
            initialName={guestName}
            onStart={handleStart}
          />
        )}

        {step === 'course' && currentCourse && (
          <CourseStep
            key={currentStep}
            stepKey={currentStep}
            course={currentCourse}
            courseIndex={courseIndex}
            totalCourses={menuCourses.length}
            savedSelection={selections[currentCourse.id]}
            onSaveAndContinue={advanceFromCourse}
            onSkipCourse={advanceFromCourse}
            onBack={handleBackFromCourse}
          />
        )}

        {step === 'review' && (
          <ReviewStep
            key={currentStep}
            stepKey={currentStep}
            guestName={guestName}
            selections={selections}
            initialNotes={notasAlergias}
            onBack={handleBackFromReview}
            onSuccess={handleSuccess}
          />
        )}

        {step === 'success' && (
          <SuccessStep
            key={currentStep}
            stepKey={currentStep}
            guestName={guestName}
            submittedPayload={submittedPayload}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
