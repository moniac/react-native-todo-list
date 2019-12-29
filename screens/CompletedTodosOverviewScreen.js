import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function CompletedTodosOverviewScreen() {
  return (
    <View style={styles.container}>
      <Text>test</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 60,
    marginBottom: 40
  }
});
