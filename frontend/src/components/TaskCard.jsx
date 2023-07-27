import { useState } from 'react';
import { useLongPress } from 'use-long-press';
export default function TaskCard({ id, task, completed }) {
  return (
    <div className="w-11/12 shadow bg-base-100 card card-compact ">
      <div className=" card-body collapse-title">
        <p
          className={`text-center text-secondary ${
            completed && 'line-through'
          }`}>
          {task}
        </p>
      </div>
    </div>
  );
}
