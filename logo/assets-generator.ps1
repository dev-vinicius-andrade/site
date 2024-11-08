 
Write-Host "generating default icons"
npx vue-pwa-asset-generator -a .\light.svg -o ../code/client/src/assets/icons/light
cp .\light.svg ../code/client/src/assets/icons/light
Write-Host "generating dark icons"
npx vue-pwa-asset-generator -a .\dark.svg -o ../code/client/src/assets/icons/dark
cp .\dark.svg ../code/client/src/assets/icons/dark
Write-Host "finished"
Write-Host "press enter to exit"
Read-Host