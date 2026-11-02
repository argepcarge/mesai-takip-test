
/* MESAI TAKIP V2.0 - HESAPLAMA TESTLERI */

function test(name, actual, expected) {
  const success = Object.is(actual, expected);

  console[success ? 'log' : 'error'](
    `${success ? '✓' : '✗'} ${name}`,
    success ? '' : `Beklenen: ${expected}, Gelen: ${actual}`
  );

  return success;
}

function runCalculatorTests() {
  const results = [
    test('Normal mesai',
      getShiftMinutes('17:00', '20:00'), 180),

    test('Gece yarısını geçen mesai',
      getShiftMinutes('22:00', '02:00'), 240),

    test('00:00-00:00 = 24 saat',
      getShiftMinutes('00:00', '00:00'), 1440),

    test('Mola çıkarma',
      calculateNetMinutes('08:00', '17:00', 60), 480),

    test('Mola süreden uzun',
      calculateNetMinutes('10:00', '10:30', 60), 0),

    test('Geçersiz saat',
      getShiftMinutes('25:00', '18:00'), null)
  ];

  const passed = results.filter(Boolean).length;

  console.log(`TEST SONUCU: ${passed}/${results.length} başarılı`);
}

runCalculatorTests();
