const Multichain = require('multinodejs');
const fs = require('fs');

const masterPort = 8001;
const masterPassword = 'this-is-insecure-change-it';

const node = Multichain({
  port: masterPort,
  host: 'localhost',
  user: 'multichainrpc',
  pass: masterPassword,
});

(async () => {
  const script = await String(fs.readFileSync('./companyFilters/fields.js'));
  try {
    const txid = await node.create(['txfilter', 'fields3', {}, script]);
    console.log(txid);
  } catch (e) {
    console.error('deu ruim');
    console.error(e);
  }
})();
