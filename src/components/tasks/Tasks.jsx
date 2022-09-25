import React, { useEffect } from 'react'
import './tasks.css'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useState } from 'react'

export default function Tasks({data, deleteTask}) {
    const [weeklyTasks, updateWeeklyTasks] = useState(data);
    const [dailyTasks, setDailyTasks] = useState([]);

    useEffect(() => {
        updateWeeklyTasks(data)
    }, [data])
    

    const handleOnDragEnd = (result) => {
        const { source, destination } = result
        if(!destination){
            return;
        }
        if(source.droppableId === destination.droppableId){
            if(source.droppableId === "weekly"){
                let tempWeeklyTasks = Array.from(weeklyTasks);
                const [reorderedItem] = tempWeeklyTasks.splice(source.index, 1);
                tempWeeklyTasks.splice(destination.index, 0, reorderedItem);
                updateWeeklyTasks(tempWeeklyTasks);
            }
            else{
                let tempDailyTasks = Array.from(dailyTasks);
                const [reorderedItem] = tempDailyTasks.splice(source.index, 1);
                tempDailyTasks.splice(destination.index, 0, reorderedItem);
                setDailyTasks(tempDailyTasks);
            }
        }
        else{
            let tempWeeklyTasks = weeklyTasks;
            let tempDailyTasks = dailyTasks;

            if(source.droppableId === "weekly"){
                const [removed] = tempWeeklyTasks.splice(source.index, 1);
                tempDailyTasks.splice(destination.index, 0, removed);
                updateWeeklyTasks(tempWeeklyTasks);
                setDailyTasks(tempDailyTasks);
            }
            else{
                const [removed] = tempDailyTasks.splice(source.index, 1);
                tempWeeklyTasks.splice(destination.index, 0, removed);
                updateWeeklyTasks(tempWeeklyTasks);
                setDailyTasks(tempDailyTasks);
            }
        }
    }


    return (
        <DragDropContext onDragEnd={handleOnDragEnd} >
        <div className="container">
            <Droppable droppableId="weekly">
                {(provided)=>(
                        <div className="weekly box" {...provided.droppableProps} ref={provided.innerRef}>
                            <h3>Weekly Tasks</h3>
                            <div className='scroll'>
                                {data.map(({id, name, time_created, scrumgoalhistory_set}, index) => {
                                    return(
                                        <Draggable key={id} draggableId={id.toString()} index={index} >
                                            {(provided) => (
                                                <p className='task'
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                onClick={()=>{deleteTask(id)}} >
                                                    {name}
                                                    <div className='time'>{time_created.slice(0,10)} at {time_created.slice(12,16)}</div>
                                                    <div className='blue'>
                                                        {scrumgoalhistory_set.map(({id, done_by}) => {
                                                            return(<p key={id}>{done_by}</p>)
                                                        })}
                                                    </div>
                                                    </p>
                                            )}
                                        </Draggable>
                                    )})}
                            </div>
                        {provided.placeholder}
                </div>
                )}
            </Droppable>

            <Droppable droppableId='daily'>
                {(provided)=>(
                <div className="daily box" { ...provided.droppableProps} ref={provided.innerRef}>
                    <h3>Daily Tasks</h3>
                    <div className='scroll'>
                        {dailyTasks.map(({id, name, time_created, scrumgoalhistory_set}, index)=>{
                            return(
                                <Draggable key={id} draggableId={id.toString()} index={index} >
                                    {(provided)=>(
                                        <p className='task'
                                        ref={provided.innerRef}
                                        { ...provided.draggableProps}
                                        { ...provided.dragHandleProps}
                                        >
                                            {name}
                                                <div className='time'>{time_created.slice(0,10)} at {time_created.slice(12,16)}</div>
                                                <div className='blue'>
                                                    {scrumgoalhistory_set.map(({id, done_by}) => {
                                                        return(<p key={id}>{done_by}</p>)
                                                    })}
                                                </div>
                                            </p>
                                    )}
                                </Draggable>
                            )})}
                    </div>
                        {provided.placeholder}
                </div>
                )}
            </Droppable>
        </div>
    </DragDropContext>
  )
}
