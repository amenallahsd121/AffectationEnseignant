
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import UpdateUser from "views/examples/UpdateUser.js";
import Icons from "views/examples/Icons.js";
import AjouterOption from "views/examples/Options/AjouterOption";
import Options from "views/examples/Options/Options";
import ModifierOption from "views/examples/Options/ModifierOption";
import Competences from "views/examples/Competences/Competences";
import AjouterCompetence from "views/examples/Competences/AjouterCompetence";
import ModifierCompetence from "views/examples/Competences/ModifierCompetence";
import AjouterModule from "views/examples/Modules/AjouterModule";
import Modules from "views/examples/Modules/Modules";
import ModifierModule from "views/examples/Modules/ModifierModule";

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
    icon: "ni ni-planet text-blue",
    component: <Icons />,
    layout: "/admin",
  }, 
  {
    path: "/user-profile",
    name: "User Profile",
    key: "getLoggedInUserInfo",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Liste Des Utilisateurs",
    key: "list_users",
    icon: "ni ni-bullet-list-67 text-red",
    component: <Tables />,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Se connecter",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Inscription",
    key: "register_user_api_view",
    icon: "ni ni-circle-08 text-green",
    component: <Register />,
    layout: "/auth",
  },
  {
    path: "/modifierutilisateur/:id",
    name: "Modifier Compte",
    icon: "ni ni-circle-08 text-info",
    component: <UpdateUser/>,
    layout: "/admin",
    hidden: true,
  },
  {
    path: "/ajouteroption",
    name: "Ajouter Option",
    icon: "ni ni-collection text-green",
    component: <AjouterOption />,
    layout: "/admin",
    hidden: true,
  },

  {
    path: "/options",
    name: "Liste des options",
    icon: "ni ni-collection text-blue",
    component: <Options />,
    layout: "/admin",
  },

  {
    path: "/modifieroption/:id",
    name: "Modifier Option",
    icon: "ni ni-collection text-info",
    component: <ModifierOption />,
    layout: "/admin",
    hidden: true,
  },


  {
    path: "/ajoutercompetence",
    name: "Ajouter Compétence",
    icon: "ni ni-paper-diploma text-green",
    component: <AjouterCompetence />,
    layout: "/admin",
    hidden: true,
  },

  {
    path: "/competences",
    name: "Liste des compétences",
    icon: "ni ni-paper-diploma text-blue",
    component: <Competences/>,
    layout: "/admin",
    hidden: true,
  },


  {
    path: "/modifiercompetence/:id",
    name: "Modifier Compétence",
    icon: "ni ni-paper-diploma text-info",
    component: <ModifierCompetence />,
    layout: "/admin",
    hidden: true,
  },


  {
    path: "/ajoutermodule",
    name: "Ajouter Module",
    icon: "ni ni-ruler-pencil text-green",
    component: <AjouterModule/>,
    layout: "/admin",
    hidden: true,
  },

  {
    path: "/modules",
    name: "Liste des modules",
    icon: "ni ni-ruler-pencil text-blue",
    component: <Modules/>,
    layout: "/admin",
    hidden: true,
  },


  {
    path: "/modifiermodule/:id",
    name: "Modifier Module",
    icon: "ni ni-ruler-pencil text-info",
    component: <ModifierModule />,
    layout: "/admin",
    hidden: true,
  },


];
export default routes;
