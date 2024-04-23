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
    setformdata({...formdata, [e.target.name]:e.target.value});
  }

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createPost(formdata);
      console.log(data)
      setformdata({ header: '', body: '', tags: '' });
      navigate(`/post/${data._id}`);
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
                    <input className='input-title' required type="text" value={header} placeholder="Название" name="header" onChange={change}/>
                  </div>
                  <div className='data'>
                    <label className='label-tag'>Теги:</label>
                    <input className='input-tag' required type="text" value={tags} placeholder="Теги" name="tags" onChange={change}/>
                  </div>
                </div>
                <button className='download'><img src={download} alt='No image'/></button>
                <div className='data'>
                  <label className='label-text'>Текст:</label>
                  <textarea className='body' minLength="3" rows="10" required type="body" value={body} placeholder="Текст" name="body" onChange={change}></textarea>
                </div>
                <button className='public__button' type="submit" name="submit">Опубликовать</button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default CreatePost