import { useState } from 'react';
import { motion } from 'framer-motion';
import { menuCourses } from '../data/menuData';
import { submitMenuSelection } from '../services/sheetService';
import chevronLeft from '../assets/figma/chevron-left.svg';
import divCounter from '../assets/figma/div-counter.svg';

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

export default function ReviewStep({
  stepKey = 'review',
  guestName,
  selections,
  initialNotes = '',
  onBack,
  onSuccess
}) {
  const [notasAlergias, setNotasAlergias] = useState(initialNotes);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleConfirm = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const { payload } = await submitMenuSelection({
        guestName,
        selections,
        notasAlergias
      });
      onSuccess(payload, notasAlergias);
    } catch {
      setSubmitError(
        'Ocurrió un inconveniente de red al registrar tu menú. Por favor intenta de nuevo.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      key={stepKey}
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="bg-transparent min-h-svh w-full flex flex-col items-center transform-gpu will-change-transform"
      data-node-id="910:3"
      data-name="cena-review"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-[440px] px-[28px] flex flex-col justify-between min-h-svh transform-gpu will-change-transform"
      >
        {/* Section Title */}
        <div
          className="flex flex-col gap-[48px] items-start pt-[20px] w-full"
          data-node-id="910:4"
          data-name="section-title"
        >
          <motion.div
            variants={itemVariants}
            className="transform-gpu will-change-transform"
          >
            <button
              type="button"
              onClick={onBack}
              aria-label="Volver al último tiempo"
              className="border border-[#1c2821] hover:bg-[#1c2821]/10 flex items-center justify-center p-[6px] rounded-[4px] cursor-pointer transition-colors"
              data-node-id="910:5"
              data-name="btn-secondary"
            >
              <div className="relative size-[24px]" data-node-id="910:6">
                <img alt="" className="block size-[24px]" src={chevronLeft} />
              </div>
            </button>
          </motion.div>

          <div
            className="flex flex-col gap-[24px] items-start w-full"
            data-node-id="910:8"
            data-name="div-title"
          >
            <motion.div
              variants={itemVariants}
              className="h-[19px] relative w-[60px] transform-gpu will-change-transform"
              data-node-id="910:9"
              data-name="div-counter"
            >
              <img
                alt=""
                className="block w-[60px] h-[19px]"
                src={divCounter}
              />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="w-full transform-gpu will-change-transform"
            >
              <h1
                className="font-serif font-normal leading-[1.1] text-[#f13315] text-[40px] tracking-[-1.2px] m-0"
                data-node-id="910:15"
              >
                Confirmar selección
              </h1>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="w-full transform-gpu will-change-transform"
            >
              <p
                className="font-sans font-normal leading-[1.25] text-[#1c2821] text-[16px] m-0"
                data-node-id="910:52"
              >
                Revisa con atención tus elecciones,{' '}
                <span className="font-bold">{guestName}</span>, y cerciórate de
                que todo esté bien antes de confirmar tu menú para la cena.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Section Review List + Allergies Note */}
        <div
          className="flex flex-1 flex-col gap-[20px] items-start py-[54px] w-full"
          data-node-id="910:16"
          data-name="section-review"
        >
          <div className="flex flex-col gap-[20px] items-start w-full">
            {menuCourses.map((course, idx) => {
              const sel = selections[course.id];
              const isOmitted = !sel || sel.skipped || sel.name === 'Omitido';

              return (
                <motion.div
                  key={course.id}
                  variants={itemVariants}
                  className="flex gap-[16px] items-start leading-none w-full transform-gpu will-change-transform"
                  data-node-id="910:62"
                  data-name="item-review"
                >
                  <p
                    className="font-sans font-medium leading-none text-[#45816d] text-[16px] text-right uppercase w-[20px] m-0"
                    data-node-id="916:26"
                  >
                    {idx + 1}.
                  </p>

                  <div
                    className="flex flex-1 flex-col gap-[8px] items-start min-w-px"
                    data-node-id="910:60"
                  >
                    <p
                      className="font-sans font-medium leading-none text-[#45816d] text-[16px] uppercase w-full m-0"
                      data-node-id="916:24"
                    >
                      {course.title}
                    </p>

                    {isOmitted ? (
                      <div
                        className="bg-[#93ccb9] inline-flex items-center justify-center px-[8px] py-[4px] rounded-[2px] shrink-0"
                        data-node-id="916:49"
                        data-name="tag-no-selected"
                      >
                        <p
                          className="font-sans font-normal leading-none text-[#1c2821] text-[10px] uppercase whitespace-nowrap m-0"
                          data-node-id="916:42"
                        >
                          omitido / no seleccionado.
                        </p>
                      </div>
                    ) : (
                      <>
                        <p
                          className="font-sans font-bold leading-none text-[#1c2821] text-[20px] w-full m-0"
                          data-node-id="910:54"
                        >
                          {sel.name}
                        </p>
                        {sel.detail && (
                          <p
                            className="font-sans font-medium leading-none text-[#1c2821] text-[12px] uppercase w-full m-0"
                            data-node-id="916:48"
                          >
                            {sel.detail}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Campo opcional para Alergias o notas especiales */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-[12px] items-start pt-[54px] w-full transform-gpu will-change-transform"
            data-node-id="914:12"
            data-name="div-name-field"
          >
            <label
              htmlFor="notas-alergias"
              className="font-sans font-medium leading-none text-[#1c2821] text-[16px] w-full"
              data-node-id="914:13"
            >
              Alergias o notas especiales (opcional)
            </label>
            <div
              className="border border-[#45816d] rounded-[4px] p-[10px] w-full focus-within:border-[#1c2821] transition-colors"
              data-node-id="914:14"
              data-name="field-text"
            >
              <textarea
                id="notas-alergias"
                rows={2}
                value={notasAlergias}
                onChange={(e) => setNotasAlergias(e.target.value)}
                placeholder="Ej: Sin nueces, poco hielo, sin pistachos..."
                className="w-full bg-transparent font-sans font-normal leading-none text-[#45816d] placeholder:text-[#45816d]/75 text-[16px] focus:outline-none resize-none"
                data-node-id="914:15"
              />
            </div>
          </motion.div>

          {submitError && (
            <p className="font-sans text-[14px] text-[#f13315] m-0">
              {submitError}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-[10px] items-center pb-[56px] w-full transform-gpu will-change-transform"
          data-node-id="910:91"
          data-name="div-buttons"
        >
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleConfirm}
            className="border border-[#f13315] hover:bg-[#f13315]/10 disabled:opacity-50 flex items-center justify-center p-[10px] rounded-[4px] w-full cursor-pointer transition-all"
            data-node-id="910:88"
            data-name="btn-primary"
          >
            <span
              className="font-sans font-normal leading-[1.2] text-[#f13315] text-[20px] tracking-[1px] underline uppercase whitespace-nowrap"
              data-node-id="910:89"
            >
              {isSubmitting ? 'enviando selección...' : 'confirmar menú'}
            </span>
          </button>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={onBack}
            className="flex gap-[4px] items-center justify-center p-[8px] w-full cursor-pointer hover:opacity-75 transition-opacity"
            data-node-id="910:92"
            data-name="btn-secondary"
          >
            <div className="relative size-[24px]" data-node-id="910:95">
              <img alt="" className="block size-[24px]" src={chevronLeft} />
            </div>
            <span
              className="font-sans font-medium leading-[1.15] text-[#1c2821] text-[14px] text-center tracking-[0.7px] underline uppercase whitespace-nowrap"
              data-node-id="910:93"
            >
              volver
            </span>
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
