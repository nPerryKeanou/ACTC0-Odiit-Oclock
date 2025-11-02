#!/bin/bash

API_URL="http://localhost:3000"

#requête pour tester les endpoints de l'API utilisateur sans authentification
echo "1. Créer un utilisateur"
curl -X POST "$API_URL/users" \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser", "email":"test@example.com", "passwordHash":"hashedpass", "professionalSector":"IT", "bio":"Bio de test"}'
echo -e "\n"

# Obtenir un token d'authentification
LOGIN_RESPONSE=$(curl -s -X POST "$API_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","password":"password"}')

  LOGIN_RESPONSE=$(curl -s -X POST "$API_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password"}')

echo "Login response: $LOGIN_RESPONSE"

# Extraction du token (préférence jq, fallback sed)
if command -v jq >/dev/null 2>&1; then
  ACCESS_TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.accessToken // .token // .access_token')
else
  ACCESS_TOKEN=$(echo "$LOGIN_RESPONSE" | sed -n 's/.*"accessToken"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p')
fi

if [ -z "$ACCESS_TOKEN" ] || [ "$ACCESS_TOKEN" = "null" ]; then
  echo "Erreur: impossible d'extraire access token. Réponse login:"
  echo "$LOGIN_RESPONSE"
  exit 1
fi

echo "Access token: $ACCESS_TOKEN"
echo -e "\n"

#requeêtes pour tester les endpoints de l'API utilisateur avec authentification
echo "2. Récupérer tous les utilisateurs"
curl "$API_URL/users"
echo -e "\n"

echo "3. Récupérer un utilisateur par ID (ex: 1)"
curl "$API_URL/users/1"
echo -e "\n"

echo "4. Récupérer un utilisateur par email"
curl "$API_URL/users/email/test@example.com"
echo -e "\n"

# echo "5. Mettre à jour un utilisateur par ID (ex: 1)"
# curl -X PUT "$API_URL/users/1" \
#   -H "Content-Type: application/json" \
#   -d '{"username":"updateduser", "email":"updated@example.com", "professionalSector":"Finance"}'
# echo -e "\n"

# echo "6. Supprimer un utilisateur par ID (ex: 1)"
# curl -X DELETE "$API_URL/users/1"
# echo -e "\n"

# echo "7. Recherche utilisateurs par secteur"
# curl "$API_URL/users/search?sector=IT"
# echo -e "\n"