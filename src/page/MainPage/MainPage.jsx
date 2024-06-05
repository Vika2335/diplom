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

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    setMaxPages(totalPages);

    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = Math.min(startIndex + postsPerPage, filteredPosts.length);
    const currentPosts = filteredPosts.slice(startIndex, endIndex);
    setPosts(currentPosts);
  };

  const postsPerPage = 8;

  const [currentPage, setCurrentPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);
  const [postsPag, setPosts] = useState([]);

  useEffect(() => {
    if (!isLoading && posts) {
      const totalPages = Math.ceil(posts.length / postsPerPage);
      setMaxPages(totalPages);

      const startIndex = (currentPage - 1) * postsPerPage;
      const endIndex = Math.min(startIndex + postsPerPage, posts.length);
      const currentPosts = posts.slice(startIndex, endIndex);
      setPosts(currentPosts);

      setFilteredPosts(currentPosts);
    }
  }, [posts, currentPage, isLoading]);

  useEffect(() => {
    updatePaginationButtons();
  }, [currentPage, maxPages]);

  function updatePaginationButtons() {
    const firstBackBtn = document.querySelector('#firstback');
    const lastForwardBtn = document.querySelector('#lastforward');
    const forwardBtn = document.querySelector('#forward');
    const backBtn = document.querySelector('#back');
  
    if (firstBackBtn && lastForwardBtn && forwardBtn && backBtn) {
      if (currentPage > 1) {
        firstBackBtn.removeAttribute('disabled');
        backBtn.removeAttribute('disabled');
      } else {
        firstBackBtn.setAttribute('disabled', 'true');
        backBtn.setAttribute('disabled', 'true');
      }
  
      if (currentPage === maxPages) {
        lastForwardBtn.setAttribute('disabled', 'true');
        forwardBtn.setAttribute('disabled', 'true');
      } else {
        lastForwardBtn.removeAttribute('disabled');
        forwardBtn.removeAttribute('disabled');
      }
    }
  
    const centralBtn = document.querySelector('#page');
    if (centralBtn) {
      centralBtn.innerHTML = currentPage;
    }
  } 

  function nextPage() { 
    if (currentPage < maxPages) {
      setCurrentPage(page => page + 1);
    }
  }

  function previousPage() { 
    if (currentPage > 1) {
      setCurrentPage(page => page - 1);
    }
  }

  const handleNewPosts = () => {
    if (!isLoading && posts) {
      const sortedPosts = [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setFilteredPosts(sortedPosts);
      setCurrentPage(1);
    }
  };
  
  const handlePopularPosts = () => {
    if (!isLoading && posts) {
      const sortedPosts = [...posts].sort((a, b) => b.likes.length - a.likes.length);
      setFilteredPosts(sortedPosts);
      setCurrentPage(1);
    }
  };
  

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
              <div className='button__new'><button className='new' onClick={handleNewPosts}>Новое</button></div>
              <div className='button__popular'><button className='popular' onClick={handlePopularPosts}>Популярное</button></div>
            </div>
            <div className="posts__gallery">
              {filteredPosts.length > 0 ? (
                postsPag.map((item) => (
                  <div className='post' key={item._id}>
                    <Link className='link' to={`/post/${item._id}`}>
                      <div className='post__button'>
                        <h2 className='title'>{item.header}</h2>
                        <p className='description'>{item.body}</p>
                        <p className='tags'>{item.tags}</p>
                        <div className='information__post'>
                          <div className='post__content'>
                            <div className='views'>
                              <p className='view__int'>{item.viewCount}</p>
                              <img src={eye} alt='No image'/>
                            </div>
                            <div className='comment'>
                              <p className='int'>{item.comments.length}</p>
                              <img src={comment} alt='No image'/>
                            </div>
                            <div className='hearts'>
                              <p className='int'>{item.likes.length}</p>
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
                ))
              ) : (
                <p className='notFound'>Посты не найдены.</p>
              )}
            </div>
            <div className="nav">
              <div className="pagination">
                <button className="pagination__button-img" id="firstback" onClick={() => setCurrentPage(1)}>
                  &lt;&lt;
                </button>
                <button className="pagination__button-img" id="back" onClick={() => previousPage()}>
                  &lt;
                </button>
                <button className="pagination__button-img pagination__button" id="page">{currentPage}</button>
                <button className="pagination__button-img nav-img" id="forward"  onClick={() => nextPage()}>
                  &gt;
                </button>
                <button className="pagination__button-img nav-img" id="lastforward" onClick={() => setCurrentPage(maxPages)}>
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