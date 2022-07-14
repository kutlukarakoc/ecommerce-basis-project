import DashBoard from "./components/root/DashBoard";
import Navigation from "./components/navigation/Navigation";
import CartDetail from "./components/cart/CartDetail";
import NotFound from "./components/root/NotFound";
import { Container } from "reactstrap";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <>
            <ToastContainer
                position="bottom-left"
                autoClose={2000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
            />
            <Navigation />
            <Container style={{ marginTop: "100px" }}>
                <Routes>
                    <Route path="/" exact element={<DashBoard />} />
                    <Route path="/cart" exact element={<CartDetail />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Container>
        </>
    );
}

export default App;
