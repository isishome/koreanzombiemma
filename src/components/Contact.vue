<script setup>
import { computed } from '@vue/reactivity';
import { ref, onMounted } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: null
  },
  address: {
    type: String,
    default: null
  },
  phone: {
    type: String,
    default: null
  },
  email: {
    type: String,
    default: null
  },
  textColor: {
    type: String,
    default: 'black'
  },
  locale: {
    type: String,
    default: 'ko'
  }
})

const visible = ref(true)
const iframe = ref(null)
onMounted(() => {
  iframe.value.onload = () => {
    visible.value = false
  }
})

const show = ref(false)
const onIntersection = (entry) => {
  show.value = entry.isIntersecting
}
const src = computed(() => props.locale === 'ko' ? 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d395.6973531449791!2d127.03294891508646!3d37.494264178520616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca15113df2565%3A0xc2d9bd4ac0e8b2f4!2z7L2U66as7JWI7KKA67mEIE1NQQ!5e0!3m2!1sko!2skr!4v1656569256577!5m2!1sko!2skr' : 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d395.69665810239184!2d127.03229111102684!3d37.494395362199235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xc2d9bd4ac0e8b2f4!2sKorean%20Zombie%20MMA!5e0!3m2!1sen!2skr!4v1657278468419!5m2!1sen!2skr')
</script>

<template>
  <div class="q-px-sm">
    <div class="title" :class="`text-${textColor}`">{{ title }}</div>
    <div class="sub-title text-subtitle2" :class="`text-${textColor}`">{{ address }}</div>
    <div class="sub-title text-subtitle2" :class="`text-${textColor}`">{{ phone }}</div>
    <div class="sub-title text-subtitle2" :class="`text-${textColor}`">{{ email }}</div>
    <q-card square bordered class="no-shadow contact" v-intersection="onIntersection" :class="show ? 'show' : ''">
      <q-card-section class="fit">
        <iframe ref="iframe" :src="src" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"></iframe>
        <q-inner-loading :showing="visible">
          <q-spinner size="10vh" :thickness="10" color="teal-6" />
        </q-inner-loading>
      </q-card-section>
    </q-card>
  </div>
</template>
<style>
.contact {
  margin-top: 2vh;
  height: 70vh;
  transition: opacity 1s ease;
  opacity: 0;
}

.contact.show {
  opacity: 1;
}
</style>