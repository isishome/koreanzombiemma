<script setup>
import { useRoute } from 'vue-router'
import { ref, shallowRef, computed, defineAsyncComponent, onMounted, onUnmounted, nextTick, inject } from 'vue'
import { useStore } from '@/stores'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'

// components
const GallerySlide = defineAsyncComponent(() => import('@/components/GallerySlide.vue'))
const Trainer = defineAsyncComponent(() => import('@/components/Trainer.vue'))
const Program = defineAsyncComponent(() => import('@/components/Program.vue'))
const Scheduler = defineAsyncComponent(() => import('@/components/Scheduler.vue'))
const Contact = defineAsyncComponent(() => import('@/components/Contact.vue'))
const Notice = defineAsyncComponent(() => import('@/components/Notice.vue'))

// global
const route = useRoute()
const store = useStore()
const { t, locale } = useI18n()
const axios = inject('axios')
const $q = useQuasar()

// var
const header = computed(() => store.header)
const ratio = computed(() => store.ratio)
const sizes = computed(() => store.sizes)
const main = shallowRef({})
const masterImages = shallowRef([])
const gymImages = shallowRef([])
const trainerImages = shallowRef([])
const program = shallowRef([])
const schedule = shallowRef({})

// awards
const awardsView = !route.params.sec && !$q.cookies.has('kz.awards')
const moving = ref(false)
const awardSlide = ref(null)
const awards = ref(0)
const awardsData = shallowRef([])
const video = document.getElementById('video')
const first = ref(true)
const last = ref(false)

const wheel = (event) => {
  if (!first.value && awardSlide.value && !moving.value) {
    if (event.deltaY > 0)
      awardSlide.value.next()
    else
      awardSlide.value.previous()
  }
}
const endSlide = () => {
  setTimeout(() => {
    moving.value = false
  }, 500)
}

const onAwardsIntersection = (entry) => {
  if (!first.value || !entry.rootBounds.width || !entry.rootBounds.height)
    return

  video.style.zIndex = 6
  video.style.opacity = 1
  first.value = false
  awardSlide.value.$el.classList.add('view')
  document.documentElement.classList.add('stop')
  document.body.classList.add('stop')
}

// Notice
const noticeData = shallowRef([])

const timeout = ref(2000)
const onRemoveIntersection = () => {
  if (last.value)
    return

  setTimeout(() => {
    $q.cookies.set('kz.awards', false, { path: import.meta.env.BASE_URL, expires: 7 })
    awards.value = awardsData.value.length - 1
    video.style.zIndex = -1
    video.style.opacity = .2
    last.value = true
    awardSlide.value.$el.classList.remove('view')
    awardSlide.value.$el.classList.add('complete')
    document.documentElement.classList.remove('stop')
    document.body.classList.remove('stop')
    window.scrollTo({ top: awardSlide.value.$el.offsetTop, behavior: 'auto' })
  }, timeout.value)
}

const loadNotice = () => {
  axios.get('data/notice.json')
    .then((response) => {
      noticeData.value = response.data.notice
    })
}

// init
const onLoad = () => {
  Promise.all([
    axios.get('data/main.json')
      .then((response) => {
        main.value = response.data
      }),
    axios.get('data/master.json')
      .then((response) => {
        masterImages.value = response.data.gallery
      }),
    axios.get('data/awards.json')
      .then((response) => {
        awardsData.value = response.data.awards
      }),
    axios.get('data/gym.json')
      .then((response) => {
        gymImages.value = response.data.gallery
      }),
    axios.get('data/trainer.json')
      .then((response) => {
        trainerImages.value = response.data.gallery
      }),
    axios.get('data/program.json')
      .then((response) => {
        program.value = response.data.program
      }),
    axios.get('data/schedule.json')
      .then((response) => {
        schedule.value = response.data
      })
  ]).finally(init)
}

// go current section
const goSection = () => {
  if (route.params.sec) {
    const sec = route.params.sec.toLowerCase()
    const el = document.getElementById(sec)
    if (el)
      el.scrollIntoView({ behavior: 'smooth' })
  }
}

const init = () => {
  const preload = document.getElementById('preload')
  const kz = document.getElementById('kz')
  const kzDoc = kz.contentDocument
  const svg = kzDoc.querySelector('svg')
  const bar = kzDoc.getElementById('bar')

  if (svg && bar) {
    svg.setCurrentTime(svg.getCurrentTime() / 20)
    bar.setAttribute('dur', '1s')
  }

  if (!awardsView) {
    first.value = false
    last.value = true
    awardSlide.value.$el.classList.add('complete')
  }

  setTimeout(() => {
    preload.classList.add('complete')
  }, 1000)

  setTimeout(() => {
    store.loaded = true
  }, 2000)

  setTimeout(() => {
    loadNotice()
    goSection()
  }, 2050)
}

onMounted(() => {
  if (document.readyState !== 'complete')
    window.addEventListener('load', onLoad)
  else {
    nextTick(() => {
      onLoad()
    })
  }
})

onUnmounted(() => {
  window.removeEventListener('load', onLoad)
})
</script>

<template>
  <div v-if="Object.keys(main).length > 0">
    <q-img id="koreanzombie" src="images/main/top_1600.jpg" srcset="images/main/top_400.jpg 400w,
                images/main/top_800.jpg 800w,
                images/main/top_1200.jpg 1200w,
                images/main/top_1600.jpg 1600w" :sizes="sizes" class="net" height="70vh" spinner-color="white"
      spinner-size="10vh">
      <div class="column items-center q-gutter-y-sm bg-transparent absolute-bottom text-weight-bold text-grey-2"
        style="font-size:calc(2vw + 16px);padding-bottom: 6vh;z-index:1;letter-spacing: -0.01em;word-break:keep-all;">
        <div class="text-center" style="line-height:1.2em">{{ main.title[locale] }}</div>
        <div style="font-size:60%">- {{ main.name[locale] }} -</div>
      </div>
    </q-img>
    <q-carousel ref="awardSlide" v-model="awards" keep-alive :vertical="!first" transition-prev="slide-right"
      transition-next="slide-left" :swipeable="!first && !last" animated :autoplay="!first ? 2000 : false" class="award"
      style="height:100vh;" @wheel="wheel" :transition-duration="200" @transition="endSlide"
      @before-transition="moving = true">
      <template #control>
        <q-carousel-control v-if="!first && !last" position="top-right" class="no-margin">
          <q-btn round flat dense icon="close" color="red" size="xl" @click="timeout = 0; onRemoveIntersection()" />
        </q-carousel-control>
      </template>
      <q-carousel-slide v-for="(a, idx) in awardsData" :key="idx" :name="idx"
        :disable="last && idx + 1 !== awardsData.length">
        <div class="record absolute-center center-box">
          <q-separator v-if="idx + 1 === awardsData.length" inset color="grey-8" class="q-px-xl" />
          <q-linear-progress v-else indeterminate color="grey-8" size="1px" class="q-px-xl" />
          <div class="text-center text-weight-bold q-py-xl column q-gutter-y-sm"
            v-intersection="entry => idx + 1 === awardsData.length ? onRemoveIntersection(entry) : {}">
            <div style="height:6vh">
              <img :src="a.src ? a.src : 'images/tg.svg'" style="height:6vh" />
            </div>
            <div>{{ a.desc[locale] }}</div>
          </div>
          <q-separator v-if="idx + 1 === awardsData.length" inset color="grey-8" class="q-px-xl" />
          <q-linear-progress v-else query color="grey-8" size="1px" class="q-px-xl" />
        </div>
      </q-carousel-slide>
    </q-carousel>
    <div class="bg-grey-1 padding-title" v-intersection="onAwardsIntersection">
      <GallerySlide intersection :transition-duration="500" :title="main.koreanzombie[locale]" :sub-title="t('gallery')"
        :images="masterImages" control-color="grey-6" text-color="grey-10" :ratio="ratio" class="center-box"
        :locale="locale" />
    </div>
    <div id="gym" class="separator" :style="`height:${header}px`"></div>
    <q-img src="images/gym/main_1600.jpg" srcset="images/gym/main_400.jpg 400w,
                images/gym/main_800.jpg 800w,
                images/gym/main_1200.jpg 1200w,
                images/gym/main_1600.jpg 1600w" :sizes="sizes" class="net" :ratio="ratio * 2.1 + 0.6"
      spinner-color="white" spinner-size="10vh">
    </q-img>
    <div class="bg-grey-1 padding-title">
      <GallerySlide intersection :transition-duration="500" :title="t('gym')" :sub-title="main.gymDesc[locale]"
        :images="gymImages" control-color="grey-6" text-color="grey-10" :ratio="ratio" class="center-box"
        :locale="locale" />
    </div>
    <div id="trainer" class="separator" :style="`height:${header}px`"></div>
    <q-img src="images/trainer/main_1600.jpg" srcset="images/trainer/main_400.jpg 400w,
                images/trainer/main_800.jpg 800w,
                images/trainer/main_1200.jpg 1200w,
                images/trainer/main_1600.jpg 1600w" :sizes="sizes" class="net" :ratio="ratio * 1.5 + 0.5"
      spinner-color="white" spinner-size="10vh">
    </q-img>
    <div class="bg-grey-1 padding-title">
      <GallerySlide intersection :transition-duration="500" :title="t('trainer')" :sub-title="main.trainerDesc[locale]"
        :images="trainerImages" control-color="grey-6" text-color="grey-10" :ratio="ratio" class="center-box"
        :locale="locale">
        <template #info="props">
          <Trainer :profile="props.info" />
        </template>
      </GallerySlide>
    </div>
    <div id="program" class="separator" :style="`height:${header}px`"></div>
    <div class="bg-grey-1 padding-title">
      <Program :title="t('program')" :sub-title="main.programDesc[locale]" text-color="grey-10" :program="program"
        class="center-box" :locale="locale" />
    </div>
    <div id="schedule" class="separator" :style="`height:${header}px`"></div>
    <div class="bg-grey-1 padding-title">
      <Scheduler :title="t('schedule')" :sub-title="main.scheduleDesc[locale]" text-color="grey-10" :schedule="schedule"
        class="center-box" :locale="locale" />
    </div>
    <div id="contact" class="separator" :style="`height:${header}px`"></div>
    <div class="bg-grey-1 padding-title">
      <Contact class="center-box" :title="t('contact')" :address="main.address[locale]" :phone="main.phone[locale]"
        :email="main.email[locale]" text-color="grey-10" :locale="locale" />
    </div>
    <Notice v-for="notice in noticeData" :key="notice.id" :data="notice" />
  </div>
</template>

<style scoped>
.award {
  background-color: transparent;
  font-weight: bold;
  position: relative;
  transition: height .4s ease;
}

.award.view {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 7;
  background-color: rgba(0, 0, 20, .8);
}

.award.complete {
  height: 30vh !important;
}

.record {
  width: 100%;
  color: #fefefe;
  font-size: calc(1vw + 12px);
  letter-spacing: -0.03em;
  text-align: center;
}
</style>