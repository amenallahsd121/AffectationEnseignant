//Utilisateur controle de saisie

export const isValidUsername = (username) => {
    if (!username) {
      return false; // Si le champ est vide, retourner false
    }
    const regex = /^[A-Z][A-Za-z_]+$/; // Commence par une majuscule et contient uniquement des lettres et des underscores
    return regex.test(username);
  };
  

export const isValidNomUtilisateur = (nom_utilisateur) => {
    if (!nom_utilisateur) {
      return false; // Si le champ est vide, retourner false
    }
    const regex = /^[A-Z][A-Za-z\s]+$/; // Commence par une majuscule et contient uniquement des lettres et des espaces 
    return regex.test(nom_utilisateur);
  };
  
export const isValidPrenomUtilisateur = (prenom_utilisateur) => {
    if (!prenom_utilisateur) {
      return false; // Si le champ est vide, retourner false
    }
    const regex = /^[A-Z][A-Za-z\s]+$/; // Commence par une majuscule et contient uniquement des lettres et des espaces 
    return regex.test(prenom_utilisateur);
  };


  export const isValidCustomEmail = (nom_utilisateur, prenom_utilisateur, email) => {
    if (!email || !prenom_utilisateur || !nom_utilisateur) {
      return false; // Si l'un des champs est vide, retourner false
    }
  
    //Vérifier le . avant de faire la divisiant
    if (email.indexOf('.') === -1) {
      return false; //le format de l'email est invalide
    }
  
    const [prefix, domain] = email.split('@'); // Diviser l'email par "@" pour avoir les 2 parties
    const [prenomPart, nomPart] = prefix.split('.'); // Diviser le prefixe par "." pour avoir le prenom_utilisateur et nom_utilisateur
  
    // Comparer les valeurs mises avec le prenom et le nom de l'utilisateur en les convertissant en minuscules
    const isPrenomValid = prenomPart.toLowerCase() === prenom_utilisateur.toLowerCase();
    const isNomValid = nomPart.toLowerCase() === nom_utilisateur.toLowerCase();
  
    const isEmailValid = /^[a-z]+\.[a-z]+\s*@esprit\.tn$/.test(email); // Checker la valeur de l'email
    return isPrenomValid && isNomValid && isEmailValid;
  };
  
  
export const isValidPassword = (password) => {
    if (!password) {
      return false; // Si le champ est vide, retourner false
    }
    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,20}$/;  //Minimum 8 caractères et maximum 20 de plus contient lettres , nombres et caractères spéciaux
    return regex.test(password);
  };
  
export const isValidNumeroTelephone = (numero_de_telephone) => {
    const regex = /^\d{8}$/; //Vérifier si le numéro comporte exactement 8 chiffres
    return regex.test(numero_de_telephone);
  };
  
  
  
// Option
export const isValidNomOption = (nom) => {
  if (!nom) {
    return false; // Si le champ est vide, retourner false
  }
  const regex = /^[A-Z][A-Za-z\s]+$/; // Commence par une majuscule et contient uniquement des lettres et des espaces 
  return regex.test(nom);
};

export const isValidNombreDeClasse = (nb_classes) => {
  if (!nb_classes) {
    return false; // Si le champ est vide, retourner false
  }
  const regex = /^[1-9]\d*$/; // Peut contenir que des chiffres de 1 jusqu'à l'infinie 
  return regex.test(nb_classes);
};


// Compétence
export const isValidNomCompetence = (nom) => {
  if (!nom) {
    return false; // Si le champ est vide, retourner false
  }
  const regex = /^[A-ZÉÈÇÀÙÔÊ][A-ZÉÈÇÀÙÔÊa-zéèçàùôê\s]+$/; // Commence par une majuscule et contient uniquement des lettres et des espaces 
  return regex.test(nom);
};

export const isValidDescriptionCompetence = (description) => {
  if (!description) {
    return false; // Si le champ est vide, retourner false
  }
  const regex = /^[A-ZÉÈÇÀÙÔÊ][A-ZÉÈÇÀÙÔÊa-zéèçàùôê\s.,!?]+$/;// Commence par une majuscule et contient uniquement des lettres , des caractères spéciaux et des espaces 
  return regex.test(description);
};

  
  
  
  