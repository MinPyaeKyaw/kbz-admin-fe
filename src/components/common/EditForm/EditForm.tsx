import React, {useEffect, useState} from 'react'
import PageHeader from '../PageHeader/PageHeader'

import toast from 'react-hot-toast';
import { useForm } from "react-hook-form";

import { getCategories } from '../../../queries/use-categories';
import { getTags } from '../../../queries/use-tags';
import { insertBlog, updateBlog } from '../../../queries/use-posts';
import { BlogInterface } from '../../../utils/interfaces';

interface Props {
  post: BlogInterface
}

export default function EditForm({post}:Props) {

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);

  const onSubmit = async (data:any) => {
    console.log(data);
    try {
      console.log(data);
      let res = await handleUpdateBlog(data)
      if(res) {
        toast.success("Successfully updated!")
      }
    } catch (error) {
      toast.error("Something went wrong!")
      console.log(error);
    }
  };

  const fetchTags = async () => {
    try {
      let res = await getTags();
      setTags(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchCategories = async () => {
    try {
      let res = await getCategories();
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdateBlog = async (body:any) => {
    return await updateBlog(post._id, body); 
  }

  const setInputData = () => {
    console.log(post)
    setValue('title', post.title);
    if(post.category) {
      setValue('category', post.category._id);
    }
    // @ts-ignore
    if(post.tags?.length > 0 && post.tags) {
      setValue('tags', post.tags[0]._id);
    }
    setValue('body', post.body);
  }

  useEffect(() => {
    fetchTags();
    fetchCategories();
  }, [])

  useEffect(() => {
    setInputData();
  }, [tags])

  return (
    <div className='px-2'>

      <PageHeader title="Create a Blog" />  

      <form onSubmit={handleSubmit(onSubmit)}>

      <div className="sm:col-span-6 mt-4">
        <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <div className="mt-1">
          <input
            {...register("title", {
              required: "Blog title needed!"
            })}
            type="text"
            id="street-address"
            className="block py-2 px-2 w-full rounded-md border-[1px] outline-none border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        {errors.title && <div className='text-xs text-[red]'><>{errors.title?.message}</></div>}
      </div>

      <div className="sm:col-span-3 mt-4">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <div className="mt-1">
          <select
            {...register("category", {
              required: "Category needed!"
            })}
            onChange={(e) => setValue('category', e.target.value)}
            id="category"
            className="block py-2 w-full rounded-md border-[1px] border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            {// @ts-ignore 
            categories.map((cate:any) => {
              if(post.category === cate._id) {
                return(<option key={cate._id} value={cate._id} selected>{cate.name}</option>)
              }else {
                return(<option key={cate._id} value={cate._id}>{cate.name}</option>)
              }
            })}
          </select>
        </div>
        {errors.category && <div className='text-xs text-[red]'><>{errors.category?.message}</></div>}
      </div>

      <div className="sm:col-span-3 mt-4">
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
          Tags
        </label>
        <div className="mt-1">
          <select
            {...register("tags", {
              required: "Tag needed!"
            })}
            onChange={(e) => setValue('tags', e.target.value)}
            id="tags"
            className="block py-2 w-full rounded-md border-[1px] border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            {// @ts-ignore 
            tags.map((tag:any) => {
              return(<option key={tag._id} value={tag._id} selected={post.tags === tag._id}>{tag.name}</option>)
            })}
          </select>
        </div>
        {errors.tags && <div className='text-xs text-[red]'><>{errors.tags?.message}</></div>}
      </div>

      <div className="sm:col-span-6 mt-4">
        <label htmlFor="body" className="block text-sm font-medium text-gray-700">
          Your blog
        </label>
        <div className="mt-1">
          <textarea
            {...register("body", {
              required: "Blog needed!"
            })}
            id="body"
            rows={7}
            className="block outline-none p-2 w-full border-[1px] rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            // defaultValue={''}
          />
        </div>
        {errors.body && <div className='text-xs text-[red]'><>{errors.body?.message}</></div>}
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="submit"
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Edit
          </button>
        </div>
      </div>
      </form>
    </div>
  )
}
