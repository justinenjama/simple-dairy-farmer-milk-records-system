import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { addMilkRecord, getCows } from "../services/api";
import { CowResponse, MilkRecordRequest, MilkRecordResponse } from "../types/types";

export default function AddMilkScreen() {
  const [cows, setCows] = useState<CowResponse[]>([]);
  const [cowId, setCowId] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  useEffect(() => {
    async function fetchCows() {
      try {
        const data = await getCows();

        if (!Array.isArray(data)) {
          throw new Error("Invalid cows data received from server");
        }

        setCows(data);
      } catch (error: any) {
        console.error(error);
        Alert.alert("Error", error.response?.data?.message || error.message);
      }
    }
    fetchCows();
  }, []);

  const handleAddMilk = async () => {
    if (!cowId || !amount) {
      Alert.alert("Validation Error", "All fields are required");
      return;
    }

    try {
      const milkRequest: MilkRecordRequest = { cowId: parseInt(cowId), amount: parseFloat(amount), date: date.toISOString() };
      const result: MilkRecordResponse = await addMilkRecord(milkRequest);
      Alert.alert("Success", `Milk record added for cow ${result.cowName}`);
      setCowId(""); setAmount("");
    } catch (error: any) {
      Alert.alert("Error", error.response?.data?.message || error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.title}>Add Milk Record</Text>

        <Text style={styles.label}>Select Cow</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={cowId} onValueChange={(itemValue) => setCowId(itemValue)}>
            <Picker.Item label="Select a cow..." value="" />
            {cows.map((cow) => <Picker.Item key={cow.id} label={`${cow.name} (ID: ${cow.id})`} value={cow.id.toString()} />)}
          </Picker>
        </View>

        <Text style={styles.label}>Milk Amount (Liters)</Text>
        <TextInput style={styles.input} value={amount} onChangeText={setAmount} keyboardType="numeric" placeholder="Enter amount in liters" />

        <Button title="Select Date" onPress={() => setShowDatePicker(true)} />
        {showDatePicker && (
          <DateTimePicker value={date} mode="datetime" display="default" onChange={(event, selectedDate) => { setShowDatePicker(false); if (selectedDate) setDate(selectedDate); }} />
        )}
        <Text style={{ marginTop: 5 }}>Selected: {date.toLocaleString()}</Text>

        <View style={styles.buttonContainer}>
          <Button title="Add Milk Record" onPress={handleAddMilk} color="#4CAF50" />
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
  pickerContainer: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5, backgroundColor: "#fafafa", marginBottom: 10 },
  buttonContainer: { marginTop: 20 },
});
