import { Routes, Route } from "react-router"
import Home from "./Home/Home";

const MainRoute = () => {
    return (
        <Routes>
            <Route path={'/home'} element={<Home />}/>
        </Routes>
    )
}

export default MainRoute;