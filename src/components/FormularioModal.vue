<template>
    <transition name="fade">
        <div v-if="show" class="modal d-block" tabindex="-1"
            style="background-color: rgba(0, 0, 0, 0.5); backdrop-filter: blur(2px);" @click.self="$emit('close')">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content shadow-lg border-0">

                    <div class="modal-header">
                        <h5 class="modal-title fw-bold text-dark">{{ title }}</h5>
                        <button type="button" class="btn-close" aria-label="Close" @click="$emit('close')"></button>
                    </div>

                    <div class="modal-body p-4">
                        <slot />
                    </div>

                </div>
            </div>
        </div>
    </transition>
</template>

<script setup>
defineProps({
    title: { type: String, required: true },
    show: { type: Boolean, default: false }
})
defineEmits(['close'])
</script>
