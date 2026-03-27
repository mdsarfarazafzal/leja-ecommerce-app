<script setup lang="ts">

import { useCartStore } from '@/stores/cart';
import 'primeicons/primeicons.css'

const props = defineProps({ text: String, icon: String, badge: Number });
const emit = defineEmits(['clicked']);
function clicked() {
    return emit('clicked');
}
const cart = useCartStore();
</script>
<template>
    <div>
        <div v-if="badge" class="badge">
            {{ badge }}
        </div>
        <button class="btn" @click="clicked">
            <span v-if="icon" :class="icon"></span> {{ text }}
        </button>
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/abstracts' as *;


.badge {
    background-color: $color-gray-800;
    @include label-text;
    color: $color-neutral-50;
    width: 20px;
    height: 20px;
    @include flex(row, center, center);
    border-radius: $radius-full;
    position: absolute;
    margin-left: 55px;
    margin-top: -8px;
}

.btn {
    @include flex(row, center, center, 0.5rem);
    cursor: pointer;
    display: inline-flex;
    text-decoration: none;
    border-radius: $radius-full;
    border: $border-light;
    padding: 5px 10px;
    background-color: transparent;
    color: $color-gray-800;
    @include body-text;

    &:hover {
        background-color: $color-gray-800;
        color: $color-neutral-50;
        border: $border-dark;
    }
}
</style>