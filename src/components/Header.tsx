import { Link } from "react-router"


export const Header = () => {


  return (
    <header
      style={{
        display: "flex",
        gap: "1rem",
        padding: "1rem",
        borderBottom: "1px solid #ccc",
        alignItems: "center",
      }}
    >
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      
      </header>
      )
    }