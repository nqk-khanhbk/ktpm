import ClassRoom from "../Apps/Class";
import Layout from "../Apps/Layout";
import ClassHand from "../Apps/Class/class-hand"
import ClassCreateEhust from "../Apps/Class/classCreateEhust";
import Login from "../Apps/login";
import Register from "../Apps/register";
export const Routes = [
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/register",
        element:<Register/>
    },
    {
        path:'/',
        element:<Layout/>,
        children:[
            {
                path:'/lop-hoc',
                element:<ClassRoom/>,
            },
            {
                path:'/lop-hoc/them-lop-thu-cong',
                element:<ClassHand />
            },
            {
                path:'/lop-hoc/them-lop-tu-ehust',
                element:<ClassCreateEhust/>
            }

        ]
    }
]