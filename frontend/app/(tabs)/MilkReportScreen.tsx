import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Alert, Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements"; // Or use IconSymbol
import { getMilkReport } from "../services/api";
import { MilkReportItem } from "../types/types";

export default function MilkReportScreen() {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [showStart, setShowStart] = useState<boolean>(false);
  const [showEnd, setShowEnd] = useState<boolean>(false);
  const [report, setReport] = useState<MilkReportItem[]>([]);

  const fetchReport = async () => {
    try {
      const data: MilkReportItem[] = await getMilkReport(
        startDate.toISOString().split("T")[0],
        endDate.toISOString().split("T")[0]
      );
      setReport(data);
    } catch (error: any) {
      Alert.alert("Error", error.response?.data?.message || error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.title}>Select Report Dates</Text>

        <Button title="Select Start Date" onPress={() => setShowStart(true)} />
        {showStart && (
          <DateTimePicker value={startDate} mode="date" display="default" onChange={(e, d) => { setShowStart(false); if (d) setStartDate(d); }} />
        )}
        <Text style={styles.text}>Start: {startDate.toLocaleDateString()}</Text>

        <Button title="Select End Date" onPress={() => setShowEnd(true)} />
        {showEnd && (
          <DateTimePicker value={endDate} mode="date" display="default" onChange={(e, d) => { setShowEnd(false); if (d) setEndDate(d); }} />
        )}
        <Text style={styles.text}>End: {endDate.toLocaleDateString()}</Text>

        <View style={styles.buttonContainer}>
          <Button title="Generate Report" onPress={fetchReport} color="#4CAF50" />
        </View>
      </View>

      {report.map((item) => (
        <View key={item.cowId} style={styles.card}>
          <View style={styles.header}>
            <Icon name="cow" type="material-community" color="#4CAF50" size={24} />
            <Text style={styles.title}>{item.cowName}</Text>
          </View>
          <Text style={[styles.text, { color: item.totalMilk > 50 ? "#ff5722" : "#555" }]}>
            Total Milk: {item.totalMilk} liters
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
  buttonContainer: { marginTop: 10 },
});
