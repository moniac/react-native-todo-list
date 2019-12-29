import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, AsyncStorage, FlatList } from "react-native";
import { NavigationEvents } from "react-navigation";
import { Card, Button as NativeButton } from "react-native-paper";
import { ZeroInboxMessage } from "./TodoOverviewScreen";

export default function CompletedTodosOverviewScreen() {
  const [todos, setTodos] = useState([]);
  console.log(todos);

  async function fetchTodos() {
    try {
      const allItems = await AsyncStorage.getItem("todos");

      if (allItems) {
        const parsedItems = await JSON.parse(allItems);
        const filteredItems = parsedItems.filter(
          todo => todo.completed === true
        );
        console.log(parsedItems, "from complete");
        setTodos(filteredItems);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  async function removeFromArray(id) {
    const allItems = await AsyncStorage.getItem("todos");
    const parsedItems = await JSON.parse(allItems);
    const ted = parsedItems.filter(t => t.id !== id);
    console.log(ted, "HEREEE");
    await AsyncStorage.setItem("todos", JSON.stringify(ted));
    fetchTodos();
  }

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={payload => fetchTodos()} />
      {todos.length > 0 ? (
        <FlatList
          style={styles.list}
          data={todos.map((todo, i) => ({
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
                <Card.Title title={item.title} titleStyle={styles.title} />
                <Card.Actions>
                  <NativeButton onPress={() => removeFromArray(item.id)}>
                    Delete
                  </NativeButton>
                </Card.Actions>
              </Card>
            );
          }}
        />
      ) : (
        <View style={styles.emptyState}>{ZeroInboxMessage}</View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 60,
    marginBottom: 40
  },
  title: {
    textDecorationLine: "line-through",
    opacity: 0.8
  },
  emptyState: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  }
});
