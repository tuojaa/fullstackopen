import React, { useState } from 'react'

const FeedbackButton = (props) => {
  return (
    <button onClick={() => { props.increase(props.name)}}>{props.name}</button>
  )
}

const GiveFeedback = (props) => {
  const buttons = Object.keys(props.db).map(name => {    
    return (
      <FeedbackButton key={name} name={name} increase={props.increase}/>
    )
  })
  return (
    <div>
      {buttons}
    </div>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <th>{props.name}</th>
      <td>{props.value}</td>
    </tr>
  )
}

const mapObject = (obj, callback) => {
  return Object.keys(obj).map(key => { 
    return callback(key, obj[key])
  })
}

const reduceObject = (obj, callback, initial) => {
  return Object.keys(obj).reduce((prev, key) => {
    return callback(prev, key, obj[key])
  }, initial)
}

const FeedbackStats = (props) => {
  const all = reduceObject(props.db, (prev, key, value) => {
    return prev + value;
  }, 0);
  if (all === 0) {
    return (
      <div>
        no feedback given
      </div>
    )
  }
  const stats = mapObject(props.db, (name, value) => {        
    return (
      <StatisticLine key={name} name={name} value={value}/>
    )
  })
  const average = reduceObject(props.db, (prev, key, value) => {
    const weight = {
      good: 1,
      neutral: 0,
      bad: -1
    }    
    return prev + weight[key]*value;
  }, 0) / all;
  const positive = (props.db['good'] * 100) / all;
  
  return (
    <table>
      <tbody>
        {stats}
        <StatisticLine name='all' value={all}/>
        <StatisticLine name='average' value={average.toFixed(2)}/>
        <StatisticLine name='positive' value={positive.toFixed(2)+"%"}/>
      </tbody>
    </table>
  )
}

const App = () => {
  
  const [db, change_db] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  })

  const increase = (key) => {    
    const new_db = {
      good: db['good'],
      neutral: db['neutral'],
      bad: db['bad']
    }
    new_db[key] = db[key] + 1
    change_db(new_db)
  }

  return (
    <div>            
      <h1>give feedback</h1>
      <GiveFeedback db={db} increase={increase}/>      
      <h1>statistics</h1>
      <FeedbackStats db={db}/>
    </div>
  )
}

export default App