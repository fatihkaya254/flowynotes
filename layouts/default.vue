<template>
  <div>
    <Nuxt />
  </div>
</template>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
  text-align: center;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.new--title {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  border: none;
  text-decoration: none;
  text-align: center;
  background: none;
  font-size: 12pt;
  width: 200px;
  padding: 10px 30px;
  border-bottom: 1px solid #35495e;
}
.new--title:focus {
  outline: none;
}
.new--desc:focus {
  outline: none;
}
.new--desc {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  border: none;
  text-decoration: none;
  text-align: center;
  background: none;
  font-size: 12pt;
  padding: 10px 30px;
  width: 80%;
  max-width: 600px;
  border-bottom: 1px solid #35495e;
}

::-webkit-scrollbar {
  width: 1px;
  border-radius: 1em;
}

::-webkit-scrollbar-track {
  background: #ffffff;
  border-radius: 1em;
}
::-webkit-scrollbar-thumb {
  background: #000;
  border-radius: 1em;
}
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
