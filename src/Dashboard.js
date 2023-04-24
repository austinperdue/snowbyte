import React from "react";
import { useAuth } from "./hooks/useAuth";


function Dashboard() {
    useAuth();
    return (
        
        <div className="Dashboard">
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>

        <h1>Dashboard</h1>
        </div>
    );
}

export default Dashboard;