<script setup lang="ts">
import type { Product } from '@/types';
import Button from '../ui/Button.vue';
import { useCartStore } from '@/stores/cart';
import { toast } from "@steveyuowo/vue-hot-toast";

const props = defineProps<{ product: Product }>();

const cart = useCartStore();

function addToCart(product: Product) {
    cart.addToCart(product);
    toast.success("Added to Bag")
}

</script>
<template>
    <div class="card">
        <div class="card__img-container">
            <img class="card__img-container__img" :src="product.images[0]" alt="product cover">
        </div>
        <div class="card__details">
            <div class="card__details__category">{{ product.category.name.toUpperCase() }}</div>
            <div class="card__details__title">{{ product.title }}</div>
            <div class="card__details__actions">
                <div class="card__details__actions__price">${{ product.price }}</div>
                <div>
                    <Button @clicked="addToCart(product)" icon="pi pi-shopping-bag" text="Add to Bag" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/abstracts' as *;

.card {
    @include flex(column, flex-start, center);
    width: 280px;
    height: 430px;
    border-top-left-radius: $radius-sm;
    border-top-right-radius: $radius-sm;
    cursor: pointer;
    padding: 10px;

    &:hover {
        box-shadow: $my-shadow;
    }

    &__img-container {
        overflow: hidden;
        border-top-left-radius: $radius-sm;
        border-top-right-radius: $radius-sm;
        width: 100%;
        height: 400px;

        &__img {
            border-top-left-radius: $radius-sm;
            border-top-right-radius: $radius-sm;
            @include img-cover;
        }
    }

    &__details {
        font-family: $font-body;
        width: 100%;

        &__category {
            @include label-text;
            @include flex(row, center, center);
            width: fit-content;
            color: $color-gray-500;
            padding: 5px 0px;
        }

        &__title {
            @include body-text;
            font-size: $text-md;
            color: $color-gray-800;
            font-weight: $text-semibold;
            padding: 5px 0px;
        }

        &__actions {
            @include flex(row, center, space-between);
            font-weight: $text-bold;
            color: $color-gray-800;
            font-size: $text-md;
            width: 100%;
            padding: 10px 0px;
        }
    }
}
</style>