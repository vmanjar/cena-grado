import { menuCourses } from '../data/menuData';

const GOOGLE_SHEETS_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbx6ghFysWKhOCpSQGbjjnbex58kkY7j558LGfvhzdcx2lH6FGeNmvz4ZUZN0MqtsN3R/exec';

/**
 * Reduce cualquier cadena a un único primer nombre con la primera letra en mayúscula
 * y el resto en minúscula, descartando segundos nombres y apellidos.
 */
export function normalizeFirstName(rawName) {
  const cleaned = String(rawName || '').trim();
  if (!cleaned) return 'Invitado';

  // Reemplazo solicitado: si el nombre es 'Vic' o 'Victor Manuel', mostrar 'Victor Manuel'
  if (/^vic$/i.test(cleaned) || /^victor\s+manuel$/i.test(cleaned)) {
    return 'Victor Manuel';
  }

  const firstWord = cleaned.split(/\s+/)[0];
  if (/^vic$/i.test(firstWord)) {
    return 'Victor Manuel';
  }

  return (
    firstWord.charAt(0).toLocaleUpperCase('es-CO') +
    firstWord.slice(1).toLocaleLowerCase('es-CO')
  );
}

function findMenuItemByName(dishName) {
  if (!dishName || dishName === 'Omitido') return null;
  const normalizedTarget = String(dishName).trim().toLowerCase();
  for (const course of menuCourses) {
    for (const item of course.items) {
      if (item.name.trim().toLowerCase() === normalizedTarget) {
        return item;
      }
    }
  }
  return null;
}

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

  const normalizedName = normalizeFirstName(guestName);

  const payload = {
    nombre: normalizedName,
    primerNombre: normalizedName,
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

/**
 * Realiza una petición GET al Webhook de Google Apps Script y devuelve
 * la lista de comandas normalizada.
 */
export async function fetchGuestOrders() {
  const response = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
    method: 'GET',
    redirect: 'follow'
  });

  if (!response.ok) {
    throw new Error(`Error al consultar la comanda (${response.status})`);
  }

  const json = await response.json();
  const rawList = Array.isArray(json)
    ? json
    : Array.isArray(json?.data)
    ? json.data
    : [];

  return rawList.map((row, index) => {
    const singleName = normalizeFirstName(row.primerNombre || row.nombre);

    const platoFuerte = row.platoFuerte || 'Omitido';
    const bebidaMesa = row.bebidaMesa || 'Omitido';
    const coctel = row.coctel || 'Omitido';
    const postre = row.postre || 'Omitido';
    const bebidaCaliente = row.bebidaCaliente || 'Omitido';

    const itemFuerte = findMenuItemByName(platoFuerte);
    const itemBebida = findMenuItemByName(bebidaMesa);
    const itemCoctel = findMenuItemByName(coctel);
    const itemPostre = findMenuItemByName(postre);
    const itemCaliente = findMenuItemByName(bebidaCaliente);

    const precioFuerte = Number(
      row.precioFuerte !== undefined && row.precioFuerte !== ''
        ? row.precioFuerte
        : itemFuerte?.price || 0
    );
    const precioBebida = Number(
      row.precioBebida !== undefined && row.precioBebida !== ''
        ? row.precioBebida
        : itemBebida?.price || 0
    );
    const precioCoctelReal = Number(
      row.precioCoctelReal !== undefined && row.precioCoctelReal !== ''
        ? row.precioCoctelReal
        : itemCoctel?.price || 0
    );
    const precioCoctel3x2 = Number(
      row.precioCoctel3x2 !== undefined && row.precioCoctel3x2 !== ''
        ? row.precioCoctel3x2
        : itemCoctel?.effectivePrice ?? itemCoctel?.price ?? 0
    );
    const precioPostre = Number(
      row.precioPostre !== undefined && row.precioPostre !== ''
        ? row.precioPostre
        : itemPostre?.price || 0
    );
    const precioCaliente = Number(
      row.precioCaliente !== undefined && row.precioCaliente !== ''
        ? row.precioCaliente
        : itemCaliente?.price || 0
    );

    const calculatedTotal =
      precioFuerte +
      precioBebida +
      precioCoctel3x2 +
      precioPostre +
      precioCaliente;

    const totalInvitado = Number(
      row.totalInvitado !== undefined && row.totalInvitado !== ''
        ? row.totalInvitado
        : calculatedTotal
    );

    return {
      id: row.id ?? `guest-${index + 1}`,
      nombre: singleName,
      primerNombre: singleName,
      platoFuerte,
      detalleFuerte: row.detalleFuerte || '',
      precioFuerte,
      bebidaMesa,
      precioBebida,
      coctel,
      precioCoctelReal,
      precioCoctel3x2,
      postre,
      precioPostre,
      bebidaCaliente,
      precioCaliente,
      notasAlergias: String(row.notasAlergias || '').trim(),
      totalInvitado
    };
  });
}
