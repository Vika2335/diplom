import React, { useState, useEffect } from 'react';
import './LikePosts.css'
import { useGetLikePostsMutation } from '../../redux/postsApi'
import { Link } from 'react-router-dom'
import comment from '../../image/icons/comment.svg';
import eye from '../../image/icons/eye.svg'
import heart from '../../image/icons/heart.svg'
import datetime from '../../image/icons/datetime.svg'
import { format } from 'date-fns';

function LikePosts() {
  const [ getLikedPosts ] = useGetLikePostsMutation();

  const [likePosts, setLikePosts] = useState(0);

  useEffect(() => {
    getLikedPosts()
      .unwrap()
      .then((res) => setLikePosts(res.posts))
  }, [])

  const postsPerPage = 8;

  const [currentPage, setCurrentPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);
  const [postsPag, setPosts] = useState([]);

  useEffect(() => {
    if (likePosts) {
      const totalPages = Math.ceil(likePosts.length / postsPerPage);
      setMaxPages(totalPages);

      const startIndex = (currentPage - 1) * postsPerPage;
      const endIndex = Math.min(startIndex + postsPerPage, likePosts.length);
      const currentPosts = likePosts.slice(startIndex, endIndex);
      setPosts(currentPosts);
    }
  }, [likePosts, currentPage]);

  useEffect(() => {
    updatePaginationButtons();
  }, [currentPage, maxPages]);

  const contentLikePosts = postsPag && postsPag.length > 0 ? (
    postsPag.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map((item) => (
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
  ) : null;

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

  return (
    <>
      <main>
        <section className='main'>
          <div className="container">
            <div className="posts__gallery-like">
              {contentLikePosts || <p className='notFound'>Посты не найдены.</p>}
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

export default LikePosts;