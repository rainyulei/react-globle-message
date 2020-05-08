module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactGlobalMessage',
      externals: {
        react: 'React'
      }
    }
  }
}
