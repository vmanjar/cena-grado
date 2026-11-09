const GOOGLE_SHEETS_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbx6ghFysWKhOCpSQGbjjnbex58kkY7j558LGfvhzdcx2lH6FGeNmvz4ZUZN0MqtsN3R/exec';

/**
 * Construye el payload JSON exacto y lo envía al Webhook de Google Apps Script.
 */
export async function submitMenuSelection({ guestName, selections, notasAlergias }) {
  const t1 = selections['tiempo-1'] || { name: 'Omitido', price: 0, detail: '' };
  const t2 = selections['tiempo-2'] || { name: 'Omitido', price: 0 };
  const t3 = selections['tiempo-3'] || { name: 'Omitido', price: 0, effectivePrice: 0 };
  const t4 = selections['tiempo-4'] || { name: 'Omitido', price: 0 };
  const t5 = selections['tiempo-5'] || { name: 'Omitido', price: 0 };

  const precioFuerte = Number(t1.price || 0);
  const precioBebida = Number(t2.price || 0);
  const precioCoctelReal = Number(t3.price || 0);
  const precioCoctel3x2 = Number(
    t3.effectivePrice !== undefined ? t3.effectivePrice : t3.price || 0
  );
  const precioPostre = Number(t4.price || 0);
  const precioCaliente = Number(t5.price || 0);

  const totalInvitado =
    precioFuerte +
    precioBebida +
    precioCoctel3x2 +
    precioPostre +
    precioCaliente;

  const payload = {
    nombre: (guestName || '').trim() || 'Invitado',
    platoFuerte: t1.name || 'Omitido',
    detalleFuerte: t1.detail || '',
    precioFuerte,
    bebidaMesa: t2.name || 'Omitido',
    precioBebida,
    coctel: t3.name || 'Omitido',
    precioCoctelReal,
    precioCoctel3x2,
    postre: t4.name || 'Omitido',
    precioPostre,
    bebidaCaliente: t5.name || 'Omitido',
    precioCaliente,
    notasAlergias: (notasAlergias || '').trim(),
    totalInvitado
  };

  const response = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8'
    },
    body: JSON.stringify(payload)
  });

  return { payload, response };
}
