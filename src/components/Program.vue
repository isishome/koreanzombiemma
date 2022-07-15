<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
defineProps({
  title: {
    type: String,
    default: null
  },
  subTitle: {
    type: String,
    default: null
  },
  program: {
    type: Array,
    required: true
  },
  locale: {
    type: String,
    default: 'ko'
  },
  textColor: {
    type: String,
    default: 'black'
  }
})

const { tm, rt } = useI18n()

const show = ref(false)
const onIntersection = (entry) => {
  show.value = entry.isIntersecting
}

</script>
<template>
  <div class="q-px-md">
    <div class="title" :class="`text-${textColor}`">{{ title }}</div>
    <div class="sub-title" :class="`text-${textColor}`">{{ subTitle }}</div>
    <div class="program" v-intersection="onIntersection" :class="show ? 'show' : ''">
      <q-timeline layout="comfortable" color="secondary">
        <q-timeline-entry v-for="(p, idx) in program" :key="idx" :icon="p.icon">
          <template #title>
            <div class="text-subtitle1 text-weight-bold q-mb-none">{{ p.name[locale] }}</div>
          </template>
          <div class="text-body2 q-pb-lg">
            {{ p.desc[locale] }}
          </div>
        </q-timeline-entry>
      </q-timeline>
    </div>
  </div>
</template>

<style scoped>
.program {
  margin-top: 3vh;
  transition: opacity 1s ease;
  opacity: 0;
}

.program.show {
  opacity: 1;
}
</style>