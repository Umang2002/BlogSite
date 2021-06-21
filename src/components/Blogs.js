import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { selectSearchInput, setBlogData } from '../fetures/userSlice';
import '../styling/blogs.css'

const Blogs = () => {

    const searchInput = useSelector(selectSearchInput);

    const blog_url = `https://gnews.io/api/v4/search?q=${searchInput}&token=9f9bb4969599dd16dd88b3e55001df1a`;
    const dispatch = useDispatch();
    const [blogs, setBlogs] = useState();

    const [loading, setLoading] = useState(true)


    useEffect(() => {
        axios.get(blog_url).then((res) => {
            dispatch(setBlogData(res.data))
            setBlogs(res.data)
            setLoading(false)
        })
            .catch(err => {
                console.log(err)
            })
    }, [searchInput])
    return (
        <div className="blog_page">
            <h1 className="blog__page__header">Blogs</h1>
            {loading ? <h1 className="loading"> Loading...</h1> : ""}
            <div className="blogs">
                {
                    blogs?.articles?.map(blog => (
                        <a className="blog" target="_blank" href={blog.url}>
                            <img src={blog.image}></img>
                            <div>
                                <h3 className="sourceName">
                                    <span>
                                        {blog.source.name}
                                    </span>
                                    <span>
                                        {blog.publishedAt}
                                    </span>
                                </h3>
                                <h1>{blog.title}</h1>
                                <p>{blog.description}</p>
                            </div>
                        </a>
                    ))
                }
                {blogs?.totalArticles == 0 && (
                    <h1 className="no__blogs">
                        No blogs available 😞. Search something else to read blogs on the
                        greatest platform.
                    </h1>
                )}
            </div>
        </div>
    )
}

export default Blogs;
