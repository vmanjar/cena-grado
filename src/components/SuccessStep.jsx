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

export default function SuccessStep({
  stepKey = 'success',
  guestName,
  submittedPayload
}) {
  return (
    <motion.div
      key={stepKey}
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="bg-transparent min-h-svh w-full flex flex-col items-center transform-gpu will-change-transform"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-[440px] px-[28px] py-[28px] flex flex-col justify-between min-h-svh transform-gpu will-change-transform"
      >
        {/* Top Logo */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-end justify-center py-[8px] w-full transform-gpu will-change-transform"
        >
          <div className="flex h-[14px] items-center justify-center w-[28px]">
            <div className="-rotate-90 -scale-y-100 flex-none">
              <div className="h-[28px] relative w-[14px]">
                <img
                  alt="VManjar"
                  className="block w-[14px] h-[28px]"
                  src={vmanjarLogo}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Center Message */}
        <div className="flex flex-col gap-[36px] my-auto py-[40px] w-full">
          <motion.div
            variants={itemVariants}
            className="flex flex-col font-serif gap-[10px] leading-[1.1] text-[52px] tracking-[-1.5px] transform-gpu will-change-transform"
          >
            <p className="text-[#5aa78f] m-0">Gracias,</p>
            <p className="text-[#b7dfd2] m-0">{guestName}.</p>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="font-sans font-normal text-[18px] leading-[1.35] text-[#f7fbf9] m-0 transform-gpu will-change-transform"
          >
            Tu selección para la cena de grado ha quedado registrada. Nos
            alegra mucho compartir esta noche contigo.
          </motion.p>

          {submittedPayload && (
            <motion.div
              variants={itemVariants}
              className="rounded-[4px] p-[16px] flex flex-col gap-[12px] bg-[#f7fbf9]/5 transform-gpu will-change-transform"
            >
              <p className="font-sans font-bold text-[13px] uppercase tracking-[0.8px] text-[#5aa78f] m-0">
                Resumen registrado
              </p>
              <div className="flex flex-col gap-[8px] font-sans text-[14px] text-[#f7fbf9]">
                <div>
                  <span className="text-[#b7dfd2]/70">1. Plato fuerte: </span>
                  <span className="font-medium">
                    {submittedPayload.platoFuerte}
                  </span>
                  {submittedPayload.detalleFuerte
                    ? ` (${submittedPayload.detalleFuerte})`
                    : ''}
                </div>
                <div>
                  <span className="text-[#b7dfd2]/70">2. Bebida de mesa: </span>
                  <span className="font-medium">
                    {submittedPayload.bebidaMesa}
                  </span>
                </div>
                <div>
                  <span className="text-[#b7dfd2]/70">3. Cóctel: </span>
                  <span className="font-medium">{submittedPayload.coctel}</span>
                </div>
                <div>
                  <span className="text-[#b7dfd2]/70">4. Postre: </span>
                  <span className="font-medium">{submittedPayload.postre}</span>
                </div>
                <div>
                  <span className="text-[#b7dfd2]/70">
                    5. Bebida caliente:{' '}
                  </span>
                  <span className="font-medium">
                    {submittedPayload.bebidaCaliente}
                  </span>
                </div>
                {submittedPayload.notasAlergias && (
                  <div className="pt-1">
                    <span className="text-[#b7dfd2]/70">Notas: </span>
                    <span className="italic">
                      {submittedPayload.notasAlergias}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
