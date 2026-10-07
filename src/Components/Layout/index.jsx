import PropTypes from 'prop-types'

const Layout = ({ children })=>{
    return (
        <div className="site-layout flex flex-col items-center">
            {children}
        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout