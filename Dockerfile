#Utilise l’image officielle Node.js version 20 comme image de base.
FROM node:20

# Installer curl (et nettoyer le cache pour garder l'image légère)
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Dossier de travail
#Crée le dossier /app dans le conteneur et s'y place.
WORKDIR /app

# Installer les dépendances
COPY package*.json ./
RUN npm install
#installer les dépendances + nodemon
#RUN npm install && npm install --save-dev nodemon

# Copier le reste du projet
COPY . .

# Ajouter le script d'attente de santé et lui donner les permissions d'exécution.L’image installe curl
# Le script wait-for-health.sh boucle tant que /health ne répond pas OK
# Quand c’est OK, le script exécute la commande finale (ici npm run dev pour démarrer le serveur)
COPY wait-for-health.sh /usr/local/bin/wait-for-health.sh
RUN chmod +x /usr/local/bin/wait-for-health.sh


# Exposer le port de l'API
EXPOSE 3000

# Commande par défaut.Lance le serveur Node.js.
CMD ["wait-for-health.sh", "npm", "run", "dev"]