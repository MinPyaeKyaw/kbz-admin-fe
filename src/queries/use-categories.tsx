import api from "../utils/api";

export const getCategories = async () => {
    let res = await api.get('categories');

    return res;
}