<script setup lang="ts">
import { useProductStore } from '@/stores/products'
import type { Category } from '@/types'
import { computed, onMounted, ref, Teleport } from 'vue'
import Button from '../ui/Button.vue'
import { useRouter, RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { useOrderStore } from '@/stores/order';

const products = useProductStore()
const auth = useAuthStore()
const cart = useCartStore()
const orders = useOrderStore()

onMounted(() => {
    products.fetchCategories()
    cart.init();
    auth.init();
    orders.init();
})
const navLinks = computed(() => [
    { label: 'All Products', to: { name: 'products' } },
    ...products.categories
        .slice(0, 6)
        .map((c: Category) => ({ label: c.name, to: { name: 'category', params: { id: c.id } } })),
])

const router = useRouter()


const bagCount = computed(() => cart.getCart.size)

function setCategory(
    link: any
) {
    if (link.label === 'All Products') {
        products.setCategory(null)
    } else {
        products.setCategory(link.to.params.id)
    }
}
</script>
<template>
    <nav class="navbar">
        <div class="navbar__top">
            <RouterLink to="/" class="navbar__top__logo-container">
                <img class="navbar__top__logo-container__img" src="/favicon.png" alt="app logo" />
            </RouterLink>
            <RouterLink to="/" class="navbar__top__logo-text"> LEJA </RouterLink>
            <div class="navbar__top__actions">
                <RouterLink to="/bag">
                    <Button icon="pi pi-shopping-bag" text="Bag" :badge="bagCount" />
                </RouterLink>
                <Button v-if="auth.isAuthenticated" icon="pi pi-user" :text="auth.getUser?.name.split(' ')[0]"
                    @clicked="() => router.push('/profile')" />
                <Button v-if="!auth.isAuthenticated" icon="pi pi-user" text="Sign in"
                    @clicked="() => router.push('/login')" />
            </div>
        </div>
        <div class="navbar__bottom">
            <RouterLink class="navbar__bottom__links" v-for="link in navLinks" @click="setCategory(link)"
                :key="link.label" :to="link.to">
                {{ link.label }}
            </RouterLink>
        </div>
    </nav>
</template>
<style scoped lang="scss">
@use '@/assets/scss/abstracts' as *;

.navbar {
    position: sticky;
    top: 0;
    border-bottom: $border-light;
    background-color: $color-white;

    &__top {
        @include flex(row, center, space-between);
        padding: 15px 120px;

        &__logo-container {
            width: 28px;
            height: 28px;
            cursor: pointer;

            &__img {
                @include img-cover;
            }
        }

        &__logo-text {
            @include heading-text;
            text-decoration: none;
            color: $color-gray-800;
            // flex: 1;
            text-align: center;
            padding-left: 150px;
        }

        &__actions {
            @include flex(row, center, space-between, 20px);
        }
    }

    &__bottom {
        @include flex(row, center, center, 40px);
        border-top: $border-light;
        padding: 0 240px;

        &__links {
            text-decoration: none;
            @include body-text;
            color: $color-gray-800;
            font-weight: $text-thin;
            max-width: fit-content;
            padding: 10px 0px;

            &.router-link-active {
                font-weight: $text-bold;
                border-bottom: $border-dark;
            }

            &:hover {
                font-weight: $text-bold;
            }
        }
    }
}
</style>
