<template>
  <div id="app">
    <nav>
      <router-link to="/one">1人で遊ぶ</router-link> |
      <router-link to="/two">2人で遊ぶ</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 50px;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    font-size: 18px;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
