import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import commonStyles from "@/assets/styles/commonStyles";
import AuthInput from "@/components/AuthInput";
import { router } from "expo-router";
import useAuth from "@/store/auth";
import Button from "@/components/Button";

export default function index() {
  const [email, setEmail] = useState<string>("email@gmail.com");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("123456");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [newAccount, setNewAccount] = useState<boolean>(false);
  const { fetchSignIn, fetchSignUp, loading } = useAuth();

  const signInOrSignUp = () => {
    newAccount ? signUp() : signIn();
  };

  const signIn = () => {
    fetchSignIn({ email, password })
      .then(() => {
        router.push("/(tasks)/List");
      })
      .catch(() => {});
  };

  const signUp = async () => {
    fetchSignUp({ email, name, password })
      .then(() => {
        console.log("usuario cadastrado");
      })
      .catch(() => {});
  };

  return (
    <ImageBackground
      style={styles.backGround}
      source={require("@/assets/images/login.jpg")}
    >
      <Text style={styles.title}>Tasks</Text>
      <View style={styles.formContainer}>
        <Text style={styles.subTitle}>
          {newAccount ? "Crie a sua conta" : "Insira seus dados"}
        </Text>
        {newAccount && (
          <AuthInput
            icon="user"
            placeholder="Nome"
            value={name}
            style={styles.input}
            onChangeText={(name) => setName(name)}
          />
        )}
        <AuthInput
          icon="at"
          placeholder="E-mail"
          value={email}
          style={styles.input}
          onChangeText={(email) => setEmail(email)}
        />
        <AuthInput
          icon="lock"
          placeholder="Senha"
          value={password}
          style={styles.input}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry
        />
        {newAccount && (
          <AuthInput
            icon="asterisk"
            placeholder="Confirme sua senha"
            value={confirmPassword}
            style={styles.input}
            onChangeText={(password) => setConfirmPassword(password)}
            secureTextEntry
          />
        )}
        <Button
          onPress={signInOrSignUp}
          label={newAccount ? "Criar conta" : "Entrar"}
          style={styles.button}
          labelStyle={styles.buttonText}
          loading={loading}
        />
      </View>
      <Button
        label={newAccount ? "Já possui conta?" : "Ainda não possui conta?"}
        onPress={() => setNewAccount(!newAccount)}
        labelStyle={styles.buttonText}
        style={{ padding: 10 }}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backGround: {
    flex: 1,
    // width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    // fontFamily
    color: commonStyles.colors.secondary,
    fontSize: 70,
    marginBottom: 10,
  },
  subTitle: {
    // fontFamily
    fontSize: 20,
    color: "#FFF",
    textAlign: "center",
    marginBottom: 10,
  },
  formContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: 20,
    width: "90%",
  },
  input: {
    backgroundColor: "#FFF",
    marginTop: 10,
    padding: 10,
  },
  button: {
    backgroundColor: "#080",
    marginTop: 10,
    padding: 10,
    alignItems: "center",
    borderRadius: 7,
  },
  buttonText: {
    // fontFamily
    color: "#FFF",
    fontSize: 20,
    fontWeight: "400",
  },
});
