import api from "../utils/api";

/**
 * @param limit the limit that will be used for pagination
 * @param offset the offset that will be used for pagination
 */
export const getBlogs = async (limit:number, offset:number) => {
    let res = await api.get('posts', { params: {limit: limit, offset: offset} });

    return res;
} 

export const getBlogById = async (id:string) => {
    let res = await api.get(`posts/${id}`);

    return res;
}

export const insertBlog = async (body:any) => {
    let res = await api.post(`posts`, body, {
        headers: {'content-type': 'multipart/form-data'}
    });

    return res;
}

export const deleteBlog = async (id:string) => {
    let res = await api.delete(`posts/${id}`)

    return res;
}

export const updateBlog = async (id:string, body:any) => {
    let res = await api.patch(`posts/${id}`, body);

    return res;
}