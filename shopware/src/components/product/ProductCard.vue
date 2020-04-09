<template>
    <div class="col mb-4">
        <!-- Card -->
        <div class="card">

        <!--Card image-->
        <div class="view overlay">
            <img class="card-img-top" :src="product.image"
            alt="Card image cap">
            <router-link :to="{name: 'Product', params: {id: product.id}}">
            <div class="mask rgba-white-slight"></div>
            </router-link>
        </div>

        <!--Card content-->
        <div class="card-body">

            <!--Title-->
            <h4 class="card-title">{{ product.name }}</h4>
            <!--Text-->
            <p class="card-text">{{ product.shortDescription }}</p>
            <p class="card-text">{{ product.price }} SEK</p>
            <!-- Provides extra visual weight and identifies the primary action in a set of buttons -->
            <router-link :to="{name: 'Product', params: {id: product._id}}" class="btn btn-light-blue btn-md">Visa Produkt</router-link>

        </div>

        </div>
        <!-- Card -->
    </div>
</template>

<script>
export default {
    name: 'ProductCard',
    props: ['product']
}
</script>

<style>

</style>