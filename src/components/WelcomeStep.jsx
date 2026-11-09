import { useState } from 'react';
import { motion } from 'framer-motion';
import vmanjarLogo from '../assets/figma/vmanjar-logo.svg';

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

export default function WelcomeStep({
  stepKey = 'welcome',
  initialName = '',
  onStart
}) {
  const [name, setName] = useState(initialName);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError(true);
      return;
    }
    setError(false);
    onStart(trimmed);
  };

  return (
    <motion.div
      key={stepKey}
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="bg-transparent min-h-svh w-full flex flex-col items-center transform-gpu will-change-transform"
      data-node-id="891:3"
      data-name="cena-intro"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-[440px] px-[28px] flex flex-col transform-gpu will-change-transform"
      >
        {/* Section Hero */}
        <section
          className="flex flex-col min-h-[78svh] justify-between items-start pt-[20px] w-full"
          data-node-id="892:29"
          data-name="section-hero"
        >
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-end justify-center py-[8px] w-full transform-gpu will-change-transform"
            data-node-id="910:113"
            data-name="div-logo"
          >
            <div
              className="flex h-[14px] items-center justify-center w-[28px]"
              data-node-id="910:110"
            >
              <div className="-rotate-90 -scale-y-100 flex-none">
                <div className="h-[28px] relative w-[14px]" data-name="vmanjar-logo">
                  <img
                    alt="VManjar"
                    className="block w-[14px] h-[28px]"
                    src={vmanjarLogo}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <div
            className="flex flex-1 flex-col gap-[54px] items-start justify-center w-full py-12"
            data-node-id="910:112"
            data-name="div-hero"
          >
            <motion.div
              variants={itemVariants}
              className="flex flex-col font-serif gap-[12px] items-start leading-none not-italic text-[64px] tracking-[-1.92px] w-full transform-gpu will-change-transform"
              data-node-id="892:35"
              data-name="div-hero-title"
            >
              <p
                className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] text-[#5aa78f] w-full m-0"
                data-node-id="891:4"
              >
                Hola,
              </p>
              <p
                className="[text-box-edge:cap_alphabetic] [text-box-trim:trim-both] text-[#b7dfd2] w-full m-0"
                data-node-id="892:34"
              >
                me gradúo.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="w-full transform-gpu will-change-transform"
            >
              <p
                className="font-sans font-normal leading-[1.2] text-[#b7dfd2] text-[20px] tracking-[0.6px] uppercase max-w-[282px] m-0"
                data-node-id="892:30"
              >
                Te invitamos a cenar.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Section Invitación e Interacción */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-[96px] items-start justify-center pb-[108px] pt-[54px] w-full"
          data-node-id="892:38"
          data-name="section-invi"
        >
          <motion.div
            variants={itemVariants}
            className="w-full transform-gpu will-change-transform"
          >
            <p
              className="font-sans font-normal leading-[1.2] text-[#f7fbf9] text-[20px] tracking-[0.6px] uppercase max-w-[282px] m-0"
              data-node-id="892:36"
            >
              elige tu cena para esa noche
            </p>
          </motion.div>

          <div
            className="flex flex-col gap-[52px] items-start w-full"
            data-node-id="892:65"
            data-name="div-name-interaction"
          >
            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-[12px] items-start w-full transform-gpu will-change-transform"
              data-node-id="892:55"
              data-name="div-name-field"
            >
              <label
                htmlFor="guest-name-input"
                className="font-sans font-bold leading-none text-[#f7fbf9] text-[20px] w-full"
                data-node-id="892:56"
              >
                ¿Cuál es tu nombre?
              </label>
              <div
                className={`border ${
                  error ? 'border-[#f13315]' : 'border-[#5aa78f]'
                } focus-within:border-[#b7dfd2] flex items-center justify-center p-[10px] rounded-[4px] w-full transition-colors`}
                data-node-id="892:59"
                data-name="field-text"
              >
                <input
                  id="guest-name-input"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError(false);
                  }}
                  placeholder="Nombre"
                  autoComplete="name"
                  className="w-full bg-transparent font-sans font-normal leading-none text-[#f7fbf9] placeholder:text-[#5aa78f] text-[16px] focus:outline-none"
                  data-node-id="892:57"
                />
              </div>
              {error && (
                <span className="font-sans text-[13px] text-[#f13315]">
                  Por favor escribe tu nombre para continuar.
                </span>
              )}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="w-full transform-gpu will-change-transform"
            >
              <button
                type="submit"
                className="border border-[#f13315] hover:bg-[#f13315]/10 active:scale-[0.99] flex items-center justify-center p-[10px] rounded-[4px] w-full cursor-pointer transition-all"
                data-node-id="892:64"
                data-name="btn-primary"
              >
                <span
                  className="font-sans font-normal leading-[1.2] text-[#f13315] text-[20px] tracking-[1px] underline uppercase whitespace-nowrap"
                  data-node-id="892:62"
                >
                  comenzar mi elección
                </span>
              </button>
            </motion.div>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
