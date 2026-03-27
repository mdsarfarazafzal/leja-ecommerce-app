<script lang="ts" setup>
import CartItem from '@/components/product/CartItem.vue';
import Button from '@/components/ui/Button.vue';
import InputField from '@/components/ui/InputField.vue';
import { useAuthStore } from '@/stores/auth';
import { useCartStore } from '@/stores/cart';
import { useOrderStore } from '@/stores/order';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const cart = useCartStore();

const form = ref({
    name: '',
    email: '',
    address: ''
});

const auth = useAuthStore();
const order = useOrderStore();
const router = useRouter();

function addOrder() {
    if (!auth.isAuthenticated) {
        router.push('/login');
        return;
    }
    order.addOrder({
        name: form.value.name,
        email: form.value.email,
        address: form.value.address,
        cart: Array.from(cart.getCart.values()),
        user: auth.getUser!,
        id: Date.now(),
        price: cart.total
    })
    form.value.address = '';
    form.value.name = '';
    form.value.email = '';
}


</script>
<template>
    <div class="bag" v-if="cart.getCart.size">
        <div class="bag__left">
            <div class="bag__left__heading"><span class="pi pi-shopping-bag
"></span> Your Bag</div>
            <CartItem v-for="[key, value] in cart.getCart" :key="key" :product="value.product"
                :value="value.quantity" />
        </div>
        <div class="bag__right">
            <div class="bag__right__heading"><span class="pi pi-receipt"></span> Order Summary</div>
            <div class="bag__right__summary">
                <div class="bag__right__summary__rows">
                    <div>Subtotal</div>
                    <div>${{ cart.subTotal }}</div>
                </div>
                <div class="bag__right__summary__rows bag__right__summary__shipping">
                    <div>Shipping</div>
                    <div>${{ cart.shipping }}</div>
                </div>
                <div class="bag__right__summary__rows">
                    <div>Total
                    </div>
                    <div>${{ cart.total }}</div>
                </div>
            </div>
            <form class="bag__right__form" @submit.prevent="addOrder">
                <div class="bag__right__form__row">
                    <InputField type="text" name="Full Name" @send="(name) => form.name = name" />
                    <InputField type="email" name="Email" @send="(email) => form.email = email" />
                    <InputField type="text" name="Full Address" @send="(address) => form.address = address" />
                    <Button icon="pi pi-angle-double-right" text="Checkout" />
                </div>
            </form>
        </div>
    </div>
    <div class="bag" v-else>
        <p><span class="pi pi-info-circle"></span> Your Bag is empty.</p>
    </div>
</template>
<style lang="scss" scoped>
@use '@/assets/scss/abstracts' as *;

.bag {
    width: 100%;
    min-height: calc(100vh - 100px);

    @include flex(row, center, center);
    @include body-text;
    color: $color-gray-800;

    p {
        @include flex(row, center, center, 5px)
    }

    &__left {
        height: calc(100vh - 150px);
        overflow-y: auto;
        width: 50%;
        padding-top: 50px;
        padding-left: 120px;

        &__heading {
            @include heading-text;
            margin-bottom: 20px;
            text-align: center;
            color: $color-gray-800;
        }
    }

    &__right {
        width: 50%;
        height: calc(100vh - 150px);
        padding-top: 50px;
        padding-left: 120px;
        @include flex(column, flex-start, flex-start, 50px);

        &__heading {
            @include heading-text;
            width: 350px;
            text-align: center;
            color: $color-gray-800;
        }

        &__summary {
            @include flex(column, flex-start, center, 10px);

            &__rows {
                @include flex(row, flex-start, space-between);
                width: 320px;
                font-weight: $text-bold;
                @include body-text;
                padding-left: 5px;
                padding-right: 5px;

            }

            &__shipping {
                border-bottom: $border-light;
                padding-bottom: 5px;
            }
        }

        &__form {
            @include flex(column, flex-start, flex-start, 20px);

            &__row {
                width: 330px;
                @include flex(column, flex-end, flex-start, 20px);
            }
        }
    }
}
</style>