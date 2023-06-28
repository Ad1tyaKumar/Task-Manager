import React, { useState, useContext } from 'react'
import axios from 'axios'
import { Context } from '..';
import backEndUrl from '../host';
import { Link } from 'react-router-dom';

//toast
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const { setId } = useContext(Context);
  const [contents, setContents] = useState([[]])
  const [names, setNames] = useState('');
  const [loading,setLoading]=useState(true);
  const fetchData=async()=>{
    try{
      await axios.get(`${backEndUrl}/`,{withCredentials:true}).then((res) => {
        setContents([res.data.tasks])
        setLoading(false)
      })
    }catch(e){
      console.log(e);
    }
  }
  fetchData();
  const handleEdit = (_id) => {
    setId(_id);
  }
  const handleDelete = async (_id) => {
    try {
      await axios.delete(`${backEndUrl}/${_id}`,{withCredentials:true})
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
      await axios.post(`${backEndUrl}` ,{ name: names },{withCredentials:true})
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
        <button className='submit' onClick={handleSubmit} disabled={loading} >Submit</button>
      </div>

      {loading && <p>Please Wait Loading...</p>}
      
      {
          contents[0].length?
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


          }) :<p>No tasks to display!</p>
      }
      <ToastContainer />
    </>

  )
}

export default Home


