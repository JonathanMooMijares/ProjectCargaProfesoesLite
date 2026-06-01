import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/',              redirect: '/asignaciones' },
  { path: '/docentes',      component: DocentesView },
  { path: '/materias',      component: MateriasView },
  { path: '/periodos',      component: PeriodosView }
]

export default createRouter({ history: createWebHistory(), routes })
