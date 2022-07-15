<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const props = defineProps({
  title: {
    type: String,
    default: null
  },
  subTitle: {
    type: String,
    default: null
  },
  schedule: {
    type: Object,
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

const top = (start) => {
  return Number(start.split(':')[1]) * 100 / 60
}

const contain = (hour, start) => {
  return hour === Number(start.split(':')[0])
}

const show = ref(false)
const onIntersection = (entry) => {
  show.value = entry.isIntersecting
}

</script>
<template>
  <div class="q-px-sm">
    <div class="title" :class="`text-${textColor}`">{{ title }}</div>
    <div class="sub-title text-subtitle2" :class="`text-${textColor}`">{{ subTitle }}</div>
    <q-markup-table square bordered class="no-shadow schedule-table no-hover" :class="show ? 'show' : ''" wrap-cells
      dense separator="cell" v-intersection="onIntersection">
      <thead>
        <tr>
          <th class="bg-transparent"></th>
          <th class="week" v-for="(s, day) in schedule.schedule" :key="day">
            <div class="text-weight-bold text-uppercase">{{ rt(tm(`weekShort.${day}`)) }}</div>
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-for="span in schedule.span" :key="span">
          <tr>
            <td>
              <div class="row justify-center items-center">
                <div>{{ `${span.start.toString().padStart(2, '0')}: 00` }}</div>
                <div>~</div>
                <div>{{ `${span.end.toString().padStart(2, '0')}: 00` }}</div>
              </div>
            </td>
            <td class="text-center relative-position" v-for="(s, day) in schedule.schedule" :key="day">
              <template v-for="(i, idx) in s" :key="idx">
                <div class="inter" :style="`top: ${top(i.start)}%;height:${i.height}%;`"
                  v-if="contain(span.start, i.start)">
                  <div class="tag" :style="`background-color:${i.bgColor}`"></div>
                  <div class="column full-width text  absolute-center q-gutter-y-xs">
                    <div>{{ i.program[locale] }}</div>
                    <div class="ellipsis full-width">{{ i.fixed ? i.fixed : `${i.start} ~ ${i.end}` }}
                    </div>
                  </div>
                  <q-btn class="btn absolute-center fit" :icon="i.icon" flat dense>
                    <q-menu no-refocus square>
                      <q-card square class="shadow-1 text-center">
                        <q-card-section class="text-white text-weight-bold text-subtitle1 q-py-sm bg-secondary">
                          {{ i.program[locale] }}
                        </q-card-section>
                        <q-card-section>
                          <div class="column items-center q-gutter-y-xs">
                            <div>{{ rt(tm(`week.${day}`)) }}</div>
                            <div>{{ i.fixed ? i.fixed : `${i.start} ~ ${i.end}` }}</div>
                          </div>
                        </q-card-section>
                      </q-card>
                    </q-menu>
                  </q-btn>
                </div>
              </template>
            </td>
          </tr>
        </template>
      </tbody>
    </q-markup-table>
  </div>
</template>

<style scoped>
.schedule-table {
  margin-top: 2vh;
  transition: opacity 1s ease;
  opacity: 0;
}

.schedule-table.show {
  opacity: 1;
}

.schedule-table th,
.schedule-table td {
  width: 14%;
  padding: 0 !important;
}

.schedule-table td::before {
  background-color: rgba(0, 0, 0, 0);
}

.inter {
  position: absolute;
  width: 100%;
  z-index: 1;
}

.inter .btn {
  box-shadow: inset 0 0 1px 0 rgba(0, 0, 0, .2);
  background-color: rgba(200, 200, 200, .2);
}

.inter .tag {
  position: absolute;
  opacity: .5;
  width: 6%;
  height: 100%;
}

.inter .text {
  display: none;
}

@media (max-width:399px) {

  .schedule-table th,
  .schedule-table td {
    font-size: .7em !important;
    height: 56px !important;
  }
}

@media (min-width:400px) and (max-width:799px) {

  .schedule-table th,
  .schedule-table td {
    font-size: 1em !important;
    height: 70px !important;
  }
}

@media (min-width:800px) and (max-width:1199px) {

  .schedule-table th,
  .schedule-table td {
    font-size: 1em !important;
    height: 90px !important;
  }
}

@media (min-width:1200px) {

  .schedule-table td {
    height: 120px !important;
  }

  .inter {
    border-top: solid 1px rgba(0, 0, 0, .1);
    border-bottom: solid 1px rgba(0, 0, 0, .1);
    background-color: rgba(200, 200, 200, .2);
  }

  .inter:hover {
    background-color: rgba(230, 230, 230, 1);
  }

  .inter .btn {
    display: none;
  }

  .inter .tag {
    width: 4%;
    opacity: .5;
  }

  .inter .text {
    padding-left: 4%;
    display: block;
  }
}
</style>