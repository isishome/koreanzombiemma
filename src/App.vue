<script setup>
import { useQuasar, debounce } from 'quasar'
import { ref, computed, watch } from 'vue'
import { useStore } from '@/stores'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { setI18nLanguage, loadLocaleMessages } from '@/i18n'

// preload video
import video from '/video/kz.mp4'

// global
const $q = useQuasar()
const screen = computed(() => $q.screen)
const route = useRoute()
const router = useRouter()
const { t, tm, rt, locale } = useI18n()

// layout
const store = useStore()
const header = computed(() => store.header)
const loaded = computed(() => store.loaded)
const title = computed(() => screen.value.gt.sm ? 'Korean Zombie MMA' : 'Ko-Zom MMA')

// draw
const drawer = ref(false)

// resize 
const onResize = debounce(() => {
  store.ratio = window.innerWidth / window.innerHeight
}, 200)

// top intersection
const scrollMove = ref(false)
const onHeaderIntersection = (entry) => {
  if (entry.rootBounds.width && entry.rootBounds.height)
    scrollMove.value = !entry.isIntersecting
}

// globalization
const locales = tm('locales').map(l => ({ label: rt(l.label), value: rt(l.value) }))
const lang = ref(locale.value)
watch(() => locale.value, (val, old) => {
  if (val !== old)
    lang.value = val
})
const setLocale = async (val) => {
  drawer.value = false
  // load locale messages
  await loadLocaleMessages(val)

  // set locale messages
  setI18nLanguage(val)

  // set title
  if (route.params.sec)
    router.push({ name: 'section', params: { sec: route.params.sec } })

  // set lang cookie
  $q.cookies.set('kz.lang', val, { path: import.meta.env.BASE_URL, expires: 365 })
}

// tweak
const myTweak = (offset) => {
  store.header = offset - 1
}
</script>
<template>
  <q-layout v-show="loaded" view="hHr lpR fFr" @resize="onResize">
    <video id="video" class="video" playsinline autoplay loop muted>
      <source :src="video" type="video/mp4" />
    </video>
    <div class="top-inter" v-intersection="onHeaderIntersection"></div>
    <q-header :class="['header', scrollMove ? 'scroll' : '']">
      <q-toolbar :class="screen.gt.sm ? 'q-py-sm q-px-lg' : 'q-pa-sm'">
        <q-btn dense flat :ripple="false" :to="{ name: 'main' }">
          <div class="row items-center q-gutter-x-sm">
            <div class="rubik text-shadow text-h5">
              {{ title }}
            </div>
          </div>
        </q-btn>
        <q-space />
        <div class="row justify-end q-gutter-x-sm">
          <q-btn flat dense round class="text-shadow" size="md" icon="menu" @click="drawer = true" />
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="drawer" side="right" overlay behavior="mobile">
      <div class="row justify-between items-center q-gutter-x-md q-pa-md bg-secondary text-primary"
        :style="`height:${2 * header}px`">
        <q-btn dense flat :to="{ name: 'main' }">
          <img src="images/main/logosss.png" height="50" />
        </q-btn>
        <q-select class="col" dense outlined emit-value map-options behavior="menu" :label="t('language')"
          bg-color="white" v-model="lang" :options="locales" @update:model-value="setLocale" />
      </div>
      <q-list class="text-body2 q-pt-lg">
        <q-item active-class="text-weight-bold text-primary" :to="{ name: 'section', params: { sec: 'gym' } }">
          {{ t('gym') }}
        </q-item>
        <q-item active-class="text-weight-bold text-primary" :to="{ name: 'section', params: { sec: 'trainer' } }">
          {{ t('trainer') }}
        </q-item>
        <q-item active-class="text-weight-bold text-primary" :to="{ name: 'section', params: { sec: 'program' } }">
          {{ t('program') }}
        </q-item>
        <q-item active-class="text-weight-bold text-primary" :to="{ name: 'section', params: { sec: 'schedule' } }">
          {{ t('schedule') }}
        </q-item>
        <q-item active-class="text-weight-bold text-primary" :to="{ name: 'section', params: { sec: 'contact' } }">
          {{ t('contact') }}
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container style="padding-top:0">
      <q-page :style-fn="myTweak">
        <router-view />
      </q-page>
      <div class="nunito center-box fit text-grey-2 text-right text-caption q-px-md">
        <div class="row justify-end items-center q-py-sm q-mt-xl">
          <q-btn class="btn" dense unelevated href="https://www.youtube.com/channel/UCc7o0OkR2BDFN4TCgPChjEw"
            target="_blank" round padding="10px">
            <img class="img" src="images/youtube-brands.svg">
          </q-btn>
          <q-btn class="btn" dense unelevated href="https://www.instagram.com/koreanzombiemma" target="_blank" round
            padding="10px">
            <img class="img" src="images/instagram-brands.svg">
          </q-btn>
          <q-btn class="btn" dense unelevated href="https://www.facebook.com/koreanzombieMMA" target="_blank" round
            padding="10px">
            <img class="img" src="images/facebook-brands.svg">
          </q-btn>
          <q-btn class="btn" dense unelevated href="https://twitter.com/KoreanZombieMMA" target="_blank" round
            padding="10px">
            <img class="img" src="images/twitter-brands.svg">
          </q-btn>
        </div>
        <q-toolbar class="bottom q-gutter-x-xs">
          <q-space />
          <div>{{ t('bottom1') }}</div>
          <a class="bottom-link row items-center" href="https://serasome.com" target="_blank">
            <div class="row items-center">
              <img src="@/assets/images/seras.svg" height="12" />
            </div>
            <div class="text-teal-4">SERA</div>
            <div class="text-amber-7">SOME</div>
          </a>
          <div>{{ t('bottom2') }}</div>
        </q-toolbar>
      </div>
    </q-page-container>
  </q-layout>
</template>
<style scoped>
.video {
  z-index: -1;
  position: fixed;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  transform: translate(-50%, -50%);
  opacity: .2;
}

.top-inter {
  position: absolute;
  height: 0;
}

.header {
  transition: all .5s ease;
  background-color: transparent;
  z-index: 3;
}

.header.scroll {
  color: var(--q-primary);
  background-color: rgba(60, 60, 90, .8);
  -webkit-backdrop-filter: blur(7px);
  backdrop-filter: blur(7px);
  box-shadow: inset 0 -1px 0 0 rgba(60, 60, 90, .6);
}

.seras {
  filter: grayscale(100%);
}

.seras:hover {
  filter: grayscale(0);
}

.icon {
  width: 24px;
  height: auto;
}

.img {
  width: 30px;
  height: 30px;
  position: relative;
  filter: invert(90%);
}

.bottom {
  padding: 10px 0 30px;
  box-shadow: 0 -1px 0 0 rgba(200, 200, 255, .3);
}

.bottom-link {
  text-decoration: none;
}
</style>
