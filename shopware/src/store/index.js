import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/helpers/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: [], 
    products: [], 
    product: null 
  },
  mutations: {

    GET_PRODUCT_BYID(state, product) {
      state.product = product                                                                  // Tar in res.data och denna sätter staten där uppe på products: null,
      sessionStorage.setItem('product', state.product)
    },
    GET_PRODUCTS(state, product) {
      state.products = product                                                                  // Tar in res.data och denna sätter staten där uppe på products: null,
      sessionStorage.setItem('products', state.products)
    },


    ADD_TO_CART(state, {product, quantity}) {
      let exists = state.cart.find(item => { return item.product.id === product.id})           // Lösa så att den lägger till i quantity i localhost. Lägger till och uppdaterar objekt i en lista. https://stackoverflow.com/questions/4689856/how-to-change-value-of-object-which-is-inside-an-array-using-javascript-or-jquer/50504081
      if(exists) {
        exists.quantity += quantity
        return
      }

      state.cart.push({product, quantity})
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    DELETE_FROM_CART(state, id) {
      state.cart = state.cart.filter(item => { return item.product.id !== id})
      localStorage.setItem('cart', JSON.stringify(state.cart))
    }

  },
  actions: {

    getProductById({commit}, id) {            // FIXA API

      axios.get('/products/' + id) 
      .then(res => { 
        if(res !== null) {
          commit('GET_PRODUCT_BYID', res.data)
          console.log(res.data)
        } else {
          console.log("Något gick fel 1...")
        }
      })
    },

    getProducts({commit}) {
      axios.get('/products')
      .then(res => {
        if(res !== null) {
          commit('GET_PRODUCTS', res.data)
        } else {
          console.log("Något gick fel 2...")
        } 
      })
    },




    addProductToCart({commit}, { product, quantity}) {
      commit('ADD_TO_CART', { product, quantity})
    },
    deleteProductFromCart({commit}, id) {
      commit('DELETE_FROM_CART', id)
    } 
  },
  getters: {

    products(state) {
      return state.products
    },
    product(state) {                                                           // Denna är mapGetters product. Hämtar en product. (product: null)
      return state.product
    },




    shoppingCart(state) {
      state.cart = JSON.parse(localStorage.getItem('cart'))
      return state.cart
    },
    shoppingCartTotal(state) {
      let total = 0
      if(state.cart.length !== 0) {
        state.cart.forEach(item => {
          total += item.product.price * item.quantity
        })
      }
      return total
    },
    shoppingCartItemCount(state) {
      let items = 0
      state.cart.forEach(item => {
        items += item.quantity
      })
      return items
    }
  }
})