# vue-svg-icon-set  <a href="https://npm.im/vue-svg-icon-set"><img src="https://badgen.net/npm/v/vue-svg-icon-set"></a> <a href="https://npm.im/vue-svg-icon-set"><img src="https://badgen.net/npm/dm/vue-svg-icon-set"></a> <a href="https://packagephobia.now.sh/result?p=vue-svg-icon-set"><img src="https://packagephobia.now.sh/badge?p=vue-svg-icon-set"></a> <a href="https://bundlephobia.com/result?p=vue-svg-icon-set"><img src="https://badgen.net/bundlephobia/minzip/vue-svg-icon-set"></a>

`vue-svg-icon-set` offers the tools necessary to create an optimized SVG icon set for Vue

## :raising_hand: Why?
- Optimized SVG usage Prevent SVGs from being inlined multiple times from your icon-set
- Webpack plugin
- Light 

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
