import { Children } from "react"

export const Button = ({ children, onClick, type = "button", className }) => {
    return (

        <button className={`p-1 my-3 bg-black text-white rounded-sm${className}`}
            type={type}
            onClick={onClick}
        >
            {children}
        </button >

    )
}