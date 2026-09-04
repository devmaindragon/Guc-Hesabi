import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  Gauge,
  Timer,
  TrendingUp,
  Scale,
  Wind,
  Thermometer,
  Mountain,
  Droplets,
  Car,
  Check,
  X,
  Languages,
  ChevronDown,
  Trash2,
  Plus,
  Pencil,
  Save,
  SlidersHorizontal,
  Target,
  History,
  AlertTriangle,
} from "lucide-react";

/* ============================================================
   TEMA
   ============================================================ */

const THEME = {
  bg: "#0b0e11",
  card: "#151a1f",
  line: "#272f38",
  text: "#f2f4f6",
  dim: "#7b8794",
  accent: "#d0202c",
  second: "#f2f4f6",
  warn: "#f0b429",
  btn: "#181e25",

  mono: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace",
  sans:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",

  rCard: 6,
  rBtn: 3,
  pad: 10,
  gap: 6,       // kartlar arası
  gapLg: 12,    // kart içindeki bloklar arası
  rowH: 52,     // iki satırlı liste öğesi
  rowSm: 44,    // tek satırlı denetim
};

/* Banner görselini buraya koy. Boş bırakılırsa 320x50 yer tutucu görünür. */
const BANNER_SRC = "./banner.png";

/* Künye — sürüm ve bağlantılar buradan yönetilir */
const APP = {
  dev: "dev.main.dragon",
  version: "1.0.2",
  privacyUrl: "https://devmaindragon.github.io/Guc-Hesabi/privacy.html",
  supportUrl: "https://devmaindragon.github.io/Guc-Hesabi/support.html",
};

const T = createContext(THEME);
const useT = () => useContext(T);

/* ============================================================
   ÇEVİRİ
   ============================================================ */

const STR = {
  tr: {
    locale: "tr-TR",
    langName: "Türkçe",
    title: "GÜÇ HESABI",

    tabMeasure: "ÖLÇÜM",
    tabGarage: "GARAJ",
    tabSim: "SİMÜLASYON",

    measure: "ÖLÇÜM",
    measureTag: "dbn verisi",
    time: "SÜRE",
    grade: "EĞİM",
    mass: "AĞIRLIK",
    pick: "ARAÇ SEÇ",
    pickDesc: "CdA ve aktarma kaybı seçilen araçtan gelir, ağırlık da dolar.",
    cda: "CdA",
    loss: "KAYIP",
    air: "HAVA KOŞULLARI",
    temp: "SICAKLIK",
    alt: "RAKIM",
    hum: "NEM",
    search: "Marka veya model ara",
    empty: "Eşleşen araç yok.",
    newCar: "YENİ ARAÇ",
    newCarDesc: "Kütüphanede olmayan bir araç ekle. Değerleri bilmiyorsan benzer bir aracınkini temel al.",
    editCar: "ARACI DÜZENLE",
    create: "OLUŞTUR",
    update: "GÜNCELLE",
    nameHint: "Örn. Golf 7 GTI Stage 2",
    nameNeeded: "Araca bir ad ver.",
    addFromLib: "KÜTÜPHANEDEN",
    addOwn: "KENDİM GİRECEĞİM",
    addFirst: "ARAÇ EKLE",
    needCar: "Ölçüm için önce bir araç ekle.",
    tourTitle: "NASIL KULLANILIR",
    welcome: "HOŞ GELDİN",
    chooseLang: "DİLİNİ SEÇ",
    disclaimer:
      "Bu uygulama bir tahmin aracıdır, dinamometre değildir. Sonucun doğruluğu girdiğin değerlerin doğruluğuna bağlıdır.\n\nÖlçümü yalnızca kapalı pistte veya trafiğe kapalı yolda yap. Trafikte hız yapmak hem yasa dışı hem tehlikelidir.",
    agree: "KABUL ET VE DEVAM",
    tourSteps: [
      {
        h: "Aracını seç",
        p: "Garajdan bir araç seç ya da kütüphaneden ekle. Sürtünme alanı, aktarma kaybı ve ağırlık kendiliğinden dolar. Kütüphanede yoksa kendin girebilirsin.",
      },
      {
        h: "Süreyi gir",
        p: "Kapalı pistte ölçtüğün 100-200 süresini yaz, yolun eğimini ve ağırlığı ayarla. Hava koşullarını açarsan sıcaklık, rakım ve nem de hesaba girer. Sonuç anında çıkar.",
      },
      {
        h: "Koşuyu kaydet",
        p: "Her ölçüm garajda o aracın geçmişine işlenir. Modifiye öncesi ve sonrası farkı, en iyi değerin ve not düştüğün ayrıntılar orada birikir.",
      },
      {
        h: "Simülasyonu dene",
        p: "Ağırlık atsan ya da güç eklesen süre ne olurdu, hedeflediğin güce hangi sürede ulaşırsın — kaydettiğin koşu üzerinden hesaplanır.",
      },
    ],
    dontShow: "Bir daha gösterme",
    next: "İLERİ",
    back: "GERİ",
    done: "BAŞLA",
    skip: "GEÇ",
    howTo: "Nasıl kullanılır",
    selectCar: "ARACI SEÇ",
    selectCarDesc: "Garajındaki araçlardan birini seç.",
    manageCars: "GARAJI AÇ",
    note: "NOT",
    noteHint: "Örn. yeni turbo, yarım depo, soğuk hava",
    pickRun: "KOŞU SEÇ",
    changeRun: "KOŞUYU DEĞİŞTİR",
    bestTag: "EN İYİ",
    lastRunAt: "son",
    pickRunDesc: "Simülasyonun temel alacağı koşuyu seç.",
    kwLabel: "KİLOVAT",
    useInMeasure: "ÖLÇÜME AL",
    deleteRun: "KOŞUYU SİL",
    deleteRunDesc: "Bu koşu geçmişten silinir. Geri alınamaz.",
    grp: {
      polo: "VW POLO",
      golf: "VW GOLF",
      leon: "SEAT LEON",
      ibiza: "SEAT IBIZA",
      audi: "AUDI A3",
      tt: "AUDI TT",
      skoda: "ŠKODA",
      bmw: "BMW",
      honda: "HONDA",
      hyundai: "HYUNDAI",
      other: "DİĞER",
    },

    crank: "MOTOR GÜCÜ",
    wheel: "TEKER GÜCÜ",
    ratio: "GÜÇ / AĞIRLIK",
    sAcc: "İVME",
    sAero: "HAVA",
    sRoll: "YUVARLANMA",
    sGrade: "EĞİM",
    note2: "En doğru tahmin için tüm değerler doğru girilmelidir.",
    warn: "Ölçümü kapalı piste veya trafiğe kapalı yola bırakın.",
    invalid: "Süre 2–30 sn arasında olmalı.",

    /* garaj */
    garage: "GARAJ",
    garageEmpty: "Henüz araç yok. Bir ölçüm yapıp kaydet, aracın buraya düşsün.",
    carName: "ARAÇ ADI",
    saveRun: "KOŞUYU KAYDET",
    saveTitle: "KOŞUYU KAYDET",
    saveDesc: "Ölçüm garajdaki araca işlenir. Aynı adı kullanırsan geçmişe eklenir.",
    save: "KAYDET",
    saved: "Kaydedildi",
    runs: "KOŞU GEÇMİŞİ",
    noRuns: "Bu araç için kayıtlı koşu yok.",
    runCount: "koşu",
    best: "EN İYİ",
    last: "SON",
    delta: "DEĞİŞİM",
    delete: "SİL",
    deleteCar: "ARACI SİL",
    deleteCarDesc: "Araç ve ona ait tüm koşular silinir. Geri alınamaz.",
    confirm: "EVET, SİL",
    cancel: "VAZGEÇ",
    active: "SEÇİLİ",

    /* simülasyon */
    simDesc: "Kayıtlı son koşunu temel alır. Değerleri oynat, süre ve güç nasıl değişir gör.",
    simNeed: "Önce bir koşu kaydet. Simülasyon kayıtlı koşuyu temel alır.",
    base: "TEMEL KOŞU",
    dMass: "AĞIRLIK FARKI",
    dPower: "GÜÇ FARKI",
    newTime: "YENİ SÜRE",
    newHP: "YENİ GÜÇ",
    diff: "FARK",
    faster: "daha hızlı",
    slower: "daha yavaş",
    reset: "SIFIRLA",

    target: "HEDEF HESABI",
    targetDesc: "Hedeflediğin gücü gir, o güce ulaşmak için gereken süreyi gösterir.",
    targetHP: "HEDEF GÜÇ",
    needTime: "GEREKEN SÜRE",
    impossible: "Bu güç, bu koşullarda aralığı tamamlayamaz.",
    gain: "KAZANÇ",

    close: "KAPAT",
    lang: "DİL",
    privacy: "Gizlilik",
    support: "Destek",
    kg: "kg",
    sec: "sn",
    m: "m",
  },

  en: {
    locale: "en-US",
    langName: "English",
    title: "POWER CALC",

    tabMeasure: "MEASURE",
    tabGarage: "GARAGE",
    tabSim: "SIMULATE",

    measure: "MEASUREMENT",
    measureTag: "dbn data",
    time: "TIME",
    grade: "GRADE",
    mass: "WEIGHT",
    pick: "PICK A CAR",
    pickDesc: "CdA and drivetrain loss come from the car you pick. Weight fills in too.",
    cda: "CdA",
    loss: "LOSS",
    air: "AIR CONDITIONS",
    temp: "TEMP",
    alt: "ALTITUDE",
    hum: "HUMIDITY",
    search: "Search make or model",
    empty: "No car matches that.",
    newCar: "NEW CAR",
    newCarDesc: "Add a car that is not in the library. If you don't know the values, start from a similar car.",
    editCar: "EDIT CAR",
    create: "CREATE",
    update: "UPDATE",
    nameHint: "e.g. Golf 7 GTI Stage 2",
    nameNeeded: "Give the car a name.",
    addFromLib: "FROM LIBRARY",
    addOwn: "ENTER MY OWN",
    addFirst: "ADD A CAR",
    needCar: "Add a car before measuring.",
    tourTitle: "HOW IT WORKS",
    welcome: "WELCOME",
    chooseLang: "CHOOSE YOUR LANGUAGE",
    disclaimer:
      "This app is an estimation tool, not a dyno. The accuracy of the result depends on the accuracy of what you enter.\n\nOnly take measurements on a closed track or a road closed to traffic. Speeding on public roads is illegal and dangerous.",
    agree: "ACCEPT AND CONTINUE",
    tourSteps: [
      {
        h: "Pick your car",
        p: "Choose a car from your garage or add one from the library. Drag area, drivetrain loss and weight fill in automatically. Not in the library? Enter it yourself.",
      },
      {
        h: "Enter the time",
        p: "Type the 100-200 time you measured on a closed track, then set the gradient and weight. Open air conditions to include temperature, altitude and humidity. The result appears instantly.",
      },
      {
        h: "Save the run",
        p: "Every measurement is filed under that car's history. Before and after a modification, your best figure and any notes you added all collect there.",
      },
      {
        h: "Try the simulator",
        p: "What would the time be with less weight or more power, and how quickly would you reach a target figure — all worked out from a saved run.",
      },
    ],
    dontShow: "Don't show again",
    next: "NEXT",
    back: "BACK",
    done: "START",
    skip: "SKIP",
    howTo: "How it works",
    selectCar: "SELECT CAR",
    selectCarDesc: "Choose one of the cars in your garage.",
    manageCars: "OPEN GARAGE",
    note: "NOTE",
    noteHint: "e.g. new turbo, half tank, cold air",
    pickRun: "PICK A RUN",
    changeRun: "CHANGE RUN",
    bestTag: "BEST",
    lastRunAt: "last",
    pickRunDesc: "Choose the run the simulation builds on.",
    kwLabel: "KILOWATTS",
    useInMeasure: "USE IN MEASURE",
    deleteRun: "DELETE RUN",
    deleteRunDesc: "This run is removed from the history. It cannot be undone.",
    grp: {
      polo: "VW POLO",
      golf: "VW GOLF",
      leon: "SEAT LEON",
      ibiza: "SEAT IBIZA",
      audi: "AUDI A3",
      tt: "AUDI TT",
      skoda: "ŠKODA",
      bmw: "BMW",
      honda: "HONDA",
      hyundai: "HYUNDAI",
      other: "OTHER",
    },

    crank: "CRANK POWER",
    wheel: "WHEEL POWER",
    ratio: "POWER / WEIGHT",
    sAcc: "ACCEL",
    sAero: "DRAG",
    sRoll: "ROLLING",
    sGrade: "GRADE",
    note2: "For the most accurate estimate, every value must be entered correctly.",
    warn: "Run this on a closed track or a road closed to traffic.",
    invalid: "Time must be between 2 and 30 s.",

    garage: "GARAGE",
    garageEmpty: "No cars yet. Take a measurement and save it — the car lands here.",
    carName: "CAR NAME",
    saveRun: "SAVE RUN",
    saveTitle: "SAVE RUN",
    saveDesc: "The run is filed under a car in your garage. Reuse a name to add to its history.",
    save: "SAVE",
    saved: "Saved",
    runs: "RUN HISTORY",
    noRuns: "No runs saved for this car.",
    runCount: "runs",
    best: "BEST",
    last: "LAST",
    delta: "CHANGE",
    delete: "DELETE",
    deleteCar: "DELETE CAR",
    deleteCarDesc: "The car and all of its runs are removed. This cannot be undone.",
    confirm: "YES, DELETE",
    cancel: "CANCEL",
    active: "SELECTED",

    simDesc: "Based on your last saved run. Move the values and see how time and power shift.",
    simNeed: "Save a run first. The simulator builds on a saved run.",
    base: "BASE RUN",
    dMass: "WEIGHT DELTA",
    dPower: "POWER DELTA",
    newTime: "NEW TIME",
    newHP: "NEW POWER",
    diff: "DIFFERENCE",
    faster: "faster",
    slower: "slower",
    reset: "RESET",

    target: "TARGET",
    targetDesc: "Enter the power you are aiming for and see the time it would take.",
    targetHP: "TARGET POWER",
    needTime: "TIME NEEDED",
    impossible: "That power cannot complete the range under these conditions.",
    gain: "GAIN",

    close: "CLOSE",
    lang: "LANGUAGE",
    privacy: "Privacy",
    support: "Support",
    kg: "kg",
    sec: "s",
    m: "m",
  },

  es: {
    locale: "es-ES",
    langName: "Español",
    title: "CÁLCULO DE POTENCIA",

    tabMeasure: "MEDIR",
    tabGarage: "GARAJE",
    tabSim: "SIMULAR",

    measure: "MEDICIÓN",
    measureTag: "datos dbn",
    time: "TIEMPO",
    grade: "PENDIENTE",
    mass: "PESO",
    pick: "ELIGE UN COCHE",
    pickDesc: "El CdA y la pérdida de transmisión vienen del coche elegido. El peso también.",
    cda: "CdA",
    loss: "PÉRDIDA",
    air: "CONDICIONES DEL AIRE",
    temp: "TEMP",
    alt: "ALTITUD",
    hum: "HUMEDAD",
    search: "Busca marca o modelo",
    empty: "Ningún coche coincide.",
    newCar: "COCHE NUEVO",
    newCarDesc: "Añade un coche que no esté en la biblioteca. Si no sabes los valores, parte de uno parecido.",
    editCar: "EDITAR COCHE",
    create: "CREAR",
    update: "ACTUALIZAR",
    nameHint: "p. ej. Golf 7 GTI Stage 2",
    nameNeeded: "Ponle un nombre al coche.",
    addFromLib: "DE LA BIBLIOTECA",
    addOwn: "LO INTRODUZCO YO",
    addFirst: "AÑADIR COCHE",
    needCar: "Añade un coche antes de medir.",
    tourTitle: "CÓMO FUNCIONA",
    welcome: "BIENVENIDO",
    chooseLang: "ELIGE TU IDIOMA",
    disclaimer:
      "Esta app es una herramienta de estimación, no un banco de potencia. La exactitud del resultado depende de la exactitud de lo que introduzcas.\n\nHaz la medición solo en circuito cerrado o en vía sin tráfico. Correr en vía pública es ilegal y peligroso.",
    agree: "ACEPTAR Y CONTINUAR",
    tourSteps: [
      {
        h: "Elige tu coche",
        p: "Selecciona un coche del garaje o añádelo desde la biblioteca. El área frontal, la pérdida de transmisión y el peso se rellenan solos. Si no está, introdúcelo tú.",
      },
      {
        h: "Introduce el tiempo",
        p: "Escribe el tiempo de 100-200 medido en circuito cerrado y ajusta la pendiente y el peso. Abre las condiciones del aire para incluir temperatura, altitud y humedad. El resultado sale al instante.",
      },
      {
        h: "Guarda la medición",
        p: "Cada medición se archiva en el historial de ese coche. El antes y el después de una modificación, tu mejor cifra y las notas quedan ahí.",
      },
      {
        h: "Prueba el simulador",
        p: "Qué tiempo harías con menos peso o más potencia, y en cuánto alcanzarías una cifra objetivo — todo a partir de una medición guardada.",
      },
    ],
    dontShow: "No mostrar de nuevo",
    next: "SIGUIENTE",
    back: "ATRÁS",
    done: "EMPEZAR",
    skip: "OMITIR",
    howTo: "Cómo funciona",
    selectCar: "ELEGIR COCHE",
    selectCarDesc: "Elige uno de los coches de tu garaje.",
    manageCars: "ABRIR GARAJE",
    note: "NOTA",
    noteHint: "p. ej. turbo nuevo, medio depósito, aire frío",
    pickRun: "ELIGE UNA MEDICIÓN",
    changeRun: "CAMBIAR MEDICIÓN",
    bestTag: "MEJOR",
    lastRunAt: "última",
    pickRunDesc: "Elige la medición en la que se basa la simulación.",
    kwLabel: "KILOVATIOS",
    useInMeasure: "USAR AL MEDIR",
    deleteRun: "BORRAR MEDICIÓN",
    deleteRunDesc: "Esta medición se borra del historial. No se puede deshacer.",
    grp: {
      polo: "VW POLO",
      golf: "VW GOLF",
      leon: "SEAT LEON",
      ibiza: "SEAT IBIZA",
      audi: "AUDI A3",
      tt: "AUDI TT",
      skoda: "ŠKODA",
      bmw: "BMW",
      honda: "HONDA",
      hyundai: "HYUNDAI",
      other: "OTROS",
    },

    crank: "POTENCIA AL CIGÜEÑAL",
    wheel: "POTENCIA A LA RUEDA",
    ratio: "POTENCIA / PESO",
    sAcc: "ACEL.",
    sAero: "AIRE",
    sRoll: "RODADURA",
    sGrade: "PEND.",
    note2: "Para la estimación más exacta, todos los valores deben introducirse bien.",
    warn: "Haz la medición en circuito cerrado o vía sin tráfico.",
    invalid: "El tiempo debe estar entre 2 y 30 s.",

    garage: "GARAJE",
    garageEmpty: "Aún no hay coches. Haz una medición y guárdala; el coche aparecerá aquí.",
    carName: "NOMBRE DEL COCHE",
    saveRun: "GUARDAR MEDICIÓN",
    saveTitle: "GUARDAR MEDICIÓN",
    saveDesc: "La medición se archiva bajo un coche del garaje. Repite el nombre para sumarla a su historial.",
    save: "GUARDAR",
    saved: "Guardado",
    runs: "HISTORIAL",
    noRuns: "No hay mediciones para este coche.",
    runCount: "mediciones",
    best: "MEJOR",
    last: "ÚLTIMA",
    delta: "CAMBIO",
    delete: "BORRAR",
    deleteCar: "BORRAR COCHE",
    deleteCarDesc: "Se borran el coche y todas sus mediciones. No se puede deshacer.",
    confirm: "SÍ, BORRAR",
    cancel: "CANCELAR",
    active: "ELEGIDO",

    simDesc: "Parte de tu última medición guardada. Mueve los valores y observa el efecto.",
    simNeed: "Guarda una medición primero. El simulador parte de una medición guardada.",
    base: "MEDICIÓN BASE",
    dMass: "DIFERENCIA DE PESO",
    dPower: "DIFERENCIA DE POTENCIA",
    newTime: "NUEVO TIEMPO",
    newHP: "NUEVA POTENCIA",
    diff: "DIFERENCIA",
    faster: "más rápido",
    slower: "más lento",
    reset: "REINICIAR",

    target: "OBJETIVO",
    targetDesc: "Introduce la potencia que buscas y verás el tiempo que exigiría.",
    targetHP: "POTENCIA OBJETIVO",
    needTime: "TIEMPO NECESARIO",
    impossible: "Esa potencia no puede completar el rango en estas condiciones.",
    gain: "GANANCIA",

    close: "CERRAR",
    lang: "IDIOMA",
    privacy: "Privacidad",
    support: "Soporte",
    kg: "kg",
    sec: "s",
    m: "m",
  },
};

const LANGS = ["tr", "en", "es"];


/* ============================================================
   DEPOLAMA — özel modda ve gömülü tarayıcılarda patlayabilir
   ============================================================ */

function readStore(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed === null || parsed === undefined ? fallback : parsed;
  } catch (e) {
    return fallback;
  }
}

function writeStore(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    /* sessizce geç */
  }
}

function detectLang() {
  const saved = readStore("gh.lang", null);
  if (saved && STR[saved]) return saved;
  try {
    const list =
      navigator.languages && navigator.languages.length
        ? navigator.languages
        : [navigator.language || "en"];
    for (const tag of list) {
      const code = String(tag).slice(0, 2).toLowerCase();
      if (STR[code]) return code;
    }
  } catch (e) {
    /* navigator yok */
  }
  return "en";
}

/* İlk açılışta garaja konan örnek araç ve ölçüm varsayılanları.
   Kullanıcı silerse geri gelmez; "gh.seeded" bayrağı bunu tutar. */
const SEED_ID = "seed-ornek-arac";
const SEED_NAME = "Örnek Araç / Sample Car";
const SEED_CAR = { cdA: 0.65, loss: 13, mass: 1350 };
const SEED_AIR = { tempC: 20, altM: 100, rhPct: 50 };
const DEFAULT_SECONDS = { "100200": 12, "60160": 10 };
const DEFAULT_GRADE = -1;

/* Örnek aracın iki hazır koşusu. Değerler kaydedilmiyor, kurulumdaki
   girdilerden hesaplanıyor; formül değişirse geçmiş de tutarlı kalır. */
function makeSeedRuns() {
  const base = {
    gradePct: -1,
    massKg: SEED_CAR.mass,
    cdA: SEED_CAR.cdA,
    lossPct: SEED_CAR.loss,
    ...SEED_AIR,
  };
  const day = 86400000;
  const now = Date.now();
  return [
    { v1: 100, v2: 200, sec: 12, ts: now - day * 2 },
    { v1: 60, v2: 160, sec: 10, ts: now - day },
  ].map((d) => {
    const out = computePower({ ...base, v1kmh: d.v1, v2kmh: d.v2, seconds: d.sec });
    return {
      id: `seed-run-${d.v1}`,
      carId: SEED_ID,
      ts: d.ts,
      hp: out.crankHP,
      wheel: out.wheelHP,
      sec: d.sec,
      v1: d.v1,
      v2: d.v2,
      grade: base.gradePct,
      mass: base.massKg,
      cdA: base.cdA,
      loss: base.lossPct,
      temp: base.tempC,
      alt: base.altM,
      rh: base.rhPct,
      note: "",
    };
  });
}

/* Başlangıç verisi tek yerde hazırlanır; hem ilk kurulum hem de önceki
   sürümden gelen kullanıcı için geçiş burada yapılır.
   gh.seeded  : v2.1'de örnek aracı koyan eski bayrak
   gh.seed.v2 : örnek adı ve hazır koşuları getiren yeni bayrak */
let _initial = null;

function initialData() {
  if (_initial) return _initial;

  const stored = readStore("gh.cars", []);
  const legacy = readStore("gh.custom", []);
  let cars = stored.concat(legacy.filter((l) => !stored.some((b) => b.id === l.id)));
  let runs = readStore("gh.runs", []);

  if (!readStore("gh.seed.v2", false)) {
    const i = cars.findIndex((c) => c.id === SEED_ID);
    if (i >= 0) {
      /* eski kurulumdaki örnek araç: adı ve değerleri güncellenir */
      cars = cars.map((c, k) => (k === i ? { ...c, name: SEED_NAME, ...SEED_CAR } : c));
    } else if (!cars.length && !readStore("gh.seeded", false)) {
      cars = [{ id: SEED_ID, name: SEED_NAME, ...SEED_CAR }];
    }
    /* araç duruyorsa ve hiç koşusu yoksa örnek koşular eklenir;
       kullanıcı örnek aracı sildiyse hiçbir şey geri gelmez */
    if (cars.some((c) => c.id === SEED_ID) && !runs.some((x) => x.carId === SEED_ID)) {
      runs = runs.concat(makeSeedRuns());
    }
  }

  _initial = { cars, runs };
  return _initial;
}

const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36);

/* ============================================================
   HESAP — saf fonksiyonlar, arayüzden bağımsız
   ============================================================ */

const G = 9.80665;
const CRR = 0.012; // asfalt yuvarlanma direnci
const ROT = 1.04; // dönen kütle katsayısı
/* Metrik beygir (PS). Türkiye'de "hp" denen ve katalog değerleriyle
   eşleşen birim budur. Mekanik hp için: 1 / 745.6999 */
const W_TO_HP = 1 / 735.49875;

function airDensity(tempC, altM, rhPct) {
  const p = 101325 * Math.pow(1 - 2.25577e-5 * altM, 5.25588);
  const psat = 610.94 * Math.exp((17.625 * tempC) / (tempC + 243.04));
  const pv = (Math.min(Math.max(rhPct, 0), 100) / 100) * psat;
  const Tk = tempC + 273.15;
  return (p - pv) / (287.058 * Tk) + pv / (461.495 * Tk);
}

function meanCube(v1, v2) {
  if (Math.abs(v2 - v1) < 1e-6) return Math.pow(v1, 3);
  return (Math.pow(v2, 4) - Math.pow(v1, 4)) / (4 * (v2 - v1));
}

/* Süreden bağımsız dirençler: hava, yuvarlanma, eğim */
function resistances({ v1kmh, v2kmh, gradePct, massKg, cdA, tempC, altM, rhPct }) {
  const v1 = v1kmh / 3.6;
  const v2 = v2kmh / 3.6;
  const rho = airDensity(tempC, altM, rhPct);
  const theta = Math.atan(gradePct / 100);
  const vAvg = (v1 + v2) / 2;
  return {
    rho,
    aero: 0.5 * rho * cdA * meanCube(v1, v2),
    roll: massKg * G * CRR * Math.cos(theta) * vAvg,
    grade: massKg * G * Math.sin(theta) * vAvg,
    /* ivme işi: E = ROT·m·(v2²−v1²)/2, güç = E / t */
    accelEnergy: (ROT * massKg * (v2 * v2 - v1 * v1)) / 2,
  };
}

function computePower(input) {
  const r = resistances(input);
  const acc = r.accelEnergy / input.seconds;
  const wheelW = acc + r.aero + r.roll + r.grade;
  const crankW = wheelW / (1 - Math.min(Math.max(input.lossPct, 0), 45) / 100);
  return {
    rho: r.rho,
    wheelHP: wheelW * W_TO_HP,
    crankHP: crankW * W_TO_HP,
    crankKW: crankW / 1000,
    parts: { acc, aero: r.aero, roll: r.roll, grade: r.grade },
    total: wheelW,
  };
}

/* Ters çözüm: verilen krank gücü bu aralığı kaç saniyede alır?
   Kapalı biçim — ivme terimi 1/t ile orantılı olduğu için doğrudan çözülür. */
function solveSeconds(input, crankHP) {
  const r = resistances(input);
  const wheelW = crankHP / W_TO_HP * (1 - Math.min(Math.max(input.lossPct, 0), 45) / 100);
  const available = wheelW - r.aero - r.roll - r.grade;
  if (available <= 0) return null; // dirençleri yenemiyor
  return r.accelEnergy / available;
}

function computeBand(input) {
  const hi = computePower({ ...input, cdA: input.cdA * 1.1, lossPct: input.lossPct + 3 }).crankHP;
  const lo = computePower({
    ...input,
    cdA: input.cdA * 0.9,
    lossPct: Math.max(input.lossPct - 3, 0),
  }).crankHP;
  return Math.round((hi - lo) / 2);
}

/* ============================================================
   ARAÇ KÜTÜPHANESİ
   ============================================================ */

const GROUPS = [
  "polo", "golf", "leon", "ibiza", "audi", "tt", "skoda", "bmw", "honda", "hyundai", "other",
];

const CARS = [
  /* --- VW Polo --- */
  { g: "polo", n: "Polo MK5 1.2 TSI", cdA: 0.64, loss: 12, m: 1105 },
  { g: "polo", n: "Polo MK5 1.4 TSI", cdA: 0.64, loss: 12, m: 1170 },
  { g: "polo", n: "Polo MK5 GTI 1.4 TSI", cdA: 0.65, loss: 13, m: 1184 },
  { g: "polo", n: "Polo MK5 1.6 TDI", cdA: 0.64, loss: 12, m: 1150 },
  { g: "polo", n: "Polo MK6 1.6 TDI", cdA: 0.62, loss: 12, m: 1215 },
  { g: "polo", n: "Polo MK6 1.0 TSI", cdA: 0.62, loss: 12, m: 1180 },

  /* --- VW Golf --- */
  { g: "golf", n: "Golf 4 1.8T", cdA: 0.71, loss: 12, m: 1290 },
  { g: "golf", n: "Golf 4 1.9 PD", cdA: 0.71, loss: 12, m: 1310 },
  { g: "golf", n: "Golf 5 GTI", cdA: 0.68, loss: 12, m: 1336 },
  { g: "golf", n: "Golf 5 1.4 T", cdA: 0.68, loss: 12, m: 1280 },
  { g: "golf", n: "Golf 6 1.6 TDI", cdA: 0.66, loss: 12, m: 1320 },
  { g: "golf", n: "Golf 6 1.4 TSI", cdA: 0.66, loss: 12, m: 1265 },
  { g: "golf", n: "Golf 7 1.2 TSI", cdA: 0.63, loss: 12, m: 1215 },
  { g: "golf", n: "Golf 7 1.4 TSI", cdA: 0.63, loss: 12, m: 1265 },
  { g: "golf", n: "Golf 7 1.6 TDI", cdA: 0.63, loss: 12, m: 1305 },
  { g: "golf", n: "Golf 7 GTI", cdA: 0.64, loss: 13, m: 1395 },
  { g: "golf", n: "Golf 7 R", cdA: 0.65, loss: 18, m: 1495 },
  { g: "golf", n: "Golf 8 1.0 TSI", cdA: 0.61, loss: 12, m: 1255 },
  { g: "golf", n: "Golf 8 1.5 TSI", cdA: 0.61, loss: 12, m: 1285 },
  { g: "golf", n: "Golf 8 GTI", cdA: 0.62, loss: 13, m: 1400 },
  { g: "golf", n: "Golf 8 R", cdA: 0.64, loss: 18, m: 1551 },

  /* --- Seat Leon --- */
  { g: "leon", n: "Leon MK1 1.8T", cdA: 0.70, loss: 12, m: 1290 },
  { g: "leon", n: "Leon MK3 1.2 TSI", cdA: 0.62, loss: 12, m: 1190 },
  { g: "leon", n: "Leon MK3 1.4 TSI", cdA: 0.62, loss: 12, m: 1220 },
  { g: "leon", n: "Leon MK3 1.6 TDI", cdA: 0.62, loss: 12, m: 1265 },
  { g: "leon", n: "Leon MK3 Cupra 2.0 TSI", cdA: 0.63, loss: 13, m: 1375 },
  { g: "leon", n: "Leon / Cupra MK4 1.5 TSI", cdA: 0.60, loss: 12, m: 1310 },

  /* --- Seat Ibiza --- */
  { g: "ibiza", n: "Ibiza MK3 1.9 PD", cdA: 0.66, loss: 12, m: 1155 },
  { g: "ibiza", n: "Ibiza MK4 1.2 TSI", cdA: 0.65, loss: 12, m: 1090 },
  { g: "ibiza", n: "Ibiza MK4 1.4 TSI", cdA: 0.65, loss: 13, m: 1170 },
  { g: "ibiza", n: "Ibiza MK4 1.6 TDI", cdA: 0.65, loss: 12, m: 1145 },
  { g: "ibiza", n: "Ibiza MK4 1.4 TSI Cupra", cdA: 0.65, loss: 13, m: 1215 },

  /* --- Audi A3 --- */
  { g: "audi", n: "A3 MK1 1.8T", cdA: 0.68, loss: 12, m: 1220 },
  { g: "audi", n: "A3 MK1 1.9 PD", cdA: 0.68, loss: 12, m: 1265 },
  { g: "audi", n: "S3 MK1 1.8T", cdA: 0.69, loss: 18, m: 1375 },
  { g: "audi", n: "A3 MK2 1.6 TDI", cdA: 0.64, loss: 12, m: 1310 },
  { g: "audi", n: "A3 MK2 1.4 TSI", cdA: 0.64, loss: 12, m: 1265 },
  { g: "audi", n: "S3 MK2 2.0 TFSI", cdA: 0.66, loss: 18, m: 1455 },
  { g: "audi", n: "A3 MK3 1.6 TDI", cdA: 0.62, loss: 12, m: 1305 },
  { g: "audi", n: "A3 MK3 1.4 TSI", cdA: 0.62, loss: 12, m: 1280 },
  { g: "audi", n: "A3 MK3 1.2 TSI", cdA: 0.62, loss: 12, m: 1230 },
  { g: "audi", n: "A3 MK3 1.0 TSI", cdA: 0.62, loss: 12, m: 1220 },
  { g: "audi", n: "S3 MK3 2.0 TSI", cdA: 0.66, loss: 18, m: 1490 },
  { g: "audi", n: "A3 MK4 1.5 TSI", cdA: 0.61, loss: 12, m: 1310 },
  { g: "audi", n: "S3 MK4 2.0 TSI", cdA: 0.64, loss: 18, m: 1550 },

  /* --- Audi TT --- */
  { g: "tt", n: "TT 8N 1.8T", cdA: 0.66, loss: 12, m: 1280 },
  { g: "tt", n: "TT 8J 2.0 TFSI", cdA: 0.60, loss: 12, m: 1300 },
  { g: "tt", n: "TT 8J 2.0 TFSI (EA888)", cdA: 0.60, loss: 12, m: 1310 },
  { g: "tt", n: "TT 8S 2.0 TSI", cdA: 0.60, loss: 12, m: 1240 },

  /* --- Škoda --- */
  { g: "skoda", n: "Octavia MK3 1.6 TDI", cdA: 0.63, loss: 12, m: 1320 },
  { g: "skoda", n: "Octavia RS 2.0 TSI", cdA: 0.64, loss: 13, m: 1395 },
  { g: "skoda", n: "Fabia 1.6 TDI", cdA: 0.63, loss: 12, m: 1170 },

  /* --- BMW --- */
  { g: "bmw", n: "120i F20", cdA: 0.64, loss: 15, m: 1390 },
  { g: "bmw", n: "118i F20 N13", cdA: 0.64, loss: 15, m: 1370 },
  { g: "bmw", n: "118i F20 B38", cdA: 0.63, loss: 15, m: 1345 },
  { g: "bmw", n: "320i F30", cdA: 0.63, loss: 15, m: 1470 },
  { g: "bmw", n: "320d F30", cdA: 0.63, loss: 15, m: 1495 },
  { g: "bmw", n: "320i G20", cdA: 0.61, loss: 15, m: 1495 },
  { g: "bmw", n: "520i F10", cdA: 0.66, loss: 15, m: 1615 },
  { g: "bmw", n: "520i G30", cdA: 0.63, loss: 15, m: 1560 },

  /* --- Honda --- */
  { g: "honda", n: "Civic EK 1.6 VTi", cdA: 0.62, loss: 12, m: 1120 },
  { g: "honda", n: "Civic FC5 1.5", cdA: 0.66, loss: 13, m: 1310 },
  { g: "honda", n: "Civic FK8 Type R", cdA: 0.72, loss: 13, m: 1420 },

  /* --- Hyundai --- */
  { g: "hyundai", n: "i20 N 1.6 T-GDI", cdA: 0.66, loss: 12, m: 1190 },

  /* --- Diğer --- */
  { g: "other", n: "Fiat Egea 1.3 MultiJet", cdA: 0.68, loss: 12, m: 1285 },
  { g: "other", n: "Fiat Egea 1.6 MultiJet", cdA: 0.68, loss: 12, m: 1320 },
  { g: "other", n: "Opel Astra J 1.3 CDTI", cdA: 0.65, loss: 12, m: 1360 },
  { g: "other", n: "Opel Astra J 1.6 CDTI", cdA: 0.65, loss: 12, m: 1395 },
  { g: "other", n: "Opel Corsa D 1.3 CDTI", cdA: 0.65, loss: 12, m: 1180 },
  { g: "other", n: "Ford Focus Mk3 1.6 TDCI", cdA: 0.68, loss: 12, m: 1370 },
  { g: "other", n: "Ford Fiesta Mk7 1.0 EcoBoost", cdA: 0.64, loss: 12, m: 1090 },
  { g: "other", n: "Renault Clio 4 1.5 dCi", cdA: 0.62, loss: 12, m: 1090 },
  { g: "other", n: "Renault Megane 3 1.5 dCi", cdA: 0.66, loss: 12, m: 1280 },
  { g: "other", n: "Peugeot 301 1.6 HDI", cdA: 0.68, loss: 12, m: 1180 },
  { g: "other", n: "Citroën C-Elysée 1.6 HDI", cdA: 0.68, loss: 12, m: 1180 },
];

const carName = (c) => c.n;

/* ============================================================
   BİÇİMLENDİRME
   ============================================================ */

function makeFmt(locale) {
  const decimalComma = locale !== "en-US";
  return {
    locale,
    fmt: (v, d = 0) =>
      v.toLocaleString(locale, { minimumFractionDigits: d, maximumFractionDigits: d }),
    parse: (str) => {
      let x = String(str).replace(/[^\d.,-]/g, "");
      x = decimalComma ? x.replace(/\./g, "").replace(",", ".") : x.replace(/,/g, "");
      const n = parseFloat(x);
      return isNaN(n) ? null : n;
    },
    date: (ts) => {
      try {
        return new Date(ts).toLocaleDateString(locale, {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      } catch (e) {
        return "";
      }
    },
  };
}

const F = createContext(makeFmt("tr-TR"));
const useF = () => useContext(F);

/* ============================================================
   BİLEŞENLER
   ============================================================ */

function Card({ children, accent = false, style }) {
  const t = useT();
  return (
    <div
      style={{
        background: t.card,
        border: `1px solid ${accent ? t.accent : t.line}`,
        borderRadius: t.rCard,
        padding: t.pad,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Label({ children, style }) {
  const t = useT();
  return (
    <span
      style={{
        fontFamily: t.sans,
        fontSize: 11,
        letterSpacing: ".09em",
        textTransform: "uppercase",
        color: t.dim,
        fontWeight: 600,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

function Segmented({ options, value, onChange, onReselect }) {
  const t = useT();
  return (
    <div style={{ display: "flex", gap: t.gap }}>
      {options.map((o) => {
        const on = o.v === value;
        return (
          <button
            key={o.v}
            onClick={() => (on ? onReselect && onReselect(o.v) : onChange(o.v))}
            style={{
              flex: 1,
              minHeight: 44,
              background: on ? t.accent : t.btn,
              color: on ? "#fff" : t.dim,
              border: `1px solid ${on ? t.accent : t.line}`,
              borderRadius: t.rBtn,
              fontFamily: t.sans,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: ".08em",
              textTransform: "uppercase",
              cursor: "pointer",
              padding: "0 4px",
            }}
          >
            {o.l}
          </button>
        );
      })}
    </div>
  );
}

function Button({ children, onClick, kind = "ghost", icon: Icon, style }) {
  const t = useT();
  const solid = kind === "solid";
  const danger = kind === "danger";
  return (
    <button
      onClick={onClick}
      style={{
        minHeight: 44,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 7,
        padding: "0 14px",
        background: solid ? t.accent : t.btn,
        color: solid ? "#fff" : danger ? t.accent : t.text,
        border: `1px solid ${solid || danger ? t.accent : t.line}`,
        borderRadius: t.rBtn,
        fontFamily: t.sans,
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: ".09em",
        textTransform: "uppercase",
        cursor: "pointer",
        ...style,
      }}
    >
      {Icon && <Icon size={14} strokeWidth={2.3} />}
      {children}
    </button>
  );
}

function NumberField({ value, onChange, decimals = 0, width = 58, min, max }) {
  const t = useT();
  const { fmt, parse } = useF();
  const [draft, setDraft] = useState(null);

  const commit = () => {
    if (draft !== null) {
      const n = parse(draft);
      if (n !== null) {
        /* Klavyeden girilen değer de kaydırıcıyla aynı aralıkta kalmalı;
           aksi halde negatif ağırlık gibi anlamsız girdiler hesabı bozar. */
        let v = n;
        if (typeof min === "number") v = Math.max(v, min);
        if (typeof max === "number") v = Math.min(v, max);
        onChange(v);
      }
      setDraft(null);
    }
  };

  return (
    <input
      value={draft ?? fmt(value, decimals)}
      inputMode="decimal"
      onChange={(e) => setDraft(e.target.value)}
      onBlur={commit}
      onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
      style={{
        width,
        background: "transparent",
        border: "none",
        outline: "none",
        textAlign: "right",
        color: t.text,
        fontFamily: t.mono,
        fontSize: 17,
        fontWeight: 700,
        letterSpacing: "-.03em",
        padding: 0,
        WebkitTextFillColor: t.text,
      }}
    />
  );
}

function TextField({ value, onChange, placeholder }) {
  const t = useT();
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: "100%",
        minHeight: 44,
        background: t.btn,
        border: `1px solid ${t.line}`,
        borderRadius: t.rBtn,
        color: t.text,
        fontFamily: t.sans,
        fontSize: 14,
        padding: "0 10px",
        outline: "none",
        boxSizing: "border-box",
        WebkitTextFillColor: t.text,
      }}
    />
  );
}

/* Tek satır: ikon + etiket + slider + sayı + birim */
function CompactRow({ icon: Icon, label, value, unit, min, max, step, decimals, onChange, first }) {
  const t = useT();
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 7,
        minHeight: 44,
        borderTop: first ? "none" : `1px solid ${t.line}`,
      }}
    >
      <Icon size={15} color={t.accent} strokeWidth={2.2} style={{ flexShrink: 0 }} />
      <Label
        style={{
          fontSize: 10.5,
          width: 64,
          flexShrink: 0,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {label}
      </Label>
      <input
        type="range"
        className="mp-range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{
          flex: 1,
          minWidth: 36,
          height: 22,
          margin: 0,
          appearance: "none",
          background: "transparent",
          cursor: "pointer",
          "--pct": `${pct}%`,
        }}
      />
      <NumberField value={value} onChange={onChange} decimals={decimals} min={min} max={max} />
      <span
        style={{ fontFamily: t.mono, fontSize: 11, color: t.dim, width: 22, flexShrink: 0 }}
      >
        {unit}
      </span>
    </div>
  );
}

function Readout({ label, value, unit, big = false, color }) {
  const t = useT();
  return (
    <div>
      <Label style={{ fontSize: 10 }}>{label}</Label>
      <div
        style={{
          fontFamily: t.mono,
          fontSize: big ? 30 : 18,
          fontWeight: 800,
          letterSpacing: "-.03em",
          color: color || t.text,
          marginTop: 1,
          lineHeight: 1.1,
        }}
      >
        {value}
        {unit && (
          <span style={{ fontSize: big ? 15 : 11, marginLeft: 3, color: t.dim }}>{unit}</span>
        )}
      </div>
    </div>
  );
}

function Modal({ open, title, desc, children, onClose, closeLabel }) {
  const t = useT();

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.74)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        zIndex: 50,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 360,
          maxHeight: "78vh",
          display: "flex",
          flexDirection: "column",
          background: t.card,
          border: `1px solid ${t.line}`,
          borderRadius: t.rCard,
          padding: t.pad,
          color: t.text,
          fontFamily: t.sans,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
          <span
            style={{
              fontFamily: t.mono,
              fontSize: 13,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            {title}
          </span>
          <div style={{ flex: 1 }} />
          <button
            onClick={onClose}
            aria-label={closeLabel}
            style={{
              width: 44,
              height: 44,
              margin: "-11px -11px -11px 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            <X size={16} color={t.dim} strokeWidth={2.2} />
          </button>
        </div>
        {desc && (
          <p
            style={{
              fontFamily: t.sans,
              fontSize: 12,
              color: t.dim,
              margin: "0 0 10px",
              lineHeight: 1.45,
            }}
          >
            {desc}
          </p>
        )}
        <div style={{ overflowY: "auto", flex: 1, padding: "0 2px" }}>{children}</div>
        <button
          onClick={onClose}
          style={{
            marginTop: 10,
            width: "100%",
            minHeight: 44,
            background: t.btn,
            border: `1px solid ${t.line}`,
            borderRadius: t.rBtn,
            color: t.text,
            fontFamily: t.sans,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: ".09em",
            cursor: "pointer",
          }}
        >
          {closeLabel}
        </button>
      </div>
    </div>
  );
}

function PickRow({ label, meta, on, onClick }) {
  const t = useT();
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        minHeight: 44,
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "0 10px",
        marginBottom: 4,
        background: on ? t.accent : t.btn,
        border: `1px solid ${on ? t.accent : t.line}`,
        borderRadius: t.rBtn,
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      <span
        style={{ fontFamily: t.sans, fontSize: 13, fontWeight: 600, color: on ? "#fff" : t.text }}
      >
        {label}
      </span>
      <div style={{ flex: 1 }} />
      {meta && (
        <span style={{ fontFamily: t.mono, fontSize: 11, color: on ? "#fff" : t.dim }}>
          {meta}
        </span>
      )}
    </button>
  );
}

/* Koşu geçmişi çubukları — en yüksek değer tam yükseklik */
function RunChart({ runs }) {
  const t = useT();
  const { fmt } = useF();
  if (!runs.length) return null;
  const max = Math.max(...runs.map((r) => r.hp));
  const min = Math.min(...runs.map((r) => r.hp));
  const span = Math.max(max - min, 1);
  const shown = runs.slice(0, 12).reverse();
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 54, marginTop: 0 }}>
      {shown.map((r) => {
        const h = 22 + ((r.hp - min) / span) * 32;
        const best = r.hp === max;
        return (
          <div
            key={r.id}
            title={`${fmt(r.hp, 0)} HP`}
            style={{
              flex: 1,
              height: h,
              background: best ? t.accent : "#2f3b47",
              borderTop: best ? "none" : `1px solid ${t.line}`,
            }}
          />
        );
      })}
    </div>
  );
}


/* ============================================================
   AÇILIŞ EKRANI — 2 sn, ibre kırmızı bölgeye süpürür
   ============================================================ */

function Splash({ title }) {
  const t = useT();

  /* 240 derecelik yay, 30 çentik, son sekizi kırmızı */
  const START = 150;
  const SWEEP = 240;
  const N = 30;
  const RED_FROM = N - 8;
  const CX = 100;
  const CY = 108;
  const R = 62;

  const ticks = [];
  for (let i = 0; i < N; i++) {
    const a = ((START + (SWEEP * i) / (N - 1)) * Math.PI) / 180;
    const major = i % 5 === 0;
    const len = major ? R * 0.3 : R * 0.19;
    ticks.push(
      <line
        key={i}
        x1={CX + Math.cos(a) * R}
        y1={CY + Math.sin(a) * R}
        x2={CX + Math.cos(a) * (R - len)}
        y2={CY + Math.sin(a) * (R - len)}
        stroke={i >= RED_FROM ? t.accent : major ? t.dim : "#3f4b58"}
        strokeWidth={major ? 3.4 : 2}
        strokeLinecap="butt"
      />
    );
  }

  return (
    <div className="gh-splash">
      <div style={{ textAlign: "center" }}>
        <svg width="184" height="184" viewBox="0 0 200 200" aria-hidden="true">
          <path
            d={describeArc(CX, CY, R * 1.14, START, START + SWEEP)}
            fill="none"
            stroke="#3f4b58"
            strokeWidth="1.6"
          />
          {ticks}
          <g className="gh-needle" style={{ transformOrigin: `${CX}px ${CY}px` }}>
            <polygon
              points={`${CX + R * 0.84},${CY} ${CX},${CY - 7} ${CX - R * 0.16},${CY} ${CX},${CY + 7}`}
              fill={t.text}
            />
          </g>
          <rect
            x={CX - 10}
            y={CY - 10}
            width="20"
            height="20"
            fill={t.bg}
            stroke={t.accent}
            strokeWidth="2.6"
          />
        </svg>

        <div className="gh-splash-title">{title}</div>
        <div className="gh-splash-bar" />
      </div>
    </div>
  );
}

/* SVG yay yolu — arc komutu için başlangıç ve bitiş noktaları */
function describeArc(cx, cy, r, a0, a1) {
  const p = (deg) => {
    const a = (deg * Math.PI) / 180;
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
  };
  const [x0, y0] = p(a0);
  const [x1, y1] = p(a1);
  const large = a1 - a0 > 180 ? 1 : 0;
  return `M ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1}`;
}


/* ============================================================
   ÖĞRETİCİ — ilk açılışta, dört adım
   ============================================================ */

function Tour({ s, step, setStep, remember, setRemember, onClose, lang, setLang }) {
  const t = useT();
  const steps = s.tourSteps;
  const total = steps.length + 1; // 0. adım karşılama
  const welcome = step === 0;
  const last = step === total - 1;
  const icons = [Car, Timer, Save, SlidersHorizontal];
  const Icon = icons[step - 1] || Car;
  const body = welcome ? null : steps[step - 1];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        background: "rgba(0,0,0,.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 360,
          background: t.card,
          border: `1px solid ${t.line}`,
          borderRadius: t.rCard,
          padding: t.pad,
          color: t.text,
          fontFamily: t.sans,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", marginBottom: t.gapLg }}>
          <span
            style={{
              fontFamily: t.mono,
              fontSize: 13,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            {welcome ? s.welcome : s.tourTitle}
          </span>
          <div style={{ flex: 1 }} />
          {!welcome && (
          <button
            onClick={onClose}
            aria-label={s.skip}
            style={{
              minHeight: t.rowSm,
              padding: "0 10px",
              margin: "-10px -10px -10px 0",
              background: "none",
              border: "none",
              color: t.dim,
              fontFamily: t.sans,
              fontSize: 11.5,
              fontWeight: 700,
              letterSpacing: ".08em",
              cursor: "pointer",
            }}
          >
            {s.skip}
          </button>
          )}
        </div>

        {welcome ? (
          <>
            <Label style={{ display: "block", marginBottom: 8 }}>{s.chooseLang}</Label>
            <div style={{ display: "flex", gap: t.gap, marginBottom: t.gapLg }}>
              {LANGS.map((l) => {
                const on = l === lang;
                return (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    style={{
                      flex: 1,
                      minHeight: t.rowSm,
                      background: on ? t.accent : t.btn,
                      color: on ? "#fff" : t.dim,
                      border: `1px solid ${on ? t.accent : t.line}`,
                      borderRadius: t.rBtn,
                      fontFamily: t.sans,
                      fontSize: 12.5,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    {STR[l].langName}
                  </button>
                );
              })}
            </div>

            <div
              style={{
                display: "flex",
                gap: 9,
                alignItems: "flex-start",
                border: `1px solid ${t.warn}33`,
                borderRadius: t.rBtn,
                padding: 10,
                minHeight: 84,
              }}
            >
              <AlertTriangle
                size={15}
                color={t.warn}
                strokeWidth={2.2}
                style={{ flexShrink: 0, marginTop: 2 }}
              />
              <p
                style={{
                  fontSize: 12.5,
                  lineHeight: 1.55,
                  color: t.dim,
                  margin: 0,
                  whiteSpace: "pre-line",
                }}
              >
                {s.disclaimer}
              </p>
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                width: 46,
                height: 46,
                border: `1px solid ${t.accent}`,
                borderRadius: t.rBtn,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: t.gapLg,
              }}
            >
              <Icon size={22} color={t.accent} strokeWidth={2.2} />
            </div>

            <h2 style={{ fontSize: 17, margin: "0 0 8px", letterSpacing: "-.01em" }}>{body.h}</h2>
            <p style={{ fontSize: 13.5, lineHeight: 1.55, color: t.dim, margin: 0, minHeight: 84 }}>
              {body.p}
            </p>
          </>
        )}

        {/* adım göstergesi */}
        <div style={{ display: "flex", gap: 4, margin: `${t.gapLg}px 0` }}>
          {Array.from({ length: total }).map((x, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: 3,
                background: i <= step ? t.accent : t.line,
              }}
            />
          ))}
        </div>

        {/* bir daha gösterme */}
        {!welcome && (
        <button
          onClick={() => setRemember(!remember)}
          role="checkbox"
          aria-checked={remember}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 9,
            width: "100%",
            minHeight: t.rowSm,
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          <span
            style={{
              width: 20,
              height: 20,
              flexShrink: 0,
              border: `1px solid ${remember ? t.accent : t.line}`,
              background: remember ? t.accent : "transparent",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {remember && <Check size={13} color="#fff" strokeWidth={3} />}
          </span>
          <span style={{ fontSize: 13, color: t.dim }}>{s.dontShow}</span>
        </button>
        )}

        <div style={{ display: "flex", gap: t.gap, marginTop: t.gap }}>
          {step > 0 && (
            <Button onClick={() => setStep(step - 1)} style={{ flex: 1 }}>
              {s.back}
            </Button>
          )}
          <Button
            kind="solid"
            onClick={() => (last ? onClose() : setStep(step + 1))}
            style={{ flex: 2 }}
          >
            {welcome ? s.agree : last ? s.done : s.next}
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   UYGULAMA
   ============================================================ */

export default function App() {
  const t = THEME;

  const [lang, setLang] = useState(detectLang);
  const s = STR[lang];
  const fx = useMemo(() => makeFmt(s.locale), [s.locale]);
  const fmt = fx.fmt;

  const [tab, setTab] = useState("measure");

  /* Öğretici: ilk açılışta çıkar, künyeden tekrar açılabilir */
  const [tourOpen, setTourOpen] = useState(() => !readStore("gh.tour", false));
  const [tourStep, setTourStep] = useState(0);
  const [tourRemember, setTourRemember] = useState(true);

  function closeTour() {
    if (tourRemember) writeStore("gh.tour", true);
    setTourOpen(false);
    setTourStep(0);
  }

  /* Açılış ekranı: 2 sn görünür, sonra kaldırılır */
  const [booting, setBooting] = useState(true);
  useEffect(() => {
    const id = setTimeout(() => setBooting(false), 2000);
    return () => clearTimeout(id);
  }, []);

  /* --- ölçüm durumu --- */
  const [range, setRange] = useState("100200");
  const [seconds, setSeconds] = useState(DEFAULT_SECONDS["100200"]);
  const [gradePct, setGradePct] = useState(DEFAULT_GRADE);
  /* Açılışta ağırlık, kayıtlı seçili aracınkiyle başlar */
  const [massKg, setMassKg] = useState(() => {
    const list = initialData().cars;
    const id = readStore("gh.activeCar", null);
    const c = list.find((x) => x.id === id) || list[0];
    return c ? c.mass : SEED_CAR.mass;
  });
  const [carId, setCarId] = useState(() => readStore("gh.activeCar", null));
  const [tempC, setTempC] = useState(20);
  const [altM, setAltM] = useState(100);
  const [rhPct, setRhPct] = useState(50);
  const [airOpen, setAirOpen] = useState(false);

  /* --- garaj --- */
  /* Garaj tek kaynak. Eski sürümdeki ayrı "kendi araçlarım" listesi varsa içeri alınır. */
  const [cars, setCars] = useState(() => initialData().cars);

  /* Kurulum ve geçiş yalnız bir kez çalışır */
  useEffect(() => {
    writeStore("gh.seeded", true);
    writeStore("gh.seed.v2", true);
  }, []);
  const [runs, setRuns] = useState(() => initialData().runs);
  const [selCar, setSelCar] = useState(null);

  useEffect(() => writeStore("gh.cars", cars), [cars]);
  useEffect(() => writeStore("gh.runs", runs), [runs]);
  useEffect(() => writeStore("gh.lang", lang), [lang]);

  /* --- simülasyon --- */
  const [dMass, setDMass] = useState(0);
  const [dPower, setDPower] = useState(0);
  const [targetHP, setTargetHP] = useState(null); // null = henüz elle ayarlanmadı

  /* --- modaller --- */
  const [pickOpen, setPickOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [saveOpen, setSaveOpen] = useState(false);
  const [delCar, setDelCar] = useState(null);
  const [delRun, setDelRun] = useState(null);
  const [query, setQuery] = useState("");
  const [runNote, setRunNote] = useState("");
  const [simRunId, setSimRunId] = useState(null);
  const [runPickOpen, setRunPickOpen] = useState(false);
  const [selectOpen, setSelectOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [formId, setFormId] = useState(null);
  const [fName, setFName] = useState("");
  const [fCdA, setFCdA] = useState(0.65);
  const [fLoss, setFLoss] = useState(13);
  const [fMass, setFMass] = useState(1350);
  const [fErr, setFErr] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  /* Ölçüm her zaman garajdaki bir araca bağlı */
  const car = cars.find((c) => c.id === carId) || cars[0] || null;
  const effCdA = car ? car.cdA : 0.63;
  const effLoss = car ? car.loss : 15;

  useEffect(() => writeStore("gh.activeCar", car ? car.id : null), [car]);

  const [v1kmh, v2kmh] = range === "100200" ? [100, 200] : [60, 160];

  const input = {
    v1kmh,
    v2kmh,
    seconds,
    gradePct,
    massKg,
    cdA: effCdA,
    lossPct: effLoss,
    tempC,
    altM,
    rhPct,
  };

  /* input her render'da yeni nesne olduğu için alanları tek tek izliyoruz */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const r = useMemo(() => computePower(input), [
    v1kmh, v2kmh, seconds, gradePct, massKg, effCdA, effLoss, tempC, altM, rhPct,
  ]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const band = useMemo(() => computeBand(input), [
    v1kmh, v2kmh, seconds, gradePct, massKg, effCdA, effLoss, tempC, altM, rhPct,
  ]);

  const valid = !!car && seconds >= 2 && seconds <= 30 && r.crankHP > 0;
  const splitColors = { acc: t.accent, aero: "#4a5b6d", roll: "#2f3b47", grade: t.warn };
  const splitKeys = ["acc", "aero", "roll", "grade"];
  /* Yokuş aşağıda eğim terimi negatif; oran tabanı yalnızca pozitif kalemler */
  const splitBase =
    splitKeys.reduce((a, k) => a + Math.max(r.parts[k], 0), 0) || 1;

  /* ---- garaj yardımcıları ---- */
  const runsOf = (carId) =>
    runs.filter((x) => x.carId === carId).sort((a, b) => b.ts - a.ts);

  const activeCarId = selCar || (cars.length ? cars[0].id : null);
  const activeCar = cars.find((c) => c.id === activeCarId) || null;
  const activeRuns = activeCarId ? runsOf(activeCarId) : [];
  const lastRun = runs.length ? runs.slice().sort((a, b) => b.ts - a.ts)[0] : null;

  function openSave() {
    if (!car) return;
    setSaveOpen(true);
  }

  function commitSave() {
    if (!car) return;
    const run = {
      id: uid(),
      carId: car.id,
      ts: Date.now(),
      hp: r.crankHP,
      wheel: r.wheelHP,
      sec: seconds,
      v1: v1kmh,
      v2: v2kmh,
      grade: gradePct,
      mass: massKg,
      cdA: effCdA,
      loss: effLoss,
      temp: tempC,
      alt: altM,
      rh: rhPct,
      note: (runNote || "").trim(),
    };
    setRuns([...runs, run]);
    setSelCar(car.id);
    setRunNote("");
    setSaveOpen(false);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2200);
  }

  function openNewCar() {
    setFormId(null);
    setFName("");
    setFCdA(car ? car.cdA : 0.65);
    setFLoss(car ? car.loss : 13);
    setFMass(car ? car.mass : 1350);
    setFErr(false);
    setFormOpen(true);
  }

  function openEditCar(c) {
    setFormId(c.id);
    setFName(c.name);
    setFCdA(c.cdA);
    setFLoss(c.loss);
    setFMass(c.mass);
    setFErr(false);
    setFormOpen(true);
  }

  function commitCustom() {
    const name = (fName || "").trim();
    if (!name) {
      setFErr(true);
      return;
    }
    if (formId) {
      setCars(
        cars.map((c) => (c.id === formId ? { ...c, name, cdA: fCdA, loss: fLoss, mass: fMass } : c))
      );
      setCarId(formId);
    } else {
      const id = uid();
      setCars([...cars, { id, name, cdA: fCdA, loss: fLoss, mass: fMass }]);
      setCarId(id);
      setSelCar(id);
    }
    setMassKg(fMass);
    setFormOpen(false);
  }

  /* Kütüphaneden seçilen araç garaja kopyalanır */
  function addFromLibrary(c) {
    const id = uid();
    setCars([...cars, { id, name: c.n, cdA: c.cdA, loss: c.loss, mass: c.m }]);
    setCarId(id);
    setSelCar(id);
    setMassKg(c.m);
    setPickOpen(false);
    setQuery("");
  }

  function removeCar(id) {
    const rest = cars.filter((c) => c.id !== id);
    setCars(rest);
    if (carId === id) {
      setCarId(rest.length ? rest[0].id : null);
      if (rest.length) setMassKg(rest[0].mass);
    }
    setRuns(runs.filter((x) => x.carId !== id));
    if (selCar === id) setSelCar(null);
    setDelCar(null);
  }

  function removeRun(id) {
    setRuns(runs.filter((x) => x.id !== id));
    setDelRun(null);
  }

  /* Garajdaki aracı ölçüm ekranına taşı — kendi araçları kütüphanede
     olmadığı için manuel moda geçilir. */
  function loadCarIntoMeasure(c) {
    setCarId(c.id);
    setMassKg(c.mass);
    setTab("measure");
  }

  /* ---- simülasyon hesabı ---- */
  /* Garajda seçili araç varsa onun son koşusu, yoksa en son kaydedilen koşu */
  const simBase =
    (simRunId && runs.find((x) => x.id === simRunId)) ||
    (activeRuns.length ? activeRuns[0] : lastRun);
  const simCar = cars.find((c) => c.id === (simBase && simBase.carId)) || null;
  /* Elle ayarlanmadıysa hedef, temel koşunun biraz üstünde başlar */
  const target =
    targetHP !== null ? targetHP : simBase ? Math.round(simBase.hp / 10) * 10 + 30 : 250;

  const sim = useMemo(() => {
    if (!simBase) return null;
    const baseInput = {
      v1kmh: simBase.v1,
      v2kmh: simBase.v2,
      seconds: simBase.sec,
      gradePct: simBase.grade,
      massKg: simBase.mass,
      cdA: simBase.cdA,
      lossPct: simBase.loss,
      tempC: simBase.temp,
      altM: simBase.alt,
      rhPct: simBase.rh,
    };
    const modified = {
      ...baseInput,
      massKg: Math.max(simBase.mass + dMass, 400),
    };
    const newHP = Math.max(simBase.hp + dPower, 20);
    const newSec = solveSeconds(modified, newHP);
    const tgtSec = solveSeconds(baseInput, Math.max(target, 20));
    return { baseInput, newHP, newSec, tgtSec };
  }, [simBase, dMass, dPower, target]);


  /* ============================================================
     EKRANLAR
     ============================================================ */

  const measureScreen = (
    <div style={{ display: "flex", flexDirection: "column", gap: t.gap }}>
      {/* araç — tek satır, seçim garajdan */}
      <button
        onClick={() => (cars.length ? setSelectOpen(true) : setTab("garage"))}
        style={{
          width: "100%",
          minHeight: 52,
          background: t.card,
          border: `1px solid ${car ? t.line : t.accent}`,
          borderRadius: t.rCard,
          display: "flex",
          alignItems: "center",
          gap: 9,
          padding: `0 ${t.pad}px`,
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <Car size={16} color={t.accent} strokeWidth={2.2} style={{ flexShrink: 0 }} />
        <span style={{ minWidth: 0, flex: 1 }}>
          <span
            style={{
              display: "block",
              fontFamily: t.sans,
              fontSize: 14,
              fontWeight: 600,
              color: t.text,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {car ? car.name : s.addFirst}
          </span>
          <span style={{ fontFamily: t.mono, fontSize: 10.5, color: t.dim }}>
            {car ? `${fmt(car.cdA, 2)} · %${car.loss}` : s.needCar}
          </span>
        </span>
        <ChevronDown
          size={16}
          color={t.dim}
          strokeWidth={2.2}
          style={{ flexShrink: 0, transform: "rotate(-90deg)" }}
        />
      </button>

      {/* ölçüm */}
      <Card style={{ paddingBottom: 4 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 7 }}>
          <Label>{s.measure}</Label>
          <span
            style={{ fontFamily: t.mono, fontSize: 10.5, color: t.text, letterSpacing: ".04em" }}
          >
            ({s.measureTag})
          </span>
        </div>
        <Segmented
          value={range}
          onChange={(v) => {
            setRange(v);
            /* İki aralığın süreleri kıyaslanabilir değil; geçişte o aralığın
               varsayılanına dönmek yanlış sonuç okumayı engelliyor. */
            setSeconds(DEFAULT_SECONDS[v]);
          }}
          options={[
            { v: "100200", l: "100 → 200" },
            { v: "60160", l: "60 → 160" },
          ]}
        />
        <div style={{ marginTop: 3 }}>
          <CompactRow
            first
            icon={Timer}
            label={s.time}
            value={seconds}
            unit={s.sec}
            min={2}
            max={30}
            step={0.05}
            decimals={2}
            onChange={setSeconds}
          />
          <CompactRow
            icon={TrendingUp}
            label={s.grade}
            value={gradePct}
            unit="%"
            min={-8}
            max={8}
            step={0.1}
            decimals={1}
            onChange={setGradePct}
          />
          <CompactRow
            icon={Scale}
            label={s.mass}
            value={massKg}
            unit={s.kg}
            min={700}
            max={3000}
            step={5}
            decimals={0}
            onChange={setMassKg}
          />

          {/* hava koşulları aynı kartın içinde, katlanır */}
          <button
            onClick={() => setAirOpen((o) => !o)}
            aria-expanded={airOpen}
            style={{
              width: "100%",
              minHeight: 44,
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "none",
              border: "none",
              borderTop: `1px solid ${t.line}`,
              padding: 0,
              cursor: "pointer",
            }}
          >
            <Thermometer size={15} color={t.accent} strokeWidth={2.2} style={{ flexShrink: 0 }} />
            <Label style={{ fontSize: 10.5 }}>{s.air}</Label>
            <div style={{ flex: 1 }} />
            {!airOpen && (
              <span style={{ fontFamily: t.mono, fontSize: 11, color: t.dim }}>
                {fmt(tempC, 0)} °C · {fmt(altM, 0)} {s.m} · %{fmt(rhPct, 0)}
              </span>
            )}
            <ChevronDown
              size={15}
              color={t.dim}
              strokeWidth={2.2}
              style={{
                transform: airOpen ? "rotate(180deg)" : "none",
                transition: "transform .15s",
              }}
            />
          </button>
          {airOpen && (
            <>
              <CompactRow
                icon={Thermometer}
                label={s.temp}
                value={tempC}
                unit="°C"
                min={-20}
                max={50}
                step={1}
                decimals={0}
                onChange={setTempC}
              />
              <CompactRow
                icon={Mountain}
                label={s.alt}
                value={altM}
                unit={s.m}
                min={0}
                max={3000}
                step={10}
                decimals={0}
                onChange={setAltM}
              />
              <CompactRow
                icon={Droplets}
                label={s.hum}
                value={rhPct}
                unit="%"
                min={0}
                max={100}
                step={1}
                decimals={0}
                onChange={setRhPct}
              />
            </>
          )}
        </div>
      </Card>

      {/* sonuç */}
      <Card accent>
        {!valid ? (
          <p style={{ fontFamily: t.sans, fontSize: 12.5, color: t.warn, margin: 0 }}>
            {car ? s.invalid : s.needCar}
          </p>
        ) : (
          <>
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <Readout label={s.crank} value={fmt(r.crankHP, 0)} unit="HP" big color={t.accent} />
              <div style={{ flex: 1 }} />
              <div
                style={{
                  fontFamily: t.mono,
                  fontSize: 11,
                  color: t.dim,
                  textAlign: "right",
                  letterSpacing: ".03em",
                  lineHeight: 1.45,
                }}
              >
                ± {fmt(band, 0)} HP
                <br />
                {v1kmh}–{v2kmh} · {fmt(seconds, 2)} {s.sec}
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: t.gap,
                marginTop: 8,
              }}
            >
              <Readout label={s.wheel} value={fmt(r.wheelHP, 0)} unit="HP" />
              <Readout label={s.ratio} value={fmt((r.crankHP / Math.max(massKg, 1)) * 1000, 0)} unit="HP/t" />
              <Readout label={s.kwLabel} value={fmt(r.crankKW, 0)} unit="kW" />
            </div>

            <div style={{ marginTop: 9 }}>
              {/* Yokuş aşağıda eğim terimi negatif olur; çubuk yalnızca
                  pozitif kalemleri gösterir, yoksa toplam %100'ü aşıyor. */}
              <div style={{ display: "flex", height: 6, gap: 1, overflow: "hidden" }}>
                {splitKeys
                  .filter((k) => r.parts[k] > 0)
                  .map((k) => {
                    const w = (r.parts[k] / splitBase) * 100;
                    return w < 0.4 ? null : (
                      <div key={k} style={{ width: `${w}%`, background: splitColors[k] }} />
                    );
                  })}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "3px 11px", marginTop: 6 }}>
                {[
                  [s.sAcc, r.parts.acc, splitColors.acc],
                  [s.sAero, r.parts.aero, splitColors.aero],
                  [s.sRoll, r.parts.roll, splitColors.roll],
                  [s.sGrade, r.parts.grade, splitColors.grade],
                ].map(([l, v, c]) => (
                  <div key={l} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ width: 7, height: 7, background: c, display: "block" }} />
                    <span
                      style={{
                        fontFamily: t.mono,
                        fontSize: 10.5,
                        color: t.dim,
                        letterSpacing: ".03em",
                      }}
                    >
                      {l} {v < 0 ? "−" : ""}%{fmt(Math.abs((v / splitBase) * 100), 0)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Button
              kind="solid"
              icon={justSaved ? Check : Save}
              onClick={openSave}
              style={{ width: "100%", marginTop: 9 }}
            >
              {justSaved ? s.saved : s.saveRun}
            </Button>

          </>
        )}
      </Card>

      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 8,
          border: `1px solid ${t.warn}33`,
          borderRadius: t.rCard,
          padding: "9px 10px",
        }}
      >
        <AlertTriangle
          size={14}
          color={t.warn}
          strokeWidth={2.2}
          style={{ flexShrink: 0, marginTop: 1 }}
        />
        <span style={{ fontFamily: t.sans, fontSize: 11.5, lineHeight: 1.45 }}>
          <span style={{ color: t.warn }}>{s.warn}</span>{" "}
          <span style={{ color: t.dim }}>{s.note2}</span>
        </span>
      </div>
    </div>
  );

  const garageScreen = (
    <div style={{ display: "flex", flexDirection: "column", gap: t.gap }}>
      <Card>
        <Label style={{ display: "block", marginBottom: 8 }}>{s.garage}</Label>
        <div style={{ display: "flex", gap: t.gap, marginBottom: cars.length ? t.gap : t.gapLg }}>
          <Button icon={Plus} onClick={() => setPickOpen(true)} style={{ flex: 1 }}>
            {s.addFromLib}
          </Button>
          <Button icon={Pencil} onClick={openNewCar} style={{ flex: 1 }}>
            {s.addOwn}
          </Button>
        </div>
        {cars.length === 0 ? (
          <p style={{ fontFamily: t.sans, fontSize: 13, color: t.dim, margin: 0, lineHeight: 1.5 }}>
            {s.garageEmpty}
          </p>
        ) : (
          <div>
            {cars.map((c) => {
              const on = c.id === activeCarId;
              const list = runsOf(c.id);
              const n = list.length;
              return (
                <div
                  key={c.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    minHeight: t.rowH,
                    borderTop: `1px solid ${t.line}`,
                  }}
                >
                  <button
                    onClick={() => {
                      setSelCar(c.id);
                      setCarId(c.id);
                      setMassKg(c.mass);
                    }}
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      gap: 9,
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      textAlign: "left",
                      minHeight: 44,
                    }}
                  >
                    <Car
                      size={15}
                      color={on ? t.accent : t.dim}
                      strokeWidth={2.2}
                      style={{ flexShrink: 0 }}
                    />
                    <span style={{ minWidth: 0 }}>
                      <span
                        style={{
                          display: "block",
                          fontFamily: t.sans,
                          fontSize: 13.5,
                          fontWeight: 600,
                          color: on ? t.text : t.dim,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {c.name}
                      </span>
                      <span style={{ fontFamily: t.mono, fontSize: 10.5, color: t.dim }}>
                        {n
                          ? `${fmt(list[0].hp, 0)} HP ${s.lastRunAt} · ${n} ${s.runCount}`
                          : `${fmt(c.cdA, 2)} · %${c.loss} · ${fmt(c.mass, 0)} ${s.kg}`}
                      </span>
                    </span>
                  </button>
                  {on && (
                    <span
                      style={{
                        fontFamily: t.mono,
                        fontSize: 10,
                        letterSpacing: ".08em",
                        color: "#fff",
                        background: t.accent,
                        padding: "3px 6px",
                        borderRadius: t.rBtn,
                      }}
                    >
                      {s.active}
                    </span>
                  )}
                  <button
                    onClick={() => openEditCar(c)}
                    aria-label={s.editCar}
                    style={{
                      width: 34,
                      height: 44,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <Pencil size={15} color={t.dim} strokeWidth={2.2} />
                  </button>
                  <button
                    onClick={() => setDelCar(c)}
                    aria-label={s.delete}
                    style={{
                      width: 34,
                      height: 44,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <Trash2 size={15} color={t.dim} strokeWidth={2.2} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {/* koşu geçmişi */}
      {activeCar && (
        <Card>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <History size={14} color={t.accent} strokeWidth={2.3} />
            <Label>{s.runs}</Label>
            <div style={{ flex: 1 }} />
            <button
              onClick={() => loadCarIntoMeasure(activeCar)}
              style={{
                minHeight: 44,
                padding: "0 10px",
                background: t.btn,
                border: `1px solid ${t.line}`,
                borderRadius: t.rBtn,
                color: t.text,
                fontFamily: t.sans,
                fontSize: 10.5,
                fontWeight: 700,
                letterSpacing: ".08em",
                cursor: "pointer",
              }}
            >
              {s.useInMeasure}
            </button>
          </div>

          {activeRuns.length === 0 ? (
            <p style={{ fontFamily: t.sans, fontSize: 13, color: t.dim, margin: "6px 0 0" }}>
              {s.noRuns}
            </p>
          ) : (
            <>
              <RunChart runs={activeRuns} />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: t.gap,
                  margin: `${t.gapLg}px 0 0`,
                }}
              >
                <Readout
                  label={s.last}
                  value={fmt(activeRuns[0].hp, 0)}
                  unit="HP"
                  color={t.accent}
                />
                <Readout
                  label={s.best}
                  value={fmt(Math.max(...activeRuns.map((x) => x.hp)), 0)}
                  unit="HP"
                />
                <Readout
                  label={s.delta}
                  value={
                    activeRuns.length > 1
                      ? (activeRuns[0].hp - activeRuns[activeRuns.length - 1].hp >= 0 ? "+" : "") +
                        fmt(activeRuns[0].hp - activeRuns[activeRuns.length - 1].hp, 0)
                      : "—"
                  }
                  unit={activeRuns.length > 1 ? "HP" : ""}
                />
              </div>

              <div style={{ marginTop: t.gapLg }}>
                {activeRuns.map((run, i) => {
                  const prev = activeRuns[i + 1];
                  const d = prev ? run.hp - prev.hp : null;
                  const isBest = run.hp === Math.max(...activeRuns.map((x) => x.hp));
                  return (
                    <div
                      key={run.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        minHeight: t.rowH,
                        padding: "6px 0",
                        borderTop: `1px solid ${t.line}`,
                      }}
                    >
                      <span style={{ minWidth: 0, flex: 1 }}>
                        <span
                          style={{
                            display: "block",
                            fontFamily: t.mono,
                            fontSize: 15,
                            fontWeight: 700,
                            letterSpacing: "-.02em",
                          }}
                        >
                          {fmt(run.hp, 0)}
                          <span style={{ fontSize: 10, color: t.dim, marginLeft: 3 }}>HP</span>
                          {isBest && activeRuns.length > 1 && (
                            <span
                              style={{
                                fontSize: 9.5,
                                letterSpacing: ".08em",
                                color: "#fff",
                                background: t.accent,
                                padding: "2px 5px",
                                borderRadius: t.rBtn,
                                marginLeft: 7,
                                verticalAlign: "middle",
                              }}
                            >
                              {s.bestTag}
                            </span>
                          )}
                          {d !== null && (
                            <span
                              style={{
                                fontSize: 11,
                                marginLeft: 7,
                                color: d >= 0 ? t.accent : t.dim,
                              }}
                            >
                              {d >= 0 ? "+" : ""}
                              {fmt(d, 0)}
                            </span>
                          )}
                        </span>
                        <span style={{ fontFamily: t.mono, fontSize: 10, color: t.dim }}>
                          {fx.date(run.ts)} · {fmt(run.sec, 2)} {s.sec} · {run.v1}-{run.v2}
                        </span>
                        {run.note ? (
                          <span
                            style={{
                              display: "block",
                              fontFamily: t.sans,
                              fontSize: 11.5,
                              color: t.dim,
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {run.note}
                          </span>
                        ) : null}
                      </span>
                      <button
                        onClick={() => setDelRun(run)}
                        aria-label={s.delete}
                        style={{
                          width: 34,
                          height: 44,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        <X size={14} color={t.dim} strokeWidth={2.2} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </Card>
      )}
    </div>
  );

  const simScreen = (
    <div style={{ display: "flex", flexDirection: "column", gap: t.gap }}>
      {!simBase ? (
        <Card>
          <p style={{ fontFamily: t.sans, fontSize: 13, color: t.dim, margin: 0, lineHeight: 1.5 }}>
            {s.simNeed}
          </p>
        </Card>
      ) : (
        <>
          {/* ne olurdu */}
          <Card style={{ paddingBottom: 4 }}>
            <p
              style={{
                fontFamily: t.sans,
                fontSize: 12.5,
                color: t.dim,
                margin: `0 0 ${t.gapLg}px`,
                lineHeight: 1.45,
              }}
            >
              {s.simDesc}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                background: t.btn,
                border: `1px solid ${t.line}`,
                borderRadius: t.rBtn,
                padding: "9px 10px",
                marginBottom: t.gap,
              }}
            >
              <Label style={{ fontSize: 10.5 }}>{s.base}</Label>
              {simCar && (
                <span
                  style={{
                    fontFamily: t.sans,
                    fontSize: 11.5,
                    color: t.text,
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    minWidth: 0,
                  }}
                >
                  {simCar.name}
                </span>
              )}
              <div style={{ flex: 1 }} />
              <span style={{ fontFamily: t.mono, fontSize: 11.5, color: t.text }}>
                {fmt(simBase.hp, 0)} HP · {fmt(simBase.sec, 2)} {s.sec} · {fmt(simBase.mass, 0)}{" "}
                {s.kg}
              </span>
            </div>
            {runs.length > 1 && (
              <button
                onClick={() => setRunPickOpen(true)}
                style={{
                  width: "100%",
                  minHeight: t.rowSm,
                  marginBottom: t.gap,
                  background: t.btn,
                  border: `1px solid ${t.line}`,
                  borderRadius: t.rBtn,
                  color: t.text,
                  fontFamily: t.sans,
                  fontSize: 11.5,
                  fontWeight: 700,
                  letterSpacing: ".08em",
                  cursor: "pointer",
                }}
              >
                {s.changeRun}
              </button>
            )}

            <CompactRow
              first
              icon={Scale}
              label={s.dMass}
              value={dMass}
              unit={s.kg}
              min={-300}
              max={300}
              step={5}
              decimals={0}
              onChange={setDMass}
            />
            <CompactRow
              icon={Gauge}
              label={s.dPower}
              value={dPower}
              unit="HP"
              min={-150}
              max={250}
              step={5}
              decimals={0}
              onChange={setDPower}
            />
          </Card>

          <Card accent>
            {sim && sim.newSec ? (
              <>
                <div style={{ display: "flex", alignItems: "flex-end" }}>
                  <Readout
                    label={s.newTime}
                    value={fmt(sim.newSec, 2)}
                    unit={s.sec}
                    big
                    color={t.accent}
                  />
                  <div style={{ flex: 1 }} />
                  <div style={{ textAlign: "right" }}>
                    <Label style={{ fontSize: 10 }}>{s.newHP}</Label>
                    <div
                      style={{
                        fontFamily: t.mono,
                        fontSize: 18,
                        fontWeight: 800,
                        letterSpacing: "-.03em",
                      }}
                    >
                      {fmt(sim.newHP, 0)}
                      <span style={{ fontSize: 11, color: t.dim, marginLeft: 3 }}>HP</span>
                    </div>
                  </div>
                </div>
                <p
                  style={{
                    fontFamily: t.mono,
                    fontSize: 11.5,
                    color: t.dim,
                    margin: "10px 0 0",
                    letterSpacing: ".02em",
                  }}
                >
                  {s.diff}:{" "}
                  <span style={{ color: t.text }}>
                    {fmt(Math.abs(simBase.sec - sim.newSec), 2)} {s.sec}{" "}
                    {sim.newSec < simBase.sec ? s.faster : s.slower}
                  </span>
                </p>
                <Button
                  onClick={() => {
                    setDMass(0);
                    setDPower(0);
                  }}
                  style={{ width: "100%", marginTop: 10 }}
                >
                  {s.reset}
                </Button>
              </>
            ) : (
              <p style={{ fontFamily: t.sans, fontSize: 12.5, color: t.warn, margin: 0 }}>
                {s.impossible}
              </p>
            )}
          </Card>

          {/* hedef hesabı */}
          <Card style={{ paddingBottom: 4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <Target size={14} color={t.accent} strokeWidth={2.3} />
              <Label>{s.target}</Label>
            </div>
            <p
              style={{
                fontFamily: t.sans,
                fontSize: 12.5,
                color: t.dim,
                margin: `0 0 ${t.gap}px`,
                lineHeight: 1.45,
              }}
            >
              {s.targetDesc}
            </p>
            <CompactRow
              first
              icon={Gauge}
              label={s.targetHP}
              value={target}
              unit="HP"
              min={40}
              max={900}
              step={5}
              decimals={0}
              onChange={setTargetHP}
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: t.gap,
                padding: `${t.gapLg}px 0`,
                borderTop: `1px solid ${t.line}`,
              }}
            >
              <Readout
                label={s.needTime}
                value={sim && sim.tgtSec ? fmt(sim.tgtSec, 2) : "—"}
                unit={sim && sim.tgtSec ? s.sec : ""}
                color={t.accent}
              />
              <Readout
                label={s.gain}
                value={(target - simBase.hp >= 0 ? "+" : "") + fmt(target - simBase.hp, 0)}
                unit="HP"
              />
            </div>
            {sim && !sim.tgtSec && (
              <p
                style={{
                  fontFamily: t.sans,
                  fontSize: 12,
                  color: t.warn,
                  margin: "0 0 10px",
                }}
              >
                {s.impossible}
              </p>
            )}
          </Card>
        </>
      )}
    </div>
  );

  /* ============================================================
     YERLEŞİM
     ============================================================ */

  const TABS = [
    { id: "measure", label: s.tabMeasure, icon: Gauge },
    { id: "garage", label: s.tabGarage, icon: Car },
    { id: "sim", label: s.tabSim, icon: SlidersHorizontal },
  ];

  return (
    <T.Provider value={t}>
      <F.Provider value={fx}>
        <style>{`
          .mp-range::-webkit-slider-runnable-track{
            height:3px;border-radius:0;
            background:linear-gradient(to right,#d0202c var(--pct),#272f38 var(--pct));
          }
          .mp-range::-webkit-slider-thumb{
            -webkit-appearance:none;width:20px;height:20px;border-radius:3px;
            background:#f2f4f6;border:1px solid #0b0e11;margin-top:-8.5px;
          }
          .mp-range::-moz-range-track{height:3px;background:#272f38;}
          .mp-range::-moz-range-progress{height:3px;background:#d0202c;}
          .mp-range::-moz-range-thumb{
            width:20px;height:20px;border-radius:3px;background:#f2f4f6;border:1px solid #0b0e11;
          }
          input::placeholder,textarea::placeholder{color:#7b8794;}

          .gh-splash{
            position:fixed;inset:0;z-index:100;
            background:#0b0e11;
            display:flex;align-items:center;justify-content:center;
            padding:env(safe-area-inset-top) 16px env(safe-area-inset-bottom);
            animation:gh-out .3s ease-in 1.7s forwards;
          }
          .gh-needle{
            transform:rotate(150deg);
            animation:gh-sweep 1.15s cubic-bezier(.16,.9,.3,1) .12s forwards;
          }
          .gh-splash-title{
            margin-top:18px;
            font-family:ui-monospace,SFMono-Regular,'SF Mono',Menlo,monospace;
            font-size:15px;font-weight:700;letter-spacing:.22em;
            text-transform:uppercase;color:#f2f4f6;
            opacity:0;animation:gh-in .5s ease-out .75s forwards;
          }
          .gh-splash-bar{
            width:0;height:2px;margin:14px auto 0;background:#d0202c;
            animation:gh-bar .6s ease-out .95s forwards;
          }
          @keyframes gh-sweep{to{transform:rotate(332deg)}}
          @keyframes gh-in{to{opacity:1}}
          @keyframes gh-bar{to{width:56px}}
          @keyframes gh-out{to{opacity:0;visibility:hidden}}

          @media (prefers-reduced-motion:reduce){
            .gh-needle{animation:none;transform:rotate(332deg)}
            .gh-splash-title{animation:none;opacity:1}
            .gh-splash-bar{animation:none;width:56px}
          }
        `}</style>

        {booting && <Splash title={s.title} />}

        {!booting && tourOpen && (
          <Tour
            s={s}
            step={tourStep}
            setStep={setTourStep}
            remember={tourRemember}
            setRemember={setTourRemember}
            lang={lang}
            setLang={setLang}
            onClose={closeTour}
          />
        )}

        <div
          style={{
            minHeight: "100vh",
            background: t.bg,
            /* yan boşluklar da zemin rengiyle aynı kalsın */
            boxShadow: `0 0 0 100vmax ${t.bg}`,
            clipPath: "inset(0)",
            color: t.text,
            fontFamily: t.sans,
            padding: `calc(env(safe-area-inset-top) + 12px) calc(env(safe-area-inset-right) + 12px) calc(env(safe-area-inset-bottom) + 84px) calc(env(safe-area-inset-left) + 12px)`,
            maxWidth: 480,
            margin: "0 auto",
          }}
        >
          {/* banner */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 6 }}>
            {BANNER_SRC ? (
              <img
                src={BANNER_SRC}
                alt=""
                width={320}
                height={50}
                style={{
                  width: 320,
                  height: 50,
                  maxWidth: "100%",
                  objectFit: "cover",
                  display: "block",
                  borderRadius: t.rCard,
                }}
              />
            ) : (
              <div
                style={{
                  width: 320,
                  height: 50,
                  maxWidth: "100%",
                  border: `1px dashed ${t.line}`,
                  borderRadius: t.rCard,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: t.mono,
                  fontSize: 10,
                  letterSpacing: ".1em",
                  color: t.dim,
                }}
              >
                320 × 50
              </div>
            )}
          </div>

          {/* başlık */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <Gauge size={18} color={t.accent} strokeWidth={2.4} />
            <span
              style={{
                fontFamily: t.mono,
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: ".1em",
                textTransform: "uppercase",
              }}
            >
              {s.title}
            </span>
            <div style={{ flex: 1 }} />
            <button
              onClick={() => setLangOpen(true)}
              aria-label={s.lang}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 5,
                minHeight: 44,
                minWidth: 52,
                background: t.btn,
                border: `1px solid ${t.line}`,
                borderRadius: t.rBtn,
                padding: "0 9px",
                cursor: "pointer",
              }}
            >
              <Languages size={12} color={t.dim} strokeWidth={2.2} />
              <span
                style={{ fontFamily: t.mono, fontSize: 10, color: t.text, letterSpacing: ".1em" }}
              >
                {lang.toUpperCase()}
              </span>
            </button>
          </div>

          {tab === "measure" && measureScreen}
          {tab === "garage" && garageScreen}
          {tab === "sim" && simScreen}

          {/* künye — her ekranın altında */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 6,
              padding: "14px 0 2px",
              fontFamily: t.mono,
              fontSize: 10.5,
              letterSpacing: ".06em",
              color: t.dim,
            }}
          >
            <span>{APP.dev}</span>
            <span>·</span>
            <span>v{APP.version}</span>
            <span>·</span>
            <a
              href={APP.privacyUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: t.dim }}
            >
              {s.privacy}
            </a>
            <span>·</span>
            <a
              href={APP.supportUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: t.dim }}
            >
              {s.support}
            </a>
            <span>·</span>
            <button
              onClick={() => {
                setTourStep(0);
                setTourRemember(true);
                setTourOpen(true);
              }}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                color: t.dim,
                fontFamily: t.mono,
                fontSize: 10.5,
                letterSpacing: ".06em",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              {s.howTo}
            </button>
          </div>
        </div>

        {/* alt sekme çubuğu */}
        <nav
          style={{
            position: "fixed",
            left: 0,
            right: 0,
            bottom: 0,
            background: t.card,
            borderTop: `1px solid ${t.line}`,
            padding: `4px 0 calc(env(safe-area-inset-bottom) + 4px)`,
            zIndex: 30,
          }}
        >
          {/* düğmeler içerikle aynı genişlikte kalır, geniş ekranda dağılmaz */}
          <div style={{ display: "flex", maxWidth: 480, margin: "0 auto" }}>
          {TABS.map((x) => {
            const on = tab === x.id;
            const Icon = x.icon;
            return (
              <button
                key={x.id}
                onClick={() => setTab(x.id)}
                aria-current={on ? "page" : undefined}
                style={{
                  flex: 1,
                  minHeight: 48,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 3,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: on ? t.accent : t.dim,
                }}
              >
                <Icon size={18} strokeWidth={2.3} />
                <span
                  style={{
                    fontFamily: t.sans,
                    fontSize: 10.5,
                    fontWeight: 700,
                    letterSpacing: ".09em",
                  }}
                >
                  {x.label}
                </span>
              </button>
            );
          })}
          </div>
        </nav>

        {/* kütüphaneden garaja ekle */}
        <Modal
          open={pickOpen}
          title={s.pick}
          desc={s.pickDesc}
          onClose={() => setPickOpen(false)}
          closeLabel={s.close}
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={s.search}
            style={{
              width: "100%",
              minHeight: 44,
              marginBottom: 8,
              background: t.btn,
              border: `1px solid ${t.line}`,
              borderRadius: t.rBtn,
              color: t.text,
              fontFamily: t.sans,
              fontSize: 13,
              padding: "0 10px",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          {(() => {
            const q = query.trim().toLocaleLowerCase(s.locale);
            const hits = CARS.map((c, i) => ({ c, i })).filter(
              ({ c }) => !q || c.n.toLocaleLowerCase(s.locale).includes(q)
            );
            if (!hits.length)
              return (
                <p style={{ fontFamily: t.sans, fontSize: 12, color: t.dim, margin: "6px 0" }}>
                  {s.empty}
                </p>
              );
            return GROUPS.map((g) => {
              const inGroup = hits.filter(({ c }) => c.g === g);
              if (!inGroup.length) return null;
              return (
                <div key={g}>
                  <Label
                    style={{ display: "block", fontSize: 10.5, margin: "9px 0 4px", color: t.accent }}
                  >
                    {s.grp[g]}
                  </Label>
                  {inGroup.map(({ c }) => (
                    <PickRow
                      key={c.n}
                      label={carName(c)}
                      meta={`${fmt(c.cdA, 2)} · %${c.loss} · ${c.m}`}
                      on={false}
                      onClick={() => addFromLibrary(c)}
                    />
                  ))}
                </div>
              );
            });
          })()}
        </Modal>

        {/* ölçüm için garajdan araç seç */}
        <Modal
          open={selectOpen}
          title={s.selectCar}
          desc={s.selectCarDesc}
          onClose={() => setSelectOpen(false)}
          closeLabel={s.close}
        >
          {cars.map((c) => (
            <PickRow
              key={c.id}
              label={c.name}
              meta={`${fmt(c.cdA, 2)} · %${c.loss} · ${c.mass}`}
              on={car && c.id === car.id}
              onClick={() => {
                setCarId(c.id);
                setSelCar(c.id);
                setMassKg(c.mass);
                setSelectOpen(false);
              }}
            />
          ))}
          <Button
            icon={Car}
            onClick={() => {
              setSelectOpen(false);
              setTab("garage");
            }}
            style={{ width: "100%", marginTop: 6 }}
          >
            {s.manageCars}
          </Button>
        </Modal>

        {/* dil */}
        <Modal open={langOpen} title={s.lang} onClose={() => setLangOpen(false)} closeLabel={s.close}>
          {LANGS.map((l) => (
            <PickRow
              key={l}
              label={STR[l].langName}
              meta={l.toUpperCase()}
              on={l === lang}
              onClick={() => {
                setLang(l);
                setLangOpen(false);
              }}
            />
          ))}
        </Modal>

        {/* koşu kaydet */}
        <Modal
          open={saveOpen}
          title={s.saveTitle}
          desc={s.saveDesc}
          onClose={() => setSaveOpen(false)}
          closeLabel={s.cancel}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: t.btn,
              border: `1px solid ${t.line}`,
              borderRadius: t.rBtn,
              padding: "10px",
            }}
          >
            <Car size={15} color={t.accent} strokeWidth={2.2} />
            <span style={{ fontFamily: t.sans, fontSize: 13.5, fontWeight: 600 }}>
              {car ? car.name : ""}
            </span>
          </div>

          <Label style={{ display: "block", margin: "12px 0 6px" }}>{s.note}</Label>
          <textarea
            value={runNote}
            onChange={(e) => setRunNote(e.target.value)}
            placeholder={s.noteHint}
            rows={2}
            maxLength={140}
            style={{
              width: "100%",
              background: t.btn,
              border: `1px solid ${t.line}`,
              borderRadius: t.rBtn,
              color: t.text,
              fontFamily: t.sans,
              fontSize: 14,
              lineHeight: 1.45,
              padding: "10px",
              outline: "none",
              boxSizing: "border-box",
              resize: "none",
              WebkitTextFillColor: t.text,
            }}
          />

          <div
            style={{
              display: "flex",
              gap: 10,
              margin: "12px 0 4px",
              fontFamily: t.mono,
              fontSize: 11.5,
              color: t.dim,
            }}
          >
            <span style={{ color: t.accent }}>{fmt(r.crankHP, 0)} HP</span>
            <span>
              {fmt(seconds, 2)} {s.sec}
            </span>
            <span>
              {v1kmh}-{v2kmh}
            </span>
          </div>
          <Button kind="solid" icon={Save} onClick={commitSave} style={{ width: "100%" }}>
            {s.save}
          </Button>
        </Modal>

        {/* kendi aracını ekle / düzenle */}
        <Modal
          open={formOpen}
          title={formId ? s.editCar : s.newCar}
          desc={s.newCarDesc}
          onClose={() => setFormOpen(false)}
          closeLabel={s.cancel}
        >
          <Label style={{ display: "block", marginBottom: 6 }}>{s.carName}</Label>
          <TextField
            value={fName}
            onChange={(v) => {
              setFName(v);
              if (v.trim()) setFErr(false);
            }}
            placeholder={s.nameHint}
          />
          {fErr && (
            <p style={{ fontFamily: t.sans, fontSize: 12, color: t.warn, margin: "6px 0 0" }}>
              {s.nameNeeded}
            </p>
          )}

          <div style={{ marginTop: 6 }}>
            <CompactRow
              first
              icon={Wind}
              label={s.cda}
              value={fCdA}
              unit="m²"
              min={0.4}
              max={1.4}
              step={0.01}
              decimals={2}
              onChange={setFCdA}
            />
            <CompactRow
              icon={Gauge}
              label={s.loss}
              value={fLoss}
              unit="%"
              min={5}
              max={30}
              step={0.5}
              decimals={1}
              onChange={setFLoss}
            />
            <CompactRow
              icon={Scale}
              label={s.mass}
              value={fMass}
              unit={s.kg}
              min={700}
              max={3000}
              step={5}
              decimals={0}
              onChange={setFMass}
            />
          </div>

          <Button
            kind="solid"
            icon={Check}
            onClick={commitCustom}
            style={{ width: "100%", marginTop: 10 }}
          >
            {formId ? s.update : s.create}
          </Button>
        </Modal>

        {/* simülasyon için koşu seç */}
        <Modal
          open={runPickOpen}
          title={s.pickRun}
          desc={s.pickRunDesc}
          onClose={() => setRunPickOpen(false)}
          closeLabel={s.close}
        >
          {cars.map((c) => {
            const list = runsOf(c.id);
            if (!list.length) return null;
            return (
              <div key={c.id}>
                <Label
                  style={{ display: "block", fontSize: 10.5, margin: "9px 0 4px", color: t.accent }}
                >
                  {c.name}
                </Label>
                {list.map((run) => (
                  <PickRow
                    key={run.id}
                    label={`${fmt(run.hp, 0)} HP · ${fmt(run.sec, 2)} ${s.sec}`}
                    meta={fx.date(run.ts)}
                    on={simBase && run.id === simBase.id}
                    onClick={() => {
                      setSimRunId(run.id);
                      setRunPickOpen(false);
                    }}
                  />
                ))}
              </div>
            );
          })}
        </Modal>

        {/* koşu sil */}
        <Modal
          open={!!delRun}
          title={s.deleteRun}
          desc={s.deleteRunDesc}
          onClose={() => setDelRun(null)}
          closeLabel={s.cancel}
        >
          {delRun && (
            <p style={{ fontFamily: t.mono, fontSize: 13.5, margin: "0 0 12px", color: t.text }}>
              {fmt(delRun.hp, 0)} HP · {fmt(delRun.sec, 2)} {s.sec} · {fx.date(delRun.ts)}
            </p>
          )}
          <Button
            kind="danger"
            icon={Trash2}
            onClick={() => delRun && removeRun(delRun.id)}
            style={{ width: "100%" }}
          >
            {s.confirm}
          </Button>
        </Modal>

        {/* araç sil */}
        <Modal
          open={!!delCar}
          title={s.deleteCar}
          desc={s.deleteCarDesc}
          onClose={() => setDelCar(null)}
          closeLabel={s.cancel}
        >
          <p style={{ fontFamily: t.sans, fontSize: 13.5, fontWeight: 600, margin: "0 0 12px" }}>
            {delCar ? delCar.name : ""}
          </p>
          <Button
            kind="danger"
            icon={Trash2}
            onClick={() => delCar && removeCar(delCar.id)}
            style={{ width: "100%" }}
          >
            {s.confirm}
          </Button>
        </Modal>
      </F.Provider>
    </T.Provider>
  );
}
