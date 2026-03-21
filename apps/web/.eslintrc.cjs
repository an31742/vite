module.exports = {
  root: true,
  /* 指定如何解析语法。*/
  parser: "vue-eslint-parser",
  /* 优先级低于parse的语法解析配置 */
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  // https://eslint.bootcss.com/docs/user-guide/configuring#specifying-globals
  globals: {
    Nullable: true,
    ElMessage: "readonly",
    ElMessageBox: "readonly",
  },
  ignorePatterns: ["src/views/fe_interview/js/**/*.js", "src/views/fe_interview/**/*.js", "src/views/demo/vue3/**/*.vue"],
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    // 'plugin:vue/vue3-recommended',
    // 'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
    "plugin:vue/vue3-recommended",
    // 此条内容开启会导致 全局定义的 ts 类型报  no-undef 错误，因为
    // https://cn.eslint.org/docs/rules/
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended", // typescript-eslint推荐规则,
    "prettier",
    "plugin:prettier/recommended",
  ],
  rules: {
    // 'no-undef': 'off',
    // 禁止使用 var
    "no-var": "error",
    semi: "off",
    // 优先使用 interface 而不是 type
    "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-unused-vars": "off",
    // 关闭HTML缩进规则，让prettier处理
    "vue/html-indent": "off",
    // 关闭此规则 使用 prettier 的格式化规则， 感觉prettier 更加合理，
    // 而且一起使用会有冲突
    "vue/max-attributes-per-line": ["off"],
    // 关闭组件命名规则，Element Plus组件名是kebab-case
    "vue/component-name-in-template-casing": "off",
    // 关闭多词组件名规则
    "vue/multi-word-component-names": "off",
    // 关闭属性顺序规则
    "vue/attributes-order": "off",
    // 关闭常量条件检查
    "no-constant-condition": "off",
    // 关闭v-html警告
    "vue/no-v-html": "off",
    // 关闭@ts-ignore警告
    "@typescript-eslint/ban-ts-comment": "off",
  },
}
