import { createRouter, createWebHistory } from 'vue-router'
import { Quasar, Cookies } from 'quasar'
import { i18n, loadLocaleMessages, setI18nLanguage } from '@/i18n'
import routes from './routes'

// Create Router
export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (to.name === 'section' && to.params.sec) {
          document.title = `Korean Zombie MMA - ${i18n.global.t(to.params.sec)}`
          resolve({ el: `#${to.params.sec}`, behavior: 'smooth' })
        }
        else if (to.name === 'main') {
          document.title = 'Korean Zombie MMA'
          resolve({ top: 0, behavior: 'smooth' })
        }
        else
          resolve({ ...savedPosition, behavior: 'smooth' })
      }, 100)
    })
  }
})

router.beforeEach(async (to, from, next) => {
  const locale = Cookies.has('kz.lang') ? Cookies.get('kz.lang') : Quasar.lang.getLocale().substring(0, 2)

  // load locale messages
  await loadLocaleMessages(locale)

  // set i18n language
  setI18nLanguage(locale)

  next()
})