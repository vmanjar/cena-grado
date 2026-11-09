import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SIDE_OPTIONS, DONENESS_OPTIONS } from '../data/menuData';
import chevronLeft from '../assets/figma/chevron-left.svg';
import ellipseDot from '../assets/figma/ellipse-dot.svg';

const pageTransitionVariants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.18, ease: 'easeIn' }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: 'easeOut' }
  }
};

export default function CourseStep({
  stepKey,
  course,
  courseIndex,
  totalCourses,
  savedSelection,
  onSaveAndContinue,
  onSkipCourse,
  onBack
}) {
  const [selectedItemId, setSelectedItemId] = useState(
    savedSelection && !savedSelection.skipped ? savedSelection.itemId : null
  );
  const [selectedSide, setSelectedSide] = useState(
    savedSelection && !savedSelection.skipped ? savedSelection.side || '' : ''
  );
  const [selectedDoneness, setSelectedDoneness] = useState(
    savedSelection && !savedSelection.skipped ? savedSelection.doneness || '' : ''
  );

  const activeItem =
    course.items.find((item) => item.id === selectedItemId) || null;

  const handleSelectCard = (item) => {
    if (selectedItemId === item.id) return;
    setSelectedItemId(item.id);
    setSelectedSide(item.requiresSide ? 'Papas y Ensalada' : '');
    setSelectedDoneness(item.requiresDoneness ? 'Tres cuartos (3/4)' : '');
  };

  const isSelectionComplete = Boolean(
    activeItem &&
      (!activeItem.requiresSide || selectedSide) &&
      (!activeItem.requiresDoneness || selectedDoneness)
  );

  const handleContinue = () => {
    if (!isSelectionComplete || !activeItem) return;

    const details = [];
    if (activeItem.requiresSide && selectedSide) {
      details.push(selectedSide);
    }
    if (activeItem.requiresDoneness && selectedDoneness) {
      details.push(selectedDoneness);
    }

    onSaveAndContinue(course.id, {
      itemId: activeItem.id,
      name: activeItem.name,
      price: activeItem.price,
      effectivePrice:
        activeItem.effectivePrice !== undefined
          ? activeItem.effectivePrice
          : activeItem.price,
      side: activeItem.requiresSide ? selectedSide : '',
      doneness: activeItem.requiresDoneness ? selectedDoneness : '',
      detail: details.join(' · '),
      skipped: false
    });
  };

  const handleSkip = () => {
    setSelectedItemId(null);
    setSelectedSide('');
    setSelectedDoneness('');
    onSkipCourse(course.id, {
      itemId: null,
      name: 'Omitido',
      price: 0,
      effectivePrice: 0,
      side: '',
      doneness: '',
      detail: '',
      skipped: true
    });
  };

  return (
    <motion.div
      key={stepKey || course.id}
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="bg-transparent min-h-svh w-full flex flex-col items-center transform-gpu will-change-transform"
      data-node-id="893:2"
      data-name="cena-course"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-[440px] px-[28px] flex flex-col justify-between min-h-svh transform-gpu will-change-transform"
      >
        {/* Header / Section Title */}
        <div
          className="flex flex-col gap-[48px] items-start pt-[20px] w-full"
          data-node-id="893:4"
          data-name="section-title"
        >
          <motion.div
            variants={itemVariants}
            className="transform-gpu will-change-transform"
          >
            <button
              type="button"
              onClick={onBack}
              aria-label="Volver al paso anterior"
              className="border border-[#1c2821] hover:bg-[#1c2821]/10 flex items-center justify-center p-[6px] rounded-[4px] cursor-pointer transition-colors"
              data-node-id="893:66"
              data-name="btn-secondary"
            >
              <div className="relative size-[24px]" data-node-id="893:67">
                <img alt="" className="block size-[24px]" src={chevronLeft} />
              </div>
            </button>
          </motion.div>

          <div
            className="flex flex-col gap-[24px] items-start w-full"
            data-node-id="893:77"
            data-name="div-title"
          >
            {/* Stepper Counter */}
            <motion.div
              variants={itemVariants}
              className="flex gap-[10px] items-center transform-gpu will-change-transform"
              data-node-id="893:59"
              data-name="div-counter"
            >
              {Array.from({ length: totalCourses }).map((_, idx) => {
                const stepNumber = idx + 1;
                const isCurrent = idx === courseIndex;
                const isPast = idx < courseIndex;

                if (isCurrent) {
                  return (
                    <span
                      key={stepNumber}
                      className="font-sans font-bold leading-[1.2] text-[#f13315] text-[16px] text-center tracking-[0.48px] uppercase"
                      data-node-id="893:61"
                    >
                      {stepNumber}
                    </span>
                  );
                }

                return (
                  <div key={stepNumber} className="relative size-[4px]">
                    {isPast ? (
                      <span className="block size-[4px] rounded-full bg-[#f13315]" />
                    ) : (
                      <img
                        alt=""
                        className="block size-[4px]"
                        src={ellipseDot}
                      />
                    )}
                  </div>
                );
              })}
            </motion.div>

            <div className="flex flex-col gap-[10px] w-full">
              <motion.div
                variants={itemVariants}
                className="w-full transform-gpu will-change-transform"
              >
                <h1
                  className="font-serif font-normal leading-[1.1] text-[#f13315] text-[40px] tracking-[-1.2px] m-0"
                  data-node-id="893:6"
                >
                  {course.title}
                </h1>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="w-full transform-gpu will-change-transform"
              >
                <p
                  className="font-sans font-normal leading-[1.25] text-[#1c2821] text-[16px] m-0"
                  data-node-id="910:48"
                >
                  {course.subtitle}
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Dish Choices */}
        <div
          className="flex flex-col gap-[16px] items-start py-[44px] w-full"
          data-node-id="893:8"
          data-name="section-choice"
        >
          {course.items.map((item) => {
            const isSelected = selectedItemId === item.id;
            const hasSubOptions = item.requiresSide || item.requiresDoneness;

            return (
              <motion.div
                key={item.id}
                layout
                variants={itemVariants}
                role="button"
                tabIndex={0}
                onClick={() => handleSelectCard(item)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelectCard(item);
                  }
                }}
                className={`w-full rounded-[4px] pb-[10px] pt-[16px] px-[10px] flex flex-col items-start text-left transition-colors cursor-pointer transform-gpu will-change-transform ${
                  isSelected
                    ? 'bg-[#f7fbf9] gap-[22px] shadow-xs'
                    : 'border border-[#f7fbf9] bg-transparent hover:bg-[#f7fbf9]/35'
                }`}
                data-node-id="907:87"
                data-name="btn-choice"
              >
                <div
                  className="flex flex-col gap-[6px] items-start w-full"
                  data-node-id="907:88"
                  data-name="btn-choice-title"
                >
                  <p
                    className="font-sans font-medium leading-none text-[#1c2821] text-[20px] w-full m-0"
                    data-node-id="907:89"
                  >
                    {item.name}
                  </p>
                  <p
                    className="font-sans font-normal leading-[1.25] text-[#45816d] text-[14px] m-0"
                    data-node-id="907:90"
                  >
                    {item.description}
                  </p>
                </div>

                {/* Sub-options: Side & Doneness */}
                <AnimatePresence initial={false}>
                  {isSelected && hasSubOptions && (
                    <motion.div
                      layout
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="flex flex-col gap-[10px] w-full overflow-hidden transform-gpu will-change-transform"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {item.requiresSide && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.25, ease: 'easeOut' }
                          }}
                          className="flex flex-col gap-[6px] w-full transform-gpu will-change-transform"
                        >
                          <span className="font-sans font-medium text-[11px] uppercase tracking-[0.5px] text-[#1c2821]/70">
                            Elige tu acompañamiento:
                          </span>
                          <div
                            className="flex gap-[4px] items-stretch w-full"
                            data-node-id="907:91"
                            data-name="div-chips"
                          >
                            {SIDE_OPTIONS.map((sideOption) => {
                              const isChipActive = selectedSide === sideOption;
                              return (
                                <button
                                  key={sideOption}
                                  type="button"
                                  onClick={() => setSelectedSide(sideOption)}
                                  className={`${
                                    isChipActive
                                      ? 'bg-[#f13315]'
                                      : 'bg-[#45816d] hover:bg-[#45816d]/90'
                                  } flex flex-1 items-center justify-center min-w-px px-[10px] py-[6px] rounded-[2px] cursor-pointer transition-colors`}
                                  data-name="chip"
                                >
                                  <span className="font-sans font-medium leading-[1.15] text-[#f7fbf9] text-[12px] text-center tracking-[0.6px] uppercase">
                                    {sideOption === 'Ensalada básica'
                                      ? 'ensalada'
                                      : sideOption === 'Papas y Ensalada'
                                      ? 'papas + ensalada'
                                      : sideOption}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}

                      {item.requiresDoneness && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.25, ease: 'easeOut' }
                          }}
                          className="flex flex-col gap-[6px] w-full transform-gpu will-change-transform"
                        >
                          <span className="font-sans font-medium text-[11px] uppercase tracking-[0.5px] text-[#1c2821]/70">
                            Elige el término de la carne:
                          </span>
                          <div
                            className="flex gap-[4px] items-stretch w-full"
                            data-name="div-chips-doneness"
                          >
                            {DONENESS_OPTIONS.map((donenessOption) => {
                              const isChipActive =
                                selectedDoneness === donenessOption;
                              return (
                                <button
                                  key={donenessOption}
                                  type="button"
                                  onClick={() =>
                                    setSelectedDoneness(donenessOption)
                                  }
                                  className={`${
                                    isChipActive
                                      ? 'bg-[#f13315]'
                                      : 'bg-[#45816d] hover:bg-[#45816d]/90'
                                  } flex flex-1 items-center justify-center min-w-px px-[10px] py-[6px] rounded-[2px] cursor-pointer transition-colors`}
                                  data-name="chip"
                                >
                                  <span className="font-sans font-medium leading-[1.15] text-[#f7fbf9] text-[12px] text-center tracking-[0.6px] uppercase">
                                    {donenessOption}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          {/* Bottom Navigation Actions */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-[12px] items-center pt-[16px] w-full transform-gpu will-change-transform"
          >
            <button
              type="button"
              disabled={!isSelectionComplete}
              onClick={handleContinue}
              className={`w-full rounded-[4px] p-[12px] flex items-center justify-center font-sans text-[18px] tracking-[0.9px] uppercase transition-all ${
                isSelectionComplete
                  ? 'bg-[#1c2821] text-[#f7fbf9] cursor-pointer hover:bg-[#1c2821]/90 active:scale-[0.99]'
                  : 'border border-[#1c2821]/25 text-[#1c2821]/40 cursor-not-allowed'
              }`}
              data-name="btn-continue"
            >
              Continuar
            </button>

            <button
              type="button"
              onClick={handleSkip}
              className="flex items-center justify-center p-[8px] w-full cursor-pointer hover:opacity-75 transition-opacity"
              data-node-id="910:47"
              data-name="btn-secondary"
            >
              <span
                className="font-sans font-medium leading-[1.15] text-[#1c2821] text-[14px] text-center tracking-[0.7px] underline uppercase"
                data-node-id="910:45"
              >
                Omitir este tiempo →
              </span>
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
