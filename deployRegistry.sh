echo "Criando Stream"
#docker exec docker-multichain_masternode_1 multichain-cli MyChain create stream Registros '{"restrict":"offchain"}' 

echo "Created Stream with name: Registros"

echo "Creating deploy folder..."
mkdir deploy
echo "Duplicating registry.js"
cp ./stream/registry.js ./deploy/registry.js
echo "Removing requires json..."
sed -e '1s{.*{ // nothing {' -i '' ./deploy/registry.js
sed -e '3s{.*{ // nothing {' -i '' ./deploy/registry.js
echo "Constructing file for deployment"
echo "const municipios = " > ./deploy/uni.js
echo "Inserting JSON Municipios..."
cat ./data/municipios.json >> ./deploy/uni.js
echo ";" >> ./deploy/uni.js
echo "" >> ./deploy/uni.js
echo "const ceps = " >> ./deploy/uni.js

echo "Parsing JSON CEPS..."
cp ./data/ceps.json ./deploy/parsedCEPS.json
sed -e 's|`|\\`|g' -i '' ./deploy/parsedCEPS.json
echo "Inserting JSON CEPS..."

cat ./deploy/parsedCEPS.json >> ./deploy/uni.js
#echo "{}" >> ./deploy/uni.js

echo ";" >> ./deploy/uni.js
echo "" >> ./deploy/uni.js
echo "Parsing and Inserting JS File..."
sed -e 's|\\|\\\\|g' -i '' ./deploy/registry.js
cat ./deploy/registry.js >> ./deploy/uni.js

echo "Creating JSON RPC Deployment File"
touch ./deploy/deployRegistryRPC.js

cat << EOF > ./deploy/deployRegistryRPC.js
const Multichain = require('multinodejs');
const masterPort = 8001;
const masterPassword = 'this-is-insecure-change-it';
const stream = 'Registros';
const node = Multichain({
  port: masterPort,
  host: 'localhost',
  user: 'multichainrpc',
  pass: masterPassword,
});
node.create(['txfilter', 'registryFilters2', {}, \`
EOF

cat ./deploy/uni.js >> ./deploy/deployRegistryRPC.js
echo '`]).then(e => console.log(e)).catch(e => console.error(e));' >> ./deploy/deployRegistryRPC.js

#docker exec docker-multichain_masternode_1 multichain-cli MyChain create txfilter validacaoRegistros "{}" "$mini"

#echo "$registryWithMunicipios"




