import React, {useEffect, useState} from 'react'
import { toast } from 'react-hot-toast';
import DataTable from '../components/common/DataTable/DataTable'
import Layout from '../components/common/Layout/Layout'
import { deleteBlog, getBlogs } from '../queries/use-posts';

export default function Dashboard() {

    const [postsList, setPostsList] = useState<any>([]);

    const fetchPosts = async () => {
      try {
        let res = await getBlogs(20, 0);
        setPostsList(res.data.docs);
      } catch (error) {
        console.log(error);
      }
    }

    const handleDeleteBlog = async (id:string) => {
      try {
        let res = await deleteBlog(id);

        if(res) {
          toast.success("Successfully Deleted!");
          let filteredPostsList = postsList.filter((post:any) => {
            return post._id !== id;
          })
          setPostsList(filteredPostsList);
        }
      } catch (error) {
        toast.error("Something went wrong!");
      }
    }
  
    useEffect(() => {
      fetchPosts();
    }, [])

  return (
    <>
        <Layout>
            <DataTable data={postsList} deleteData={handleDeleteBlog} />
        </Layout> 
    </>
  )
}
