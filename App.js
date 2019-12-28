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
import {
  Card,
  Title,
  Paragraph,
  Button as NativeButton
} from "react-native-paper";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState("");

  const hasTodos = todos !== null;

  async function fetchTodos() {
    try {
      const allItems = await AsyncStorage.getItem("todos");

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
  }, [todos]);

  async function saveToDos() {
    await AsyncStorage.setItem("todos", JSON.stringify(todos));
  }

  async function clearAsyncStorage() {
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
          style={styles.input}
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
          data={todos.map((todo, i) => ({
            title: todo,
            key: `${todo} - ${i}`
          }))}
          renderItem={({ item, index }) => {
            return (
              <Card
                style={{
                  ...styles.Card,
                  backgroundColor: index % 2 ? "#f9f9f9" : "#fff"
                }}
              >
                <Card.Title title={item.title} />
                <Card.Actions>
                  <NativeButton onPress={() => removeFromArray(index)}>
                    Delete
                  </NativeButton>
                </Card.Actions>
              </Card>
            );
          }}
        />
      ) : (
        <Text>You are all zen like</Text>
      )}
      {hasTodos && (
        <Button
          style={styles.clear}
          title={"Clear"}
          onPress={() => clearAsyncStorage()}
        />
      )}
    </View>
  );

  function removeFromArray(index) {
    const values = todos;
    values.splice(index, 1);

    setTodos([...values]);
  }
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
    height: "100%",
    width: "100%"
  },
  header: {
    position: "absolute",
    top: 0
  },
  clear: {
    marginBottom: 40,
    paddingBottom: 400
  },
  Card: {
    // marginTop: 8
  },
  input: {
    width: "100%"
  }
});
