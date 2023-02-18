import { BlogInterface } from "../../../utils/interfaces"
import {Link, useNavigate} from 'react-router-dom'
import PageHeader from "../PageHeader/PageHeader"

  interface Props {
    data: BlogInterface[];
    deleteData: (id:string) => void;
  }
  
  export default function DataTable({data, deleteData}:Props) {

    return (
      <div className="px-6 lg:px-8">

        <PageHeader title="Blogs" to="/create" toLabel="Create Blog" />
        
        <div className="mt-8 flow-root">
          <div className="-my-2 -mx-6 overflow-x-auto lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900">
                        Photo
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Title
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Body
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"></th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-6">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {data.map((blog) => (
                      <tr key={blog._id}>
                        <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-gray-900">
                          <img alt="sad" src={blog.photo} className={'w-10 aspect-square object-cover rounded-sm'} />
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{blog.title}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{blog.body.substr(0, 40)+"..."}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div onClick={() => deleteData(blog._id)} className="text-red-600 cursor-pointer">
                            Delete<span className="sr-only"></span>
                          </div>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium">
                          <Link to={`/update/${blog._id}`} className="text-indigo-600 hover:text-indigo-900">
                            Edit<span className="sr-only"></span>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  