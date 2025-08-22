// ✅ Basic Concepts
// BrowserRouter / HashRouter
// Routes and Route
import { BrowserRouter, Routes, Route } from "react-router-dom";
const Home = () => <h1>Home</h1>;
const About = () => <h1>About</h1>;

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </BrowserRouter>
    );
}



// Link and NavLink
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
        </>
    );
}

// useNavigate
// useParams
// useLocation
import { useParams, useNavigate, useLocation } from "react-router-dom";

export default function Product() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <>
            <h2>Product ID: {id}</h2>
            <button onClick={() => navigate("/")}>Go Home</button>
            <p>Current Path: {location.pathname}</p>
        </>
    );
}


// Nested Routes , // Index Route
<Route path="/dashboard" element={<DashboardLayout />}>
    <Route index element={<DashboardHome />} />
    <Route path="profile" element={<Profile />} />
</Route>

// DashboardLayout.jsx
import { Outlet } from "react-router-dom";
export default function DashboardLayout() {
    return (
        <>
            <h2>Dashboard</h2>
            <Outlet />
        </>
    );
}


// Redirect / Navigate
<Route path="/home" element={<Navigate to="/" />} />

// NotFound Page(404 Handling)
import NotFound from "./pages/NotFound";
<Route path="*" element={<NotFound />} />


// 🚀 Intermediate Concepts
// Outlet
// Layout Routes
// Route Protection(PrivateRoute)
import { Navigate } from "react-router-dom";
export default function PrivateRoute({ children }) {
    const isAuth = localStorage.getItem("token");
    return isAuth ? children : <Navigate to="/login" />;
}
<Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />

// Lazy Loading with Suspense
const LazyAbout = React.lazy(() => import("./pages/About"));

<Route
    path="/about"
    element={
        <Suspense fallback={<div>Loading...</div>}>
            <LazyAbout />
        </Suspense>
    }
/>

// Programmatic Navigation

// 🧠 Advanced Concepts
// Dynamic Routing
// Query Params Handling
// Search.jsx
import { useSearchParams } from "react-router-dom";
export default function Search() {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("q");
    return <div>Search results for "{keyword}"</div>;
}

// Custom Route Wrappers(e.g., Auth Guards)
// Scroll Restoration
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

// useMatch
import { useMatch } from "react-router-dom";

const isAboutPage = useMatch("/about");

// createBrowserRouter
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { path: "/", element: <Home /> },
            {
                path: "products/:id",
                element: <ProductDetail />,
                loader: ({ params }) => fetch(`/api/products/${params.id}`),
            },
        ],
    },
]);

<RouterProvider router={router} />;
  
// Error Handling Per Route
<Route
    path="/about"
    element={<About />}
    errorElement={<ErrorFallback />}
/>


