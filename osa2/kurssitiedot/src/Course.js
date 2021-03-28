const Header = (props) => {
    return (
      <h1>{props.course}</h1>
    )
  }
  
  const Part = (props) => {
    return (
      <div>
        {props.part.name} {props.part.exercises}
      </div>
    )
  }
  
  const Content = (props) => {
    return (
      <div>
        {props.parts.map(part => (<Part part={part}/>))}
      </div>
    )
  }
  
  const Total = (props) => {
    
    const sum = props.parts.reduce((a, b) => {
      return a + b.exercises;
    }, 0)
  
    return (
      <p><b>Total of {sum} exercises</b></p>
    )
  }
  
  const Course = ({ course }) => {
    return (
      <div>
        <Header course={course.name}/>
        <Content parts={course.parts}/>      
        <Total parts={course.parts}/>
      </div>
    )
  }

  export default Course