<script setup>
import { ref, onMounted } from 'vue'
import { date, useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const $q = useQuasar()
const { t, locale } = useI18n()
const view = ref(false)

const close = () => {
  $q.cookies.set(`kz.n.${props.data.id}`, 'disable', { path: import.meta.env.BASE_URL, expires: 7 })
  view.value = false
}

onMounted(() => {
  if (props.data.id && (props.data.start || props.data.end)) {
    const start = props.data.start ? new Date(props.data.start) : '1970-01-01 00:00:00'
    const end = props.data.end ? new Date(props.data.end) : '3000-01-01 00:00:00'
    const now = Date()
    const startSpan = date.getDateDiff(now, start, 'second')
    const endSpan = date.getDateDiff(end, now, 'second')
    const hasCookie = $q.cookies.has(`kz.n.${props.data.id}`)

    if (startSpan > 0 && endSpan > 0 && !hasCookie)
      view.value = true
  }
})
</script>

<template>
  <q-dialog persistent v-model="view">
    <q-card dense class="notice-card">
      <q-img :src="data.img ? data.img : 'images/gym/main_800.jpg'" width="100%" />
      <q-btn class="absolute-top-right q-ma-md" icon="close" dense round color="black" text-color="white"
        @click="view = false" />
      <div class="contents q-pa-sm" :style="`color:${data.color ? data.color : 'white'}`">
        <div class="text-h6">{{data.title[locale]}}</div>
        <div v-if="data.contents" class="text-body2">
          {{data.contents[locale]}}
        </div>
      </div>
      <q-card-actions class="bg-white" align="between">
        <q-btn v-if="data.link" no-caps dense color="red-10" :label="t('go')" type="a" :href="data.link" target="_blank"
          rel="noopener noreferrer" />
        <div v-else></div>
        <q-btn no-caps dense color="secondary" :label="t('doNotShow')" @click="close" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>
.notice-card {
  word-break: keep-all;
  width: 90%;
  max-width: 600px;
  max-height: 40vh !important;
  background-color: transparent;
}

.contents {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 44px;
  background-color: rgba(0, 0, 0, .6);
}
</style>