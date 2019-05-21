function validCPF(cpf) {
  // Check CPF format
  if (/[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}/.test(cpf)) {
    return false;
  }

  // Checking if all digits are equal
  if (/^(\d)\1+$/.test(cpf)) {
    return false;
  }

  const cleanCPF = cpf.replace(/\.|-|\s/g, '');
  const firstNineDigits = cleanCPF.substring(0, 9);
  const checker = cleanCPF.substring(9, 11);

  if (cleanCPF.length !== 11) {
    return false;
  }

  let sum = 0;

  for (let j = 0; j < 9; ++j) {
    sum += Number(firstNineDigits.charAt(j)) * (10 - j);
  }

  const checker1 = sum % 11 < 2 ? 0 : 11 - sum % 11;

  const cpfWithChecker1 = firstNineDigits + String(checker1);

  sum = 0;

  for (let k = 0; k < 10; ++k) {
    sum += Number(cpfWithChecker1.charAt(k)) * (11 - k);
  }

  const checker2 = sum % 11 < 2 ? 0 : 11 - sum % 11;

  return checker.toString() === checker1.toString() + checker2.toString();
}

function validCNPJ(_cnpj) {
  // Check _CNPJ Format
  if (/[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}-[0-9]{2}/.test(_cnpj)) {
    return false;
  }
  const cnpj = _cnpj.replace(/[^\d]+/g, '');

  // Checking if all digits are equal
  if (/^(\d)\1+$/.test(cnpj)) {
    return false;
  }

  const t = cnpj.length - 2;
  const d = cnpj.substring(t);
  const d1 = Number(d.charAt(0));
  const d2 = Number(d.charAt(1));

  const calc = (x) => {
    const n = cnpj.substring(0, x);
    let y = x - 7;
    let s = 0;
    let r = 0;

    for (let i = x; i >= 1; i--) {
      s += n.charAt(x - i) * y--;
      if (y < 2) { y = 9; }
    }

    r = 11 - s % 11;
    return r > 9 ? 0 : r;
  };

  return calc(t) === d1 && calc(t + 1) === d2;
}


// eslint-disable-next-line no-unused-vars
function filterstreamitem() {
  // eslint-disable-next-line no-undef
  const registryStreamName = 'Registro';
  const transactions = getfiltertransaction();
  const transaction = {
    balance: {
      amount: -0.005,
      assets: [
      ],
    },
    myaddresses: [
      '1RGV62XSPtXgNCfSLT8GxsE4dByZmEBG3mXc7c',
    ],
    addresses: [
    ],
    permissions: [
    ],
    items: [
      {
        type: 'stream',
        name: 'Stream',
        streamref: '40-300-8492',
        publishers: [
          '1RGV62XSPtXgNCfSLT8GxsE4dByZmEBG3mXc7c',
        ],
        keys: [
          'cpf',

        ],
        offchain: false,
        available: true,
        data: {
          json: {
            i: [
              1,
              2,
            ],
            j: 'yes',
          },
        },
      },
    ],
    data: [
    ],
    confirmations: 3,
    blockhash: '0000002cb78939b0fd6c9ae5885209424b6fdcf8ca9a4609a5117c8fa2850ba3',
    blockindex: 1,
    blocktime: 1558403902,
    txid: 'c0e913a87cdc2ab2227c3b312acc6aa4ba6aaaf219dc81613c357a0fc32641d6',
    valid: true,
    time: 1558403847,
    timereceived: 1558403847,
  };

  if (transaction.items.length > 0) {
    transaction.items.forEach((element) => {
      if (element.name === registryStreamName) {
        const { keys } = element;
        const data = element.data.json;

        if (keys.length !== 2) {
          return 'O registro de empresas exige duas chaves [\'id\', numero] (i.e: [\'cpf\', \'356.695.940-53\'].';
        }

        if (typeof keys[0] !== 'string' || typeof keys[1] !== 'string') {
          return 'As duas chaves da publicação precisam ser strings.';
        }

        const id = keys[0].toLowerCase();

        if (id === 'cpf' || id === 'cnpj') {
          if (id === 'cpf') {
            if (!validCPF(keys[1])) {
              return 'CPF Inválido. Formato esperado: XXX-XXX-XXX-XX';
            }
          }

          if (id === 'cnpj') {
            if (!validCNPJ(keys[1])) {
              return 'CNPJ Inválido. Formato esperado: XX.XXX.XXX/XXXX-XX';
            }
          }

          if (Object.keys(data).length() < 10 || Object.keys(data).length() > 15) {
            return 'Quantidade de propriedades inválidas no JSON de Registro';
          }
        }
        return 'A primeira chave da publicação precisa ser \'CPF\' ou \'CNPJ\'';
      }
    });
  }
}

/*
{
  "balance" : {
      "amount" : -0.005,
      "assets" : [
      ]
  },
  "myaddresses" : [
      "1RGV62XSPtXgNCfSLT8GxsE4dByZmEBG3mXc7c"
  ],
  "addresses" : [
  ],
  "permissions" : [
  ],
  "items" : [
      {
          "type" : "stream",
          "name" : "Stream",
          "streamref" : "40-300-8492",
          "publishers" : [
              "1RGV62XSPtXgNCfSLT8GxsE4dByZmEBG3mXc7c"
          ],
          "keys" : [
              "key"
          ],
          "offchain" : false,
          "available" : true,
          "data" : {
              "json" : {
                  "i" : [
                      1,
                      2
                  ],
                  "j" : "yes"
              }
          }
      }
  ],
  "data" : [
  ],
  "confirmations" : 3,
  "blockhash" : "0000002cb78939b0fd6c9ae5885209424b6fdcf8ca9a4609a5117c8fa2850ba3",
  "blockindex" : 1,
  "blocktime" : 1558403902,
  "txid" : "c0e913a87cdc2ab2227c3b312acc6aa4ba6aaaf219dc81613c357a0fc32641d6",
  "valid" : true,
  "time" : 1558403847,
  "timereceived" : 1558403847
} */
