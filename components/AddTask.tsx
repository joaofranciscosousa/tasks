import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";

import commonStyles from "@/assets/styles/commonStyles";
import useTask from "@/store/tasks";

export default function AddTask({ isVisible, onCancel, onSave }: AddTask) {
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<any>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const { loadingAddTask } = useTask();

  useEffect(() => {
    clearFields();
  }, []);

  const saveTask = () => {
    const newTask: AddNewTask = {
      description: description,
      date,
    };

    onSave(newTask);
    clearFields();
  };

  const getDatePicker = () => {
    const datePicker = (
      <DateTimePicker
        value={date}
        onChange={(event, date: Date | undefined) => {
          setDate(date);
          setShowDatePicker(false);
        }}
        mode="date"
      />
    );

    const dateString = moment(date).format("ddd, D [de] MMMM [de] YYYY");

    return (
      <View>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text style={styles.date}>{dateString}</Text>
        </TouchableOpacity>
        {showDatePicker && datePicker}
      </View>
    );
  };

  const clearFields = () => {
    setDescription("");
    setDate(new Date());
  };

  return (
    <Modal
      transparent
      visible={isVisible}
      onRequestClose={onCancel}
      animationType="slide"
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.background}></View>
      </TouchableWithoutFeedback>
      <View style={styles.container}>
        <Text style={styles.header}>Nova tarefa</Text>
        <TextInput
          style={styles.input}
          placeholder="Informe a descrição..."
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
        {getDatePicker()}
        <View style={styles.buttons}>
          <TouchableOpacity onPress={onCancel}>
            <Text style={styles.button}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={loadingAddTask ? undefined : saveTask}>
            {loadingAddTask ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#0000ff" />
              </View>
            ) : (
              <Text style={styles.button}>Salvar</Text>
            )}
            {loadingAddTask}
          </TouchableOpacity>
        </View>
      </View>
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.background}></View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  container: {
    backgroundColor: "#FFF",
  },
  header: {
    // fontFamily: commonStyles.fontFamily
    backgroundColor: commonStyles.colors.today,
    color: commonStyles.colors.secondary,
    textAlign: "center",
    padding: 15,
    fontSize: 18,
  },
  input: {
    // fontFamily:
    height: 40,
    margin: 15,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E3E3E3",
    borderRadius: 6,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    margin: 20,
    color: commonStyles.colors.today,
  },
  date: {
    // fontFamily
    fontSize: 20,
    marginLeft: 15,
  },
  loadingContainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
});
