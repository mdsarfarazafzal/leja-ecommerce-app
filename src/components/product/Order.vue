<script setup lang="ts">
import type { Order } from '@/types';

const props = defineProps<{
    order: Order
}>();
</script>

<template>
    <div class="order-container">
        <div class="order-container__row">
            <div class="order-container__row__key">Order Id</div>
            <div>{{ order.id }}</div>
        </div>
        <div class="order-container__row">
            <div class="order-container__row__key">Ordered By</div>
            <div>{{ order.name }}</div>
        </div>
        <div class="order-container__row">
            <div class="order-container__row__key">Email</div>
            <div>{{ order.email }}</div>
        </div>
        <div class="order-container__row">
            <div class="order-container__row__key">Address</div>
            <div>{{ order.address }}</div>
        </div>

        <div class="order-container__row">
            <div class="order-container__row__key">Products</div>

            <div v-for="item in order.cart.map((item) => `${item.product.title} -- $${item.product.price} x ${item.quantity}`)"
                :key="item">
                {{ item }}
            </div>

        </div>
        <div class="order-container__row">
            <div class="order-container__row__key">Shipping Charges</div>
            <div>$9</div>
        </div>
        <div class="order-container__row">
            <div class="order-container__row__key">Total Order Cost</div>
            <div>${{ order.price }}</div>
        </div>

    </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/abstracts' as *;

.order-container {
    @include flex(column, flex-start, space-between, 5px);
    @include label-text;
    color: $color-gray-800;
    margin-bottom: 15px;
    border-bottom: $border-light;
    padding-bottom: 5px;

    &__row {
        width: 100%;
        @include flex(column, flex-start, space-between);

        &__key {
            font-weight: $text-bold;
        }
    }
}
</style>