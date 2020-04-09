<template>
    <div class="cart-item">
        <div class="p-2 d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
                <img :src="item.product.image" alt="" class="img-fluid img-width">
                <div>
                    <div>
                        <strong>{{item.product.name}}</strong>
                    </div>
                    <div>
                    <small> {{item.quantity}} x {{item.product.price}} SEK</small>
                    </div>
                </div>
            </div>

            <div>
                <div class="btn-group btn-group-sm" role="group" aria-label="quantity">
                    <button type="button" class="btn btn-grey px-3" v-on:click.stop="deleteOneProduct(item.product.id)">-</button>
                    <button type="button" class="btn btn-grey px-3" v-on:click.stop="addOneProduct(item.product.id)">+</button>
                </div>

                <button class="btn btn-danger btn-sm px-3" v-on:click.stop="deleteProductFromCart(item.product.id)"><i class="fas fa-trash-alt"></i></button>
            </div>
        </div>
        <div class="dropdown-divider"></div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    props: ['item'],
    methods: {
        ...mapActions(['deleteProductFromCart'])
    }
}
</script>

<style scoped>
    .img-width{
        width: 90px;
    }
</style>