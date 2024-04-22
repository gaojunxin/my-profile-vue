import './assets/main.css'
import 'virtual:uno.css'
import 'virtual:svg-icons-register'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import SvgIcon from '@/components/svgicon/index.vue'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'

import App from './App.vue'
import router from './router'


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('svg-icon', SvgIcon)


app.mount('#app')
