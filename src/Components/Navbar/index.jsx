import { NavLink } from "react-router-dom"
import { useContext } from "react"
import { ShoppingContext } from "../../Context"
import { FiSearch, FiShoppingBag } from "react-icons/fi"
import "./navbar.css"

const categories = [
    { label: "Todos", path: "/", category: null },
    { label: "Amigurumis", path: "/Amigurumis", category: "Amigurumis" },
    { label: "Plantas", path: "/Plantas", category: "Plantas" },
    { label: "Otros", path: "/Otros", category: "otros" },
]

const Navbar = () => {
    const context = useContext(ShoppingContext)

    return (
        <header className="site-header">
            <div className="navbar-main">
                <NavLink className="brand" to="/" onClick={() => context.setSearchByCategory()}>
                    <span className="brand-mark" aria-hidden="true">o</span>
                    <span className="brand-name">Ojitos <span>Tiernos</span></span>
                </NavLink>

                <label className="search-field">
                    <FiSearch aria-hidden="true" />
                    <input
                        type="search"
                        placeholder="Buscar una pieza..."
                        aria-label="Buscar productos"
                        value={context.searchByTitle || ""}
                        onChange={(event) => context.setSearchByTitle(event.target.value)}
                    />
                </label>

                <div className="navbar-actions">
                    <NavLink className="account-link" to="/MyAccount">
                        {context.user ? "Mi cuenta" : "Ingresar"}
                    </NavLink>
                    {context.user && (
                        <button className="logout-link" onClick={context.signOut}>
                            Salir
                        </button>
                    )}
                    <button
                        className="cart-button"
                        type="button"
                        onClick={context.cartOpen}
                        aria-label={`Abrir carrito, ${context.count} productos`}
                    >
                        <FiShoppingBag aria-hidden="true" />
                        <span>Bolsa</span>
                        <span className="cart-count">{context.count}</span>
                    </button>
                </div>
            </div>
            <nav className="category-nav" aria-label="Categorías">
                {categories.map(({ label, path, category }) => (
                    <NavLink
                        key={path}
                        to={path}
                        onClick={() => context.setSearchByCategory(category)}
                        className={({ isActive }) => isActive ? "category-link active" : "category-link"}
                    >
                        {label}
                    </NavLink>
                ))}
                <span className="nav-note">Hecho a mano, con cariño</span>
            </nav>
        </header>
    )
}

export default Navbar
