import React from 'react';
import { CoursePart } from '../types';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = (props : CoursePart) => {
  const style={ padding: "10px" }
  switch(props.type) {
    case "normal": return (
      <div style={style}>
        <div>{props.name} {props.exerciseCount}</div>
        <i>{props.description}</i>
      </div>
    )
    case "groupProject": return (
      <div style={style}> 
        <div>{props.name} {props.exerciseCount}</div>
        Project exercises: {props.groupProjectCount}
      </div>
    )
    case "submission": return (
      <div style={style}>
        <div>{props.name} {props.exerciseCount}</div>
        Submit to {props.exerciseSubmissionLink}
      </div>
    )
    case "special": return (
      <div style={style}>
        <div>{props.name} {props.exerciseCount}</div>
        <i>{props.description}</i>
        <div>Required skills: {props.requirements.join(', ')}</div>
      </div>
    )
    default:
      assertNever(props)
      return (<></>)
  }
};

const Content = ({parts} : { parts: Array<CoursePart> }) => {
  return (
    <div>
      {parts.map(part => (<Part key={part.name} { ...part } />))}
    </div>
  )
};

export default Content;