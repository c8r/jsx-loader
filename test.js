const path = require('path')
const test = require('ava')
const webpack = require('webpack')
const MemoryFS = require('memory-fs')

const fs = new MemoryFS()

const build = (entry, options = {}) => {
  const config = {
    mode: 'development',
    entry,
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          loader: path.resolve(__dirname, './index'),
          options
        }
      ]
    }
  }
  const compiler = webpack(config)
  compiler.outputFileSystem = fs

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err)

      const mod = stats.toJson().modules.find(m => m.name === entry).source
      resolve(mod)
    })
  })
}

test('renders JSX', async t => {
  const mod = await build('./examples/index.jsx', {})
  t.snapshot(mod)
})

test('renders JSX with scope in front matter', async t => {
  const mod = await build('./examples/scoped.jsx', {})
  t.snapshot(mod)
})

test('renders with scope from loader options', async t => {
  const mod = await build('./examples/options-scope.jsx', {
    scope: `import * as scope from 'grid-styled'`
  })
  console.log('module', mod)
  t.snapshot(mod)
})
