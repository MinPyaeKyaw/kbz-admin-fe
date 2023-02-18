import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import EditForm from '../components/common/EditForm/EditForm'
import Layout from '../components/common/Layout/Layout'
import { getBlogById } from '../queries/use-posts';

export default function Update() {

  const routeParams = useParams();

  const [post, setPost] = useState<any>({});

  const fetchPostById = async () => {
    try {
      // @ts-ignore
      let res = await getBlogById(routeParams.id);
      setPost(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPostById();
  }, [routeParams.id]);

  return (
    <>
        <Layout>
            <EditForm post={post} />
        </Layout> 
    </>
  )
}
