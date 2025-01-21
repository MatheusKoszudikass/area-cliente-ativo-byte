#!/bin/bash
set -e 

echo "Iniciando o processo de deploy..."

echo "Verificando dependências..."
npm install

echo "Testando aplicação..."
npm run test:ci

echo "Buildando o projeto com configuração para produção..."
ng build --configuration production

FOLDER="dist"

BACKUP_PATH="/tmp/${FOLDER}"

if [ ! -d "$FOLDER" ]; then
  echo "Erro: A pasta '$FOLDER' não foi encontrada no diretório atual."
  exit 1
fi

echo "Copiando a pasta '$FOLDER' para o caminho temporário: $BACKUP_PATH"
rm -rf "$BACKUP_PATH"
cp -r "$FOLDER" "$BACKUP_PATH"

echo "Trocando para a branch 'production'..."
git checkout production

echo "Removendo a pasta '$FOLDER'..."
rm -rf "$FOLDER"

echo "Restaurando a pasta '$FOLDER' na branch 'production'..."
cp -r "$BACKUP_PATH" "$FOLDER"

echo "Adicionando a pasta '$FOLDER' ao commit..."
git add -f "$FOLDER"

echo "Realizando o commit..."
git commit -m "Deploy: Adicionando a pasta '$FOLDER' para produção"

echo "Enviando as mudanças para o repositório remoto (branch production)..."
git push origin production

echo "Enviando as mudanças para deploy no cpanel..."
git push cpanel

echo "Limpando os arquivos temporários..."
rm -rf "$BACKUP_PATH"

echo "Processo de deploy concluído com sucesso."
