# Prérequis 
- Node.js : Pour exécuter l'application serveur.
- Docker : Pour créer et gérer des conteneurs.
- music_data.csv : Ce fichier doit être présent dans votre répertoire local. Il contient les données à importer dans MongoDB.
- Dossier du projet : Nommez-le "TPMongoDBAggregate" et assurez-vous qu'il contient tous les fichiers nécessaires à l'exécution de l'application.

# Mise en place du container Docker

La mise en place du container Docker se fait en quelques étapes simples. Suivez les commandes suivantes dans l'ordre :

1. **Création ou lancement du container MongoDB :**
    ```bash
    docker run --name todorarmeko -p 30010:27017 -d mongo
    ```
    Cette commande crée un nouveau conteneur nommé "todorarmeko" et le démarre. Si le conteneur existe déjà, cela le relancera.

2. **Copie du fichier de données dans le container :**
    ```bash
    docker cp music_data.csv todorarmeko:/data
    ```
    Assurez-vous que le chemin du fichier `music_data.csv` est correct. Cette commande copie le fichier dans le conteneur.

3. **Accès au shell du container :**
    ```bash
    docker exec -it todorarmeko /bin/bash
    ```
    Cela vous permet d'accéder à l'interface de commande à l'intérieur du conteneur.

4. **Importation des données dans MongoDB :**
    ```bash
    mongoimport --uri mongodb://host.docker.internal:30010/todorarmetest --collection music --type csv --file /data/music_data.csv --headerline
    ```
    Cette commande importe les données du fichier `music_data.csv` dans la collection "music" de la base de données "todorarmetest". Assurez-vous que la base de données et la collection sont correctement nommées selon votre configuration.

# Conclusion

Suivez ces étapes pour configurer l'environnement Docker et importer les données nécessaires pour votre projet. Une fois terminé, vous pourrez exécuter votre application Node.js qui se connectera à cette instance MongoDB pour effectuer des opérations d'agrégation et autres requêtes.
