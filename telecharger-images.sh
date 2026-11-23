#!/usr/bin/env bash
# Télécharge les images originales du site Wix dans images/
# À lancer une seule fois, AVANT d'annuler l'abonnement Wix :  bash telecharger-images.sh
set -euo pipefail
cd "$(dirname "$0")/images"
while IFS=$'\t' read -r url name; do
  [ -z "$url" ] && continue
  [ -f "$name" ] || { echo "-> $name"; curl -fsSL "$url" -o "$name"; }
done < liste-images.txt
echo "Terminé."
