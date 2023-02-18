import React, {useEffect, useState} from 'react'
import PageHeader from '../PageHeader/PageHeader'

import toast from 'react-hot-toast';
import { useForm } from "react-hook-form";

import { getCategories } from '../../../queries/use-categories';
import { getTags } from '../../../queries/use-tags';
import { insertBlog } from '../../../queries/use-posts';

export default function Form() {

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);

  const onSubmit = async (data:any) => {
    try {
      data.photo = data.photo[0];
      console.log(data);
      let res = await handleCreateBlog(data)
      if(res) {
        toast.success("Successfully created!")
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

  const handleCreateBlog = async (body:any) => {
    return await insertBlog(body); 
  }

  useEffect(() => {
    fetchTags();
    fetchCategories();
  }, [])

  return (
    <div className='px-2'>

      <PageHeader title="Create a Blog" />  

      <form onSubmit={handleSubmit(onSubmit)}>
      
      <div className="sm:col-span-6 mt-8">
        <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700">
          Cover photo
        </label>
        <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            </svg>
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="photo"
                className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span>Upload a file</span>
                <input 
                {...register("photo", {
                  required: "Photo needed!"
                })} 
                id="photo"
                type="file" 
                className="sr-only" />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
          </div>
        </div>
        {errors.photo && <div className='text-xs text-[red]'><>{errors.photo?.message}</></div>}
      </div>

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
              return(<option key={cate._id} value={cate._id}>{cate.name}</option>)
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
              return(<option key={tag._id} value={tag._id}>{tag.name}</option>)
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
            Create
          </button>
        </div>
      </div>
      </form>
    </div>
  )
}
