import { del, get, patch, post } from "@/utils/request";

export const getAccounts = async () => {
    const result = await get("accounts");
    return result;
}

export const getAccount = async (id: string) => {
    const result = await get(`accounts/${id}`);
    return result;
}

export const createAccount = async (options: any) => {
    const result = await post("accounts/create", options);
    return result;
}

export const updateAccount = async (id: string, options: any) => {
    const result = await patch(`accounts/update/${id}`, id, options);
    return result;
}

export const deleteAccount = async (id: string) => {
    await del("accounts/delete/", id);
}