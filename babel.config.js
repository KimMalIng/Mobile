module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: [
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
            '.android.js',
            '.android.tsx',
            '.ios.js',
            '.ios.tsx',
          ],
          root: ['.'],
          alias: {
            '@/Const': './src/Const',
            '@/Type': './src/Type',
            '@/Domain/Entity': './src/Domain/Entity',
            '@/Domain/UseCase': './src/Domain/UseCase',
            '@/Domain/Repository': './src/Domain/Repository',
            '@/Data/DataSource': './src/Data/DataSource',
            '@/Data/Model': './src/Data/Model',
            '@/Data/Repository': './src/Data/Repository',
            '@/Presentation/Component': './src/Presentation/Component',
            '@/Presentation/Container': './src/Presentation/Container',
            '@/Presentation/Hook': './src/Presentation/Hook',
            '@/Presentation/Type': './src/Presentation/Type',
            '@/Presentation/Model': './src/Presentation/Model',
            '@/Presentation/Redux': './src/Presentation/Redux',
            '@/Presentation/Style/*': './src/Presentation/Style/*',
            '@/Presentation/Resource': './src/Presentation/Resource'
          }
        },
      ],
    ],
  }
}
