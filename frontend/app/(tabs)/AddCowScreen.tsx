import React, { useState } from "react";
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { addCow } from "../services/api";
import { CowRequest, CowResponse } from "../types/types";

export default function AddCowScreen() {
  const [name, setName] = useState<string>("");
  const [breed, setBreed] = useState<string>("");
  const [age, setAge] = useState<string>("");

  const handleAddCow = async () => {
    if (!name || !breed || !age) {
      Alert.alert("Validation Error", "All fields are required");
      return;
    }

    try {
      const cowRequest: CowRequest = { name, breed, age: parseInt(age) };
      const result: CowResponse = await addCow(cowRequest);
      Alert.alert("Success", `Cow ${result.name} added successfully`);
      setName(""); setBreed(""); setAge("");
    } catch (error: any) {
      Alert.alert("Error", error.response?.data?.message || error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.title}>Add New Cow</Text>

        <Text style={styles.label}>Cow Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Enter cow name" />

        <Text style={styles.label}>Breed</Text>
        <TextInput style={styles.input} value={breed} onChangeText={setBreed} placeholder="Enter breed" />

        <Text style={styles.label}>Age</Text>
        <TextInput style={styles.input} value={age} onChangeText={setAge} keyboardType="numeric" placeholder="Enter age" />

        <View style={styles.buttonContainer}>
          <Button title="Add Cow" onPress={handleAddCow} color="#4CAF50" />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flexGrow: 1, justifyContent: "center", padding: 20, backgroundColor: "#f2f2f2" },
  card: { backgroundColor: "#fff", borderRadius: 10, padding: 20, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 5 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center", color: "#333" },
  label: { fontWeight: "bold", marginBottom: 5, marginTop: 10, color: "#555" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5, backgroundColor: "#fafafa", marginBottom: 10 },
  buttonContainer: { marginTop: 20 },
});
