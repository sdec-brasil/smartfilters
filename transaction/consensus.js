/* eslint-disable no-use-before-define */

/*
 *
 * JSON que constitui um banco de dados estático para verificações
 * de consenso da Blockchain
 *
 */

const municipios = require('../data/municipios.json');
const ceps = require('../data/ceps.json');

/*
 *
 * Funções auxiliares para validações semânticas e
 * sintáticas de campos
 *
 */

function isCNPJ(_cnpj) {
  if (!/[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}-[0-9]{2}/.test(_cnpj)) return false;
  const cnpj = _cnpj.replace(/[^\d]+/g, '');
  if (/^(\d)\1+$/.test(cnpj)) return false;
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

function validateCity(cityCode) {
  return municipios.hasOwnProperty(cityCode);
}

function validateState(uf) {
  const ufs = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES',
    'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB',
    'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO',
    'RR', 'SC', 'SP', 'SE', 'TO',
  ];
  return ufs.includes(uf);
}

function validateCityWithinState(cityCode, uf) {
  try {
    return municipios[cityCode].uf === uf;
  } catch (e) {
    return false;
  }
}

function validateCountry(country) {
  const countries = [
    132, // Afeganistão
    7560, // África do Sul
    175, // Albânia, República da
    230, // Alemanha
    370, // Andorra
    400, // Angola
    418, // Anguilla
    434, // Antigua e Barbuda
    477, // Antilhas Holandesas
    531, // Arábia Saudita
    590, // Argélia
    639, // Argentina
    647, // Armênia, República da
    655, // Aruba
    698, // Austrália
    728, // Áustria
    736, // Azerbaijão, República do
    779, // Bahamas, Ilhas
    809, // Bahrein, Ilhas
    817, // Bangladesh
    833, // Barbados
    850, // Belarus
    876, // Bélgica
    884, // Belize
    2291, // Benin
    906, // Bermudas
    973, // Bolívia
    981, // Bósnia-Herzegovina
    1015, // Botsuana
    1058, // Brasil
    1082, // Brunei
    1112, // Bulgária, República da
    310, // Burkina Faso
    1155, // Burundi
    1198, // Butão
    1279, // Cabo Verde, República de
    1457, // Camarões
    1414, // Camboja
    1490, // Canadá
    1504, // Canal, Ilhas do (Jersey e Guernsey)
    1511, // Canárias, Ilhas
    1546, // Catar
    1376, // Cayman, Ilhas
    1538, // Cazaquistão, República do
    7889, // Chade
    1589, // Chile
    1600, // China, República Popular da
    1635, // Chipre
    5118, // Christmas, Ilha (Navidad)
    7412, // Cingapura
    1651, // Cocos (Keeling), Ilhas
    1694, // Colômbia
    1732, // Comores, Ilhas
    8885, // Congo, República Democrática do
    1775, // Congo, República do
    1830, // Cook, Ilhas
    1872, // Coréia, Rep. Pop. Democrática da
    1902, // Coréia, República da
    1937, // Costa do Marfim
    1961, // Costa Rica
    1988, // Coveite
    1953, // Croácia, República da
    1996, // Cuba
    2321, // Dinamarca
    7838, // Djibuti
    2356, // Dominica, Ilha
    402, // Egito
    6874, // El Salvador
    2445, // Emirados Árabes Unidos
    2399, // Equador
    2437, // Eritréia
    6289, // Escócia
    2470, // Eslovaca, República
    2461, // Eslovênia, República da
    2453, // Espanha
    2496, // Estados Unidos
    2518, // Estônia, República da
    2534, // Etiópia
    2550, // Falkland (Ilhas Malvinas)
    2593, // Feroe, Ilhas
    8702, // Fiji
    2674, // Filipinas
    2712, // Finlândia
    1619, // Formosa (Taiwan)
    2755, // França
    2810, // Gabão
    6289, // Gales, País de
    2852, // Gâmbia
    2895, // Gana
    2917, // Geórgia, República da
    2933, // Gibraltar
    6289, // Grã-Bretanha
    2976, // Granada
    3018, // Grécia
    3050, // Groenlândia
    3093, // Guadalupe
    3131, // Guam
    3174, // Guatemala
    3379, // Guiana
    3255, // Guiana Francesa
    3298, // Guiné
    3344, // Guiné-Bissau
    3310, // Guiné-Equatorial
    3417, // Haiti
    5738, // Holanda (Países Baixos)
    3450, // Honduras
    3514, // Hong Kong, Região Adm. Especial
    3557, // Hungria, República da
    3573, // Iêmen
    3611, // Índia
    3654, // Indonésia
    6289, // Inglaterra
    3727, // Irã, República Islâmica do
    3697, // Iraque
    3751, // Irlanda
    6289, // Irlanda do Norte
    3794, // Islândia
    3832, // Israel
    3867, // Itália
    3883, // Iugoslávia, República Fed. da
    3913, // Jamaica
    3999, // Japão
    3964, // Johnston, Ilhas
    4030, // Jordânia
    4111, // Kiribati
    4200, // Laos, Rep. Pop. Democrática do
    4235, // Lebuan
    4260, // Lesoto
    4278, // Letônia, República da
    4316, // Líbano
    4340, // Libéria
    4383, // Líbia
    4405, // Liechtenstein
    4421, // Lituânia, República da
    4456, // Luxemburgo
    4472, // Macau
    4499, // Macedônia
    4502, // Madagascar
    4525, // Madeira, Ilha da
    4553, // Malásia
    4588, // Malavi
    4618, // Maldivas
    4642, // Máli
    4677, // Malta
    3595, // Man, Ilhas
    4723, // Marianas do Norte
    4740, // Marrocos
    4766, // Marshall, Ilhas
    4774, // Martinica
    4855, // Maurício
    4880, // Mauritânia
    4936, // México
    930, // Mianmar (Birmânia)
    4995, // Micronésia
    4901, // Midway, Ilhas
    5053, // Moçambique
    4944, // Moldávia, República da
    4952, // Mônaco
    4979, // Mongólia
    5010, // Montserrat, Ilhas
    5070, // Namíbia
    5088, // Nauru
    5177, // Nepal
    5215, // Nicarágua
    5258, // Niger
    5282, // Nigéria
    5312, // Niue, Ilha
    5355, // Norfolk, Ilha
    5380, // Noruega
    5428, // Nova Caledônia
    5487, // Nova Zelândia
    5568, // Omã
    5738, // Países Baixos (Holanda)
    5754, // Palau
    5800, // Panamá
    5452, // Papua Nova Guiné
    5762, // Paquistão
    5860, // Paraguai
    5894, // Peru
    5932, // Pitcairn, Ilha
    5991, // Polinésia Francesa
    6033, // Polônia, República da
    6114, // Porto Rico
    6076, // Portugal
    6238, // Quênia
    6254, // Quirguiz, República
    6289, // Reino Unido
    6408, // República Centro-Africana
    6475, // República Dominicana
    6602, // Reunião, Ilha
    6700, // Romênia
    6750, // Ruanda
    6769, // Rússia
    6858, // Saara Ocidental
    6777, // Salomão, Ilhas
    6904, // Samoa
    6912, // Samoa Americana
    6971, // San Marino
    7102, // Santa Helena
    7153, // Santa Lúcia
    6955, // São Cristóvão e Neves
    7005, // São Pedro e Miquelon
    7200, // São Tomé e Príncipe, Ilhas
    7056, // São Vicente e Granadinas
    7285, // Senegal
    7358, // Serra Leoa
    7315, // Seychelles
    7447, // Síria, República Árabe da
    7480, // Somália
    7501, // Sri Lanka
    7544, // Suazilândia
    7595, // Sudão
    7641, // Suécia
    7676, // Suíça
    7706, // Suriname
    7722, // Tadjiquistão
    7765, // Tailândia
    7803, // Tanzânia, República Unida da
    7919, // Tcheca, República
    7820, // Território Britânico Oc. Índico
    7951, // Timor Leste
    8001, // Togo
    8109, // Tonga
    8052, // Toquelau, Ilhas
    8150, // Trinidad e Tobago
    8206, // Tunísia
    8230, // Turcas e Caicos, Ilhas
    8249, // Turcomenistão, República do
    8273, // Turquia
    8281, // Tuvalu
    8311, // Ucrânia
    8338, // Uganda
    8451, // Uruguai
    8478, // Uzbequistão, República do
    5517, // Vanuatu
    8486, // Vaticano, Estado da Cidade do
    8508, // Venezuela
    8583, // Vietnã
    8630, // Virgens, Ilhas (Britânicas)
    8664, // Virgens, Ilhas (E.U.A.)
    8737, // Wake, Ilha
    8753, // Wallis e Futuna, Ilhas
    8907, // Zâmbia
    6653, // Zimbábue
    8958, // Zona do Canal do Panamá
  ];

  return countries.includes(Number(country));
}

function validateCEP(cepCode) {
  return ceps.hasOwnProperty(cepCode);
}

function validateAddress(address) {
  if (address.length < 26 || address.length > 35) {
    return false;
  }

  const re = /^[A-Z0-9]+$/i;
  if (!re.test(address)) {
    return false;
  }

  return true;
}

/*
 *
 * Função Principal
 * de Verificação de Transação
 *
 */

function filtertransaction() {
  const tx = getfiltertransaction();
  if (tx.vout.length < 1) { return 'At least one output required'; }
  for (let i = 0; i < tx.vout.length; i += 1) {
    if (Object.keys(tx.vout[i]).includes('items')) {
      for (let it = 0; i < tx.vout[i].items; it += 0) {
        const item = tx.vout[i].items[it];
        if (item.type === 'events' && item.name !== 'events') return 'Escrita somente na Stream Events';
        if (item.offchain === true) return 'Somente dados on-chain';
        if (!item.keys) return 'O evento precisa ter chaves de classificação';
        const action = item.keys[0].split('_');
        switch (action[0]) {
          case 'INVOICE':
            return filterInvoice(item);
          case 'COMPANY':
            return filterCompany(item);
          case 'SETTLEMENT':
            return filterSettlement(item);
          default:
            return 'Evento não reconhecido';
        }
      }
    }
  }
}

/*
 *
 * Função que filtra as transações relacionadas à empresas
 * Eventos: COMPANY_REGISTRY e COMPANY_UPDATE
 *
 */

function filterCompany(item) {
  const action = item.keys[0].split('_')[1];
  switch (action) {
    case 'REGISTRY': {
      if (!verifypermission(item.publishers[0], 'activate')) return 'Endereço sem permissão para registrar empresas';
      if (!verifypermission(item.keys[1], 'send') || !verifypermission(item.keys[1], 'receive')) return 'A segunda chave de classificação precisa corresponder à um endereço de empresa que já tenha sido concedido direito à enviar/receber';
      return filterCompanyRegistryData(item.keys, item.data.json);
    }
    case 'UPDATE': {
      break;
    }

    default:
      return 'Evento não reconhecido';
  }
}

function filterCompanyRegistryData(keys, data) {
  if (!isCNPJ(keys[2])) return 'A terceira chave de classificação precisa corresponder ao CNPJ da empresa no formato XX.XXX.XXX/XXXX-XX';
  if (Object.keys(data).length < 9 || Object.keys(data).length > 14) return 'Quantidade de propriedades inválidas no JSON de Registro';

  const obrigatoryKeys = ['razao', 'cnpj', 'logEnd', 'numEnd', 'bairroEnd', 'cidadeEnd', 'estadoEnd', 'cepEnd', 'endBlock'];
  if (!obrigatoryKeys.every(value => Object.prototype.hasOwnProperty.call(data, value))) return 'O Objeto não contém todas as propriedades obrigatórias';

  const optionalKeys = ['fantasia', 'compEnd', 'paisEnd', 'email', 'tel'];
  if (Object.keys(data).some(val => !(obrigatoryKeys.includes(val) || optionalKeys.includes(val)))) return 'O Objeto contém propriedades não documentadas';

  if (!data.razao || typeof data.razao !== 'string' || (data.razao.length >= 150 || data.razao.length <= 0)) return 'Propriedade razao é string obrigatória e tem tamanho máxima de 150 caracteres.';
  if (!(data.cnpj)) return 'Propriedade CNPJ é obrigatória.';
  if (data.cnpj !== keys[2]) return 'Propriedade CNPJ é diferente do CNPJ na terceira chave da publicação';
  if (!data.logEnd || typeof data.logEnd !== 'string' || (data.logEnd.length >= 150 || data.logEnd.length <= 0)) return 'Propriedade logEnd é string obrigatória e tem tamanho máxima de 125 caracteres.';
  if (!data.numEnd || typeof data.numEnd !== 'string' || (data.numEnd.length >= 150 || data.numEnd.length <= 0)) return 'Propriedade numEnd é string obrigatória e tem tamanho máxima de 10 caracteres.';
  if (!data.bairroEnd || typeof data.bairroEnd !== 'string' || (data.bairroEnd.length >= 150 || data.bairroEnd.length <= 0)) return 'Propriedade bairroEnd é obrigatória e tem tamanho máxima de 60 caracteres.';
  if (!data.cidadeEnd) return 'Propriedade cidadeEnd é obrigatória e precisa corresponder à um municipio do IBGE ou 9999999 se no exterior';
  if (data.cidadeEnd === '9999999') if (!data.paisEnd || !validateCountry(data.paisEnd)) return 'Propriedade paisEnd é obrigatória quando município é 9999999 e precisa corresponder com o código do país no BACEN';
  if (!data.cidadeEnd || !validateCity(data.cidadeEnd)) return 'Propriedade cidadeEnd é obrigatória e precisa corresponder à um municipio do IBGE.';
  if (!(data.estadoEnd && validateState(data.estadoEnd))) return 'Propriedade estadoEnd é obrigatória e precisa corresponder à uma UF.';
  if (!validateCityWithinState(data.cidadeEnd, data.estadoEnd)) return 'Propriedade cidadeEnd não pertence ao estadoEnd';
  if (!(data.cepEnd && validateCEP(data.cepEnd))) return 'Propriedade cepEnd é obrigatória e precisa corresponder à um CEP válido.';
  if (!(data.endBlock && validateAddress(data.endBlock))) return 'Propriedade endBlock é obrigatória e precisa corresponder à um endereço público válido.';
  if (data.endBlock !== keys[1]) return 'Propriedade endBlock deve ser o mesmo endereço público da empresa da segunda chave de classificação do registro';
  if (data.hasOwnProperty('fantasia') && (data.fantasia.length <= 0 || data.fantasia.length > 60)) return 'Propriedade fantasia tem tamanho máximo de 60 caracteres e não pode ser vazia se presente.';
  if (data.hasOwnProperty('compEnd') && (data.compEnd.length <= 0 || data.compEnd.length > 60)) return 'Propriedade compEnd tem tamanho máximo de 60 caracteres e não pode ser vazia se presente.';
  if (data.hasOwnProperty('email') && (data.email.length <= 0 || data.email.length > 80)) return 'Propriedade email tem tamanho máximo de 80 caracteres e não pode ser vazia se presente.';
  if (data.hasOwnProperty('tel') && (data.tel.length <= 0 || data.tel.length > 20)) return 'Propriedade tel tem tamanho máximo de 20 caracteres e não pode ser vazia se presente.';
  return 0;
}


const a = {
  hex: '010000000105b5fa33224fbcccef64db8221c6faff3c1ef7477c56389e16b71a5117594ee7010000006b483045022100fe3ac118499bc9e3b6d2f76c1f4c1eaf82d68fa3018cb2efb7868e89654f6cb502203f189a94eee785d9f751020774f9239cacc48a2a9824ab1c1a6ee750f1f5ada00121029e62f222beeca8e5b18a2656fcd1d29600553ab7e080ce96adc29310034e0302ffffffff0300000000000000002f76a9142e04a603fa7158eebf04baa8468e69c2c812455b88ac1473706b700001000000000000ffffffff2adc245d7500000000000000001976a9146d87a3128c9b9f16ea7dbd7190ef1aab384b645288ac0000000000000000252273706b69000000001976a9146d87a3128c9b9f16ea7dbd7190ef1aab384b645288ac756a00000000',
  txid: 'e5d6bedea2f0a00335180e40237b95e15f95596544b32f2d491d30f1255a4086',
  version: 1,
  locktime: 0,
  vin: [
    {
      txid: 'e74e5917511ab7169e38567c47f71e3cfffac62182db64efccbc4f2233fab505',
      vout: 1,
      scriptSig: {
        asm: '3045022100fe3ac118499bc9e3b6d2f76c1f4c1eaf82d68fa3018cb2efb7868e89654f6cb502203f189a94eee785d9f751020774f9239cacc48a2a9824ab1c1a6ee750f1f5ada001 029e62f222beeca8e5b18a2656fcd1d29600553ab7e080ce96adc29310034e0302',
        hex: '483045022100fe3ac118499bc9e3b6d2f76c1f4c1eaf82d68fa3018cb2efb7868e89654f6cb502203f189a94eee785d9f751020774f9239cacc48a2a9824ab1c1a6ee750f1f5ada00121029e62f222beeca8e5b18a2656fcd1d29600553ab7e080ce96adc29310034e0302',
      },
      sequence: 4294967295,
    },
  ],
  vout: [
    {
      value: 0,
      n: 0,
      scriptPubKey: {
        asm: 'OP_DUP OP_HASH160 2e04a603fa7158eebf04baa8468e69c2c812455b OP_EQUALVERIFY OP_CHECKSIG 73706b700001000000000000ffffffff2adc245d OP_DROP',
        hex: '76a9142e04a603fa7158eebf04baa8468e69c2c812455b88ac1473706b700001000000000000ffffffff2adc245d75',
        reqSigs: 1,
        type: 'pubkeyhash',
        addresses: [
          '17DjeJqwuNRJXSSqwnAr5vZKzQWTGXxzod5WZo',
        ],
      },
      permissions: [
        {
          for: null,
          connect: false,
          send: false,
          receive: false,
          create: false,
          issue: false,
          mine: true,
          admin: false,
          activate: false,
          custom: [
          ],
          startblock: 0,
          endblock: 4294967295,
          timestamp: 1562696746,
        },
      ],
    },
    {
      value: 0,
      n: 1,
      scriptPubKey: {
        asm: 'OP_DUP OP_HASH160 6d87a3128c9b9f16ea7dbd7190ef1aab384b6452 OP_EQUALVERIFY OP_CHECKSIG',
        hex: '76a9146d87a3128c9b9f16ea7dbd7190ef1aab384b645288ac',
        reqSigs: 1,
        type: 'pubkeyhash',
        addresses: [
          '1Fobu8JQ6uvfYQQ9J3D6Bp3iE5yWQjj8MSEyCH',
        ],
      },
    },
    {
      value: 0,
      n: 2,
      scriptPubKey: {
        asm: '73706b69000000001976a9146d87a3128c9b9f16ea7dbd7190ef1aab384b645288ac OP_DROP OP_RETURN',
        hex: '2273706b69000000001976a9146d87a3128c9b9f16ea7dbd7190ef1aab384b645288ac756a',
        type: 'nulldata',
      },
      inputcache: [
        {
          vin: 0,
          asm: 'OP_DUP OP_HASH160 6d87a3128c9b9f16ea7dbd7190ef1aab384b6452 OP_EQUALVERIFY OP_CHECKSIG',
          hex: '76a9146d87a3128c9b9f16ea7dbd7190ef1aab384b645288ac',
        },
      ],
    },
  ],
  blockhash: '00000013ef3fb403851f3400b9af299713a7a5c097c2872fa71eac7a3b791a1a',
  confirmations: 23,
  time: 1562696794,
  blocktime: 1562696794,
};

const b = {
  hex: '010000000105b5fa33224fbcccef64db8221c6faff3c1ef7477c56389e16b71a5117594ee7000000006a473044022079698dd0130e74c28c7c6ca3057218c7437acec5655e61bb13fb679f3fed045c022057859eb6ca4d1e5317c0d9ecbfd6a78199b2fea44e1ec654e83356c060c193f0012103086ec791b5425f41cb0c96b4c4cc32abe216e367d7449a2c761c88539e42b89dffffffff0200000000000000003d1473706b65c0d41ba5a1ed5c37944bab88c8f98a73750873706b6b6b657958750573706b6602756a147b6901695b690169025d69016a5369037965737d00000000000000001976a9142e04a603fa7158eebf04baa8468e69c2c812455b88ac00000000',
  txid: 'e7d7b24d5b16c217329c601486e8ffe3e9a4221ade846f2d7b802c378dbc157c',
  version: 1,
  locktime: 0,
  vin: [
    {
      txid: 'e74e5917511ab7169e38567c47f71e3cfffac62182db64efccbc4f2233fab505',
      vout: 0,
      scriptSig: {
        asm: '3044022079698dd0130e74c28c7c6ca3057218c7437acec5655e61bb13fb679f3fed045c022057859eb6ca4d1e5317c0d9ecbfd6a78199b2fea44e1ec654e83356c060c193f001 03086ec791b5425f41cb0c96b4c4cc32abe216e367d7449a2c761c88539e42b89d',
        hex: '473044022079698dd0130e74c28c7c6ca3057218c7437acec5655e61bb13fb679f3fed045c022057859eb6ca4d1e5317c0d9ecbfd6a78199b2fea44e1ec654e83356c060c193f0012103086ec791b5425f41cb0c96b4c4cc32abe216e367d7449a2c761c88539e42b89d',
      },
      sequence: 4294967295,
    },
  ],
  vout: [
    {
      value: 0,
      n: 0,
      scriptPubKey: {
        asm: '73706b65c0d41ba5a1ed5c37944bab88c8f98a73 OP_DROP 73706b6b6b657958 OP_DROP 73706b6602 OP_DROP OP_RETURN 7b6901695b690169025d69016a5369037965737d',
        hex: '1473706b65c0d41ba5a1ed5c37944bab88c8f98a73750873706b6b6b657958750573706b6602756a147b6901695b690169025d69016a5369037965737d',
        type: 'nulldata',
      },
      items: [
        {
          type: 'stream',
          name: 'events',
          createtxid: '738af9c888ab4b94375ceda1a51bd4c0021c06bb8ad83a27d29df98f8f1f8ae8',
          streamref: '0-0-0',
          publishers: [
            '17DjeJqwuNRJXSSqwnAr5vZKzQWTGXxzod5WZo',
          ],
          keys: [
            'keyX',
          ],
          offchain: false,
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
    },
    {
      value: 0,
      n: 1,
      scriptPubKey: {
        asm: 'OP_DUP OP_HASH160 2e04a603fa7158eebf04baa8468e69c2c812455b OP_EQUALVERIFY OP_CHECKSIG',
        hex: '76a9142e04a603fa7158eebf04baa8468e69c2c812455b88ac',
        reqSigs: 1,
        type: 'pubkeyhash',
        addresses: [
          '17DjeJqwuNRJXSSqwnAr5vZKzQWTGXxzod5WZo',
        ],
      },
    },
  ],
  blockhash: '000000076f76d509318b9aea55f3e69c4a2301cadf50b02ef0b62c0d2ef22dd7',
  confirmations: 16,
  time: 1562696907,
  blocktime: 1562696907,
};
