
/* MESAI TAKIP V2.0 - HESAPLAMA MOTORU */

// HH:MM biçimindeki saati dakikaya dönüştürür.
function parseTime(time) {
  const match = String(time).trim().match(/^(\d{1,2}):(\d{2})$/);

  if (!match) return null;

  const hour = Number(match[1]);
  const minute = Number(match[2]);

  if (hour > 23 || minute > 59) return null;

  return hour * 60 + minute;
}

// İki saat arasındaki toplam süreyi hesaplar.
function getShiftMinutes(start, end) {
  const startMin = parseTime(start);
  const endMin = parseTime(end);

  if (startMin === null || endMin === null) return null;

  // 00:00 - 00:00 özel kuralımız.
  if (startMin === 0 && endMin === 0) {
    return 1440;
  }

  let duration = endMin - startMin;

  // Gece yarısını geçen mesai.
  if (duration < 0) {
    duration += 1440;
  }

  return duration;
}

// Molayı toplam süreden düşer.
function calculateNetMinutes(start, end, breakMinutes = 0) {
  const duration = getShiftMinutes(start, end);

  if (duration === null) return null;

  const rest = Number(breakMinutes);

  if (!Number.isFinite(rest) || rest < 0) return null;

  return Math.max(0, duration - rest);
}
