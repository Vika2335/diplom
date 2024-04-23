import React, { useState } from 'react'
import './CreatePost.css'
import download from '../../image/icons/download.svg'
import { useCreatePostMutation } from '../../redux/postsApi'
import { useNavigate } from 'react-router-dom'

function CreatePost() {
  const [formdata, setformdata] = useState({
    header: '',
    body: '',
    tags: ''
  });

  const { header, body, tags} = formdata;

  const [createPost, { isLoading, isError }] = useCreatePostMutation();

  const change = (e) => {
    setformdata({...formdata,[e.target.name]:e.target.value});
  }

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await createPost(formdata);
      setformdata({ header: '', body: '', tags: '' });
      navigate('/post/:id');
    } catch (error) {
      console.error('Ошибка при создании поста:', error);
    }
  }; 

  return (
    <>
      <main>
        <section>
          <div className="container">
            <div className='create-post__content'>
              <form className='create-post__form' onSubmit={submit}>
                <div className='create-post__data'>
                  <div className='data'>
                    <label className='label-title'>Название:</label>
                    <input className='input-title' type="title" value={header} placeholder="Название" name="name" onChange={change}/>
                  </div>
                  <div className='data'>
                    <label className='label-tag'>Теги:</label>
                    <input className='input-tag' type="title" value={tags} placeholder="Теги" name="tag" onChange={change}/>
                  </div>
                </div>
                <button className='download'><img src={download} alt='No image'/></button>
                <div className='data'>
                  <label className='label-text'>Текст:</label>
                  <input className='body' type="body" value={body} placeholder="Текст" name="body" onChange={change}/>
                </div>
              </form>
              <button className='public__button' type="submit" name="submit">Опубликовать</button>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default CreatePost