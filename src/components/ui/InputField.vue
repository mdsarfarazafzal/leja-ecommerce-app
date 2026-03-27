<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps({ type: String, name: String });
const value = ref('');
const emit = defineEmits(['send'])
function send() {
    return emit('send', value)
}
</script>
<template>
    <div class="auth__form-container__form__fields">
        <label class="auth__form-container__form__fields__label">{{ name }} *</label>
        <input v-model="value" @input="send" class="auth__form-container__form__fields__input" :type="type" required />
    </div>
</template>