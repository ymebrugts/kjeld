module.exports = {
    rules: {
        'no-console': 'off',
    },
    plugins: ['vue'],

    extends: [
        // add more generic rulesets here, such as:
        // 'eslint:recommended',
        'plugin:vue/recommended'
    ],
    rules: {
        "vue/html-indent": ["error", 4, {
            "attribute": 2,
            "baseIndent": 1,
            "closeBracket": 0,
            "alignAttributesVertically": true,
            "ignores": []
        }],
        "no-unused-vars": "off",
    }
};
