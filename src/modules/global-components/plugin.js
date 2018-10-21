/**
 * Globally register all base components for convenience, because they
 * will be used very frequently. Components are registered using the
 * PascalCased version of their file name.
 * @see https://webpack.js.org/guides/dependency-management/#require-context
 */
import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import path from 'path'

// const cwd = process.cwd()
// const globalComponentsPath = `${cwd}/components/global`
// const modulePluginPath = `${cwd}/modules`
// const requireContextPath = path.relative(modulePluginPath, globalComponentsPath)
// console.log('requireContextPath: ', requireContextPath)

const requireComponent = require.context('@/components/global', true, /\.vue$/)

requireComponent.keys().forEach(fileName => {
  console.log(fileName)
  const componentConfig = requireComponent(fileName)
  const componentName = componentConfig.default.name
    ? componentConfig.default.name
    : upperFirst(camelCase(fileName.replace(/\.\w+$/, '')))

  // Globally register the component
  Vue.component(componentName, componentConfig.default || componentConfig)
})
