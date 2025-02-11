import { useState } from "react"
import './AddCategory.scss'

export const AddCategory = ({onNewCategory}) => {

    const [inputValue, setInputValue] = useState('')

    const onInputChange = (event) => {
        setInputValue(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();
    
        const newInputValue = inputValue.trim();
        if (newInputValue.length === 0) return;
    
        const formattedValue = newInputValue.toUpperCase();
    
        if (typeof onNewCategory === "function") {
            onNewCategory(formattedValue);
        }
    
        setInputValue('');
    };


    return (

        <form  onSubmit={onSubmit}>

            <input
                type="text"
                placeholder="¿Necesitas un gif? ¡Escribe aquí!"
                value={inputValue}
                onChange={onInputChange}
            />




        </form>


    )
}