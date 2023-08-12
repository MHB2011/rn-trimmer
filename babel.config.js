module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ['react-native-reanimated/plugin'],
  // reanimated had to be listed last
  // renimated plugin coverts worklets to functions that can be run on the UI thread
};
