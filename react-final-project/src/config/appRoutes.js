import routes from "../constants/routes"
import AuthGuard from "../guards/AuthGuard"
import Home from "../pages/home/Home"
import Products from "../pages/products/Products"
import ProductInfo from "../pages/products/ProductInfo"
import SignIn from "../pages/signin/SignIn"
import SignUp from "../pages/signup/SignUp"


const appRoutes = [
  {path: routes.Home, component: Home},
  {path: routes.Products,  component: Products, guard: AuthGuard},
  { path: `${routes.Products}/:id`, component: ProductInfo, guard: AuthGuard },
  {path: routes.SignUp,  component: SignUp},
  {path: routes.SignIn,  component: SignIn}
]

export default appRoutes;