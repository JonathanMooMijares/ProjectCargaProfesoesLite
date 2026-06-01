import { createRouter, createWebHistory } from 'vue-router'
import Bienvenida from '@/views/Bienvenida.vue'
import ProfesoresView from '@/views/ProfesoresVIew.vue'
import MateriasView from '@/views/MateriasView.vue'
import PeriodosView from '@/views/PeriodosView.vue'

const routes = [
    { path: '/', name: 'Bienvenida', component: Bienvenida },
    { path: '/profesores', name: 'profesores', component: ProfesoresView },
    { path: '/materias', name: 'materias', component: MateriasView },
    { path: '/periodos', name: 'periodos', component: PeriodosView }
]

export default createRouter({ history: createWebHistory(), routes })
