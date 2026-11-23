# Télécharge les images originales du site Wix dans le dossier images\
# À lancer une seule fois, AVANT d'annuler l'abonnement Wix :
#   powershell -ExecutionPolicy Bypass -File .\telecharger-images.ps1
$ErrorActionPreference = "Stop"
$dir = Join-Path $PSScriptRoot "images"
Get-Content (Join-Path $dir "liste-images.txt") | Where-Object { $_.Trim() } | ForEach-Object {
    $url, $name = $_ -split "`t"
    $dest = Join-Path $dir $name
    if (-not (Test-Path $dest)) {
        Write-Host "-> $name"
        Invoke-WebRequest -Uri $url -OutFile $dest -UseBasicParsing
    }
}
Write-Host "Terminé."
