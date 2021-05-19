const replaceOptions = {
  search: /import\s+\{([^}]+?)\}\s+from\s+['"]@material-ui\/icons['"]/,
  replace: (_, m) => {
    const entries = m
      .split(',')
      .map((x) => x.trim())
      .filter((x) => x)
    return entries
      .map((x) => `import ${x} from '@material-ui/icons/${x}'`)
      .join('\n')
  },
}

module.exports = {
  future: {
    webpack5: true,
  },

  webpack: (config, { isServer }) => {
    if (isServer) {
      config.module.rules[1].use = [
        config.module.rules[1].use,
        {
          loader: 'string-replace-loader',
          options: replaceOptions,
        },
      ]
    }
    return config
  },
}
