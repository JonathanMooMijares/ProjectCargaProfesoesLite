import { createRouter, createWebHistory } from 'vue-router'
import Bienvenida from '@/views/Bienvenida.vue'
// import DocentesView from '@/views/DocentesView.vue'
// import MateriasView from '@/views/MateriasView.vue'
// import PeriodosView from '@/views/PeriodosView.vue'

const routes = [
    { path: '/', name: 'Bienvenida', component: Bienvenida },
    // { path: '/docentes', name: 'docentes', component: DocentesView },
    // { path: '/materias', name: 'materias', component: MateriasView },
    // { path: '/periodos', name: 'periodos', component: PeriodosView }
]

export default createRouter({ history: createWebHistory(), routes })
