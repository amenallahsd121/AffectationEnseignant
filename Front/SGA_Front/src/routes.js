
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import UpdateUser from "views/examples/UpdateUser.js";
import UpdateUserForUser from "views/examples/UpdateUserForUser.js";
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
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/icons",
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
    component: <Login />,
    layout: "/auth",
  },
  {
    path: "/register",
    key: "register_user_api_view",
    component: <Register />,
    layout: "/auth",
  },
  {
    path: "/modifierutilisateur/:id",
    component: <UpdateUser/>,
    layout: "/admin",
   
  },
  {
    path: "/modifiercompte/:id",
    component: <UpdateUserForUser/>,
    layout: "/admin",
   
  },
  {
    path: "/ajouteroption",
    component: <AjouterOption />,
    layout: "/admin",
   
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
    component: <ModifierOption />,
    layout: "/admin",
    
  },


  {
    path: "/ajoutercompetence",
    component: <AjouterCompetence />,
    layout: "/admin",
   
  },

  {
    path: "/competences",
    name: "Liste des compétences",
    icon: "ni ni-paper-diploma text-blue",
    component: <Competences/>,
    layout: "/admin",
 
  },


  {
    path: "/modifiercompetence/:id",
    component: <ModifierCompetence />,
    layout: "/admin",
    
  },


  {
    path: "/ajoutermodule",
    component: <AjouterModule/>,
    layout: "/admin",
   
  },

  {
    path: "/modules",
    name: "Liste des modules",
    icon: "ni ni-ruler-pencil text-blue",
    component: <Modules/>,
    layout: "/admin",
    
  },


  {
    path: "/modifiermodule/:id",
    component: <ModifierModule />,
    layout: "/admin",
    
  },


];
export default routes;
