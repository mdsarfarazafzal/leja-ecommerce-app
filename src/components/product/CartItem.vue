<script lang="ts" setup>
import type { Product } from '@/types';
import Button from '../ui/Button.vue';
import { useCartStore } from '@/stores/cart';

const props = defineProps<{ product: Product, value: number }>();

const cart = useCartStore();

function addToCart(product: Product) {
    cart.addToCart(product);
}

function removeFromCart(product: Product) {
    cart.removeFromCart(product);
}

function deleteFromCart(product: Product) {
    cart.deleteFromCart(product);
}

</script>
<template>
    <div class="item">
        <div class="item__img-container">
            <img :src="product.images[0]" alt="cart item pic" class="item__img-container__img">
        </div>
        <div class="item__details">
            <div class="item__details__category">
                <div>{{ product.category.name.toUpperCase() }}</div>
                <div><Button icon="pi pi-trash" text="" @clicked="deleteFromCart(product)" /></div>
            </div>
            <div class="item__details__title">{{ product.title }}</div>
            <div class="item__details__actions">
                <div class="item__details__actions__price">
                    ${{ product.price * value }}
                </div>
                <div class="item__details__actions__btns">
                    <div class="item__details__actions__btn">
                        <Button @clicked="addToCart(product)" icon="pi pi-plus" />
                    </div>
                    <div class="item__details__actions__value">
                        {{ value }}
                    </div>
                    <div class="item__details__actions__btn">
                        <Button icon="pi pi-minus" @clicked="removeFromCart(product)" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
@use '@/assets/scss/abstracts' as *;

.item {
    @include flex(row, flex-start, flex-start);
    // background-color: green;
    margin-bottom: 20px;

    &__img-container {
        width: 150px;
        border-radius: $radius-lg;
        height: 150px;

        &__img {
            border-radius: $radius-lg;
            @include img-cover;
        }
    }

    &__details {
        @include flex(column, flex-start, center, 20px);
        // background-color: orange;
        padding: 24px;

        &__actions {
            @include flex(row, center, space-between);
            // background-color: orange;
            width: 320px;
            @include body-text;

            &__price {
                font-weight: $text-bold;
            }

            &__btns {
                @include flex(row, center, space-between);
                // background-color: green;
                width: 100px;
            }
        }

        &__category {
            @include label-text;
            color: $color-gray-500;
            @include flex(row, flex-start, space-between);
            width: 320px;
        }

        &__title {
            @include body-text;
            color: $color-gray-800;
            font-weight: $text-semibold;
        }
    }
}
</style>