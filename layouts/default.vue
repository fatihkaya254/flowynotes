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
  border: 1px solid white;
  color: white;
  text-decoration: none;
    cursor: pointer;
  padding: 10px 30px;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
    cursor: pointer;
  border: 1px solid white;
  color: white;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
  text-align: center;
}

.shade {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.7) 10%,
    rgba(0, 0, 0, 0) 90%
  );
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
  height: 20px;
  width: 200px;
  color: white;
  padding: 10px 30px;
  border-bottom: 1px solid white;
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
  height: 20px;
  text-decoration: none;
  text-align: center;
  background: none;
  font-size: 12pt;
  padding: 10px 30px;
  width: 80%;
  max-width: 600px;
  border-bottom: 1px solid white;
  color: white;
}
.new--desc::placeholder {
  color: gray;
}
.new--title::placeholder {
  color: gray;
}
::-webkit-scrollbar {
  width: 1px;
  height: 1px;
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

@media only screen and (max-width: 800px) {
  body{
    overflow: hidden;
  }
  .button--green {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid white;
    color: white;
    text-decoration: none;
    padding: 10px 30px;
    cursor: pointer;
  }

  .button--grey {
    display: inline-block;
    cursor: pointer;
    border-radius: 4px;
    border: 1px solid white;
    color: white;
    text-decoration: none;
    padding: 2px 6px;
    margin-left: 15px;
    text-align: center;
  }

  .shade {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.7) 10%,
      rgba(0, 0, 0, 0) 90%
    );
  }
  .new--title {
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
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
    height: 20px;
    width: 200px;
    color: white;
    padding: 10px 30px;
    border-bottom: 1px solid white;
  }
  .new--title:focus {
    outline: none;
  }
  .new--desc:focus {
    outline: none;
  }
  .new--desc {
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 12pt;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
    border: none;
    height: 20px;
    text-decoration: none;
    text-align: center;
    background: none;
    font-size: 12pt;
    padding: 10px 30px;
    width: 80%;
    max-width: 600px;
    border-bottom: 1px solid white;
    color: white;
  }
  .new--desc::placeholder {
    color: gray;
  }
  .new--title::placeholder {
    color: gray;
  }
}
</style>
