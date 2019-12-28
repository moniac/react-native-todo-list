import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  AsyncStorage,
  FlatList
} from "react-native";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState("");

  const hasTodos = todos.length > 0;

  async function fetchTodos() {
    try {
      const allItems = await AsyncStorage.getItem("todos");
      console.log(JSON.parse(allItems), "ALL");
      setTodos(JSON.parse(allItems));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    setInputText("");
    saveToDos();
    // fetchTodos();
  }, [todos]);

  async function saveToDos() {
    await AsyncStorage.setItem("todos", JSON.stringify(todos));
  }

  async function clearAsyncStorage() {
    console.log("REMOVING");
    AsyncStorage.clear();
    setTodos([]);
  }

  console.log(todos);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          autoCapitalize="sentences"
          placeholder="What needs to be done?"
          blurOnSubmit={false}
          value={inputText}
          onChangeText={value => setInputText(value)}
          onSubmitEditing={e =>
            setTodos(
              todos =>
                (todos =
                  inputText.trim() !== "" ? [...todos, inputText] : [...todos])
            )
          }
        />
      </View>
      {hasTodos ? (
        <FlatList
          style={styles.list}
          data={todos.map(todo => ({
            key: todo
          }))}
          renderItem={({ item, i }) => (
            <Text key={`${item.key} - ${i}`} style={styles.item}>
              {item.key}
            </Text>
          )}
        />
      ) : (
        <Text>You are all zen like</Text>
      )}
      {hasTodos && (
        <Button
          style={styles.clear}
          title={"test"}
          onPress={() => clearAsyncStorage()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 80,
    marginBottom: 40
  },
  list: {
    marginTop: 50,
    height: "100%"
  },
  header: {
    position: "absolute",
    top: 0
  },
  clear: {
    marginBottom: 40,
    paddingBottom: 400
  }
});
