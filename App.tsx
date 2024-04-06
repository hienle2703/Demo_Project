/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
  Alert,
  SafeAreaView,
  Text,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import Crashes from 'appcenter-crashes';

import {Colors} from 'react-native/Libraries/NewAppScreen';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  async function checkPreviousSession() {
    const didCrash = await Crashes.hasCrashedInLastSession();
    if (didCrash) {
      await Crashes.lastSessionCrashReport();
      Alert.alert("Sorry about the crash! We're working on it.");
    }
  }

  useEffect(() => {
    checkPreviousSession();
  }, []);

  return (
    <SafeAreaView
      style={[
        backgroundStyle,
        {justifyContent: 'center', alignItems: 'center', flex: 1},
      ]}>
      <TouchableOpacity
        onPress={() => {
          Crashes.generateTestCrash();
        }}>
        <Text>Crash This App</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default App;
