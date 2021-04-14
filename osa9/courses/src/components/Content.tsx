import React from 'react';
import { CoursePart } from '../types';

const Part = ({ name, exerciseCount } : CoursePart) => {
  console.log(name, exerciseCount)
  return (
    <p>{name} {exerciseCount}</p>
  )
};

const Content = ({parts} : { parts: Array<CoursePart> }) => {
  console.log(parts)
  return (
    <div>
      {parts.map(part => (<Part key={part.name} name={part.name} exerciseCount={part.exerciseCount} />))}
    </div>
  )
};

export default Content;