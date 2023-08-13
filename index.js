import 'react-native-gesture-handler'; // Gesture handler should be first import
import {AppRegistry} from 'react-native';
import {App} from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
