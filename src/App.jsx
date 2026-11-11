import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { menuCourses } from './data/menuData';
import { normalizeFirstName } from './services/sheetService';
import WelcomeStep from './components/WelcomeStep';
import CourseStep from './components/CourseStep';
import ReviewStep from './components/ReviewStep';
import SuccessStep from './components/SuccessStep';
import OrdersSummaryView from './components/OrdersSummaryView';

function isComandaUrlActive() {
  if (typeof window === 'undefined') return false;
  const searchParams = new URLSearchParams(window.location.search);
  const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
  return (
    searchParams.get('view')?.toLowerCase() === 'comanda' || hash === 'comanda'
  );
}

export default function App() {
  // steps: 'welcome' | 'course' | 'review' | 'success' | 'comanda'
  const [step, setStep] = useState(() =>
    isComandaUrlActive() ? 'comanda' : 'welcome'
  );
  const [courseIndex, setCourseIndex] = useState(0);
  const [guestName, setGuestName] = useState('');
  const [selections, setSelections] = useState({});
  const [notasAlergias, setNotasAlergias] = useState('');
  const [submittedPayload, setSubmittedPayload] = useState(null);

  useEffect(() => {
    const syncStepWithUrl = () => {
      if (isComandaUrlActive()) {
        setStep('comanda');
      }
    };
    window.addEventListener('hashchange', syncStepWithUrl);
    window.addEventListener('popstate', syncStepWithUrl);
    return () => {
      window.removeEventListener('hashchange', syncStepWithUrl);
      window.removeEventListener('popstate', syncStepWithUrl);
    };
  }, []);

  const scrollToTop = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  const handleStart = (name) => {
    setGuestName(normalizeFirstName(name));
    setCourseIndex(0);
    setStep('course');
    scrollToTop();
  };

  const handleOpenComanda = () => {
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', '#comanda');
    }
    setStep('comanda');
    scrollToTop();
  };

  const handleCloseComanda = () => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('view');
      url.hash = '';
      window.history.pushState(null, '', url.pathname + url.search);
    }
    setStep('welcome');
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
  const isMintSurface = step === 'course' || step === 'review';

  return (
    <div
      className={`min-h-screen bg-[#FAF8F5] text-stone-900 transition-colors duration-300 ${
        isDarkSurface ? '!bg-[#1c2821]' : isMintSurface ? '!bg-[#b7dfd2]' : ''
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
            onOpenComanda={handleOpenComanda}
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

        {step === 'comanda' && (
          <OrdersSummaryView
            key={currentStep}
            stepKey={currentStep}
            onBackToForm={handleCloseComanda}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
