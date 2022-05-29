import React, { useRef, useImperativeHandle } from "react";

import classes from './Input.module.css'

// forward ref returns a react component which is capable of being bound to a ref
const Input = React.forwardRef((props, ref) => {
    const inputRef = useRef()

    const activate = () => {
        inputRef.current.focus()
    }
    // returns a object and that object contain all the data that can be used from outside
    useImperativeHandle(ref, () => {
        return { focus: activate }
    })
    return (
        <div
            className={`${classes.control} ${props.isValid === false ? classes.invalid : ''
                }`}
        >
            <label htmlFor={props.id}>{props.label}</label>
            <input
                ref={inputRef}
                type={props.type}
                id={props.id}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
            />
        </div>

    )
})
export default Input