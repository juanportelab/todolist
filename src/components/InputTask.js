import {Select, Input, Button, Grid, Header, Icon } from 'semantic-ui-react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const options = [
    { key: "deporte", text:"Deporte", value:"deporte"},
    { key: "casa", text:"Casa", value:"casa"},
    { key: "oficina", text:"Oficina", value:"oficina"},
    { key: "otra", text:"Otra", value:"otra"},
]

export default function InputTask(props) {
    const [task, setTask] = useState({
        idTask: "",
        taskName: "",
        categoryTask: ""
    });
    const [error, setError] = useState(false);

    const { createTask } = props;

    const onChangeTask = (e) =>{
        setTask({
            ...task,
            [e.target.name] : e.target.value,
        });        
    };

    const onChangeCategoryTask = (e, data) =>{
        setTask({
            ...task,
            [data.name] : data.value,
        });
    };

    const onSubmitTask = (e) => {
        
        //que no recargue la página --> (función de javascript)
        e.preventDefault();

        //validación del formulario
        if (task.taskName.trim() ===""){
            setError(true);
            return;
        }

        //eliminar el mensaje previo de error en caso de que se hubiese mostrado
        setError(false);

        //asignar un id (se importó un componente)
        task.idTask= uuidv4();

        //crear la tarea
        createTask(task);

        //limpiar los imputs
        setTask({
            idTask: "",
            taskName: "",
            categoryTask: "",
        });
    };
    
    return (
        <>
        <p>Proyecto modificado</p>
            <Grid centered columns={2}>
                <Input type="text" action>
                    <Input 
                        size="small" 
                        icon="add" 
                        placeholder="Escribe tu tarrea..." 
                        iconPosition="left" 
                        name="taskName"
                        value={task.taskName}
                        onChange={onChangeTask}>
                    </Input>
                    <Select 
                        compact 
                        options={options} 
                        className="select-from-task" 
                        name="categoryTask" 
                        placeholder="Categoria"
                        value={task.categoryTask}
                        onChange={onChangeCategoryTask}>
                    </Select>
                    <Button type="submit" color="violet" onClick={onSubmitTask}>
                        Añadir tarea                      
                    </Button>
                </Input>
            </Grid>
            {error && (
                <Grid centered>
                    <Header as="h4" color="red" className="alert-error-form">
                        <Icon name="close"></Icon>
                        <Header.Content>La tarea es obligatoria</Header.Content>
                        <Icon name="close"></Icon>
                    </Header>
                </Grid>
            )}
        </>
    );
}