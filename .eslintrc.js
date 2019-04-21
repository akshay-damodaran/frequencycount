module.exports = {
  "extends": "airbnb",
  "rules": {
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      "import/no-extraneous-dependencies": [2, { devDependencies: true }],
      "jsx-a11y/label-has-for": [ 2, {
          "components": [ "Label" ],
          "required": {
              "some": [ "nesting", "id" ]
          },
          "allowChildren": false,
      }],
  },
};