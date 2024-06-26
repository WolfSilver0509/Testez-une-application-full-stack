# 🧘🏽‍♀️ Présentation du Projet 🧘🏽‍♀️

Ce projet est une application web de yoga où vous pouvez vous connecter, créer des sessions de yoga si vous êtes administrateur ou simplement vous inscrire à des sessions et voir les détails. Des tests sont réalisés pour chaque fonctionnalité de l'application, incluant des tests front-end, back-end et end-to-end en utilisant Jest, Cypress et JUnit , Mockito et Jacoco.

## Configuration de Spring Boot ☕

**Type de projet** : Maven  
**Version de la langue Java** : 17  
**Version de Spring Boot** : 2.6.1

### Dépendances 📚

- Spring Boot Starter Data JPA
- Spring Boot Starter Security
- Spring Boot Starter Validation
- Spring Boot Starter Web
- MySQL Connector Java (scope runtime)
- JSON Web Token (JJWT)
- Spring Boot Starter Test
- Spring Security Test
- Lombok (optionnel)

### 🔧 Plugins de Build 🔧

- Spring Boot Maven Plugin
- Jacoco Maven Plugin pour le rapport et la vérification de la couverture de code
- Maven Compiler Plugin pour configurer la compatibilité de la version Java à 9
- Exclusions : Exclut des packages spécifiques des vérifications de couverture de code dans Jacoco

## Prérequis ⁉️ 

Avant de lancer l'application, assurez-vous d'avoir les prérequis suivants :

### ☕ Installation de Java ☕

Assurez-vous que Java est installé sur votre système. Si ce n'est pas le cas, suivez les indications sur ce [lien](https://www.java.com/fr/download/manual.jsp).

### Node.js et npm

Assurez-vous que Node.js et npm (Node Package Manager) sont installés. Vous pouvez télécharger et installer Node.js [ici](https://nodejs.org/en).

### Angular CLI

Si vous envisagez de travailler sur la partie frontend de l'application, assurez-vous d'avoir Angular CLI installé. Vous pouvez l'installer en utilisant npm avec la commande suivante :

```
npm install -g @angular/cli
```

### Git : Assurez-vous que Git est installé sur votre système pour cloner le dépôt du projet. 

Vous pouvez télécharger Git [ici](https://git-scm.com/downloads).

### 📍 Démarrer le projet 📍

Cloner le dépôt Git

```
git clone https://github.com/MathieuCOLLARD/Testez-une-application-full-stack
```

### Démarrer le frontend 🌐

Ouvrez un terminal et assurez-vous d'être dans Testez-une-application-full-stack/front.

Démarrez le frontend en utilisant cette commande dans un terminal :

```
npm run start
```
### Démarrer le backend 👨‍💻

Choisissez le fichier com.openclassrooms.api.ApiApplication dans la configuration.

Démarrez le projet en utilisant le bouton run dans l'IDE ou en faisant un clic droit sur le fichier SpringBootSecurityJwtApplication.java et sélectionnez Run SpringBootSecurityJwtApplication.main().

### 💾 Configurer la base de données 💾

Téléchargez MySQL avec l'installateur [ici](https://www.mysql.com/fr/downloads/).

Naviguez dans le dossier MySQL ou utilisez MySQL comme variable globale et exécutez cette commande :

```
mysql -u root -p
```

Choisissez la bonne base de données en utilisant la commande :

```
USE yogaBDD;
```

Utilisez le fichier de script dans le projet Angular pour créer les tables et les dépendances :

```
ressources/sql/script.sql
```

### Exécuter les tests et générer la couverture

#### Tests Unitaires (Jest) 🚀

Lancer les tests :

```
npm run test
```
Pour suivre les changements :

```
npm run test:watch
```
Générer la couverture :

```
npm test -- --coverage
```
Le rapport de couverture est disponible ici :

```
front/coverage/jest/lcov-report/index.html
```
#### Tests E2E 🚀

Lancer les tests e2e :

```
npm run e2e
```
Générer le rapport de couverture (vous devez lancer les tests e2e avant) :

```
npm run e2e:coverage
```
Le rapport est disponible ici :

```
front/coverage/lcov-report/index.html
```
#### Tests Jacoco 🚀

Lancer et générer la couverture de code Jacoco :

```
mvn clean test
```
Le rapport de couverture est disponible ici :

```
back/yoga-app/target/jacoco/index.html
```
Ressources

### 🔭Collection Postman 🔭 

Retrouver la collection postman ici ! 

```
ressources/postman/yoga.postman_collection.json
```


