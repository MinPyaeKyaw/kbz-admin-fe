import api from "../utils/api";

export const getTags = async () => {
    let res = await api.get('tags');

    return res;
}