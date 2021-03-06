import { createApp } from 'vue/dist/vue.esm-bundler'
import { createWebHistory, createRouter } from 'vue-router'
import { createI18n } from 'vue-i18n/index'
import { createStore  } from 'vuex'

import Locale_en_GB from '@/src/locales/en_GB.js'
import MainStore from '@/src/stores/main.js'

import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'

const store = createStore({
	modules: {
		main: MainStore
	}
});

const messages = {
	'en_GB': Locale_en_GB
}

const i18n = createI18n({
	locale: 'en_GB',
	fallbackLocale: 'en_GB',
	messages
})

const Main = () => import('@/src/components/main/Main.vue')
const Schemas = () => import('@/src/components/schemas/Schemas.vue')

const routes = [
	{
		path: '/',
		name: 'main',
		title: 'Main',
		component: Main,
		children: [
			{
				path: ':lang',
				component: Main
			}
		]
	},
	{
		path: '/schemas',
		name: 'schemas',
		title: 'Schemas',
		component: Schemas,
		children: [
			{
				path: ':lang',
				component: Schemas
			}
		]
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes
})

const routerApp = createApp(router)
routerApp.use(router)
routerApp.use(i18n)
routerApp.use(store)
routerApp.use(PrimeVue, {ripple: true})
routerApp.use(ConfirmationService)
routerApp.use(ToastService)
routerApp.mount('#router_app')
