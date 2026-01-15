export const Header = ({ children, className = "" }) => {
    return (
        <h1 className={` text-2xl text-left ${className}`}>
            {children}
        </h1>
    );
};
