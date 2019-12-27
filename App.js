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

  useEffect(() => {
    async function fetchTodos() {
      try {
        const todoss = await AsyncStorage.getItem("todos");
        console.log(todoss, "wep");
        // setTodos((todos = []));

        if (todoss) {
          setTodos([...todoss, todos]);
        }
      } catch (e) {
        console.log("Error getting Todo Items >", e);
      }
    }

    fetchTodos();
    console.log(AsyncStorage);
  }, []);

  async function saveTodo() {
    try {
      AsyncStorage.setItem("todos", JSON.stringify(this.state.todos));
    } catch (e) {
      console.log("Error while storing Todo Items >", e);
    }
  }

  console.log(todos);
  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="sentences"
        placeholder="What needs to be done?"
        blurOnSubmit={false}
      />
      <FlatList
        style={styles.list}
        data={[
          { key: "Devin" },
          { key: "Dan" },
          { key: "Dominic" },
          { key: "Jackson" },
          { key: "James" },
          { key: "Joel" },
          { key: "John" },
          { key: "Jillian" },
          { key: "Jimmy" },
          { key: "Julie" }
        ]}
        renderItem={({ item }) => <Text style={styles.item}>{item.key}</Text>}
      />
      <Button title={"test"} onPress={e => alert("wow")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  list: {
    maxHeight: 400
  }
});
