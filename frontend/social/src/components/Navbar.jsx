function Navbar({ dashboard, setDashboard }) {

    return (
        <div className="navbar">

            <h2>Product Ordering System</h2>

            <div>
                <button onClick={() => setDashboard("customer")} >Customer  </button>

                <button
                    onClick={() => setDashboard("manager")}
                >
                    Manager
                </button>
            </div>

        </div>
    );
}

export default Navbar;