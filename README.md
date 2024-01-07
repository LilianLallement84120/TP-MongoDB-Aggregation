# Nécessaires 
- Node.js
- Docker
- Le music_data.csv présent dans le Git
- Le dossier contenant le projet (Dossier nommée "TPMongoDBAggregate") 

# Mise en place du container Docker

Pour mettre en place le container Docker c'est simple, il faut tout simplement executer ces commandes dans le même ordre :

1.docker run --name todorarmeko -p 30010:27017 -d mongo
Permettant la création du container ou du lancement de celui-ci si existant

2.docker cp music_data.csv todorarmeko:/data
Permettant de copier le music_data.csv dans le container (attention, le chemin du fichier peut différer)

3.docker exec -it todorarmeko /bin/bash
Rentrer à l'intérieur du Docker

4.mongoimport --uri mongodb://host.docker.internal:30010/todorarmetest --collection music --type csv --file /data/music_data.csv --headerline
Permettant d'importer dans la base de données le contenu du fichier music_dtaa.csv en créant une collection
