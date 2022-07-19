<script setup>
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
defineProps({
  profile: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
</script>
<template>
  <div class="social" v-if="profile.youtube || profile.instagram || profile.facebook || profile.twitter">
    <div class="column items-center q-gutter-y-xs">
      <q-btn v-if="profile.youtube" class="btn" dense unelevated @click.stop :href="profile.youtube" target="_blank"
        round padding="10px">
        <img src="images/youtube-brands.svg" class="youtube">
      </q-btn>
      <q-btn v-if="profile.instagram" class="btn" dense unelevated @click.stop :href="profile.instagram" target="_blank"
        round padding="10px">
        <img src="images/instagram-brands.svg" class="instargram">
      </q-btn>
      <q-btn v-if="profile.facebook" class="btn" dense unelevated @click.stop :href="profile.facebook" target="_blank"
        round padding="10px">
        <img src="images/facebook-brands.svg" class="facebook">
      </q-btn>
      <q-btn v-if="profile.twitter" class="btn" dense unelevated @click.stop :href="profile.twitter" target="_blank"
        round padding="10px">
        <img src="images/twitter-brands.svg" class="twitter">
      </q-btn>
    </div>
  </div>
  <div class="profile">
    <q-markup-table class="bg-yellow-3 q-pa-xs" flat square dense>
      <tr>
        <th colspan="2" class="text-center tname">{{ profile.name[locale] }}</th>
      </tr>
      <tr>
        <th> {{ t('height') }}</th>
        <td> {{ profile.height[locale] }}</td>
      </tr>
      <tr>
        <th> {{ t('weight') }}</th>
        <td> {{ profile.weight[locale] }}</td>
      </tr>
      <tr>
        <th> {{ t('style') }}</th>
        <td> {{ profile.style[locale] }}</td>
      </tr>
      <tr>
        <th> {{ t('job') }}</th>
        <td> {{ profile.job[locale] }}</td>
      </tr>
    </q-markup-table>
  </div>
</template>
<style scoped>
.social {
  padding: 4px;
  border-radius: 20px !important;
  position: absolute;
  z-index: 0;
  top: 10px;
  left: 10px;
  background-color: rgba(256, 256, 256, 1);
  box-shadow: 2px 2px 0 0 rgba(0, 0, 0, .1);
}

img {
  width: 30px;
  height: 30px;
  position: relative;
}

.youtube {
  filter: invert(20%) hue-rotate(20deg) sepia(10) saturate(20);
}

.btn {
  padding: 8px !important;
}

.instargram {
  filter: invert(100%);
  background: linear-gradient(to right top, rgb(0, 0, 54), rgb(0, 99, 86), greenyellow);
  border-radius: 10px;
}

.facebook {
  filter: contrast(50%) invert(100%) sepia(1) hue-rotate(197deg) saturate(120);
}

.twitter {
  filter: contrast(50%) invert(100%) sepia(1) hue-rotate(197deg) saturate(50);
}

.profile {
  position: absolute !important;
  bottom: 30px;
  right: 30px;
  transform: rotateZ(5deg);
  padding: 0 !important;
  z-index: 8000;
}

html:lang(ko) .profile {
  font-family: 'Hi Melody', cursive;
}

html:lang(en) .profile {
  font-family: 'Coming Soon', cursive;
}

.profile .tname {
  font-size: 2.4em !important;
  font-weight: bold;
  padding: 2px 0 !important;
}

.profile th {
  font-size: 1.8em !important;
  padding: 4px 2px !important;
}

.profile td {
  font-size: 1.8em !important;
  text-decoration-line: underline;
  text-underline-offset: 4px;
  padding: 4px 2px 4px 20px !important;
}

@media (max-width:699px) {
  .profile {
    right: 15px;
    bottom: 15px;
  }

  .profile .tname {
    font-size: 1.2em !important;
    padding: 2px 0 !important;
  }

  .profile th,
  .profile td {
    font-size: 1em !important;
    padding: 4px 2px !important;
  }

  .profile td {
    padding: 4px 2px 4px 10px !important;
  }
}

.profile::after {
  content: '';
  position: absolute;
  background-color: rgba(0, 0, 0, .3);
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, .3) !important;
  transform: rotateZ(-5deg) skewY(19deg) !important;
  top: 50% !important;
  left: 50% !important;
  right: 4% !important;
  bottom: 3% !important;
  z-index: -1;
}
</style>