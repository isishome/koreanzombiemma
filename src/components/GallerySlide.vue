<script setup>
import { useQuasar } from 'quasar'
import { ref, onBeforeUpdate, computed } from 'vue'
import { morph } from 'quasar'
import { useStore } from '@/stores'

const props = defineProps({
  title: {
    type: String,
    default: null
  },
  subTitle: {
    type: String,
    default: null
  },
  images: {
    type: Array,
    required: true,
    default: () => {
      return []
    }
  },
  locale: {
    type: String,
    default: 'ko'
  },
  controlColor: {
    type: String,
    default: 'primary'
  },
  textColor: {
    type: String,
    default: 'black'
  },
  intersection: {
    type: Boolean,
    default: false
  },
  ratio: {
    type: Number,
    default: 1
  },
  transitionDuration: {
    type: Number,
    default: 300
  }
})

const emit = defineEmits(['before-show', 'show'])

const $q = useQuasar()
const store = useStore()

const section = ref(0)
const size = computed(() => $q.screen.lt.md ? 2 : $q.screen.lt.lg ? 3 : 4)
const imageList = computed(() => props.images)
const chunkImages = computed(() => imageList.value.reduce((acc, e, i) => (i % size.value ? acc[acc.length - 1].push(e) : acc.push([e]), acc), []))
const view = ref(false)
const zoom = ref({})
const zoomImage = (image) => {
  if (image) {
    zoom.value = image
    view.value = true
  }
  else
    view.value = false
}

// intersection
const show = ref(!props.intersection)
const onIntersection = (entry) => {
  show.value = entry.isIntersecting
}

// sizes
const sizes = computed(() => store.sizes)
</script>

<template>
  <div>
    <div class="title" :class="`text-${textColor}`">{{ title }}</div>
    <div class="sub-title" :class="`text-${textColor}`">{{
    subTitle
    }}</div>
    <q-carousel v-model="section" v-intersection="onIntersection" :class="show ? 'complete' : ''" keep-alive
      transition-prev="slide-right" transition-next="slide-left" swipeable animated infinite
      :control-color="controlColor" arrows padding class="intersection bg-transparent text-white full-height "
      :transition-duration="transitionDuration">
      <q-carousel-slide class="no-scroll" v-for="(chunk, idx) in chunkImages" :key="idx" :name="idx">
        <div class="row justify-center q-col-gutter-x-md">
          <div :class="`col-${12 / size}`" v-for="(img, index) in chunk" :key="index">
            <q-card class="no-shadow bg-grey-4 cursor-pointer" @click="zoomImage(img)">
              <q-img :ratio="1" :src="img.src" :srcset="img.srcset" :sizes="sizes">
              </q-img>
            </q-card>
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>
    <q-dialog v-model="view" @before-hide="zoom = {}">
      <q-card class="shadow-1 bg-grey-2 cursor-pointer no-scroll position-relative"
        :class="ratio > 1 ? 'vertical' : 'horizontal'" @click="view = false">
        <img class="fit img" :src="zoom.src" :srcset="zoom.srcset" />
        <slot v-if="$slots.info" name="info" :info="zoom"></slot>
        <div v-else class="desc text-grey-2">
          {{ zoom.desc[locale] }}</div>
      </q-card>
    </q-dialog>
  </div>
</template>

<style scoped>
.img {
  aspect-ratio: 1/1;
  object-fit: cover;
}

.vertical {
  max-width: 90vh;
  height: 90vh;
}

.horizontal {
  width: 90vw;
  height: 90vw;
}

.desc {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  background-color: rgba(0, 0, 20, .8);
  color: var(--q-primary);
  text-align: center;
  font-weight: bold;
  font-size: 1.4em;
}

.intersection {
  margin-top: 3vh;
  transition: opacity .5s ease;
  opacity: 0;
}

.intersection.complete {
  opacity: 1;
}
</style>