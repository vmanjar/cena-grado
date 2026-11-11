import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye,
  EyeOff,
  RefreshCw,
  ArrowLeft,
  ChevronDown,
  AlertCircle,
  UtensilsCrossed
} from 'lucide-react';
import { fetchGuestOrders, normalizeFirstName } from '../services/sheetService';
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

function formatCOP(amount) {
  const num = Number(amount || 0);
  return `$${num.toLocaleString('es-CO')}`;
}

function isOmittedValue(val) {
  if (!val) return true;
  const normalized = String(val).trim().toLowerCase();
  return (
    normalized === 'omitido' ||
    normalized === 'no seleccionado' ||
    normalized === '-'
  );
}

export default function OrdersSummaryView({ stepKey = 'comanda', onBackToForm }) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [showPrices, setShowPrices] = useState(false);
  const [showDishCounts, setShowDishCounts] = useState(true);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    setError('');

    try {
      const data = await fetchGuestOrders();
      setOrders(data);
    } catch {
      setError(
        'No fue posible obtener las respuestas desde Google Sheets. Verifica que el Webhook tenga habilitado doGet(e).'
      );
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    fetchGuestOrders()
      .then((data) => {
        if (active) {
          setOrders(data);
          setError('');
        }
      })
      .catch(() => {
        if (active) {
          setError(
            'No fue posible obtener las respuestas desde Google Sheets. Verifica que el Webhook tenga habilitado doGet(e).'
          );
        }
      })
      .finally(() => {
        if (active) {
          setIsLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const budgetTotals = useMemo(() => {
    let totalEfectivo = 0;
    let totalCarta = 0;

    for (const order of orders) {
      const subtotalEfectivo =
        Number(order.precioFuerte || 0) +
        Number(order.precioBebida || 0) +
        Number(order.precioCoctel3x2 || 0) +
        Number(order.precioPostre || 0) +
        Number(order.precioCaliente || 0);

      const subtotalCarta =
        Number(order.precioFuerte || 0) +
        Number(order.precioBebida || 0) +
        Number(order.precioCoctelReal || 0) +
        Number(order.precioPostre || 0) +
        Number(order.precioCaliente || 0);

      totalEfectivo += Number(order.totalInvitado || subtotalEfectivo);
      totalCarta += subtotalCarta;
    }

    return {
      totalEfectivo,
      totalCarta,
      ahorroCocteles: Math.max(0, totalCarta - totalEfectivo)
    };
  }, [orders]);

  const dishCountsByCategory = useMemo(() => {
    const categories = [
      { key: 'platoFuerte', label: 'Plato Fuerte', counts: new Map() },
      { key: 'bebidaMesa', label: 'Bebida de Mesa', counts: new Map() },
      { key: 'coctel', label: 'Cóctel de Brindis', counts: new Map() },
      { key: 'postre', label: 'Postre Artesanal', counts: new Map() },
      { key: 'bebidaCaliente', label: 'Bebida Caliente', counts: new Map() }
    ];

    for (const order of orders) {
      for (const cat of categories) {
        const dishName = order[cat.key];
        if (!isOmittedValue(dishName)) {
          const cleanDish = String(dishName).trim();
          cat.counts.set(cleanDish, (cat.counts.get(cleanDish) || 0) + 1);
        }
      }
    }

    return categories.map((cat) => ({
      label: cat.label,
      items: Array.from(cat.counts.entries()).sort((a, b) => b[1] - a[1])
    }));
  }, [orders]);

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
        className="w-full max-w-4xl px-5 sm:px-8 py-7 flex flex-col gap-8 min-h-svh transform-gpu will-change-transform"
      >
        {/* Encabezado Sticky */}
        <header className="sticky top-0 z-30 bg-[#FAF8F5]/95 backdrop-blur-md -mx-5 px-5 sm:-mx-8 sm:px-8 pt-4 pb-4 border-b border-stone-200/80 flex flex-col gap-3 shadow-2xs">
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between w-full transform-gpu"
          >
            <button
              type="button"
              onClick={onBackToForm}
              className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-stone-600 hover:text-stone-900 cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver al formulario</span>
            </button>

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

          {/* Toggle Mostrar precios + Botón Recargar alineados arriba a la derecha */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-between gap-3 pt-0.5 transform-gpu"
          >
            <div className="flex flex-col gap-0.5">
              <span className="font-sans text-xs uppercase tracking-[0.18em] text-[#45816d] font-medium">
                Cena
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#1c2821] tracking-tight m-0">
                Comanda de Invitados
              </h1>
            </div>

            <div className="flex items-center gap-3 ml-auto">
              {/* Toggle Switch Mostrar Precios */}
              <button
                type="button"
                role="switch"
                aria-checked={showPrices}
                onClick={() => setShowPrices((prev) => !prev)}
                className={`inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border text-xs font-sans font-medium tracking-wide cursor-pointer transition-all ${
                  showPrices
                    ? 'bg-[#1c2821] text-[#FAF8F5] border-[#1c2821]'
                    : 'bg-white text-stone-700 border-stone-300 hover:border-stone-400'
                }`}
              >
                {showPrices ? (
                  <Eye className="w-3.5 h-3.5 text-[#b7dfd2]" />
                ) : (
                  <EyeOff className="w-3.5 h-3.5 text-stone-400" />
                )}
                <span>Mostrar precios</span>
                <span
                  className={`w-7 h-4 rounded-full p-0.5 flex items-center transition-colors ${
                    showPrices ? 'bg-[#45816d]' : 'bg-stone-200'
                  }`}
                >
                  <span
                    className={`w-3 h-3 rounded-full bg-white shadow-xs transform transition-transform ${
                      showPrices ? 'translate-x-3' : 'translate-x-0'
                    }`}
                  />
                </span>
              </button>

              {/* Botón discreto para recargar datos */}
              <button
                type="button"
                onClick={handleRefresh}
                disabled={isLoading || isRefreshing}
                title="Recargar respuestas en tiempo real"
                className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-stone-300 bg-white text-stone-700 hover:text-[#1c2821] hover:border-stone-400 disabled:opacity-50 cursor-pointer transition-all"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${
                    isRefreshing || isLoading ? 'animate-spin' : ''
                  }`}
                />
              </button>
            </div>
          </motion.div>
        </header>

        {/* Tarjeta Destacada: Gran Total de la Reserva (solo cuando showPrices está ACTIVO) */}
        <AnimatePresence initial={false}>
          {showPrices && orders.length > 0 && (
            <motion.section
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="overflow-hidden transform-gpu"
            >
              <div className="rounded-md bg-[#1c2821] text-[#FAF8F5] p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
                <div className="flex flex-col gap-1">
                  <span className="font-sans text-[11px] uppercase tracking-[0.16em] text-[#b7dfd2]">
                    Gran Total de la Reserva ({orders.length}{' '}
                    {orders.length === 1 ? 'invitado' : 'invitados'})
                  </span>
                  <p className="font-serif text-3xl sm:text-4xl text-[#FAF8F5] m-0">
                    {formatCOP(budgetTotals.totalEfectivo)}
                  </p>
                  <span className="font-sans text-xs text-[#b7dfd2]/80">
                    Incluye beneficio 3x2 en cócteles de brindis
                  </span>
                </div>

                <div className="flex flex-row sm:flex-col items-start sm:items-end justify-between gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#5aa78f]/25">
                  <div className="text-left sm:text-right">
                    <span className="block font-sans text-[11px] uppercase tracking-wider text-stone-400">
                      Valor en carta
                    </span>
                    <span className="font-sans text-sm line-through text-stone-400">
                      {formatCOP(budgetTotals.totalCarta)}
                    </span>
                  </div>
                  {budgetTotals.ahorroCocteles > 0 && (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-xs bg-[#f13315] text-[#FAF8F5] font-sans text-xs font-medium tracking-wide">
                      Ahorro 3x2: {formatCOP(budgetTotals.ahorroCocteles)}
                    </span>
                  )}
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Bloque Colapsable: Conteo Total por Plato */}
        {!isLoading && orders.length > 0 && (
          <motion.section
            variants={itemVariants}
            className="rounded-md border border-stone-200 bg-white overflow-hidden shadow-2xs transform-gpu"
          >
            <button
              type="button"
              onClick={() => setShowDishCounts((prev) => !prev)}
              className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-stone-50/80 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <UtensilsCrossed className="w-4 h-4 text-[#45816d]" />
                <span className="font-sans font-bold text-sm uppercase tracking-wider text-[#1c2821]">
                  Conteo Total por Plato
                </span>
                <span className="font-sans text-xs text-stone-500">
                  ({orders.length}{' '}
                  {orders.length === 1 ? 'comensal' : 'comensales'})
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-stone-500 transition-transform duration-200 ${
                  showDishCounts ? 'rotate-180' : ''
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {showDishCounts && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="border-t border-stone-100 px-5 py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 overflow-hidden"
                >
                  {dishCountsByCategory.map((cat) => (
                    <div key={cat.label} className="flex flex-col gap-2">
                      <h3 className="font-sans font-bold text-[11px] uppercase tracking-[0.14em] text-[#45816d] m-0">
                        {cat.label}
                      </h3>
                      {cat.items.length === 0 ? (
                        <p className="font-sans text-xs text-stone-400 italic m-0">
                          Sin selecciones
                        </p>
                      ) : (
                        <ul className="list-none p-0 m-0 flex flex-col gap-1.5">
                          {cat.items.map(([dish, count]) => (
                            <li
                              key={dish}
                              className="flex items-baseline justify-between gap-2 font-sans text-xs text-stone-800"
                            >
                              <span className="truncate">{dish}</span>
                              <span className="font-bold text-[#1c2821] shrink-0 bg-stone-100 px-2 py-0.5 rounded-xs">
                                {count}x
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>
        )}

        {/* Estados de Carga / Error / Vacío */}
        {isLoading ? (
          <motion.div
            variants={itemVariants}
            className="py-20 flex flex-col items-center justify-center gap-3 text-stone-500"
          >
            <RefreshCw className="w-5 h-5 animate-spin text-[#45816d]" />
            <p className="font-sans text-sm m-0">
              Cargando comandas registradas en tiempo real...
            </p>
          </motion.div>
        ) : error ? (
          <motion.div
            variants={itemVariants}
            className="rounded-md border border-[#f13315]/30 bg-[#f13315]/5 p-5 flex flex-col gap-3 text-[#1c2821]"
          >
            <p className="font-sans text-sm text-[#f13315] font-medium m-0">
              {error}
            </p>
            <button
              type="button"
              onClick={handleRefresh}
              className="self-start px-3 py-1.5 rounded-xs border border-[#f13315] text-xs font-sans uppercase tracking-wider text-[#f13315] hover:bg-[#f13315]/10 cursor-pointer"
            >
              Reintentar lectura
            </button>
          </motion.div>
        ) : orders.length === 0 ? (
          <motion.div
            variants={itemVariants}
            className="py-16 text-center rounded-md border border-stone-200 bg-white p-8"
          >
            <p className="font-serif text-2xl text-[#1c2821] m-0">
              Aún no hay comandas registradas
            </p>
            <p className="font-sans text-sm text-stone-500 mt-2 mb-0">
              Las elecciones aparecerán aquí automáticamente a medida que los
              invitados confirmen su menú.
            </p>
          </motion.div>
        ) : (
          /* Listado de Invitados (Persona por Persona) */
          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-12"
          >
            {orders.map((order, idx) => {
              let displayFirstName = normalizeFirstName(
                order.primerNombre || order.nombre
              );
              if (
                /^vic$/i.test(displayFirstName) ||
                /^vic$/i.test(String(order.primerNombre || order.nombre).trim())
              ) {
                displayFirstName = 'Victor Manuel';
              }
              const numberBadge = String(idx + 1).padStart(2, '0');

              const courseRows = [
                {
                  label: 'Plato Fuerte',
                  value: order.platoFuerte,
                  detail: order.detalleFuerte,
                  price: order.precioFuerte,
                  isCocktail: false
                },
                {
                  label: 'Bebida de Mesa',
                  value: order.bebidaMesa,
                  detail: '',
                  price: order.precioBebida,
                  isCocktail: false
                },
                {
                  label: 'Cóctel de Brindis',
                  value: order.coctel,
                  detail: '',
                  price: order.precioCoctel3x2,
                  originalPrice: order.precioCoctelReal,
                  isCocktail: true
                },
                {
                  label: 'Postre Artesanal',
                  value: order.postre,
                  detail: '',
                  price: order.precioPostre,
                  isCocktail: false
                },
                {
                  label: 'Bebida Caliente',
                  value: order.bebidaCaliente,
                  detail: '',
                  price: order.precioCaliente,
                  isCocktail: false
                }
              ];

              return (
                <motion.article
                  key={order.id || idx}
                  variants={itemVariants}
                  className="rounded-md bg-white p-5 flex flex-col justify-between gap-4 shadow-xs transform-gpu will-change-transform"
                >
                  <div className="flex flex-col gap-4">
                    {/* Cabecera de la tarjeta: solo 1 nombre en DM Serif */}
                    <div className="flex items-baseline justify-between gap-3 border-b border-stone-100 pb-3">
                      <h2 className="font-serif text-3xl text-[#1c2821] leading-none tracking-tight m-0">
                        {displayFirstName}
                      </h2>
                      <span className="font-sans font-bold text-xs uppercase tracking-widest text-[#45816d]">
                        #{numberBadge}
                      </span>
                    </div>

                    {/* 5 Tiempos estructurados */}
                    <div className="flex flex-col gap-3">
                      {courseRows.map((row) => {
                        const omitted = isOmittedValue(row.value);
                        return (
                          <div
                            key={row.label}
                            className="flex items-start justify-between gap-3 text-sm"
                          >
                            <div className="flex flex-col gap-0.5 min-w-0">
                              <span className="font-sans text-[10px] uppercase tracking-[0.14em] text-[#45816d] font-medium">
                                {row.label}
                              </span>
                              {omitted ? (
                                <span className="inline-flex self-start items-center px-2 py-0.5 rounded-xs bg-stone-100 text-stone-400 font-sans text-[10px] uppercase tracking-wider">
                                  Omitido
                                </span>
                              ) : (
                                <>
                                  <span className="font-sans font-semibold text-[#1c2821] leading-snug">
                                    {row.value}
                                  </span>
                                  {row.detail && (
                                    <span className="font-sans text-[11px] uppercase tracking-wide text-stone-500">
                                      {row.detail}
                                    </span>
                                  )}
                                </>
                              )}
                            </div>

                            {/* Precios individuales si showPrices está ACTIVO */}
                            {showPrices && !omitted && (
                              <div className="text-right shrink-0 font-sans text-xs pt-3">
                                {row.isCocktail &&
                                Number(row.originalPrice) >
                                  Number(row.price) ? (
                                  <div className="flex flex-col items-end leading-tight">
                                    <span className="line-through text-stone-400 text-[11px]">
                                      {formatCOP(row.originalPrice)}
                                    </span>
                                    <span className="font-semibold text-[#1c2821]">
                                      {formatCOP(row.price)} · 3x2
                                    </span>
                                  </div>
                                ) : (
                                  <span className="font-medium text-stone-700">
                                    {formatCOP(row.price)}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Bloque cálido de atención para alergias o notas especiales */}
                    {order.notasAlergias && (
                      <div className="rounded-xs bg-amber-50/90 border border-amber-200/80 px-3 py-2.5 flex items-start gap-2 text-amber-950">
                        <AlertCircle className="w-4 h-4 text-[#f13315] shrink-0 mt-0.5" />
                        <div className="flex flex-col gap-0.5 font-sans text-xs">
                          <span className="font-bold uppercase tracking-wider text-[10px] text-[#f13315]">
                            Atención · Alergias / Notas
                          </span>
                          <span>{order.notasAlergias}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Pie de tarjeta con Subtotal cuando showPrices está ACTIVO */}
                  {showPrices && (
                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between font-sans">
                      <span className="text-[11px] uppercase tracking-wider text-stone-500">
                        Subtotal invitado
                      </span>
                      <span className="text-sm font-bold text-[#1c2821]">
                        {formatCOP(order.totalInvitado)}
                      </span>
                    </div>
                  )}
                </motion.article>
              );
            })}
          </motion.section>
        )}
      </motion.div>
    </motion.div>
  );
}
