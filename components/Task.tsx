import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

import moment from "moment";
import "moment/locale/pt-br";

import commonStyles from "@/assets/styles/commonStyles";

export default function Task({
  id,
  description,
  estimateAt,
  doneAt,
  onToggleTask,
  onDelete,
}: Task) {
  function getCheckView() {
    if (doneAt) {
      return (
        <View style={[styles.radioButton, styles.done]}>
          <Icon name="check" size={20} color="#FFF" />
        </View>
      );
    } else {
      return <View style={[styles.radioButton, styles.pending]}></View>;
    }
  }

  const getRightContent = () => {
    return (
      <TouchableOpacity style={styles.right} onPress={() => onDelete(id)}>
        <Icon name="trash" size={30} color="#FFF" />
      </TouchableOpacity>
    );
  };

  const getLeftContent = () => {
    return (
      <View style={styles.left}>
        <Icon name="trash" size={20} color="#FFF" style={styles.excludeIcon} />
        <Text style={styles.excludeText}>Excluir</Text>
      </View>
    );
  };

  return (
    <GestureHandlerRootView>
      <Swipeable
        renderRightActions={getRightContent}
        renderLeftActions={getLeftContent}
        onSwipeableOpen={() => onDelete(id)}
      >
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={() => onToggleTask(id)}>
            <View style={styles.checkContainer}>{getCheckView()}</View>
          </TouchableWithoutFeedback>

          <View>
            <Text style={[styles.description, doneAt ? styles.doneAt : {}]}>
              {description}
            </Text>
            <Text style={styles.date}>
              {moment(doneAt ? doneAt : estimateAt)
                .locale("pt-br")
                .format("ddd, D [de] MMMM")}
            </Text>
          </View>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderColor: "#AAA",
    borderBottomWidth: 1,
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#FFF",
  },
  checkContainer: {
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  radioButton: {
    height: 25,
    width: 25,
    borderRadius: 13,
  },
  done: {
    backgroundColor: "#4D7031",
    alignItems: "center",
    justifyContent: "center",
  },
  pending: {
    borderWidth: 1,
    borderColor: "#555",
  },
  doneAt: {
    textDecorationLine: "line-through",
  },
  description: {
    // fontFamily: commonStyles.fontFamily
    color: commonStyles.colors.mainText,
    fontSize: 15,
  },
  date: {
    // fontFamily: commonStyles.fontFamily
    color: commonStyles.colors.subText,
    fontSize: 12,
  },
  right: {
    backgroundColor: "red",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
  },
  left: {
    backgroundColor: "red",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  excludeText: {
    color: "#FFF",
    fontSize: 20,
    margin: 10,
  },
  excludeIcon: {
    marginLeft: 10,
  },
});
