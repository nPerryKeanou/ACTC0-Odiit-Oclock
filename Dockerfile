#Utilise l’image officielle Node.js version 20 comme image de base.
FROM node:20

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

# Exposer le port de l'API
EXPOSE 3000

# Commande par défaut.Lance le serveur Node.js.
CMD ["npm", "run", "dev"]