import React from 'react';
import { CoursePart } from '../types';

const Total = ({parts} : { parts: Array<CoursePart> }) => {
  const total = parts.reduce((carry, part) => carry + part.exerciseCount, 0);
  return (
    <div>
      Total number of exercises {total}
    </div>
  )
};

export default Total;