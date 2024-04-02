import './App.css'

import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// Replace your code here
class App extends Component {
  state = {
    userInputList: [],
    activeTag: '',
    task: '',
    tag: '',
  }

  addTask = event => {
    event.preventDefault()
    const {task, tag} = this.state
    if (task !== '') {
      const newTask = {
        id: uuidv4(),
        tag,
        task,
      }
      this.setState(prev => ({
        userInputList: [...prev.userInputList, newTask],
        task: '',
        tag: '',
        activeTag: '',
      }))
    }
  }

  selectedTag = e => {
    console.log(e.target.value)
    this.setState({tag: e.target.value})
  }

  onInputTask = e => {
    this.setState({task: e.target.value})
  }

  setActiveTag = id => {
    const {activeTag} = this.state
    if (activeTag === id) {
      this.setState({activeTag: ''})
    } else {
      this.setState({activeTag: id})
    }
  }

  render() {
    const {userInputList, activeTag, task, tag} = this.state
    const taskList = userInputList.filter(each => each.tag.includes(activeTag))
    return (
      <div className="background-con">
        <form className="form-con" onSubmit={this.addTask}>
          <h1 className="from-heading">Create a task!</h1>
          <div className="label-input-con">
            <label htmlFor="task">Task</label>
            <input
              placeholder="Enter the task here"
              id="task"
              onChange={this.onInputTask}
              value={task}
              type="text"
            />
          </div>
          <div className="label-input-con">
            <label htmlFor="option">Tags</label>
            <select id="option" onChange={this.selectedTag} value={tag}>
              {tagsList.map(each => (
                <option value={each.displayText} key={each.optionId}>
                  {each.displayText}
                </option>
              ))}
            </select>
          </div>
          <button className="add-btn" type="submit">
            Add Task
          </button>
        </form>
        <div className="tasks-con">
          <h1>Tags</h1>
          <ul className="ul-button-con">
            {tagsList.map(each => {
              const style =
                activeTag === each.displayText ? 'active-tag-btn' : 'tag-button'
              return (
                <li key={each.optionId}>
                  <button
                    onClick={() => {
                      this.setActiveTag(each.displayText)
                    }}
                    className={style}
                    type="button"
                  >
                    {each.displayText}
                  </button>
                </li>
              )
            })}
          </ul>
          <h1>Tasks</h1>
          {taskList.length === 0 ? (
            <div className="empty-tags">
              <p className="empty-p">No Tasks Added Yet</p>
            </div>
          ) : (
            <ul className="ul-tags-con">
              {taskList.map(each => (
                <li className="li-tag" key={each.id}>
                  <li className="task-name">{each.task}</li>
                  <li className="tag-name">{each.tag}</li>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}
export default App
