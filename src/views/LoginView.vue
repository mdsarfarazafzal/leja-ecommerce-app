<script setup lang="ts">
import Button from '@/components/ui/Button.vue';
import InputField from '@/components/ui/InputField.vue';
import { useAuthStore } from '@/stores/auth';
import { toast } from '@steveyuowo/vue-hot-toast';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const form = ref({
    email: '',
    password: ''
});

const auth = useAuthStore();

const router = useRouter();

function recieveEmail(value: string) {
    form.value.email = value;
}

function recievePassword(value: string) {
    form.value.password = value;
}

async function login() {
    await auth.login(form.value);
    if (auth.isAuthenticated) {
        form.value.email = '';
        form.value.password = '';
        router.push('/');
    } else {
        toast.error("Login Failed")
    }
}

</script>
<template>
    <div class="auth">
        <div class="auth__form-container">
            <div class="auth__form-container__heading">
                Welcome back
                <p class="auth__form-container__heading__label">Sign in to your account to continue</p>
            </div>
            <form class="auth__form-container__form" @submit.prevent="login">
                <InputField type="email" name="Email" @send="recieveEmail($event)" />
                <InputField type="password" name="Password" @send="recievePassword($event)" />
                <div class="auth__form-container__form__actions">
                    <Button text="Login" />
                    <p class="auth__form-container__heading__label">New to LEJA? <RouterLink
                            class="auth__form-container__form__actions__link" to="/register">
                            Register here
                        </RouterLink>
                    </p>
                </div>
            </form>
        </div>
    </div>
</template>
