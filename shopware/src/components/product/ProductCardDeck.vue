<template>
    <div class="row row-cols-1 row-cols-md-3">

        <ProductCard v-for="product in products" :key="product._id" :product="product" /> <!-- _id här med? mongodb har så. Använda getter på :product="product"? getter används på nästa sida-->

    </div>
</template>

<script>
import ProductCard from './ProductCard'
import { mapGetters , mapActions } from 'vuex'

export default {
    name: 'ProductCardDeck',
    components: {
        ProductCard
    },
    methods: {
        ...mapActions(['getProducts'])
    },
    created() { 
        this.getProducts()
    },
    computed: {
        ...mapGetters(['products'])
    }
}
</script>

<style>

</style>