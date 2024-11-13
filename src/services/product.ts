import { del, get, patch, post } from "@/utils/request";

export const getProducts = async () => {
    const result = await get("products");
    return result;
}

export const getProduct = async (id: string) => {
    const result = await get(`products/${id}`);
    return result;
}

export const createProduct = async (options: any) => {
    const result = await post("products/create", options);
    return result;
}

export const updateProduct = async (id: string, options: any) => {
    const result = await patch("products/update/", id, options);
    return result;
}

export const deleteProduct = async (id: string) => {
    await del("products/delete/", id);
}