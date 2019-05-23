echo "Criando Stream"
#docker exec docker-multichain_masternode_1 multichain-cli MyChain create stream Registros '{"restrict":"offchain"}' 

echo "Created Stream with name: Registros"

echo "Creating deploy folder..."
mkdir deploy
echo "Duplicating registry.js"
cp ./stream/registry.js ./deploy/registry.js
echo "Removing requires json..."
sed -e '1s{.*{ // nothing {' -i '' ./deploy/registry.js
sed -e '2s{.*{ // nothing {' -i '' ./deploy/registry.js
echo "Constructing file for deployment"
echo "const municipios = " > ./deploy/uni.js
echo "Inserting JSON Municipios..."
cat ./data/municipios.json >> ./deploy/uni.js
echo ";" >> ./deploy/uni.js
echo "" >> ./deploy/uni.js
echo "const ceps = " >> ./deploy/uni.js
echo "Inserting JSON CEPS..."

echo "This may take a while"
current_date_time="`date "+%Y-%m-%d %H:%M:%S"`";
echo $current_date_time;

cat ./data/ceps.json >> ./deploy/uni.js

echo "Done"
current_date_time2="`date "+%Y-%m-%d %H:%M:%S"`";
echo $current_date_time2;

echo ";" >> ./deploy/uni.js
echo "" >> ./deploy/uni.js
echo "Inserting JS File..."
cat ./deploy/registry.js >> ./deploy/uni.js

echo "Creating mini.js without white spaces..."
tr -d '[:space:]' < ./deploy/uni.js > ./deploy/mini.js

mini=$(cat ./deploy/mini.js)

docker exec docker-multichain_masternode_1 multichain-cli MyChain create txfilter validacaoRegistros "{}" "$mini"

#echo "$registryWithMunicipios"




