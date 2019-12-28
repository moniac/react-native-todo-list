import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  AsyncStorage,
  FlatList,
  TextInput,
  Keyboard
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

  const hasTodos = todos && todos.length > 0;

  async function fetchTodos() {
    try {
      const allItems = await AsyncStorage.getItem("todos");

      if (allItems) {
        setTodos(JSON.parse(allItems));
      }
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
    Keyboard.dismiss();
  }, [todos]);

  async function saveToDos() {
    await AsyncStorage.setItem("todos", JSON.stringify(todos));
  }

  async function clearAsyncStorage() {
    AsyncStorage.clear();
    setTodos([]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          autoCapitalize="sentences"
          placeholder="What to do?"
          blurOnSubmit={false}
          value={inputText}
          style={styles.input}
          onChangeText={value => setInputText(value)}
          onSubmitEditing={e =>
            setTodos(
              todos =>
                (todos =
                  inputText.trim().length > 0 && todos !== null
                    ? todos.concat(inputText)
                    : [...todos])
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
        <Text>Nothing. You have reached peace.</Text>
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
    top: 0,
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto"
  },
  clear: {
    marginBottom: 40,
    paddingBottom: 400
  },
  Card: {
    // marginTop: 8
  },
  input: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    padding: 4,
    minHeight: 40,
    paddingLeft: 16,
    paddingRight: 16
  }
});
