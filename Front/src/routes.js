
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";  
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import Niveaux from "views/examples/Niveaux/Niveaux";
import AjouterNiveau from "views/examples/Niveaux/AjouterNiveau";
import ModifierNiveau from "views/examples/Niveaux/ModifierNiveau";
import Classes from "views/examples/Classes/Classes";
import AjouterClasse from "views/examples/Classes/AjouterClasse";
import ModifierClasse from "views/examples/Classes/ModifierClasse";
import Conges from "views/examples/Conges/Conges";
import AjouterConges from "views/examples/Conges/AjouterConges";
import ModifierConges from "views/examples/Conges/ModifierConges";
import Affectation from "views/examples/Affectation/Affectation";
import AjouterAffectation from "views/examples/Affectation/AjouterAffectation";
import ModifierAffectation from "views/examples/Affectation/ModifierAffectation";
import Configuration from "views/examples/Configuration/Configuration";
import AjouterConfiguration from "views/examples/Configuration/AjouterConfiguration";
import ModifierConfiguration from "views/examples/Configuration/ModifierConfiguration";


var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/configuration",
    name: "Configuration",
    icon: "ni ni-calendar-grid-58 text-blue",
    component: <Configuration />,
    layout: "/admin",
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "ni ni-badge text-blue",
  //   component: <Icons />,
  //   layout: "/admin",
  // },
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
    component: <Conges />,
    layout: "/admin",
  },
  {
    path: "/affectation",
    name: "Affecter Enseignant",
    icon: "ni ni-check-bold text-blue",
    component: <Affectation />,
    layout: "/admin",
  },
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   icon: "ni ni-single-02 text-yellow",
  //   component: <Profile />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: <Tables />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/login",
  //   name: "Login",
  //   icon: "ni ni-key-25 text-info",
  //   component: <Login />,
  //   layout: "/auth",
  // },
  // {
  //   path: "/register",
  //   name: "Register",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: <Register />,
  //   layout: "/auth",
  // },




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////




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
  {
    path: "/ajouterclasse",
    name: "ajouterclasse",
    icon: "ni ni-circle-08 text-pink",
    component: <AjouterClasse />,
    layout: "/admin",
    hidden: true,
  },
  {
    path: "/modifierclasse/:id",
    name: "modifierclasse",
    icon: "ni ni-circle-08 text-pink",
    component: <ModifierClasse />,
    layout: "/admin",
    hidden: true,
  },
  {
    path: "/ajouterconges",
    name: "ajouterconges",
    icon: "ni ni-archive-2 text-blue",
    component: <AjouterConges />,
    layout: "/admin",
    hidden: true,
  },
  {
    path: "/modifierconges/:id",
    name: "modifierconges",
    icon: "ni ni-archive-2 text-blue",
    component: <ModifierConges />,
    layout: "/admin",
    hidden: true,
  },
  {
    path: "/ajouteraffectation",
    name: "ajouteraffectation",
    icon: "ni ni-circle-08 text-pink",
    component: <AjouterAffectation />,
    layout: "/admin",
    hidden: true,
  },
  {
    path: "/modifieraffectation/:id",
    name: "modifieraffectation",
    icon: "ni ni-circle-08 text-pink",
    component: <ModifierAffectation />,
    layout: "/admin",
    hidden: true,
  },
  {
    path: "/ajouterconfiguration",
    name: "ajouterconfiguration",
    icon: "ni ni-circle-08 text-pink",
    component: <AjouterConfiguration />,
    layout: "/admin",
    hidden: true,
  },
  {
    path: "/modifierconfiguration/:id",
    name: "modifierconfiguration",
    icon: "ni ni-circle-08 text-pink",
    component: <ModifierConfiguration />,
    layout: "/admin",
    hidden: true,
  },

];
export default routes;
