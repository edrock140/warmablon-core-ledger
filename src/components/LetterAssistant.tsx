import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, 
  Globe, 
  ArrowLeft, 
  RotateCcw, 
  Hash, 
  Coins, 
  TrendingUp, 
  Terminal, 
  ArrowRightLeft,
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';
import { TRANSLATIONS, SupportedLanguage } from '../translations';

interface LetterAssistantProps {
  onBack: () => void;
  lang: SupportedLanguage;
}

// Map currencies with initial base rates to 1 USD
interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  category: 'africa' | 'asia' | 'europe' | 'namerica' | 'samerica' | 'oceania' | 'antarctica' | 'crypto';
  rateToUSD: number; // How many Dollars is 1 unit of this currency (e.g., USD = 1.0, BTC = 70000.0, ZMW = 0.038)
}

const CONTINENT_LANGUAGES: Record<string, string[]> = {
  africa: ["Arabic", "Kiswahili", "Amharic", "Yoruba", "Oromo", "Hausa", "Zulu", "French", "English", "Portuguese / IciBemba"],
  asia: ["Mandarin Chinese", "Hindi", "Arabic", "Bengali", "Japanese", "Punjabi", "Javanese", "Telugu", "Vietnamese", "Korean"],
  europe: ["Russian", "German", "French", "English", "Italian", "Spanish", "Polish", "Ukrainian", "Romanian", "Dutch"],
  namerica: ["English", "Spanish", "French", "Nahuatl", "Maya", "K'iche'", "Inuktitut", "Tagalog", "Chinese", "Vietnamese"],
  samerica: ["Spanish", "Portuguese", "Quechua", "Guaraní", "Aymara", "English", "German", "Italian", "French", "Wayuu"],
  oceania: ["English", "Tok Pisin", "Fijian", "Samoan", "Māori", "Tongan", "French", "Hindi", "Tahitian", "Solomon Islands Pijin"],
  antarctica: ["English", "Spanish", "Russian", "French", "Chinese", "Japanese", "Norwegian", "German", "Polish", "Italian"],
  crypto: ["Solidity", "Rust", "C++", "Go", "Haskell", "Python", "JavaScript", "TypeScript", "Vyper", "Cairo"]
};

const getLanguagesLabel = (lang: SupportedLanguage): string => {
  const map: Record<SupportedLanguage, string> = {
    en: 'TOP 10 SPOKEN / CONSENSUS LANGUAGES',
    fr: 'TOP 10 LANGUES PARLÉES / DE CONSENSUS',
    es: 'MÁS DE 10 IDIOMAS HABLADOS / CONSENSO',
    sw: 'LUGHA 10 ZINAZOZUNGUMZWA / KUBALIKA ZAIDI',
    bm: 'NDIMI 10 ISHILANDWA / ISHIBIKWA SANA',
    ru: 'ТОП-10 РАЗГОВОРНЫХ ЯЗЫКОВ / ЯЗЫКОВ КОНСЕНСУСА',
    zh: '使用人数最多及共识最高的前10大语言',
    ar: 'أكثر 10 لغات تحدثاً واستخداماً بالتوافق',
    pt: 'TOP 10 IDIOMAS MAIS FALADOS / CONSENSO',
    hi: 'शीर्ष 10 बोली जाने वाली और सर्वсम्मत भाषाएँ'
  };
  return map[lang] || map.en;
};

const getContinentName = (id: string, lang: SupportedLanguage): string => {
  const translations: Record<string, Record<SupportedLanguage, string>> = {
    africa: {
      en: "Africa (Heart of Origin)",
      fr: "Afrique (Cœur de l'Origine)",
      es: "África (Corazón del Origen)",
      sw: "Afrika (Kitovu cha Asili)",
      bm: "Africa (Uko Nafyelewa)",
      ru: "Африка (Сердце происхождения)",
      zh: "非洲（生命与起源之源）",
      ar: "أفريقيا (قلب المنشأ)",
      pt: "África (Coração de Origem)",
      hi: "अफ्रीका (मूल का हृदय)"
    },
    asia: {
      en: "Asia (Sovereign Engine)",
      fr: "Asie (Moteur Souverain)",
      es: "Asia (Motor Soberano)",
      sw: "Asia (Injini Kuu)",
      bm: "Asia (Engine iyakosa)",
      ru: "Азия (Суверенный двигатель)",
      zh: "亚洲（主权交易与核心引擎）",
      ar: "آسيا (المحرك السيادي)",
      pt: "Ásia (Motor Soberano)",
      hi: "एशिया (संप्रभु इंजन)"
    },
    europe: {
      en: "Europe (Trade Axis)",
      fr: "Europe (Axe Commercial)",
      es: "Europa (Eje Comercial)",
      sw: "Ulaya (Mhimili wa Biashara)",
      bm: "Europe (Inshila sha Business)",
      ru: "Европа (Торговая ось)",
      zh: "欧洲（大陆贸易与清算轴心）",
      ar: "أوروبا (محور التجارة)",
      pt: "Europa (Eixo Comercial)",
      hi: "यूरोप (व्यापार अक्ष)"
    },
    namerica: {
      en: "North America (Reserve Nodes)",
      fr: "Amérique du Nord (Nœuds de Réserve)",
      es: "América del Norte (Nodos de Reserva)",
      sw: "Amerika Kaskazini (Hifadhi Kuu)",
      bm: "America Kaskazini (Indalama sha Reserve)",
      ru: "Северная Америка (Резервные узлы)",
      zh: "北美洲（流动储备与核心节点）",
      ar: "أمريكا الشمالية (عقد الاحتياطي)",
      pt: "América do Norte (Nós de Reserva)",
      hi: "उत्तरी अमेरिका (आरक्षित नोड्स)"
    },
    samerica: {
      en: "South America (Emerging Vaults)",
      fr: "Amérique du Sud (Voûtes Émergentes)",
      es: "América del Sur (Bóvedas Emergentes)",
      sw: "Amerika Kusini (Ukwasi Mpya)",
      bm: "America Kusini (Indalama ishipya)",
      ru: "Южная Америка (Развивающиеся сейфы)",
      zh: "南美洲（新兴自贸与资产储备）",
      ar: "أمريكا الجنوبية (الخزائن الناشئة)",
      pt: "América do Sul (Cofres Emergentes)",
      hi: "दक्षिण अमेरिका (उभरते तिजोरियां)"
    },
    oceania: {
      en: "Oceania (Islands & Currents)",
      fr: "Océanie (Îles & Courants)",
      es: "Oceanía (Islas y Corrientes)",
      sw: "Oceania (Visiwa na Mikondo)",
      bm: "Oceania (Icipani sha mu flyoo)",
      ru: "Океания (Острова и течения)",
      zh: "大洋洲（群岛经贸与蓝色水系）",
      ar: "أوقيانوسيا (الجزر والبحار)",
      pt: "Oceania (Ilhas e Correntes)",
      hi: "ओशिनिया (द्वीप और जलधाराएँ)"
    },
    antarctica: {
      en: "Antarctica (Scientific Zone)",
      fr: "Antarctique (Zone Scientifique)",
      es: "Antártida (Zona Científica)",
      sw: "Antaktika (Eneo la Kimasomo)",
      bm: "Antarctica (Uko kwakosa impepo)",
      ru: "Антарктида (Научная зона)",
      zh: "南极洲（冰川科学观测保护区）",
      ar: "القارة القطبية الجنوبية (المنطقة العلمية)",
      pt: "Antártida (Zona Científica)",
      hi: "अंटार्कटिका (वैज्ञानिक क्षेत्र)"
    },
    crypto: {
      en: "Decentralized Cryptosphere",
      fr: "Cryptosphère Décentralisée",
      es: "Criptosfera Descentralizada",
      sw: "Mitandao ya Crypto",
      bm: "Indalama sha Kufoni foni sha Crypto",
      ru: "Децентрализованная криптосфера",
      zh: "去中心化加密资产共识网络",
      ar: "شبكات التشفير اللامركزية",
      pt: "Criptosfera Descentralizada",
      hi: "विकेंद्रीकृत क्रिप्टोवर्ल्ड"
    }
  };
  return translations[id]?.[lang] || translations[id]?.en || id;
};

const getContinentSub = (id: string, lang: SupportedLanguage): string => {
  const translations: Record<string, Record<SupportedLanguage, string>> = {
    africa: {
      en: "Regional root assets & default baseline nodes",
      fr: "Actifs régionaux et nœuds de référence par défaut",
      es: "Activos regionales y nodos de referencia predeterminados",
      sw: "Mali za asili za kikanda na vitovu vya asili",
      bm: "Ukutampa ku mutwe besu no kulinga amaka",
      ru: "Региональные базовые активы и опорные узлы",
      zh: "区域母币、自贸协定与大宗商品结算锚定点",
      ar: "أصول المنشأ الإقليمية وعقد التتبع الأساسية",
      pt: "Ativos regionais e nós de referência padrão",
      hi: "क्षेत्रीय मूल संपत्ति और डिफ़ॉल्ट बेसライン नोड्स"
    },
    asia: {
      en: "Global manufacturing powerhouses & liquidity centers",
      fr: "Puissances manufacturières mondiales & centres de liquidité",
      es: "Potencias manufactureras globales y centros de liquidez",
      sw: "Kiwango cha uzalishaji na vitovu vikuu cha ukwasi",
      bm: "Amaka ya kupanga na amaseva ya bizness",
      ru: "Мировые промышленные гиганты и центры ликвидности",
      zh: "高端制造、高科技产区与全球核心清算资产",
      ar: "القوى الصناعية العالمية ومراكز السيولة الضخمة",
      pt: "Potências industriais globais e centros de liquidez",
      hi: "वैश्विक विनिर्माण महाशक्तियां और तरलता केंद्र"
    },
    europe: {
      en: "Continental monetary unions & historical trade pairings",
      fr: "Unions monétaires continentales & paires historiques",
      es: "Uniones monetarias continentales y pares históricos",
      sw: "Muungano wa kifedha na soko la kwanza la dunia",
      bm: "Icipani sha kulinganya indalama ne nshila",
      ru: "Валютные союзы континента и исторические торговые пары",
      zh: "欧盟清算体系、历史主权资产与跨国汇兑基础",
      ar: "الاتحادات النقدية القارية ومحاور التبادل التاريخية",
      pt: "Uniões monetárias continentales e pares históricos",
      hi: "महाद्वीपीय मौद्रिक संघ और ऐतिहासिक व्यापारिक जोड़े"
    },
    namerica: {
      en: "High-integrity liquid reserve sovereign currencies",
      fr: "Devises souveraines de réserve hautement liquides",
      es: "Monedas soberanas de reserva altamente líquidas",
      sw: "Mali za akiba za Kimataifa na ukwasi thabiti",
      bm: "Indalama sha reserve ne micitile ya cishinka",
      ru: "Высоколиквидные суверенные резервные валюты",
      zh: "高信誉主权储备性法币、北美自由贸易协定资产",
      ar: "العملات السيادية الاحتياطية عالية السيولة والأمان",
      pt: "Moedas soberanas de reserva altamente líquidas",
      hi: "उच्च सत्यता वाली तरल आरक्षित संप्रभु मुद्राएँ"
    },
    samerica: {
      en: "High-yield resource currencies & trading corridors",
      fr: "Devises de ressources à haut rendement & corridors",
      es: "Monedas de recursos de alto rendimiento y corredores",
      sw: "Sarafu za rasilimali na mabadilishano mapya",
      bm: "Indalama sha muno no kupilibula inshila",
      ru: "Сырьевые высокодоходные валюты и торговые коридоры",
      zh: "高收益资源型结算货币、新兴自贸区及贸易廊道",
      ar: "عملات الموارد عالية العائد وممرات التجارة الناشئة",
      pt: "Moedas de recursos de alto rendimento e corredores",
      hi: "उच्च उपज वाली संसाधन मुद्राएं और व्यापारिक गलियारे"
    },
    oceania: {
      en: "Sovereign Pacific island nations & blue economy indices",
      fr: "Nations insulaires souveraines & indices bleus",
      es: "Naciones insulares soberanas e índices de economía azul",
      sw: "Nchi za visiwa vya Pasifiki na uchumi thabiti",
      bm: "Ifibombelo fya mu flyoo ne micitile ya muno",
      ru: "Островные государства Тихого океана и индексы голубой экономики",
      zh: "环太平洋自由贸易区、岛国经济与蓝色旅游资产",
      ar: "دول الجزر الهادئة السيادية ومؤشرات الاقتصاد الأزرق",
      pt: "Nações insulares soberanas e índices de economia azul",
      hi: "संप्रभु प्रशांत द्वीप राष्ट्र और नीली अर्थव्यवस्था सूचकांक"
    },
    antarctica: {
      en: "Operational baseline of active multinational scientific outposts",
      fr: "Base opérationnelle des postes scientifiques multinationaux",
      es: "Línea base operacional de puestos científicos multinacionales",
      sw: "Vituo vya kiutafiti vinavyoendeshwa na nchi nyingi",
      bm: "Uko kwakosa impepo no kulolekesha amasambililo",
      ru: "Операционная база действующих научных полярных станций",
      zh: "跨国极地科研科考观测站自留储备，无主权发行基础",
      ar: "الخط الأساسي لتشغيل البعثات العلمية متعددة الجنسيات",
      pt: "Base operacional dos postos científicos multinacionais",
      hi: "सक्रिय बहुराष्ट्रीय वैज्ञानिक चौकियों की परिचालन आधार रेखा"
    },
    crypto: {
      en: "Decentralized algorithmic smart networks & assets",
      fr: "Réseaux intelligents algorithmiques décentralisés",
      es: "Redes inteligentes y activos algorítmicos descentralizados",
      sw: "Mali za kisasa za algoriti na mikataba duka",
      bm: "Indalama sha munsaka shineshine ishashingshinga",
      ru: "Децентрализованные алгоритмические сети и криптоактивы",
      zh: "去中心化智能合约网络、去信任数学共识底层资产及代币",
      ar: "الشبكات الذكية اللامركزية والأصول الخوارزمية المستقلة",
      pt: "Réseaux intelligents et actifs algorítmicos décentralisés",
      hi: "विकेंद्रीकृत एल्गोरिथम स्मार्ट नेटवर्क और संपत्तियां"
    }
  };
  return translations[id]?.[lang] || translations[id]?.en || id;
};

const STATIC_CURRENCIES: Currency[] = [
  // 1. Africa (Category 'africa')
  { code: 'ZMW', name: 'Zambian Kwacha', symbol: 'ZK', flag: '🇿🇲', category: 'africa', rateToUSD: 0.0377 },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '🇿🇦', category: 'africa', rateToUSD: 0.0541 },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', flag: '🇳🇬', category: 'africa', rateToUSD: 0.00069 },
  { code: 'EGP', name: 'Egyptian Pound', symbol: 'E£', flag: '🇪🇬', category: 'africa', rateToUSD: 0.0211 },
  { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', flag: '🇰🇪', category: 'africa', rateToUSD: 0.00758 },
  { code: 'GHS', name: 'Ghanaian Cedi', symbol: 'GH₵', flag: '🇬🇭', category: 'africa', rateToUSD: 0.068 },
  { code: 'MAD', name: 'Moroccan Dirham', symbol: 'DH', flag: '🇲🇦', category: 'africa', rateToUSD: 0.099 },
  { code: 'BWP', name: 'Botswana Pula', symbol: 'P', flag: '🇧🇼', category: 'africa', rateToUSD: 0.0725 },
  { code: 'DZD', name: 'Algerian Dinar', symbol: 'DA', flag: '🇩🇿', category: 'africa', rateToUSD: 0.0074 },
  { code: 'UGX', name: 'Ugandan Shilling', symbol: 'USh', flag: '🇺🇬', category: 'africa', rateToUSD: 0.00027 },

  // 2. Asia (Category 'asia')
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳', category: 'asia', rateToUSD: 0.1383 },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵', category: 'asia', rateToUSD: 0.00641 },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳', category: 'asia', rateToUSD: 0.0120 },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', flag: '🇰🇷', category: 'asia', rateToUSD: 0.00073 },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬', category: 'asia', rateToUSD: 0.739 },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪', category: 'asia', rateToUSD: 0.272 },
  { code: 'SAR', name: 'Saudi Riyal', symbol: 'ر.س', flag: '🇸🇦', category: 'asia', rateToUSD: 0.267 },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺', flag: '🇹🇷', category: 'asia', rateToUSD: 0.031 },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', flag: '🇮🇩', category: 'asia', rateToUSD: 0.000062 },
  { code: 'THB', name: 'Thai Baht', symbol: '฿', flag: '🇹🇭', category: 'asia', rateToUSD: 0.027 },

  // 3. Europe (Category 'europe')
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺', category: 'europe', rateToUSD: 1.085 },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧', category: 'europe', rateToUSD: 1.268 },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', flag: '🇨🇭', category: 'europe', rateToUSD: 1.103 },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽', flag: '🇷🇺', category: 'europe', rateToUSD: 0.0109 },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', flag: '🇸🇪', category: 'europe', rateToUSD: 0.093 },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', flag: '🇳🇴', category: 'europe', rateToUSD: 0.094 },
  { code: 'PLN', name: 'Polish Zloty', symbol: 'zł', flag: '🇵🇱', category: 'europe', rateToUSD: 0.25 },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr', flag: '🇩🇰', category: 'europe', rateToUSD: 0.145 },
  { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft', flag: '🇭🇺', category: 'europe', rateToUSD: 0.0028 },
  { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč', flag: '🇨🇿', category: 'europe', rateToUSD: 0.043 },

  // 4. North America (Category 'namerica')
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸', category: 'namerica', rateToUSD: 1.0 },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦', category: 'namerica', rateToUSD: 0.735 },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$', flag: '🇲🇽', category: 'namerica', rateToUSD: 0.059 },
  { code: 'DOP', name: 'Dominican Peso', symbol: 'RD$', flag: '🇩🇴', category: 'namerica', rateToUSD: 0.017 },
  { code: 'CRC', name: 'Costa Rican Colón', symbol: '₡', flag: '🇨🇷', category: 'namerica', rateToUSD: 0.0019 },
  { code: 'GTQ', name: 'Guatemalan Quetzal', symbol: 'Q', flag: '🇬🇹', category: 'namerica', rateToUSD: 0.128 },
  { code: 'HNL', name: 'Honduran Lempira', symbol: 'L', flag: '🇭🇳', category: 'namerica', rateToUSD: 0.040 },
  { code: 'NIO', name: 'Nicaraguan Córdoba', symbol: 'C$', flag: '🇳🇮', category: 'namerica', rateToUSD: 0.027 },
  { code: 'PAB', name: 'Panamanian Balboa', symbol: 'B/.', flag: '🇵🇦', category: 'namerica', rateToUSD: 1.0 },
  { code: 'JMD', name: 'Jamaican Dollar', symbol: 'J$', flag: '🇯🇲', category: 'namerica', rateToUSD: 0.0064 },

  // 5. South America (Category 'samerica')
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷', category: 'samerica', rateToUSD: 0.1942 },
  { code: 'ARS', name: 'Argentine Peso', symbol: '$', flag: '🇦🇷', category: 'samerica', rateToUSD: 0.0011 },
  { code: 'COP', name: 'Colombian Peso', symbol: '$', flag: '🇨🇴', category: 'samerica', rateToUSD: 0.00026 },
  { code: 'CLP', name: 'Chilean Peso', symbol: '$', flag: '🇨🇱', category: 'samerica', rateToUSD: 0.0011 },
  { code: 'PEN', name: 'Peruvian Sol', symbol: 'S/.', flag: '🇵🇪', category: 'samerica', rateToUSD: 0.27 },
  { code: 'VES', name: 'Venezuelan Bolívar', symbol: 'Bs.S', flag: '🇻🇪', category: 'samerica', rateToUSD: 0.027 },
  { code: 'UYU', name: 'Uruguayan Peso', symbol: '$U', flag: '🇺🇾', category: 'samerica', rateToUSD: 0.026 },
  { code: 'PYG', name: 'Paraguayan Guaraní', symbol: '₲', flag: '🇵🇾', category: 'samerica', rateToUSD: 0.00013 },
  { code: 'BOB', name: 'Bolivian Boliviano', symbol: 'Bs.', flag: '🇧🇴', category: 'samerica', rateToUSD: 0.14 },
  { code: 'GYD', name: 'Guyanese Dollar', symbol: 'G$', flag: '🇬🇾', category: 'samerica', rateToUSD: 0.0048 },

  // 6. Oceania (Category 'oceania')
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺', category: 'oceania', rateToUSD: 0.662 },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', flag: '🇳🇿', category: 'oceania', rateToUSD: 0.612 },
  { code: 'FJD', name: 'Fijian Dollar', symbol: 'FJ$', flag: '🇫🇯', category: 'oceania', rateToUSD: 0.44 },
  { code: 'PGK', name: 'Papua New Guinean Kina', symbol: 'K', flag: '🇵🇬', category: 'oceania', rateToUSD: 0.26 },
  { code: 'SBD', name: 'Solomon Islands Dollar', symbol: 'SI$', flag: '🇸🇧', category: 'oceania', rateToUSD: 0.12 },
  { code: 'TOP', name: 'Tongan Paʻanga', symbol: 'T$', flag: '🇹🇴', category: 'oceania', rateToUSD: 0.42 },
  { code: 'WST', name: 'Samoan Tālā', symbol: 'WS$', flag: '🇼🇸', category: 'oceania', rateToUSD: 0.37 },
  { code: 'VUV', name: 'Vanuatu Vatu', symbol: 'VT', flag: '🇻🇺', category: 'oceania', rateToUSD: 0.0083 },
  { code: 'XPF', name: 'CFP Franc', symbol: '₣', flag: '🇵🇫', category: 'oceania', rateToUSD: 0.0091 },
  { code: 'KID', name: 'Kiribati Dollar', symbol: 'K$', flag: '🇰🇮', category: 'oceania', rateToUSD: 0.662 },

  // 7. Antarctica (Category 'antarctica') - scientific base operation rates simulated
  { code: 'US_ANT', name: 'McMurdo USD', symbol: '$', flag: '🇺🇸', category: 'antarctica', rateToUSD: 1.0 },
  { code: 'CL_ANT', name: 'Frei Base CLP', symbol: '$', flag: '🇨🇱', category: 'antarctica', rateToUSD: 0.0011 },
  { code: 'AR_ANT', name: 'Esperanza ARS', symbol: '$', flag: '🇦🇷', category: 'antarctica', rateToUSD: 0.0011 },
  { code: 'NZ_ANT', name: 'Scott Base NZD', symbol: '$', flag: '🇳🇿', category: 'antarctica', rateToUSD: 0.612 },
  { code: 'AU_ANT', name: 'Mawson Base AUD', symbol: '$', flag: '🇦🇺', category: 'antarctica', rateToUSD: 0.662 },
  { code: 'GB_ANT', name: 'Rothera Base GBP', symbol: '£', flag: '🇬🇧', category: 'antarctica', rateToUSD: 1.268 },
  { code: 'EU_ANT', name: 'Dumont Base EUR', symbol: '€', flag: '🇪🇺', category: 'antarctica', rateToUSD: 1.085 },
  { code: 'NO_ANT', name: 'Troll Base NOK', symbol: 'kr', flag: '🇳🇴', category: 'antarctica', rateToUSD: 0.094 },
  { code: 'RU_ANT', name: 'Vostok Base RUB', symbol: '₽', flag: '🇷🇺', category: 'antarctica', rateToUSD: 0.0109 },
  { code: 'JP_ANT', name: 'Syowa Base JPY', symbol: '¥', flag: '🇯🇵', category: 'antarctica', rateToUSD: 0.00641 },

  // 8. Cryptocurrencies (Category 'crypto')
  { code: 'BTC', name: 'Bitcoin', symbol: '₿', flag: '🪙', category: 'crypto', rateToUSD: 69248.50 },
  { code: 'ETH', name: 'Ethereum', symbol: 'Ξ', flag: '🛡️', category: 'crypto', rateToUSD: 3485.20 },
  { code: 'SOL', name: 'Solana', symbol: '◎', flag: '🌀', category: 'crypto', rateToUSD: 168.42 },
  { code: 'BNB', name: 'Binance Coin', symbol: 'BNB', flag: '💎', category: 'crypto', rateToUSD: 592.15 },
  { code: 'XRP', name: 'XRP / Ripple', symbol: 'XRP', flag: '💧', category: 'crypto', rateToUSD: 0.52 },
  { code: 'ADA', name: 'Cardano', symbol: 'ADA', flag: '🍁', category: 'crypto', rateToUSD: 0.46 },
  { code: 'DOGE', name: 'Dogecoin', symbol: 'DOGE', flag: '🐶', category: 'crypto', rateToUSD: 0.145 },
  { code: 'DOT', name: 'Polkadot', symbol: 'DOT', flag: '🔴', category: 'crypto', rateToUSD: 6.25 },
  { code: 'MATIC', name: 'Polygon', symbol: 'MATIC', flag: '🟣', category: 'crypto', rateToUSD: 0.68 },
  { code: 'LINK', name: 'Chainlink', symbol: 'LINK', flag: '🔗', category: 'crypto', rateToUSD: 14.80 }
];

export default function LetterAssistant({ onBack, lang }: LetterAssistantProps) {
  const [activePortalTab, setActivePortalTab] = useState<'calculator' | 'converter'>('calculator');
  const [resonance, setResonance] = useState<number>(963.0000);

  // Localization translator helper
  const t = (key: string): string => {
    return TRANSLATIONS[lang]?.[key] || TRANSLATIONS['en']?.[key] || key;
  };

  // Locale-aware number system formatting helper (including East Arabic numerals for 'ar-EG')
  const formatLocalizedNum = (num: number, digits = 2): string => {
    const localeMap: Record<SupportedLanguage, string> = {
      en: 'en-US',
      fr: 'fr-FR',
      es: 'es-ES',
      sw: 'sw-KE',
      bm: 'en-ZA',
      ru: 'ru-RU',
      zh: 'zh-CN',
      ar: 'ar-EG',
      pt: 'pt-PT',
      hi: 'hi-IN'
    };
    
    return new Intl.NumberFormat(localeMap[lang] || 'en-US', {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits
    }).format(num);
  };

  // Calculator State Engine
  const [formula, setFormula] = useState<string>('');
  const [calcResult, setCalcResult] = useState<string>('');
  const [calcHistory, setCalcHistory] = useState<{ equation: string; result: string }[]>([]);

  // Bitwise Base representations of the current calculated state
  const [binaryRep, setBinaryRep] = useState<string>('0000');
  const [hexRep, setHexRep] = useState<string>('0x00');

  // Currency Converter State Engine
  const [sourceAmount, setSourceAmount] = useState<string>('100');
  const [sourceCurrency, setSourceCurrency] = useState<string>('ZMW'); // Zambian Kwacha as default
  const [liveCurrencies, setLiveCurrencies] = useState<Currency[]>(STATIC_CURRENCIES);

  // Real-time market tick ticks fluctuation to simulate live operations
  useEffect(() => {
    const tickInterval = setInterval(() => {
      // Very slight market noise wiggles rates to simulate actual telemetry ticks
      setLiveCurrencies(prevCurrencies => {
        return prevCurrencies.map(curr => {
          if (curr.code === 'USD') return curr;
          const fluctuation = 1 + (Math.random() - 0.5) * 0.0005; // 0.05% max variance
          return {
            ...curr,
            rateToUSD: curr.rateToUSD * fluctuation
          };
        });
      });

      // Synchronize exact resonance Hz
      setResonance(prev => 963.0000 + (Math.random() - 0.5) * 0.003);
    }, 1200);

    return () => clearInterval(tickInterval);
  }, []);

  // Update base-bits representation whenever calc result updates
  useEffect(() => {
    const num = parseFloat(calcResult);
    if (!isNaN(num) && isFinite(num)) {
      const intVal = Math.round(num);
      setBinaryRep((intVal >>> 0).toString(2).padStart(8, '0').slice(-24));
      setHexRep('0x' + (intVal >>> 0).toString(16).toUpperCase());
    } else {
      setBinaryRep('0000');
      setHexRep('0x00');
    }
  }, [calcResult]);

  // Safe Calculator Parser implementation
  const handleCalculatorPress = (val: string) => {
    if (val === 'C') {
      setFormula('');
      setCalcResult('');
    } else if (val === '⌫') {
      setFormula(prev => prev.slice(0, -1));
    } else if (val === '=') {
      try {
        // Safe evaluation strategy that replaces standard operations and parses strings
        // We clean the expression to prevent risky global scripts
        const sanitizedFormula = formula
          .replace(/×/g, '*')
          .replace(/÷/g, '/')
          .replace(/&/g, ' & ')
          .replace(/\|/g, ' | ')
          .replace(/\^/g, ' ^ ')
          .replace(/<</g, ' << ')
          .replace(/>>/g, ' >> ')
          .replace(/[^0-9()+\-*/.&|^<>\s~%]/g, ''); // strict whitelist sanitization

        // Safely evaluate simple mathematical operations using basic dynamic Function
        const cleanEval = new Function(`return (${sanitizedFormula})`)();
        const finalVal = String(cleanEval);
        
        if (finalVal !== undefined && finalVal !== 'NaN' && finalVal !== 'undefined') {
          setCalcResult(finalVal);
          setCalcHistory(prev => [{ equation: formula, result: finalVal }, ...prev].slice(0, 5));
        } else {
          setCalcResult('ERROR');
        }
      } catch (err) {
        setCalcResult('ERROR');
      }
    } else {
      setFormula(prev => prev + val);
    }
  };

  // Convert source value through base USD rates
  const calculateConversion = (targetCurr: Currency): number => {
    const parsedSource = parseFloat(sourceAmount);
    if (isNaN(parsedSource)) return 0;

    const sourceRateRef = liveCurrencies.find(c => c.code === sourceCurrency)?.rateToUSD || 1.0;
    
    // Step 1: Translate source currency to USD
    const amountInUSD = parsedSource * sourceRateRef;
    
    // Step 2: Translate USD value to targeted destination
    const targetVal = amountInUSD / targetCurr.rateToUSD;
    return targetVal;
  };

  // Render lists grouped by continent/group categories
  const categories = [
    { id: 'africa', color: 'border-source-emerald/20 text-source-emerald bg-source-emerald/[0.01]' },
    { id: 'asia', color: 'border-neutral-800 text-neutral-300' },
    { id: 'europe', color: 'border-neutral-800 text-neutral-300' },
    { id: 'namerica', color: 'border-neutral-800 text-neutral-300 md:col-span-1' },
    { id: 'samerica', color: 'border-neutral-800 text-neutral-300 md:col-span-1' },
    { id: 'oceania', color: 'border-neutral-800 text-neutral-300 md:col-span-1' },
    { id: 'antarctica', color: 'border-blue-900/40 text-blue-450 bg-blue-950/[0.01]' },
    { id: 'crypto', color: 'border-source-gold/20 text-source-gold bg-source-gold/[0.01]' }
  ];

  return (
    <div className="relative min-h-screen bg-[#040404] text-neutral-200 font-sans selection:bg-source-gold selection:text-black pb-12">
      {/* Background grids */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,130,0,0.015)_0%,transparent_50%)] pointer-events-none" />
      <div className="scanline" />

      {/* High-fidelity top navigation bar */}
      <div className="border-b border-neutral-900 bg-black/90 backdrop-blur-md sticky top-0 z-[60] py-4 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          
          {/* Portfolio Return Trigger */}
          <button 
            onClick={onBack}
            className="flex items-center gap-2.5 px-4 py-2 bg-neutral-950 border border-neutral-850 hover:border-source-gold hover:text-white text-neutral-400 transition-all text-[11px] font-mono font-bold uppercase rounded-md shadow-lg"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-source-gold" />
            {t('portfolioReturn')}
          </button>

          {/* Sub-navigation Controls for Calculator vs Converter */}
          <div className="flex gap-2 p-1 bg-neutral-950 border border-neutral-900 rounded-lg">
            <button
              onClick={() => setActivePortalTab('calculator')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-md font-mono text-[10px] font-black uppercase tracking-wider transition-all ${
                activePortalTab === 'calculator'
                  ? 'bg-source-gold text-black shadow-md'
                  : 'text-neutral-500 hover:text-white'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              {t('calcTab')}
            </button>
            <button
              onClick={() => setActivePortalTab('converter')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-md font-mono text-[10px] font-black uppercase tracking-wider transition-all ${
                activePortalTab === 'converter'
                  ? 'bg-source-emerald text-black shadow-md font-bold'
                  : 'text-neutral-500 hover:text-white'
              }`}
            >
              <Coins className="w-3.5 h-3.5" />
              {t('convTab')}
            </button>
          </div>

          {/* Mini active diagnostic metric */}
          <div className="hidden md:flex items-center gap-6 text-[10px] font-mono">
            <div className="text-right">
              <span className="text-neutral-550 block text-[8px] uppercase tracking-wider">RESONANCE FEED</span>
              <span className="text-white font-bold">{resonance.toFixed(4)} Hz</span>
            </div>
            <div className="px-2.5 py-1 bg-neutral-950 border border-neutral-900 rounded text-neutral-500 flex items-center gap-1.5 uppercase font-bold text-[8px] tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-source-emerald animate-ping" />
              ONLINE_CALIBRATOR
            </div>
          </div>

        </div>
      </div>

      {/* Main Single Page Portal layout contents */}
      <main className="max-w-6xl mx-auto px-6 py-12 md:py-16 space-y-12">
        
        {/* Dynamic Portal Header */}
        <div className="space-y-4 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-neutral-950 border border-neutral-900 px-3.5 py-1 text-[9px] text-source-gold font-mono uppercase tracking-widest rounded-full">
            <span className="h-1 w-1 rounded-full bg-source-gold" />
            {t('titlePortal')}
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            {activePortalTab === 'calculator' ? t('calcHeader') : t('convHeader')}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-mono max-w-3xl leading-relaxed">
            {activePortalTab === 'calculator' ? t('calcSub') : t('convSub')}
          </p>
        </div>

        {/* Dynamic Transition Canvas */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePortalTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            {activePortalTab === 'calculator' ? (
              
              /* TAB 1: THE DEVELOPER CALCULATOR */
              <div className="grid lg:grid-cols-[2fr_1fr] gap-8 items-start">
                
                {/* Main Calculator Body */}
                <div className="bg-neutral-950/80 border border-neutral-900 p-6 md:p-8 rounded-2xl shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-source-gold/20" />
                  
                  {/* High Quality Screen Readouts */}
                  <div className="bg-black border border-neutral-900 p-6 rounded-xl space-y-3 mb-6 relative overflow-hidden group">
                    <div className="absolute top-2 right-3 text-[7px] text-neutral-600 font-mono uppercase tracking-wider">
                      Evaluation Monitor
                    </div>

                    {/* Formula Bar */}
                    <div className="h-8 flex justify-end items-center text-sm md:text-base text-neutral-550 font-mono tracking-tight text-right overflow-x-auto whitespace-nowrap scrollbar-none">
                      {formula || <span className="opacity-20">0</span>}
                    </div>

                    {/* Evaluated Live Result Readout */}
                    <div className="h-12 flex justify-end items-center text-3xl font-bold text-white font-mono tracking-tighter text-right overflow-x-auto whitespace-nowrap tabular-nums">
                      {calcResult ? (
                        <>
                          <span className="text-source-gold mr-2 text-xl font-medium">=</span>
                          {calcResult === 'ERROR' ? calcResult : formatLocalizedNum(parseFloat(calcResult), 2)}
                        </>
                      ) : (
                        <span className="opacity-15">0.00</span>
                      )}
                    </div>

                    {/* Live Bitwise base expansion indices */}
                    <div className="border-t border-neutral-900 pt-3 grid grid-cols-2 gap-4 text-[9px] font-mono text-neutral-550">
                      <div className="flex gap-1.5 items-center truncate">
                        <span className="text-source-gold font-bold">BIN:</span>
                        <span className="text-neutral-400 font-mono tracking-widest truncate">{binaryRep}</span>
                      </div>
                      <div className="flex gap-1.5 items-center justify-end">
                        <span className="text-source-emerald font-bold">HEX:</span>
                        <span className="text-white font-mono tracking-wider">{hexRep}</span>
                      </div>
                    </div>
                  </div>

                  {/* Operational Tactile Button Grid */}
                  <div className="grid grid-cols-4 gap-3">
                    
                    {/* BUTTON LIST */}
                    {[
                      { key: 'C', type: 'cmd', label: 'C', color: 'bg-red-950/20 text-red-400 border-red-900/30 hover:bg-red-900/10' },
                      { key: '⌫', type: 'cmd', label: '⌫', color: 'bg-neutral-900 text-neutral-300 border-neutral-800' },
                      { key: '%', type: 'op', label: '%', color: 'bg-neutral-900 text-source-gold border-neutral-800' },
                      { key: '÷', type: 'op', label: '/', color: 'bg-neutral-900 text-source-gold border-neutral-800' },

                      { key: '&', type: 'op', label: 'AND (&)', color: 'bg-neutral-950 text-neutral-440 border-neutral-900 text-[10px]' },
                      { key: '|', type: 'op', label: 'OR (|)', color: 'bg-neutral-950 text-neutral-440 border-neutral-900 text-[10px]' },
                      { key: '^', type: 'op', label: 'XOR (^)', color: 'bg-neutral-950 text-neutral-440 border-neutral-900 text-[10px]' },
                      { key: '~', type: 'op', label: 'NOT (~)', color: 'bg-neutral-950 text-neutral-440 border-neutral-900 text-[10px]' },

                      { key: '7', type: 'num', label: '7', color: 'bg-black text-white hover:bg-neutral-900 border-neutral-900' },
                      { key: '8', type: 'num', label: '8', color: 'bg-black text-white hover:bg-neutral-900 border-neutral-900' },
                      { key: '9', type: 'num', label: '9', color: 'bg-black text-white hover:bg-neutral-900 border-neutral-900' },
                      { key: '×', type: 'op', label: '*', color: 'bg-neutral-900 text-source-gold border-neutral-800 font-bold' },

                      { key: '4', type: 'num', label: '4', color: 'bg-black text-white hover:bg-neutral-900 border-neutral-900' },
                      { key: '5', type: 'num', label: '5', color: 'bg-black text-white hover:bg-neutral-900 border-neutral-900' },
                      { key: '6', type: 'num', label: '6', color: 'bg-black text-white hover:bg-neutral-900 border-neutral-900' },
                      { key: '-', type: 'op', label: '-', color: 'bg-neutral-900 text-source-gold border-neutral-800 font-bold' },

                      { key: '1', type: 'num', label: '1', color: 'bg-black text-white hover:bg-neutral-900 border-neutral-900' },
                      { key: '2', type: 'num', label: '2', color: 'bg-black text-white hover:bg-neutral-900 border-neutral-900' },
                      { key: '3', type: 'num', label: '3', color: 'bg-black text-white hover:bg-neutral-900 border-neutral-900' },
                      { key: '+', type: 'op', label: '+', color: 'bg-neutral-900 text-source-gold border-neutral-800 font-bold' },

                      { key: '<<', type: 'op', label: '<<', color: 'bg-neutral-950 text-neutral-400 border-neutral-900 text-[10px]' },
                      { key: '0', type: 'num', label: '0', color: 'bg-black text-white hover:bg-neutral-900 border-neutral-900' },
                      { key: '.', type: 'num', label: '.', color: 'bg-black text-white hover:bg-neutral-900 border-neutral-900 font-bold' },
                      { key: '>>', type: 'op', label: '>>', color: 'bg-neutral-950 text-neutral-440 border-neutral-900 text-[10px]' },
                    ].map((btn, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleCalculatorPress(btn.label)}
                        className={`py-4 px-3 rounded-lg border text-sm font-mono transition-all duration-150 flex items-center justify-center active:scale-95 shadow-md ${btn.color}`}
                      >
                        {btn.key}
                      </button>
                    ))}

                    {/* Large full width equal execution key */}
                    <button
                      onClick={() => handleCalculatorPress('=')}
                      className="col-span-4 py-4 rounded-lg bg-source-gold text-black hover:bg-white border hover:border-white transition-all text-xs font-mono font-black uppercase tracking-widest flex items-center justify-center gap-2 active:scale-98 shadow-xl mt-2"
                    >
                      <Terminal className="w-4 h-4" />
                      Evaluate Statement (=)
                    </button>
                  </div>
                </div>

                {/* Calculation Log History sidebar */}
                <div className="space-y-6">
                  <div className="bg-neutral-950/40 border border-neutral-900 p-6 rounded-xl space-y-4">
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                      <Hash className="w-4 h-4 text-source-gold" />
                      Operations History Trace
                    </h3>
                    
                    <div className="space-y-3 min-h-[160px]">
                      {calcHistory.length === 0 ? (
                        <div className="h-32 flex flex-col items-center justify-center text-neutral-600 font-mono text-[9px] uppercase tracking-widest text-center border border-dashed border-neutral-900 rounded-lg">
                          No active runs recorded.
                        </div>
                      ) : (
                        calcHistory.map((hist, i) => (
                          <div key={i} className="p-3 bg-black border border-neutral-900 rounded-md font-mono text-[10px] space-y-1">
                            <div className="text-neutral-550 text-right overflow-x-auto scrollbar-none whitespace-nowrap">
                              {hist.equation}
                            </div>
                            <div className="text-source-gold font-bold text-right">
                              = {formatLocalizedNum(parseFloat(hist.result), 2)}
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    <button
                      onClick={() => setCalcHistory([])}
                      className="w-full py-2 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white transition-all rounded text-[9px] font-mono font-bold uppercase tracking-widest"
                    >
                      Purge History Buffer
                    </button>
                  </div>

                  <div className="p-5 bg-neutral-950/20 border border-neutral-900/50 rounded-xl space-y-2 text-[10px] text-neutral-500 font-mono">
                    <div className="flex gap-2 text-source-gold font-bold">
                      <Info className="w-3.5 h-3.5 shrink-0" />
                      <span>LOGICAL RESOLUTION NOTE</span>
                    </div>
                    <p className="leading-relaxed">
                      This calculator evaluates systems variables, priorities, parentheses, and bitwise mask shifts dynamically without global execution block loops.
                    </p>
                  </div>
                </div>

              </div>
            ) : (
              
              /* TAB 2: MULTI-CONTINENT CURRENCY CONVERTER */
              <div className="space-y-8">
                
                {/* Inputs Bar */}
                <div className="bg-neutral-950/80 border border-neutral-900 p-6 rounded-2xl shadow-xl grid md:grid-cols-2 gap-6 items-center">
                  
                  {/* Amount Entry */}
                  <div className="space-y-2">
                    <label className="text-[9px] text-neutral-550 uppercase font-mono tracking-widest font-black block">
                      {t('enterAmt')}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        inputMode="decimal"
                        value={sourceAmount}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === '' || /^[0-9.]*$/.test(val)) {
                            setSourceAmount(val);
                          }
                        }}
                        className="w-full bg-black border border-neutral-850 focus:border-source-emerald focus:ring-0 rounded-lg py-3 px-4 text-white font-mono text-sm tracking-tight outline-none"
                        placeholder="0.00"
                      />
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        <span className="text-[10px] text-neutral-550 font-mono font-bold">
                          {liveCurrencies.find(c => c.code === sourceCurrency)?.flag}
                        </span>
                        <span className="text-xs text-source-emerald font-mono font-bold">
                          {sourceCurrency}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Source currency dropdown */}
                  <div className="space-y-2">
                    <label className="text-[9px] text-neutral-550 uppercase font-mono tracking-widest font-black block">
                      {t('selectSource')}
                    </label>
                    <select
                      value={sourceCurrency}
                      onChange={(e) => setSourceCurrency(e.target.value)}
                      className="w-full bg-black border border-neutral-850 text-neutral-200 focus:border-source-emerald rounded-lg py-3 px-4 font-mono text-xs outline-none"
                    >
                      {categories.map((cat) => (
                        <optgroup key={cat.id} label={getContinentName(cat.id, lang)}>
                          {liveCurrencies
                            .filter((c) => c.category === cat.id)
                            .map((curr) => (
                              <option key={curr.code} value={curr.code}>
                                {curr.flag} {curr.code} — {curr.name}
                              </option>
                            ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Subtext about global translations */}
                <div className="flex items-center gap-2 text-[10px] text-neutral-500 font-mono italic px-2">
                  <Globe className="w-3.5 h-3.5 text-source-emerald animate-spin-slow" />
                  <span>{t('translatedBy')}</span>
                </div>

                {/* Currency Output Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {categories.map((cat) => {
                    const filtered = liveCurrencies.filter(c => c.category === cat.id);
                    return (
                      <div 
                        key={cat.id} 
                        className={`p-6 border rounded-2xl space-y-4 shadow-xl flex flex-col justify-between ${cat.color}`}
                      >
                        <div className="space-y-3">
                          <div className="flex justify-between items-start border-b border-white/5 pb-3">
                            <div className="space-y-1">
                              <h4 className="text-sm font-black uppercase text-white tracking-wide leading-none">
                                {getContinentName(cat.id, lang)}
                              </h4>
                              <p className="text-[9px] text-neutral-450 font-mono leading-none">
                                {getContinentSub(cat.id, lang)}
                              </p>
                            </div>
                            <span className="text-[8px] bg-black/65 border border-neutral-900/40 text-neutral-400 font-mono px-2 py-0.5 rounded uppercase tracking-wider scale-90">
                              {cat.id}
                            </span>
                          </div>

                          {/* Continent 10 Languages indicator */}
                          <div className="bg-black/40 border border-neutral-900/60 rounded-xl p-3.5 space-y-1">
                            <div className="text-[8px] text-source-gold font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
                              <Globe className="w-2.5 h-2.5 text-source-gold" />
                              <span>{getLanguagesLabel(lang)}</span>
                            </div>
                            <div className="text-[9px] text-neutral-400 font-mono leading-relaxed select-all">
                              {CONTINENT_LANGUAGES[cat.id]?.join(" • ")}
                            </div>
                          </div>

                          <div className="space-y-2.5">
                            {filtered.map((curr) => {
                              const val = calculateConversion(curr);
                              const isSource = curr.code === sourceCurrency;
                              return (
                                <div 
                                  key={curr.code} 
                                  className={`p-3 bg-black/85 rounded-xl flex justify-between items-center border transition-colors duration-150 ${
                                    isSource ? 'border-source-emerald/40 bg-source-emerald/[0.02]' : 'border-neutral-900/60'
                                  }`}
                                >
                                  <div className="flex items-center gap-2.5">
                                    <span className="text-xl leading-none">{curr.flag}</span>
                                    <div>
                                      <div className="text-xs font-bold text-white font-mono flex items-center gap-1.5 leading-none">
                                        {curr.code}
                                        {isSource && (
                                          <span className="text-[7px] text-source-emerald bg-source-emerald/10 font-bold px-1 rounded uppercase">
                                            SOURCE
                                          </span>
                                        )}
                                      </div>
                                      <div className="text-[9px] text-neutral-550 font-mono mt-0.5 whitespace-nowrap">
                                        {curr.name}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="text-right">
                                    <div className="text-sm font-bold text-white font-mono tracking-tight tabular-nums leading-none">
                                      <span className="text-neutral-550 text-[10px] mr-1">{curr.symbol}</span>
                                      {formatLocalizedNum(val, curr.category === 'crypto' ? 6 : 2)}
                                    </div>
                                    <div className="text-[8px] text-neutral-500 font-mono mt-0.5 leading-none">
                                      1 {curr.code} = {formatLocalizedNum(curr.rateToUSD / (liveCurrencies.find(c => c.code === sourceCurrency)?.rateToUSD || 1), 4)} {sourceCurrency}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Additional detailed metrics overview */}
                <div className="bg-neutral-950/40 border border-neutral-900 p-6 rounded-xl flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono">
                  <div className="flex gap-2 items-start max-w-xl">
                    <TrendingUp className="w-4 h-4 text-source-emerald shrink-0 mt-0.5" />
                    <p className="text-[10px] leading-relaxed text-neutral-550 text-left">
                      Conversion ratios are calculated with relative mathematical precision through an optimized matrix reference layer. Minor volatility has been added at the fourth decimal point to represent live tick fluctuations.
                    </p>
                  </div>
                  <div className="text-[9px] text-neutral-450 bg-neutral-900 px-3 py-1.5 border border-neutral-850 rounded flex items-center gap-2 uppercase tracking-wide">
                    <Sparkles className="w-3.5 h-3.5 text-source-gold" />
                    Defaults configured: ZMW & BWP
                  </div>
                </div>

              </div>
            )}
          </motion.div>
        </AnimatePresence>

      </main>
    </div>
  );
}
