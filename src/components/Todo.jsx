import '../css/todo.css';
import React from 'react';

export function Todo() {
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [todos, setTodos] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [disableNext, setdisableNext] = React.useState(false);
  const [loading, setLoading] = React.useState(true); 
  React.useEffect(() => {    
    fetchlatestData()        
  }, [page])


  function fetchlatestData() {
    setLoading(true)
    //pagination implemented using _page and _limit
    
    fetch(`https://fake-api-project-for-masai.herokuapp.com/tasks?_page=${page}&_limit=${3}`).then(e => e.json()).then(e => {
      if(e.length==0) setdisableNext(true)
      setTodos(e);
      setLoading(false)      
    })
  }

  return (
    
    <div div className = 'container' >
           
    <h1 className="title">Todo...</h1>
      <input type="text" className="inputTitle" placeholder="Title" value={ title} onChange={(e) => {
        setTitle(e.target.value);
      }}/>    
      
      <input type="text" className="inputBody" placeholder="Add Task..." value={text} onChange={(e) => {
        setText(e.target.value);
      }}/>  
      <button className="addBtn" onClick={() => {
        if (title == '' || text == '') alert('Please enter the details!')
        else {
          
          let td = { title, task: text, status: false };  
          fetch('https://fake-api-project-for-masai.herokuapp.com/tasks', {
              method: "POST",
              body: JSON.stringify(td),
              headers: {
                  'Content-Type': 'application/json',
              }
          }).then(() => {
            fetchlatestData()
            setTodos([...todos,td])
  
          })
        }
      }}>Add</button> 
      {(loading == true) ?<div className='loading'></div> :
        <>
        <div className='todoItem'>
          <div className='outputbox'>{
            todos.map(e => {
              return <h3>{e.title}</h3>
            })}
          </div>
          <div className='outputbox'>{todos.map(e => {
            return <h3>{e.task}</h3>
          })}
          </div>
          </div>
          {console.log(disableNext)}
          <button className='prev' disabled={page <= 1} onClick={() => {
            if (disableNext) setdisableNext(false);
          setPage(page - 1)
        }}>Prev</button>
        <button disabled={disableNext ? true : false} onClick={() => {
          setPage(page + 1)
          }}>Next</button>
      </>
      }
    </div > 
    
    )
}