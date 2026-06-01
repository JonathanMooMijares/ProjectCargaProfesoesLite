<template>
    <div class="container">
        <div class="d-flex align-items-center justify-content-between flex-wrap gap-2">

            <div class="d-flex align-items-center justify-content-center gap-5 pe-5">
                <img :src="elementos.logoIzquierdo" alt="Logo Quintana Roo" height="75" class="logoResponsive" />
            </div>

            <div class="d-flex align-items-center gap-5 flex-grow-1 justify-content-center title text-center fw-bold">
                {{ elementos.titulo }}
            </div>

            <div class="d-flex align-items-center justify-content-center gap-5">
                <img :src="elementos.logoDerecho" alt="Logo UPN" height="75" class="logoResponsive" />
            </div>

        </div>
    </div>
</template>

<script setup>
import logoQRooDefault from '@/assets/logos/logoQuintanaRoo.png'
import logoUpnDefault from '@/assets/logos/logoUPN.png'

const elementos = {
    titulo: 'SISTEMA DE CONTROL ESCOLAR',
    logoIzquierdo: logoQRooDefault,
    logoDerecho: logoUpnDefault
}

</script>
