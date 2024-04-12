import React, { useState, useEffect } from 'react';
import './MainPage.css'
import { useGetPostsQuery } from '../../redux/postsApi'
import { Link } from 'react-router-dom'
import comment from '../../image/icons/comment.svg';
import eye from '../../image/icons/eye.svg'
import heart from '../../image/icons/heart.svg'
import datetime from '../../image/icons/datetime.svg'
import lupa from '../../image/icons/lupa.svg'
import { format } from 'date-fns';

function MainPage() {
  const { data: posts, isLoading } = useGetPostsQuery();

  const [headerFilter, setHeaderFilter] = useState('');
  const [bodyFilter, setBodytFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    if (!isLoading) {
      setFilteredPosts(posts || []);
    }
  }, [isLoading, posts]);

  const handleSearch = () => {
    const filteredPosts = posts.filter((post) => {
      const tags = post.tags && typeof post.tags === 'string' ? post.tags : '';
      const headerMatch = headerFilter.trim() === '' || post.header.toLowerCase().includes(headerFilter.toLowerCase());
      const bodyMatch = bodyFilter.trim() === '' || post.body.toLowerCase().includes(bodyFilter.toLowerCase());
      const tagMatch = tagFilter.trim() === '' || tags.toLowerCase().includes(tagFilter.toLowerCase());
      return headerMatch && bodyMatch && tagMatch;
    });
    setFilteredPosts(filteredPosts);
  };

  const contentPosts = filteredPosts.map((item) => {
    return(
      <div className='post' key={item._id}>
        <Link className='link' to={`/post/${item._id}`}>
          <div className='post__button'>
            <h2 className='title'>{item.header}</h2>
            <p className='description'>{item.body}</p>
            <p className='tags'>{item.tags}</p>
            <div className='information__post'>
              <div className='post__content'>
                <div className='views'>
                  <p className='view__int'>2.2K</p>
                  <img src={eye} alt='No image'/>
                </div>
                <div className='comment'>
                  <p className='int'>10</p>
                  <img src={comment} alt='No image'/>
                </div>
                <div className='hearts'>
                  <p className='int'>5</p>
                  <img src={heart} alt='No image'/>
                </div>
              </div>
              <div className='datetime'>
                <p className='date'>{format(new Date(item.createdAt), 'dd.MM.yyyy')}</p>
                <img src={datetime} alt='No image'/>
              </div>
            </div>
          </div>
        </Link>
      </div>
    )
  }) 

  if (isLoading) return <h1 className='load'>Loading...</h1>

  return (
    <>
      <main>
        <section className='main'>
          <div className="container">
            <div className='filters'>
              <div className='filter'>
                <input className='filter__name' type='text' placeholder='Поиск по названию...' value={headerFilter} onChange={(e) => setHeaderFilter(e.target.value)}/>
                <button className='button__lupa' onClick={handleSearch}><img className='lupa' src={lupa} alt='No image'/></button>
              </div>
              <div className='filter'>
                <input className='filter__content' type='text' placeholder='Поиск по содержанию...' value={bodyFilter} onChange={(e) => setBodytFilter(e.target.value)}/>
                <button className='button__lupa' onClick={handleSearch}><img className='lupa' src={lupa} alt='No image'/></button>
              </div>
              <div className='filter'>
                <input className='filter__tag' type='text' placeholder='Поиск по тегу...' value={tagFilter} onChange={(e) => setTagFilter(e.target.value)}/>
                <button className='button__lupa' onClick={handleSearch}><img className='lupa' src={lupa} alt='No image'/></button>
              </div>
            </div>
            <div className='buttons'>
              <div className='button__new'><button className='new'>Новое</button></div>
              <div className='button__popular'><button className='popular'>Популярное</button></div>
            </div>
            <div className="posts__gallery">
              {contentPosts}
            </div>
            <div className="nav">
              <div className="pagination">
                <button className="pagination__button-img" id="firstback">
                  &lt;&lt;
                </button>
                <button className="pagination__button-img" id="back">
                  &lt;
                </button>
                <button className="pagination__button-img pagination__button" id="page"></button>
                <button className="pagination__button-img nav-img" id="forward">
                  &gt;
                </button>
                <button className="pagination__button-img nav-img" id="lastforward">
                  &gt;&gt;
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default MainPage;