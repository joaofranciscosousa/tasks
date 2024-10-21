import api from "@/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { create } from "zustand";

type FetchProps = (params: {
  email: string;
  password: string;
}) => Promise<void>;

type FetchSignUpProps = (params: {
  email: string;
  password: string;
}) => Promise<void>;

interface HttpState {
  fetchSignIn: (params: any) => Promise<void>;
  fetchSignUp: (params: any) => Promise<void>;
  fetchUserInfo: (params: any) => Promise<void>;
  data: any;
  isLoggedIn: boolean;
  loading: boolean;
  error: ErrorAPI[] | string | undefined;
  clearData?: () => void;
  clearError?: () => void;
}

interface ErrorAPI {
  attribute: string;
  message: string;
}

const useAuth = create<HttpState>((set, get) => ({
  data: null,
  userInfo: null,
  loading: false,
  isLoggedIn: false,
  error: undefined,
  fetchSignIn: (params: any) => {
    return new Promise<void>(async (resolve, reject) => {
      if (!get().loading) {
        set({ loading: true, error: undefined });

        api
          .post("/user/signin", params)
          .then(async (res) => {
            await AsyncStorage.setItem("@token", res.data.token);
            console.log("fetchSignIn", res.data);
            set({ data: res.data });
            resolve();
          })
          .catch((err: any) => {
            set({
              error:
                err.response?.data?.message ||
                "Ocorreu um erro ao realizar o login",
            });
            reject(err);
          })
          .finally(() => {
            set({ loading: false });
          });
      } else {
        resolve();
      }
    });
  },
  fetchSignUp: (params: any) => {
    return new Promise<void>(async (resolve, reject) => {
      if (!get().loading) {
        set({ loading: true, error: undefined });

        api
          .post("/user/create", params)
          .then(async (res) => {
            // await AsyncStorage.setItem("@token", res.data.token);
            set({ data: res.data });

            resolve();
          })
          .catch((err: any) => {
            set({
              error:
                err.response?.data?.message ||
                "Ocorreu um erro ao realizar o login",
            });
            reject(err);
          })
          .finally(() => {
            set({ loading: false });
          });
      } else {
        resolve();
      }
    });
  },
  fetchUserInfo: (route: string) => {
    return new Promise<void>(async (resolve, reject) => {
      set({ error: undefined });
      const token = await AsyncStorage.getItem("@token");

      if (!token && route != "/") router.push("/");

      api
        .get("/user", { headers: { Authorization: token } })
        .then(async (res) => {
          set({ data: res.data, isLoggedIn: true });
          router.push("/(tasks)/List");
          resolve();
        })
        .catch((err: any) => {
          set({
            error:
              err.response?.data?.message ||
              "Ocorreu um erro ao realizar o login",
            isLoggedIn: false,
          });
          reject(err);
        });
    });
  },
}));

export default useAuth;
