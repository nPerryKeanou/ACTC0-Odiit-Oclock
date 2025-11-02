#!/bin/bash

API_URL="http://localhost:3000"

echo "1. Créer un utilisateur"
curl -X POST "$API_URL/users" \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser", "email":"test@example.com", "passwordHash":"hashedpass", "professionalSector":"IT", "bio":"Bio de test"}'
echo -e "\n"

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