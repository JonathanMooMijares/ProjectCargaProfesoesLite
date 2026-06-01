<template>
    <header class="border-bottom py-3 shadow-lg bg-white">
        <div class="container">
            <div class="d-flex align-items-center justify-content-between flex-wrap gap-2">

                <div class="d-flex align-items-center justify-content-center gap-5 pe-5">
                    <img :src="logoIzquierdo" alt="Logo Quintana Roo" height="75" class="logoResponsive" />
                </div>

                <div
                    class="d-flex align-items-center gap-5 flex-grow-1 justify-content-center title text-center fw-bold">
                    {{ titulo }}
                </div>

                <div class="d-flex align-items-center justify-content-center gap-5">
                    <img :src="logoDerecho" alt="Logo UPN" height="75" class="logoResponsive" />
                </div>

            </div>
        </div>
    </header>
</template>

<script setup>
import { defineProps } from 'vue'
import logoQRooDefault from '@/assets/logos/logoQuintanaRoo.png'
import logoUpnDefault from '@/assets/logos/logoUPN.png'

defineProps({
    titulo: {
        type: String,
        default: 'SISTEMA DE CONTROL ESCOLAR'
    },
    logoIzquierdo: {
        type: String,
        default: logoQRooDefault
    },
    logoDerecho: {
        type: String,
        default: logoUpnDefault
    }
})
</script>
