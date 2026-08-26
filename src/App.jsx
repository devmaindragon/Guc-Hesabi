import React, { createContext, useContext, useMemo, useState } from "react";
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
  pad: 11,
  gap: 6,
};

/* Banner görselini buraya koy: import edilen dosya, public yolu ya da data-URI.
   Boş bırakılırsa 320x50 yer tutucu görünür. */
const BANNER_SRC = "./banner.png";

/* Künye — sürüm ve bağlantılar buradan yönetilir */
const APP = {
  dev: "dev.main.dragon",
  version: "1.0.0",
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
    measure: "ÖLÇÜM",
    measureTag: "dbn verisi",
    time: "SÜRE",
    grade: "EĞİM",
    mass: "AĞIRLIK",
    source: "ARAÇ VERİSİ",
    lib: "ARAÇ SEÇ",
    manual: "MANUEL GİRİŞ",
    pick: "ARAÇ SEÇ",
    pickDesc: "CdA ve aktarma kaybı seçilen araçtan gelir, ağırlık da dolar.",
    cda: "CdA",
    loss: "KAYIP",
    air: "HAVA KOŞULLARI",
    temp: "SICAKLIK",
    alt: "RAKIM",
    hum: "NEM",
    result: "SONUÇ",
    crank: "MOTOR GÜCÜ",
    wheel: "TEKER GÜCÜ",
    ratio: "GÜÇ / AĞIRLIK",
    density: "HAVA YOĞUNLUĞU",
    split: "GÜCÜN HARCANDIĞI YER",
    sAcc: "İVME",
    sAero: "HAVA",
    sRoll: "YUVARLANMA",
    sGrade: "EĞİM",
    note: "Crr 0,012 · dönen kütle katsayısı 1,04 · rüzgârsız kabul edilir",
    note2: "En doğru tahmin için tüm değerler doğru girilmelidir.",
    kmh: "km/s",
    warn: "Ölçümü kapalı piste veya trafiğe kapalı yola bırakın.",
    close: "KAPAT",
    invalid: "Süre 2–30 sn arasında olmalı.",
    lang: "DİL",
    privacy: "Gizlilik",
    support: "Destek",
    kg: "kg",
    sec: "sn",
    m: "m",
    search: "Marka veya model ara",
    empty: "Eşleşen araç yok.",
    grp: {
      polo: "VW POLO",
      golf: "VW GOLF",
      leon: "SEAT LEON",
      ibiza: "SEAT IBIZA",
      audi: "AUDI A3",
      skoda: "ŠKODA",
      bmw: "BMW",
      honda: "HONDA",
      hyundai: "HYUNDAI",
      other: "DİĞER",
    },
  },
  en: {
    locale: "en-US",
    langName: "English",
    title: "POWER CALC",
    measure: "MEASUREMENT",
    measureTag: "dbn data",
    time: "TIME",
    grade: "GRADE",
    mass: "WEIGHT",
    source: "VEHICLE DATA",
    lib: "PICK A CAR",
    manual: "MANUAL ENTRY",
    pick: "PICK A CAR",
    pickDesc: "CdA and drivetrain loss come from the car you pick. Weight fills in too.",
    cda: "CdA",
    loss: "LOSS",
    air: "AIR CONDITIONS",
    temp: "TEMP",
    alt: "ALTITUDE",
    hum: "HUMIDITY",
    result: "RESULT",
    crank: "CRANK POWER",
    wheel: "WHEEL POWER",
    ratio: "POWER / WEIGHT",
    density: "AIR DENSITY",
    split: "WHERE THE POWER GOES",
    sAcc: "ACCEL",
    sAero: "DRAG",
    sRoll: "ROLLING",
    sGrade: "GRADE",
    note: "Crr 0.012 · rotating mass factor 1.04 · assumes no wind",
    note2: "For the most accurate estimate, every value must be entered correctly.",
    kmh: "km/h",
    warn: "Run this on a closed track or a road closed to traffic.",
    close: "CLOSE",
    invalid: "Time must be between 2 and 30 s.",
    lang: "LANGUAGE",
    privacy: "Privacy",
    support: "Support",
    kg: "kg",
    sec: "s",
    m: "m",
    search: "Search make or model",
    empty: "No car matches that.",
    grp: {
      polo: "VW POLO",
      golf: "VW GOLF",
      leon: "SEAT LEON",
      ibiza: "SEAT IBIZA",
      audi: "AUDI A3",
      skoda: "ŠKODA",
      bmw: "BMW",
      honda: "HONDA",
      hyundai: "HYUNDAI",
      other: "OTHER",
    },
  },
  es: {
    locale: "es-ES",
    langName: "Español",
    title: "CÁLCULO DE POTENCIA",
    measure: "MEDICIÓN",
    measureTag: "datos dbn",
    time: "TIEMPO",
    grade: "PENDIENTE",
    mass: "PESO",
    source: "DATOS DEL COCHE",
    lib: "ELIGE COCHE",
    manual: "ENTRADA MANUAL",
    pick: "ELIGE UN COCHE",
    pickDesc: "El CdA y la pérdida de transmisión vienen del coche elegido. El peso también.",
    cda: "CdA",
    loss: "PÉRDIDA",
    air: "CONDICIONES DEL AIRE",
    temp: "TEMP",
    alt: "ALTITUD",
    hum: "HUMEDAD",
    result: "RESULTADO",
    crank: "POTENCIA AL CIGÜEÑAL",
    wheel: "POTENCIA A LA RUEDA",
    ratio: "POTENCIA / PESO",
    density: "DENSIDAD DEL AIRE",
    split: "DÓNDE SE VA LA POTENCIA",
    sAcc: "ACEL.",
    sAero: "AIRE",
    sRoll: "RODADURA",
    sGrade: "PEND.",
    note: "Crr 0,012 · factor de masa rotativa 1,04 · se asume sin viento",
    note2: "Para la estimación más exacta, todos los valores deben introducirse bien.",
    kmh: "km/h",
    warn: "Haz la medición en circuito cerrado o vía sin tráfico.",
    close: "CERRAR",
    invalid: "El tiempo debe estar entre 2 y 30 s.",
    lang: "IDIOMA",
    privacy: "Privacidad",
    support: "Soporte",
    kg: "kg",
    sec: "s",
    m: "m",
    search: "Busca marca o modelo",
    empty: "Ningún coche coincide.",
    grp: {
      polo: "VW POLO",
      golf: "VW GOLF",
      leon: "SEAT LEON",
      ibiza: "SEAT IBIZA",
      audi: "AUDI A3",
      skoda: "ŠKODA",
      bmw: "BMW",
      honda: "HONDA",
      hyundai: "HYUNDAI",
      other: "OTROS",
    },
  },
};

const LANGS = ["tr", "en", "es"];

/* Cihaz dili; daha önce seçim yapıldıysa o kazanır */
function detectLang() {
  try {
    const saved = window.localStorage.getItem("gh.lang");
    if (saved && STR[saved]) return saved;
  } catch (e) {
    /* depolama kapalı olabilir */
  }
  try {
    const nav = (navigator.languages && navigator.languages[0]) || navigator.language || "en";
    const code = nav.toLowerCase().slice(0, 2);
    if (STR[code]) return code;
  } catch (e) {
    /* yoksay */
  }
  return "en";
}

function rememberLang(code) {
  try {
    window.localStorage.setItem("gh.lang", code);
  } catch (e) {
    /* yoksay */
  }
}

/* ============================================================
   HESAP (saf fonksiyonlar)
   ============================================================ */

const G = 9.80665;
const CRR = 0.012;
const ROT = 1.04;
const W_TO_HP = 1 / 735.49875; // metrik beygir (PS = HP)

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

function computePower({
  v1kmh,
  v2kmh,
  seconds,
  gradePct,
  massKg,
  cdA,
  lossPct,
  tempC,
  altM,
  rhPct,
}) {
  const v1 = v1kmh / 3.6;
  const v2 = v2kmh / 3.6;
  const rho = airDensity(tempC, altM, rhPct);
  const theta = Math.atan(gradePct / 100);
  const vAvg = (v1 + v2) / 2;

  const acc = (ROT * massKg * (v2 * v2 - v1 * v1)) / (2 * seconds);
  const aero = 0.5 * rho * cdA * meanCube(v1, v2);
  const roll = massKg * G * CRR * Math.cos(theta) * vAvg;
  const grade = massKg * G * Math.sin(theta) * vAvg;

  const wheelW = acc + aero + roll + grade;
  const crankW = wheelW / (1 - Math.min(Math.max(lossPct, 0), 45) / 100);

  return {
    rho,
    wheelHP: wheelW * W_TO_HP,
    crankHP: crankW * W_TO_HP,
    crankKW: crankW / 1000,
    parts: { acc, aero, roll, grade },
    total: wheelW,
  };
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
  "polo", "golf", "leon", "ibiza", "audi", "skoda", "bmw", "honda", "hyundai", "other",
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
    fmt: (v, d = 0) =>
      v.toLocaleString(locale, { minimumFractionDigits: d, maximumFractionDigits: d }),
    parse: (str) => {
      let x = String(str).replace(/[^\d.,-]/g, "");
      x = decimalComma ? x.replace(/\./g, "").replace(",", ".") : x.replace(/,/g, "");
      const n = parseFloat(x);
      return isNaN(n) ? null : n;
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
            onClick={() => (o.v === value ? onReselect && onReselect(o.v) : onChange(o.v))}
            style={{
              flex: 1,
              minHeight: 40,
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

function NumberField({ value, onChange, decimals = 0, width = 58 }) {
  const t = useT();
  const { fmt, parse } = useF();
  const [draft, setDraft] = useState(null);

  const commit = () => {
    if (draft !== null) {
      const n = parse(draft);
      if (n !== null) onChange(n);
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
      <NumberField value={value} onChange={onChange} decimals={decimals} />
      <span
        style={{
          fontFamily: t.mono,
          fontSize: 11,
          color: t.dim,
          width: 22,
          flexShrink: 0,
        }}
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
          <X size={16} color={t.dim} onClick={onClose} style={{ cursor: "pointer" }} />
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
        <span style={{ fontFamily: t.mono, fontSize: 11, color: on ? "#fff" : t.dim }}>{meta}</span>
      )}
    </button>
  );
}

/* ============================================================
   UYGULAMA
   ============================================================ */

export default function App() {
  const t = THEME;

  const [lang, setLang] = useState(detectLang);
  const s = STR[lang];
  const fx = useMemo(() => makeFmt(s.locale), [lang]);
  const fmt = fx.fmt;

  const [range, setRange] = useState("100200");
  const [seconds, setSeconds] = useState(12);
  const [gradePct, setGradePct] = useState(-1);
  const [massKg, setMassKg] = useState(1495);

  const [mode, setMode] = useState("lib");
  const [carIdx, setCarIdx] = useState(53);
  const [cdA, setCdA] = useState(0.63);
  const [lossPct, setLossPct] = useState(15);

  const [tempC, setTempC] = useState(20);
  const [altM, setAltM] = useState(100);
  const [rhPct, setRhPct] = useState(50);

  const [pickOpen, setPickOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [airOpen, setAirOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const car = CARS[carIdx];
  const effCdA = mode === "lib" ? car.cdA : cdA;
  const effLoss = mode === "lib" ? car.loss : lossPct;
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

  const r = useMemo(() => computePower(input), [
    v1kmh, v2kmh, seconds, gradePct, massKg, effCdA, effLoss, tempC, altM, rhPct,
  ]);
  const band = useMemo(() => computeBand(input), [
    v1kmh, v2kmh, seconds, gradePct, massKg, effCdA, effLoss, tempC, altM, rhPct,
  ]);

  const valid = seconds >= 2 && seconds <= 30 && r.crankHP > 0;
  const splitColors = { acc: t.accent, aero: "#4a5b6d", roll: "#2f3b47", grade: t.warn };

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
          .mp-range:focus-visible::-webkit-slider-thumb{outline:2px solid #d0202c;outline-offset:2px;}
        `}</style>

        <div
          style={{
            minHeight: "100vh",
            background: t.bg,
            color: t.text,
            fontFamily: t.sans,
            padding: `calc(env(safe-area-inset-top) + 12px) calc(env(safe-area-inset-right) + 12px) calc(env(safe-area-inset-bottom) + 16px) calc(env(safe-area-inset-left) + 12px)`,
            maxWidth: 480,
            margin: "0 auto",
          }}
        >
          {/* Banner 320x50 */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
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

          {/* Başlık */}
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 10 }}>
            <Gauge size={20} color={t.accent} strokeWidth={2.4} />
            <span
              style={{
                fontFamily: t.mono,
                fontSize: 15,
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
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                background: t.btn,
                border: `1px solid ${t.line}`,
                borderRadius: t.rBtn,
                padding: "6px 9px",
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

          <div style={{ display: "flex", flexDirection: "column", gap: t.gap }}>
            {/* ARAÇ VERİSİ — en üstte */}
            <Card style={{ paddingBottom: mode === "lib" ? t.pad : 4 }}>
              <Segmented
                value={mode}
                onChange={(v) => {
                  setMode(v);
                  if (v === "lib") setPickOpen(true);
                }}
                onReselect={(v) => v === "lib" && setPickOpen(true)}
                options={[
                  { v: "lib", l: s.lib },
                  { v: "man", l: s.manual },
                ]}
              />
              {mode === "lib" ? (
                <button
                  onClick={() => setPickOpen(true)}
                  style={{
                    marginTop: t.gap,
                    width: "100%",
                    minHeight: 44,
                    background: t.btn,
                    border: `1px solid ${t.line}`,
                    borderRadius: t.rBtn,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "0 10px",
                    cursor: "pointer",
                  }}
                >
                  <Car size={15} color={t.accent} strokeWidth={2.2} />
                  <span
                    style={{ fontFamily: t.sans, fontSize: 13, fontWeight: 600, color: t.text }}
                  >
                    {carName(car)}
                  </span>
                  <div style={{ flex: 1 }} />
                  <span style={{ fontFamily: t.mono, fontSize: 11, color: t.dim }}>
                    {fmt(car.cdA, 2)} · %{car.loss}
                  </span>
                </button>
              ) : (
                <div style={{ marginTop: 3 }}>
                  <CompactRow
                    first
                    icon={Wind}
                    label={s.cda}
                    value={cdA}
                    unit="m²"
                    min={0.4}
                    max={1.4}
                    step={0.01}
                    decimals={2}
                    onChange={setCdA}
                  />
                  <CompactRow
                    icon={Gauge}
                    label={s.loss}
                    value={lossPct}
                    unit="%"
                    min={5}
                    max={30}
                    step={0.5}
                    decimals={1}
                    onChange={setLossPct}
                  />
                </div>
              )}
            </Card>

            {/* ÖLÇÜM */}
            <Card style={{ paddingBottom: 4 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 7 }}>
                <Label>{s.measure}</Label>
                <span
                  style={{
                    fontFamily: t.mono,
                    fontSize: 10.5,
                    color: t.text,
                    letterSpacing: ".04em",
                  }}
                >
                  ({s.measureTag})
                </span>
              </div>
              <Segmented
                value={range}
                onChange={setRange}
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
              </div>
            </Card>

            {/* HAVA KOŞULLARI — katlanır */}
            <Card style={{ paddingBottom: airOpen ? 4 : t.pad }}>
              <button
                onClick={() => setAirOpen((o) => !o)}
                aria-expanded={airOpen}
                style={{
                  width: "100%",
                  minHeight: 22,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                }}
              >
                <Label>{s.air}</Label>
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
                <div style={{ marginTop: 2 }}>
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
                </div>
              )}
            </Card>

            {/* Sonuç */}
            <Card accent>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 9 }}>
                <Check size={15} color={t.accent} strokeWidth={2.6} />
                <span
                  style={{
                    fontFamily: t.sans,
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: ".09em",
                    textTransform: "uppercase",
                  }}
                >
                  {s.result}
                </span>
              </div>

              {!valid ? (
                <p style={{ fontFamily: t.sans, fontSize: 12, color: t.warn, margin: 0 }}>
                  {s.invalid}
                </p>
              ) : (
                <>
                  <div style={{ display: "flex", alignItems: "flex-end" }}>
                    <Readout
                      label={s.crank}
                      value={fmt(r.crankHP, 0)}
                      unit="HP"
                      big
                      color={t.accent}
                    />
                    <div style={{ flex: 1 }} />
                    <div style={{ fontFamily: t.mono, fontSize: 12, color: t.dim }}>
                      ± {fmt(band, 0)} HP
                    </div>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      gap: t.gap,
                      marginTop: 10,
                    }}
                  >
                    <Readout label={s.wheel} value={fmt(r.wheelHP, 0)} unit="HP" />
                    <Readout
                      label={s.ratio}
                      value={fmt((r.crankHP / massKg) * 1000, 0)}
                      unit="HP/t"
                    />
                    <Readout label={s.crank} value={fmt(r.crankKW, 0)} unit="kW" />
                  </div>

                  <div style={{ marginTop: 10 }}>
                    <Label style={{ display: "block", marginBottom: 5, fontSize: 10 }}>
                      {s.split}
                    </Label>
                    <div style={{ display: "flex", height: 6, gap: 1, overflow: "hidden" }}>
                      {["acc", "aero", "roll", "grade"].map((k) => {
                        const w = Math.max((r.parts[k] / Math.max(r.total, 1)) * 100, 0);
                        return w < 0.4 ? null : (
                          <div key={k} style={{ width: `${w}%`, background: splitColors[k] }} />
                        );
                      })}
                    </div>
                    <div
                      style={{ display: "flex", flexWrap: "wrap", gap: "3px 11px", marginTop: 6 }}
                    >
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
                              fontSize: 10,
                              color: t.dim,
                              letterSpacing: ".03em",
                            }}
                          >
                            {l} %{fmt((v / r.total) * 100, 0)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p
                    style={{
                      fontFamily: t.mono,
                      fontSize: 9.5,
                      color: t.dim,
                      letterSpacing: ".02em",
                      margin: "9px 0 0",
                      lineHeight: 1.5,
                    }}
                  >
                    <strong style={{ fontWeight: 700, color: t.text }}>{s.note2}</strong>
                  </p>
                </>
              )}
            </Card>

            {/* Uyarı */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                border: `1px solid ${t.warn}33`,
                borderRadius: t.rCard,
                padding: "8px 10px",
              }}
            >
              <AlertTriangle size={14} color={t.warn} strokeWidth={2.2} style={{ flexShrink: 0 }} />
              <span style={{ fontFamily: t.sans, fontSize: 11, color: t.warn, lineHeight: 1.4 }}>
                {s.warn}
              </span>
            </div>
          </div>

          {/* Alt bilgi */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "4px 8px",
              margin: "14px 0 4px",
              fontFamily: t.mono,
              fontSize: 10,
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
          </div>

          {/* Araç seçici */}
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
                minHeight: 40,
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
                      style={{
                        display: "block",
                        fontSize: 9.5,
                        margin: "8px 0 4px",
                        color: t.accent,
                      }}
                    >
                      {s.grp[g]}
                    </Label>
                    {inGroup.map(({ c, i }) => (
                      <PickRow
                        key={c.n}
                        label={carName(c)}
                        meta={`${fmt(c.cdA, 2)} · %${c.loss} · ${c.m}`}
                        on={i === carIdx}
                        onClick={() => {
                          setCarIdx(i);
                          setMassKg(c.m);
                          setPickOpen(false);
                          setQuery("");
                        }}
                      />
                    ))}
                  </div>
                );
              });
            })()}
          </Modal>

          {/* Dil seçici */}
          <Modal open={langOpen} title={s.lang} onClose={() => setLangOpen(false)} closeLabel={s.close}>
            {LANGS.map((l) => (
              <PickRow
                key={l}
                label={STR[l].langName}
                meta={l.toUpperCase()}
                on={l === lang}
                onClick={() => {
                  setLang(l);
                  rememberLang(l);
                  setLangOpen(false);
                }}
              />
            ))}
          </Modal>
        </div>
      </F.Provider>
    </T.Provider>
  );
}
