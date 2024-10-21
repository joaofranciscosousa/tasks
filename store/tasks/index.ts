import api from "@/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  fetchTasks: (params?: any) => Promise<void>;
  fetchAddTask: (body: any) => Promise<void>;
  fetchUpdateTask: (id: number, body?: any) => Promise<void>;
  fetchDeleteTask: (id: number) => Promise<void>;
  tasks: [];
  loading: boolean;
  loadingAddTask: boolean;
  error: ErrorAPI[] | string | undefined;
  clearData?: () => void;
  clearError?: () => void;
}

interface ErrorAPI {
  attribute: string;
  message: string;
}

// const useAuth = create<HttpState<any, FetchProps>>((set, get) => ({
const useTask = create<HttpState>((set, get) => ({
  tasks: [],
  loading: false,
  loadingAddTask: false,
  error: undefined,
  fetchTasks: (params: any) => {
    return new Promise<void>(async (resolve, reject) => {
      if (!get().loading) {
        set({ loading: true, error: undefined });
        const token = await AsyncStorage.getItem("@token");

        api
          .get("/task", { headers: { Authorization: token }, params })
          .then((res) => {
            set(() => ({ tasks: res.data }));
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
  fetchAddTask: (body: any) => {
    return new Promise<void>(async (resolve, reject) => {
      if (!get().loadingAddTask) {
        set({ loadingAddTask: true, error: undefined });
        const token = await AsyncStorage.getItem("@token");

        api
          .post("/task", body, { headers: { Authorization: token } })
          .then(() => {
            // get().fetchTasks();
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
            set({ loadingAddTask: false });
          });
      } else {
        resolve();
      }
    });
  },
  fetchUpdateTask: (id: number, body: any) => {
    return new Promise<void>(async (resolve, reject) => {
      set({ error: undefined });
      const token = await AsyncStorage.getItem("@token");

      api
        .put(`/task/${id}`, body, { headers: { Authorization: token } })
        .then(() => {
          // get().fetchTasks();
          resolve();
        })
        .catch((err: any) => {
          set({
            error:
              err.response?.data?.message ||
              "Ocorreu um erro ao realizar o login",
          });
          reject(err);
        });
    });
  },
  fetchDeleteTask: (id: number) => {
    return new Promise<void>(async (resolve, reject) => {
      set({ error: undefined });
      const token = await AsyncStorage.getItem("@token");

      api
        .delete(`/task/${id}`, { headers: { Authorization: token } })
        .then(() => {
          // get().fetchTasks();
          resolve();
        })
        .catch((err: any) => {
          set({
            error:
              err.response?.data?.message ||
              "Ocorreu um erro ao realizar o login",
          });
          reject(err);
        });
    });
  },
}));

export default useTask;
