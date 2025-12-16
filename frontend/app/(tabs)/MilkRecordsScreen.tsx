import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements"; // Or use your IconSymbol component
import { getMilkRecords } from "../services/api";
import { MilkRecordResponse } from "../types/types";

export default function MilkRecordsScreen() {
  const [records, setRecords] = useState<MilkRecordResponse[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getMilkRecords();
        setRecords(data);
      } catch (error) {
        console.error("Failed to fetch milk records:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      {records.map((item) => (
        <View key={item.id} style={styles.card}>
          <View style={styles.header}>
            <Icon name="cow" type="material-community" color="#4CAF50" size={24} />
            <Text style={styles.title}>{item.cowName} (ID: {item.cowId})</Text>
          </View>
          <Text style={styles.text}>Date: {new Date(item.date).toLocaleString()}</Text>
          <Text style={[styles.text, { color: item.amount > 12 ? "#ff5722" : "#555" }]}>
            Amount: {item.amount} liters
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { padding: 20, backgroundColor: "#f2f2f2" },
  card: { backgroundColor: "#fff", borderRadius: 10, padding: 15, marginBottom: 15, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 4 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 5 },
  title: { fontSize: 18, fontWeight: "bold", marginLeft: 10, color: "#333" },
  text: { fontSize: 16, color: "#555" },
});
