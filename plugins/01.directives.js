// import {defineEmits} from 'vue'
// const emits = (...args) => defineEmits([...args])
//
import clickoutside from '@/directives/plugins/clickoutside';

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.directive('clickoutside', clickoutside)
})
