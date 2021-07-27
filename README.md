yi
======
An easy way to use Web Components.

Installation
------
Only support ES6 module in browser.
```
import Yi from "./yi.js"
```

Usage
------
1. write a `HelloWorld.html` file
```html
<template>
    <div>Hello <slot>world</slot></div>
</template>

```
the template file name must same with component name in order to load by Yi
2. write a `HelloWorld.js` file
```javascript
import Yi from '../src/yi.js'

export default class HelloWorld extends Yi {

}

```

3. import and register your component in you ecmascript
```html
<html>
    <head></head>
    <body>
    <hello-world></hello-world>
    <hello-world>Yi</hello-world>
    <script type="module">
        import HelloWorld from "./HelloWorld.js";
        customElements.define('hello-world', HelloWorld)
    </script>
    </body>
</html>
```

you can see example in `example` dir
