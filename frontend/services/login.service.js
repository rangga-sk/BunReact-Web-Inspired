import api from "../boot/axios";

export async function loginDef(payload) {
  if (!payload || typeof payload !== "object") {
    throw new Error("Payload harus berupa object");
  }
  try {
    const res = await api.post("/bad/login", payload);
    return res.data;
  } catch (error) {
    return error.response;
  }
}