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
import { Card, Button as NativeButton } from "react-native-paper";
import { NavigationEvents } from "react-navigation";

const ZeroInboxMessages = [
  "Nothing. You have achieved peace.",
  "You are very zen like."
];

function getRandomZeroInboxMessage() {
  return (
    <Text>
      {ZeroInboxMessages[Math.floor(Math.random() * ZeroInboxMessages.length)]}
    </Text>
  );
}

export const ZeroInboxMessage = getRandomZeroInboxMessage();

export default function TodoOverviewScreen() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState("");

  async function fetchTodos() {
    try {
      const allItems = await AsyncStorage.getItem("todos");

      if (allItems) {
        const parsedItems = await JSON.parse(allItems);

        setTodos(parsedItems);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  const hasTodos =
    todos && todos.filter(todo => todo.completed === false).length > 0;

  useEffect(() => {
    saveToDos();
    setInputText("");
    Keyboard.dismiss();
  }, [todos]);

  async function saveToDos() {
    if (todos.length) {
      await AsyncStorage.setItem("todos", JSON.stringify(todos));
    }
  }

  async function clearAsyncStorage() {
    await AsyncStorage.clear();
    setTodos([]);
  }

  function markAsCompleted(id) {
    const allTodos = todos;
    const markedTodo = allTodos.find(i => i.id === id);

    if (!markedTodo) {
      return;
    }

    if (markedTodo) {
      markedTodo.completed = true;
    }

    setTodos([...allTodos]);
  }

  function removeFromArray(id) {
    const filteredTodos = todos.filter(todo => todo.id !== id);

    setTodos(filteredTodos);
  }

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={payload => fetchTodos()} />
      <View style={styles.header}>
        <TextInput
          autoCapitalize="sentences"
          placeholder="What to do?"
          blurOnSubmit={false}
          value={inputText}
          style={styles.input}
          onChangeText={setInput()}
          onSubmitEditing={addNewTodo()}
        />
      </View>
      {hasTodos ? (
        <FlatList
          style={styles.list}
          data={todos
            .filter(t => t.completed === false)
            .map((todo, i) => ({
              title: todo.name,
              id: todo.id,
              key: `${todo.name} - ${i}`
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
                  <NativeButton onPress={() => removeFromArray(item.id)}>
                    Delete
                  </NativeButton>
                  <NativeButton onPress={() => markAsCompleted(item.id)}>
                    Complete
                  </NativeButton>
                </Card.Actions>
              </Card>
            );
          }}
        />
      ) : (
        ZeroInboxMessage
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

  function setInput() {
    return value => setInputText(value);
  }

  function addNewTodo() {
    return e =>
      setTodos(
        todos =>
          (todos =
            inputText.trim().length > 0 && todos !== null
              ? [
                  {
                    name: inputText,
                    completed: false,
                    id: todos.length ? todos[0].id + 1 : 1
                  },
                  ...todos
                ]
              : [...todos])
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 60,
    marginBottom: 40,
    height: "100%"
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
    paddingRight: 16,
    borderBottomColor: "#f1f1f1",
    borderBottomWidth: 1
  }
});
