<template>
    <div class="container border justify-content-between d-flex align-items-center mb-4">
        <div>
            <div>
                <h1>{{ title }}</h1>
            </div>
        </div>
        <div>
            <button class="btn btn-success" @click="$emit('accion')">
                <div class="small m-2">
                    + {{ btnLabel }}
                </div>
            </button>
        </div>
    </div>
</template>

<script setup>
import { reactive, toRefs } from 'vue'
defineProps({
    title: String,
    btnLabel: {
        type: String,
        default: 'Nuevo'
    }
})

defineEmits(['accion'])
</script>
