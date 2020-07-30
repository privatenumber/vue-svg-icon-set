# vue-svg-icon-set  <a href="https://npm.im/vue-svg-icon-set"><img src="https://badgen.net/npm/v/vue-svg-icon-set"></a> <a href="https://npm.im/vue-svg-icon-set"><img src="https://badgen.net/npm/dm/vue-svg-icon-set"></a> <a href="https://packagephobia.now.sh/result?p=vue-svg-icon-set"><img src="https://packagephobia.now.sh/badge?p=vue-svg-icon-set"></a> <a href="https://bundlephobia.com/result?p=vue-svg-icon-set"><img src="https://badgen.net/bundlephobia/minzip/vue-svg-icon-set"></a>

`vue-svg-icon-set` offers the tools necessary to create an optimized SVG icon set for Vue

## :raising_hand: Why?
- ✨ **Optimized SVG usage** Prevent SVGs from being inlined multiple times from your icon-set
- 🔥 **Webpack integration** Seamlessly integrate with your Webpack build
- 🦋 **Light** `1.27 kB gzip` for the IconLayer and `743 B` for IconRegister

## :rocket: Install
```sh
npm i -D vue-svg-icon-set
```

## 🚦 Quick setup
1. **Update Webpack config**

    Add the following changes to your Webpack configuration so that `vue-svg-icon-set` can transform your SVGs and so that you can output an IconLayer.

    ```diff
    module.exports = {
         ...,

         entry: {
    +        'lib/icon-layer': 'vue-svg-icon-set/icon-layer.vue',

             ...iconPaths,
         },

         module: {
             rules: [
                 ...,

    +            {
    +                test: /\.svg$/,
    +                use: [
    +                    'vue-loader',
    +                    'vue-svg-icon-set/loader',
    +                ],
    +            },
             ],
         }
    };
    ```

2. **Use IconLayer**

    Add the outputted `icon-layer` file to your application as a top-level wrapper.

    ```diff
    <template>
    +    <icon-layer>
             <app />
    +    </icon-layer>
    </template>
    <script>
    + import IconLayer from 'icon-library/lib/icon-layer';

    export default {
         components: {
    +        IconLayer
         }
    }
    </script>
    ```

3. **Use Icons**

    That's it! You should be ready to start using the icons from your library. 👍

    ```vue
    <template>
        <thumbsup-icon />
    </template>

    <script>
    import ThumbsupIcon from 'icon-library/icons/thumbsup-icon';

    export default {
        components: {
            ThumbsupIcon
        }
    };
    </script>
    ```
    
## ⚙️ Options
- `generateId` `<Function>`


## 🏎 Optimizations

### Externalizing icon register
The `icon-register.js` component is used by every icon and can be abstracted out to reduce the size of each icon.

```diff
module.exports = {
     ...,

     entry: {
         'lib/icon-layer': 'vue-svg-icon-set/icon-layer.vue',
+        'lib/icon-register': 'vue-svg-icon-set/icon-register',

         ...iconPaths,
     },
     
+    externals: [
+        (from, req, cb) => {
+            if (req.endsWith('icon-register.js')) {
+                return cb(null, '../lib/icon-register.js');
+            }
+            cb();
+        },
+    ],

};
```

### SVGO
I recommend using SVGO to optimize your SVGs. Use [svgo-loader](https://github.com/rpominov/svgo-loader) to pipe optimized SVGs to `vue-svg-icon-set`.

```diff
{
     test: /\.svg$/,
     use: [
         'vue-loader',
         'vue-svg-icon-set/loader',
+        'svgo-loader',
     ],
}
```

## 💁‍♂️ FAQ

### How is this optimized?
SVGs can be referenced and reused like variables with the [`<use>` element](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/use). This icon-set leverages this feature to define referencable SVGs so that repeated usage of an icon isn't duplicated in the DOM.

Demo on [JSFiddle](https://jsfiddle.net/hirokiosame/94vbm5pr/)

```html
<!-- Defined SVGs aka IconLayer -->
<svg style="display: none">
  <defs>
    <svg id="plus">
      <path d="M8 2V14M2 8H14" stroke="black" stroke-width="2" />
    </svg>

    <svg id="circle">
      <circle cx="8" cy="8" r="8" fill="black" />
    </svg>
  </defs>
</svg>


<!-- Use "plus" icon -->
<svg class="icon" width="16" height="16">
  <use href="#plus" />
</svg>

<!-- Use "circle" icon -->
<svg class="icon" width="16" height="16">
  <use href="#circle" />
</svg>
```

### What's the IconLayer for?
The IconLayer is a component that declares the SVG definitions so they're referenceable across the document. It injects an API so that all icons can communicate with it and register an icon to be defined.


### Does this work with SSR?
Yes! However, the SVG will not be inlined in the server-rendered document. It's actually a technical limitation because each icon usages hoists up the SVG rendering to happen in the parent _IconLayer_, and SSR only renders once. This could work to an advantage as it keeps the server-rendered doc from including SVGs that may be large or repeated. [Here's a working demo](https://github.com/privatenumber/vue-svg-icon-set-ssr-demo).



## 👪 Related
- vue-feather-icon-set
