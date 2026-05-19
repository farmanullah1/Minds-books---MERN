/**
 * CodeDNA
 * i18n.ts — i18next translation scaffold & dictionary definitions (PROMPT-55)
 * exports: default i18n
 * used_by: main.tsx
 * rules: Key-lookup fallbacks, 10 locales mappings structure
 */

// Simple lightweight translation dictionary engine to avoid heavy package install breaks
export interface TranslationDictionary {
  [key: string]: {
    [locale: string]: string;
  };
}

export const translationKeys: TranslationDictionary = {
  'welcome': {
    en: 'Welcome to MindBook',
    ar: 'مرحباً بك في مايندبوك',
    ur: 'مائنڈ بک میں خوش آمدید',
    zh: '欢迎来到MindBook',
    es: 'Bienvenido a MindBook',
    fr: 'Bienvenue sur MindBook',
    de: 'Willkommen bei MindBook',
    hi: 'माइंडबुक में आपका स्वागत है',
    bn: 'মাইন্ডবুক-এ আপনাকে স্বাগত',
    tr: 'MindBook\'a Hoş Geldiniz'
  },
  'explore': {
    en: 'Explore Trending',
    ar: 'استكشف الرائج',
    ur: 'ٹرینڈنگ دریافت کریں',
    zh: '探索趋势',
    es: 'Explorar Tendencias',
    fr: 'Explorer les tendances',
    de: 'Trends erkunden',
    hi: 'ट्रेंडिंग का अन्वेषण करें',
    bn: 'ট্রেন্ডিং অন্বেষণ করুন',
    tr: 'Trendleri Keşfet'
  },
  'settings': {
    en: 'Account Settings',
    ar: 'إعدادات الحساب',
    ur: 'اکاؤنٹ کی ترتیبات',
    zh: '账户设置',
    es: 'Configuración de cuenta',
    fr: 'Paramètres du compte',
    de: 'Kontoeinstellungen',
    hi: 'खाता सेटिंग',
    bn: 'অ্যাকাউন্ট সেটিংস',
    tr: 'Hesap Ayarları'
  }
};

class TranslationEngine {
  private currentLanguage = 'en';

  public setLanguage(lang: string) {
    this.currentLanguage = lang;
  }

  public getLanguage() {
    return this.currentLanguage;
  }

  public t(key: string): string {
    const entry = translationKeys[key];
    if (!entry) return key;
    return entry[this.currentLanguage] || entry['en'] || key;
  }
}

export const i18n = new TranslationEngine();
export default i18n;
