// Plugins
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import Fonts from "unplugin-fonts/vite";
import Vue from "@vitejs/plugin-vue";
import Vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import mkcert from "vite-plugin-mkcert";
import vueJsx from "@vitejs/plugin-vue-jsx";
import ViteIconsResolver from "unplugin-icons/resolver";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import Icons from "unplugin-icons/vite";
// Utilities
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { openAPIWatcherPlugin } from "@codescovery/vite-plugin-openapi-client-generator";

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

const IconResolver = ViteIconsResolver({
  componentPrefix: "iconify",
  enabledCollections: [
    "fluent-emoji",
    "fluent-emoji-flat",
    "fa",
    "mdi",
    "line-md",
    "flagpack",
    "ic",
  ],
});
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    watch: {
      usePolling: true,
    },
    proxy: {
      "/configurations": {
        target: "http://localhost:5524",
      },
    },
  },
  plugins: [
    process.env.NODE_ENV === "development" ? mkcert() : null,
    openAPIWatcherPlugin(
      "https://localhost:7178/openapi/v1.json",
      "src/services/api",
      {
        type: "typescript-axios",

        // axios: axios.create({
        //   httpAgent: new https.Agent({ rejectUnauthorized: false }),
        // }),
        excludeFiles: [
          ".gitignore",
          "git_push.sh",
          ".openapi-generator-ignore",
          ".npmignore",
          ".openapi-generator",
        ],
      }
    ),
    Vue({
      template: { transformAssetUrls },
      script: {
        defineModel: true,
        propsDestructure: true,
      },
    }),
    //postcss(),
    vueJsx(),
    Vuetify({
      autoImport: true,
      styles: {
        configFile: "src/styles/settings.scss",
      },
    }),
    AutoImport({
      imports: [
        "vue",
        "vue-router",
        "@vueuse/core",
        "vue-i18n",
        "pinia",
        {
          vuetify: ["useTheme"],
          "vuetify/lib/util/colors": [["default", "colors"]],
        },
      ],
      resolvers: [IconResolver],
      dirs: [
        "src/store/**",
        "src/plugins/utils",
        "src/enums",
        "src/composables",
        "src/helpers",
      ],
      dts: "src/auto-imports.d.ts",
      injectAtEnd: true,
      eslintrc: {
        enabled: true,
      },
      vueTemplate: true,
    }),
    Components({
      dirs: ["src/components"],
      dts: true,
      deep: true,
      globs: ["**/*.vue"],
      extensions: ["vue", "tsx"],
      collapseSamePrefixes: true,
      directoryAsNamespace: false,
      globalNamespaces: [],
      resolvers: [IconResolver],
    }),
    VueI18nPlugin({
      runtimeOnly: false,
      compositionOnly: true,
      include: [
        fileURLToPath(
          new URL("./src/plugins/i18n/locales/**", import.meta.url)
        ),
      ],
    }),
    Icons({
      compiler: "vue3",
      autoInstall: true,
    }),
    viteStaticCopy({
      targets: [
        {
          src: "./src/configurations/*",
          dest: "configurations",
        },
        {
          src: "./src/assets/markdowns/*",
          dest: "assets/markdowns",
        },
      ],
    }),

    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme

    Fonts({
      google: {
        families: [
          {
            name: "Roboto",
            styles: "wght@100;300;400;500;700;900",
          },
        ],
      },
    }),
  ],
  define: { "process.env": {} },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
      "@components": fileURLToPath(
        new URL("./src/components", import.meta.url)
      ),
      "@composables": fileURLToPath(
        new URL("./src/composables", import.meta.url)
      ),
      "@locales": fileURLToPath(new URL("./src/locales", import.meta.url)),
      "@layouts": fileURLToPath(new URL("./src/layouts", import.meta.url)),
      "@plugins": fileURLToPath(new URL("./src/plugins", import.meta.url)),
      "@router": fileURLToPath(new URL("./src/router", import.meta.url)),
      "@pages": fileURLToPath(new URL("./src/pages", import.meta.url)),
      "@enums": fileURLToPath(new URL("./src/enums", import.meta.url)),
      "@helpers": fileURLToPath(new URL("./src/helpers", import.meta.url)),
      "@services": fileURLToPath(new URL("./src/services", import.meta.url)),
      "@store": fileURLToPath(new URL("./src/store", import.meta.url)),
      "@types": fileURLToPath(new URL("./src/types", import.meta.url)),
      "@theme": fileURLToPath(new URL("./src/theme", import.meta.url)),
      "@configurations": fileURLToPath(
        new URL("./src/configurations", import.meta.url)
      ),
    },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
  },
});
