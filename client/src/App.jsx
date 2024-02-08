import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [array, setArray] = useState([])
  const [task, setTask] = useState('')

  useEffect(() => {
    const taskList = JSON.parse(localStorage.getItem('list'))
    if (taskList) {
      setArray(taskList)
    }
  }, [])

  const setList = (task) => {
    setArray([...array, { task: task, complite: false }])
    localStorage.setItem('list', JSON.stringify([...array, { task: task, complite: false }]))
  }

  const complite = (index) => {
    const updateArray = array.map((item, i) =>
      i == index ? { ...item, complite: true } : item
    )
    setArray(updateArray)
    localStorage.setItem('list', JSON.stringify(updateArray))
  }

  const deleteTask = (i) => {
    const newArray = array.filter((a, index) => {
      return index !== i
    })
    console.log(newArray);
    setArray(newArray)
    localStorage.setItem('list', JSON.stringify(newArray))
  }

  return (
    <>
      <div className="inputTask">
        <input
          type="text"
          placeholder='Введите задачу'
          value={task}
          onChange={(a) => setTask(a.target.value)} />
        <button
          onClick={() => {
            setList(task);
            setTask('')
          }}
          className='btnAdd'>добавить</button>
      </div>
      <div className="list">
        {
          array.map((e, index) => (
            <div className="task" key={index}>
              <p className={e.complite ? "line" : "text"}>{e.task}</p>
              <div className="btns">
                <button
                  onClick={() => complite(index)}
                  className='btn'>v</button>
                <button
                  onClick={() => deleteTask(index)}
                  className='btn'>x</button>
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default App
