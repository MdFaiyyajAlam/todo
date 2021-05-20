import React,{useEffect, useState} from 'react';
const TodoList = () =>{
    const [list, setList] = useState([]);
    const [todo,setTodo] = useState("");

    useEffect(()=>{

    fetch("http://127.0.0.1:8000/api/",{
      header:{
        'content-Type':'application/json',
      },
    }).then(Response=>Response.json())
    .then(data=> setList(data))
    })

    const insertData =() =>{
      //alert(todo);
      let newTodo=[...list,{id:list.length+1,title:todo}]
      setList(newTodo)
      setTodo("");
      fetch("http://127.0.0.1:8000/api/create",{
          headers:{
              'Content-Type':'application/json', 
          },
          method:"POST",
          body:JSON.stringify({
              "title":todo,
          })
             
          
      })
      .then(Response =>Response.json())
      // .then(data=>setlist(data))
  }

    const deleteData = (id) =>{
      // alert(id);
      let newData = list.filter(x => x.id!=id);
      fetch(`http://127.0.0.1:8000/api/delete/${id}`).then(Response=>Response.json())
      setList(newData);
    }

    return(
      
        <div className="container">

            <div className="d-flex">
                <input type="text" className="form-control" placeholder="Add your work" value={todo} onChange={(e)=>setTodo(e.target.value)}/>
                <button className="btn btn-success" onClick={()=>insertData()}>Add</button>
            </div>

            <div className="list-group">
              {
                  list.map(value =>(
                    <div className="list-group-item list-group-item-action">{value.id}.){value.title}
                    
                    <span className="float-end">
                      <button type="button" onClick={()=>deleteData(value.id)} className="btn btn-link text-danger">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-archive" viewBox="0 0 16 16">
  <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
</svg>
                      </button>
                    </span>

                    </div>
                  ))
              }
                
            </div>
        </div>
    )
}
export default TodoList;