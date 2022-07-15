import { nextTick } from 'vue'
import { createI18n } from 'vue-i18n'
import ko from './locales/ko'

export const i18n = createI18n({
  legacy: false,
  locale: 'ko',
  messages: {
    ko
  }
})

export function setI18nLanguage(locale) {
  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale
  } else {
    i18n.global.locale.value = locale
  }
  document.querySelector('html').setAttribute('lang', locale)
}

export async function loadLocaleMessages(locale) {
  if (!i18n.global.availableLocales.includes(locale)) {
    const messages = await import(`./locales/${locale}.json`)

    i18n.global.setLocaleMessage(locale, messages.default)
  }

  return nextTick()
}