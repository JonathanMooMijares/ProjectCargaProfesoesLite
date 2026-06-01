<template>     
    <RouterLink class="nav-link active" :to="navElementos.ruta">{{ navElementos.titulo }}</RouterLink>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
    navElementos: {
        type: Object,
    }
})
</script>

<style scoped>
.nav-link {
    text-decoration: none;
    color: #FFf;
}

.nav-link:hover {
    color: #dcdcdc;
}
</style>