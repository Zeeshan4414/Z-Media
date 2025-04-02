import { Button, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import React, { useState } from 'react';

const Search = () => {
  const theme = useColorScheme();
  const isDarkMode = theme === 'dark';

  const [text, setText] = useState('');
  const [submit, setSubmit] = useState('');

  const themeStyle = {
    backgroundColor: isDarkMode ? '#121212' : '#ffffff',
    textColor: isDarkMode ? '#ffffff' : '#000000',
    borderColor: isDarkMode ? '#ffffff' : '#000000',
  };

  const handleSubmit = () => {
    setSubmit(text);
    setText('');
  };

  return (
    <View style={[styles.container, { backgroundColor: themeStyle.backgroundColor }]}>
      <Text style={[styles.title, { color: themeStyle.textColor }]}>Hello World!</Text>

      <TextInput
        placeholder="Enter your name"
        placeholderTextColor={isDarkMode ? '#bbbbbb' : '#666666'}
        value={text}
        onChangeText={(text) => setText(text)}
        multiline
        numberOfLines={1}
        style={[
          styles.input,
          { borderColor: themeStyle.borderColor, color: themeStyle.textColor },
        ]}
      />

      <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={handleSubmit} color={isDarkMode ? '#1e90ff' : '#007bff'} />
      </View>

      <Text style={[styles.outputText, { color: themeStyle.textColor }]}>
        Output: {submit}
      </Text>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    width: 250,
    height: 40,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  buttonContainer: {
    width: 150,
    marginBottom: 20,
  },
  outputText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
