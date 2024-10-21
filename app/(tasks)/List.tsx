import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";

import moment from "moment";
import "moment/locale/pt-br";

import commonStyles from "@/assets/styles/commonStyles";
import Task from "@/components/Task";
import AddTask from "@/components/AddTask";
import useTask from "@/store/tasks";
import Button from "@/components/Button";

let showDoneTasks: boolean = false;

export default function TaskList({ title, daysAhead, navigation }: TaskList) {
  const [today, setToday] = useState<string>(
    moment().locale("pt-br").format("ddd, D [de] MMMM")
  );
  const [showAddTask, setShowAddTask] = useState<boolean>(false);
  const {
    fetchTasks,
    fetchAddTask,
    fetchUpdateTask,
    fetchDeleteTask,
    tasks,
    loading,
  } = useTask();

  useEffect(() => {
    loadTasks();
  }, []);

  const toggleTask = async (id: number): Promise<void> => {
    fetchUpdateTask(id).then(() => {
      loadTasks();
    });
  };

  const loadTasks = () => {
    const maxDate = moment().add({ days: daysAhead }).endOf("day").toDate();
    fetchTasks({ date: maxDate, showDoneTasks: showDoneTasks });
  };

  const addTask = async (task: AddNewTask): Promise<void> => {
    fetchAddTask({
      description: task.description,
      estimateAt: task.date,
    });

    loadTasks();
    setShowAddTask(false);
  };

  const deleteTask = (id: number): void => {
    fetchDeleteTask(id);
  };

  const toggleFilter = (): void => {
    showDoneTasks = !showDoneTasks;
    loadTasks();
  };

  const getImage = () => {
    switch (daysAhead) {
      case 0:
        return require("@/assets/images/today.jpg");
      case 1:
        return require("@/assets/images/tomorrow.jpg");
      case 7:
        return require("@/assets/images/week.jpg");
      default:
        return require("@/assets/images/month.jpg");
    }
  };

  const getColor = () => {
    switch (daysAhead) {
      case 0:
        return commonStyles.colors.today;
      case 1:
        return commonStyles.colors.tomorrow;
      case 7:
        return commonStyles.colors.week;
      default:
        return commonStyles.colors.month;
    }
  };

  return (
    <View style={styles.container}>
      <AddTask
        isVisible={showAddTask}
        onSave={addTask}
        onCancel={() => setShowAddTask(false)}
      />
      <ImageBackground
        style={styles.background}
        source={getImage()}
        resizeMode="cover"
      >
        <SafeAreaView>
          <View style={styles.iconBar}>
            <Button
              onPress={() => navigation.openDrawer()}
              icon="bars"
              iconColor={commonStyles.colors.secondary}
              iconSize={20}
            />

            <Button
              onPress={toggleFilter}
              icon={showDoneTasks ? "eye" : "eye-slash"}
              iconColor={commonStyles.colors.secondary}
              iconSize={20}
            />
          </View>
        </SafeAreaView>
        <View style={styles.titleBar}>
          <Text style={[styles.titleProperties, styles.title]}>{title}</Text>
          <Text style={[styles.titleProperties, styles.subtitle]}>{today}</Text>
        </View>
      </ImageBackground>
      <View style={styles.taskList}>
        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator color={"#000"} size={60} />
          </View>
        ) : (
          <FlatList
            data={tasks}
            keyExtractor={(i: {
              id: number;
              description: string;
              estimateAt: Date;
            }) => String(i.id)}
            renderItem={({ item }) => (
              <Task {...item} onToggleTask={toggleTask} onDelete={deleteTask} />
            )}
          />
        )}
      </View>
      <Button
        onPress={() => setShowAddTask(true)}
        style={[styles.addButton, { backgroundColor: getColor() }]}
        activeOpacity={0.7}
        icon="plus"
        iconSize={20}
        iconColor={commonStyles.colors.secondary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 3,
  },
  taskList: {
    flex: 7,
  },
  titleBar: {
    flex: 1,
    justifyContent: "flex-end",
  },
  titleProperties: {
    // fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    marginLeft: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 50,
  },
  subtitle: {
    fontSize: 20,
  },
  iconBar: {
    flexDirection: "row",
    margin: 20,
    justifyContent: "space-between",
  },
  addButton: {
    position: "absolute",
    right: 30,
    bottom: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
