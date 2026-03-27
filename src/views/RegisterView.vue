<script setup lang="ts">
import Button from '@/components/ui/Button.vue';
import InputField from '@/components/ui/InputField.vue';
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
const form = ref({
    email: '',
    password: '',
    name: '',
    avatar: 'https://i.pravatar.cc/150'
});

const auth = useAuthStore();



function recieveEmail(value: string) {
    form.value.email = value;
}

function recievePassword(value: string) {
    form.value.password = value;
}

function recieveName(value: string) {
    form.value.name = value;
}

async function register() {
    await auth.create(form.value);
    form.value.email = '';
    form.value.password = '';
    form.value.name = '';
}

</script>
<template>
    <div class="auth">
        <div class="auth__form-container">
            <div class="auth__form-container__heading">
                Create account
                <p class="auth__form-container__heading__label">Join LEJA and start shopping</p>
            </div>
            <form class="auth__form-container__form" @submit.prevent="register">
                <InputField type="text" name="Full Name" @send="recieveName($event)" />
                <InputField type="email" name="Email" @send="recieveEmail($event)" />
                <InputField type="password" name="Password" @send="recievePassword($event)" />
                <div class="auth__form-container__form__actions">
                    <Button text="Register" />
                    <p class="auth__form-container__heading__label">Already have an account? <RouterLink
                            class="auth__form-container__form__actions__link" to="/login">
                            Sign in
                        </RouterLink>
                    </p>
                </div>
            </form>
        </div>
    </div>
</template>
