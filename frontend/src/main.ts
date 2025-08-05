import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
// import ToastService from 'primevue/toastservice'
import Tooltip from 'primevue/tooltip'

import App from './App.vue'
// import router from './router'

// Estilos do PrimeVue
import 'primevue/resources/themes/lara-light-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

// Tailwind CSS
import './style.css'

const app = createApp(App)

// Pinia para gerenciamento de estado
app.use(createPinia())

// Vue Router (comentado por enquanto)
// app.use(router)

// Vue Query para cache e sincronização de dados
app.use(VueQueryPlugin)

// PrimeVue
app.use(PrimeVue)
app.use(ConfirmationService)
// app.use(ToastService)

// Diretivas
app.directive('tooltip', Tooltip)

app.mount('#app')