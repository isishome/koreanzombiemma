import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => ({
    loaded: false,
    header: 0,
    ratio: 1,
    sizes: '(max-width: 400px) 400w, (min-width: 400px) and (max-width: 800px) 800w, (min-width: 800px) and (max-width: 1200px) 1200w, (min-width: 1200px) 1600w'
  })
})