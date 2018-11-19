import path from 'path'

export default async function GlobalComponents (moduleOptions) {
  let pluginPath = path.resolve(__dirname, 'plugin.js')
  this.addPlugin(path.resolve(__dirname, 'plugin.js'))
}
