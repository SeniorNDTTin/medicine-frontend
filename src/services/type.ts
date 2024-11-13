import { del, get, patch, post } from "@/utils/request";

export const getTypes = async () => {
    const result = await get("types");
    return result;
}

export const getType = async (id: string) => {
    const result = await get(`types/${id}`);
    return result;
}

export const createType = async (options: any) => {
    const result = await post("types/create", options);
    return result;
}

export const updateType = async (id: string, options: any) => {
    const result = await patch("types/update/", id, options);
    return result;
}

export const deleteType = async (id: string) => {
    await del("types/delete/", id);
}