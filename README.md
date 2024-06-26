# Présentation du Projet

Ce projet est une application web de yoga où vous pouvez vous connecter, créer des sessions de yoga si vous êtes administrateur ou simplement vous inscrire à des sessions et voir les détails. Des tests sont réalisés pour chaque fonctionnalité de l'application, incluant des tests front-end, back-end et end-to-end en utilisant Jest, Cypress et Jacoco.

## Configuration de Spring Boot

**Type de projet** : Maven  
**Version de la langue Java** : 17  
**Version de Spring Boot** : 2.6.1

### Dépendances

- Spring Boot Starter Data JPA
- Spring Boot Starter Security
- Spring Boot Starter Validation
- Spring Boot Starter Web
- MySQL Connector Java (scope runtime)
- JSON Web Token (JJWT)
- Spring Boot Starter Test
- Spring Security Test
- Lombok (optionnel)

### Plugins de Build

- Spring Boot Maven Plugin
- Jacoco Maven Plugin pour le rapport et la vérification de la couverture de code
- Maven Compiler Plugin pour configurer la compatibilité de la version Java à 9
- Exclusions : Exclut des packages spécifiques des vérifications de couverture de code dans Jacoco

## Prérequis

Avant de lancer l'application, assurez-vous d'avoir les prérequis suivants :

### Installation de Java

Assurez-vous que Java est installé sur votre système. Si ce n'est pas le cas, suivez les indications sur ce [lien](https://www.java.com/fr/download/manual.jsp).

### Node.js et npm

Assurez-vous que Node.js et npm (Node Package Manager) sont installés. Vous pouvez télécharger et installer Node.js [ici](https://nodejs.org/en).

### Angular CLI

Si vous envisagez de travailler sur la partie frontend de l'application, assurez-vous d'avoir Angular CLI installé. Vous pouvez l'installer en utilisant npm avec la commande suivante :

```
npm install -g @angular/cli
```

