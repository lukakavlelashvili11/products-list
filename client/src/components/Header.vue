<script setup></script>

<template>
  <header class="header">
    <router-link class="header__home" :to="'/'"> Home </router-link>
    <router-link to="/cart">
      <img class="header__cart-icon" src="@/assets/img/cart.svg" />
    </router-link>
  </header>
</template>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 70px;
  box-shadow: 0px 0px 3px rgb(206, 206, 206);
  &__home {
    color: black;
    text-decoration: none;
    font-family: medium;
    font-size: 18px;
  }
  &__cart-icon {
    width: 30px;
    cursor: pointer;
  }
}
</style>
