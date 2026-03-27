<script setup lang="ts">
import ProductCard from '@/components/product/ProductCard.vue';
import { useProductStore } from '@/stores/products';
import { onMounted } from 'vue';
const products = useProductStore();

onMounted(async () => await Promise.all([products.fetchProducts(), products.fetchCategories()]))
</script>
<template>
    <div class="products-view" v-if="products.filteredProducts().length">
        <div v-for="product in products.filteredProducts()" :key="product.id">
            <ProductCard :product="product" />
        </div>
    </div>
    <div v-else class="empty">
        <p><span class="pi pi-info-circle"></span> Looks empty here...</p>
    </div>

</template>

<style scoped lang="scss">
@use '@/assets/scss/abstracts' as *;

.empty {
    width: 100%;
    min-height: calc(100vh - 100px);

    @include flex(row, center, center);
    @include body-text;
    color: $color-gray-800;

    p {
        @include flex(row, center, center, 5px)
    }
}

.products-view {
    @include flex(row, flex-start, flex-start, 15px);
    padding: 50px 210px;
    flex-wrap: wrap;
}
</style>