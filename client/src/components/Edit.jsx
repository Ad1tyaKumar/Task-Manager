import React, { useContext, useState, useEffect } from 'react';
import '../styles/Edit.css';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import backEndUrl from '../host';
//toast
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


import { Context } from '..';

const Edit = () => {
  const { id } = useContext(Context);
  const [content, setContent] = useState({});
  const [names, setNames] = useState('');
  const [check, setCheck] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backEndUrl}/${id}`);
        setContent(response.data.task);
      } catch (error) {
        // Handle error
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    setNames(content.name);
    setCheck(content.completed)
  }, [content]);

  if (id === '') {
    return <Navigate to={'/'} />;
  }

  const handleNameChange = (event) => {
    setNames(event.target.value);
    console.log('h');
  };

  const handleEdit = async () => {
    try {
      await axios.patch(`${backEndUrl}/${id}`, { name: names, completed: check });
      toast.success('Edited Successfully!')
    } catch (e) {
      console.log(e);
    }
  };
  const handleCheck = () => {
    setCheck(!check);
  }
  return (
    <>
      <div className='main-content'>
        <p>Edit Task</p>
        <div className='content'>
          <p className='task-id'>Task ID</p> <p className='values id'>{content._id}</p>
        </div>
        <div className='content'>
          <p className='name'>Name</p> <input className='input1 values' type='text' value={names} onChange={handleNameChange} />
        </div>
        <div className='content'>
          <p className='completed'>Completed</p> <input className='values' type='checkbox' defaultChecked={content.completed} onClick={handleCheck} />
        </div>
        <button className='edit-button' onClick={handleEdit}>
          Edit
        </button>
      </div>
      <Link to={'/'}>
        <button className='back-home'>Back To Tasks</button>
      </Link>
      <ToastContainer />
    </>
  );
};

export default Edit;
