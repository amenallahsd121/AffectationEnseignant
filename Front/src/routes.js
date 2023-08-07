
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import Niveaux from "views/examples/Niveaux/Niveaux";
import AjouterNiveau from "views/examples/Niveaux/AjouterNiveau";
import ModifierNiveau from "views/examples/Niveaux/ModifierNiveau";
import Classes from "views/examples/Classes/Classes";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-badge text-blue",
    component: <Icons />,
    layout: "/admin",
  },
  {
    path: "/niveaux",
    name: "Niveaux",
    icon: "ni ni-book-bookmark text-blue",
    component: <Niveaux />,
    layout: "/admin",
  },
  {
    path: "/classes",
    name: "Classes",
    icon: "ni ni-books text-blue",
    component: <Classes />,
    layout: "/admin",
  },
  {
    path: "/conges",
    name: "Conges",
    icon: "ni ni-archive-2 text-blue",
    component: <Maps />,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: <Tables />,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: <Register />,
    layout: "/auth",
  },
  {
    path: "/ajouterniveau",
    name: "ajouterniveau",
    icon: "ni ni-circle-08 text-pink",
    component: <AjouterNiveau />,
    layout: "/admin",
    hidden: true,
  },
  {
    path: "/modifierniveau/:id",
    name: "modifierniveau",
    icon: "ni ni-circle-08 text-pink",
    component: <ModifierNiveau />,
    layout: "/admin",
    hidden: true,
  },
];
export default routes;
