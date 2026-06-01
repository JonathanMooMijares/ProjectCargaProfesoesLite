<script setup>
import HeaderUPN from './components/headerUPN.vue'
import NavUPN from './components/navUPN.vue'

const enlacesCE = {
  profesores: {
    titulo: 'Profesores',
    ruta: '/profesores'
  },
  materias: {
    titulo: 'Materias',
    ruta: '/materias'
  },
  periodos: {
    titulo: 'Periodos',
    ruta: '/periodos'
  },
  cargas: {
    titulo: 'Cargas Académicas',
    ruta: '/cargas'
  },
  salida: {
    titulo: 'Regresar',
    ruta: '/'
  }
}

</script>

<template>
  <header class="border-bottom py-3 shadow-lg bg-white">
    <HeaderUPN />
  </header>
  <nav id="navItem" class="nav justify-content-center">
    <NavUPN v-for="navElemento in enlacesCE" :navElementos="navElemento" />
  </nav>
  <main class="container mt-4">
    <RouterView/>
  </main>



</template>

<style scoped>
nav {
  background-color: #1a5fa9;
}
</style>
