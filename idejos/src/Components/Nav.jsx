import { NavLink } from "react-router-dom";

function Nav({status}) {

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <div className="container-fluid">
                            <span className="navbar-brand">Projects and yours donation</span>
                            <div>
                                <div className="navbar-nav">
                                   
                                    {status === 2 || status === 3 || status === 4 ? <NavLink to="/ideas" className={ ({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Projects</NavLink> : null}
                                    {status === 2 ? <NavLink to="/projects" className={ ({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Donations</NavLink> : null}
                                    {status === 3 ? <NavLink to="/realisation" className={ ({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Administration</NavLink> : null}
                                    {status !== 1 ? <NavLink to="/logout" className="nav-link">Logout</NavLink> : null}
                                    {status === 1 ? <NavLink to="/register" className="nav-link">Register</NavLink> : null}
                                    {status === 1 ? <NavLink to="/login" className="nav-link">Login</NavLink> : null}
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Nav;