import React, { useState, useContext } from 'react'
import axios from 'axios'
import { Context } from '..';
import backEndUrl from '../host';
//styles
import '../styles/Home.css'
import { Link } from 'react-router-dom';

//toast
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const { setId } = useContext(Context);
  const [contents, setContents] = useState([])
  const [names, setNames] = useState('');
  axios.get(`${backEndUrl}`).then((res) => {
    // console.log(res.data.tasks);
    setContents([res.data.tasks])
  })
  const handleEdit = (_id) => {
    setId(_id);
  }
  const handleDelete = async (_id) => {
    try {
      await axios.delete(`${backEndUrl}/${_id}`)
      toast.success("Deleted Successfully!")
    } catch (e) {
      console.log(e);
    }
  }
  const handleNameChange = (event) => {
    setNames(event.target.value);
  };
  const handleSubmit = async () => {
    try {
      await axios.post(`${backEndUrl}`, { name: names })
      toast.success('Added Successfully!');
    } catch (e) {
      console.log(e);
    }
  }

  return (

    <>
      <div className='task-input'>
        <p>Task Manager</p>
        <input className="input" type="text" placeholder='e.g. wash dishes' onChange={handleNameChange} />
        <button className='submit' onClick={handleSubmit} >Submit</button>
      </div>


      {
        contents.length ?
          contents[0].map((i) => {
            return (
              <>
                <div className='tasks'>
                  <div className='task-name'>
                    {
                      !i.completed ? i.name : <s className='completed-word'>{i.name}</s>
                    }
                  </div>
                  <div className='icons-div'>
                    <Link className='icons edit' to={'/edit'} onClick={() => { handleEdit(i._id) }}><i className='fas fa-edit'></i></Link>
                    <Link className='icons trash' onClick={() => { handleDelete(i._id) }}><i className='fas fa-trash'></i></Link>
                  </div>
                </div>
              </>
            )


          }) : <div></div>
      }
      <ToastContainer />
    </>

  )
}

export default Home


