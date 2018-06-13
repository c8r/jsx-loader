
# @compositor/jsx-loader

Webpack loader for Compositor JSX

```sh
npm i @compositor/jsx-loader
```

```js
// webpack.config.js
{
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: [
          'babel-loader',
          '@compositor/jsx-loader'
        ]
      }
    ]
  }
}
```

## JSX Format

Compositor JSX is a static file format that uses JSX, without any wrapping JavaScript syntax.
This format is well suited for creating prototypes, demos, and pages that use a common set of React UI components.

```jsx
---
title: Hello
scope: import * as scope from 'rebass'
---
<Box>
  <Heading>{props.title}</Heading>
</Box>
```

JSX files are converted to pure functional components,
which helps to develop UI compositions decoupled from application state.

### Front Matter

Front matter is used to specify default props and component scope for the file.

### Scope

Scope can be specified with the `scope` field in front matter,
or with the `scope` option in a webpack configuration.
The `scope` value is included at the top of the transpiled component module and any valid JavaScript expression should work.
The scope string should evaluate to an object where the keys are provided in scope to the component.

```js
// example scope.js file
import { Box, Flex } from 'grid-styled'

export default {
  Box,
  Flex
}
```

Specified in JSX front matter:

```jsx
---
scope: import scope from './scope'
---
```

Or specified as a loader option in webpack configuration:

```js
{
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: [
          'babel-loader',
          {
            loader: '@compositor/jsx-loader',
            options: {
              scope: `import scope from './scope'`
            }
          }
        ]
      }
    ]
  }
}
```

## Raw JSX Source

The transpiled module will also include a named export `jsx` for access to the source JSX content.

```js
import { jsx } from './Hello.jsx'
```

MIT License
