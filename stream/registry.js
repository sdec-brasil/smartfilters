const municipios = require('./data/municipios.json')

const ceps = require('./data/ceps.json');


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
  return municipios[cityCode].uf == uf;
}

function validateCountry(country) {
  const countries = [
    132,  // Afeganistão
    7560, // África do Sul
    175,  // Albânia, República da
    230,  // Alemanha
    370,  // Andorra
    400,  // Angola
    418,  // Anguilla
    434,  // Antigua e Barbuda
    477,  // Antilhas Holandesas
    531,  // Arábia Saudita
    590,  // Argélia
    639,  // Argentina
    647,  // Armênia, República da
    655,  // Aruba
    698,  // Austrália
    728,  // Áustria
    736,  // Azerbaijão, República do
    779,  // Bahamas, Ilhas
    809,  // Bahrein, Ilhas
    817,  // Bangladesh
    833,  // Barbados
    850,  // Belarus
    876,  // Bélgica
    884,  // Belize
    2291, // Benin
    906,  // Bermudas
    973,  // Bolívia
    981,  // Bósnia-Herzegovina
    1015, // Botsuana
    1058, // Brasil
    1082, // Brunei
    1112, // Bulgária, República da
    310,  // Burkina Faso
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
    0930, // Mianmar (Birmânia)
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
  ]

  return countries.includes(Number(country));
}

function validateCEP(cepCode) {
  return ceps.hasOwnProperty(cepCode);
}

function validateAddress(address) {
  if (address.length < 26 || address.length > 35) {
    return false;
  }
  
  let re = /^[A-Z0-9]+$/i;
  if (!re.test(address)) {
    return false;
  }
  
  return true;
}

// eslint-disable-next-line no-unused-vars
function filterstreamitem() {
  // eslint-disable-next-line no-undef
  const registryStreamName = 'Registro';
  const transaction = getfiltertransaction();

  if (transaction.items.length > 0) {
    let reason = null;
    for (let i = 0; i < transaction.items.length; i++) {
      const element = transaction.items[i];
      if (element.name === registryStreamName) {
        const { keys } = element;
        const data = element.data.json;

        if (keys.length !== 2) {
          reason = 'O registro de empresas exige duas chaves [\'id\', numero] (i.e: [\'cpf\', \'356.695.940-53\'].';
          break;
        }

        if (typeof keys[0] !== 'string' || typeof keys[1] !== 'string') {
          reason = 'As duas chaves da publicação precisam ser strings.';
          break;
        }

        const id = keys[0].toLowerCase();

        if (id === 'cpf' || id === 'cnpj') {
          if (id === 'cpf') {
            if (!validCPF(keys[1])) {
              reason = 'CPF Inválido. Formato esperado: XXX-XXX-XXX-XX.';
              break;
            }
          }

          if (id === 'cnpj') {
            if (!validCNPJ(keys[1])) {
              reason = 'CNPJ Inválido. Formato esperado: XX.XXX.XXX/XXXX-XX.';
              break;
            }
          }

          if (Object.keys(data).length < 10 || Object.keys(data).length > 15) {
            reason = 'Quantidade de propriedades inválidas no JSON de Registro.';
            break;
          }

          const obrigatoryKeys = ['razao', 'tipoId', 'identificacao', 'logEnd', 'numEnd', 'bairroEnd', 'cidadeEnd', 'estadoEnd', 'cepEnd', 'endBlock'];

          const hasObrigatoryKeys = obrigatoryKeys.every(value => Object.prototype.hasOwnProperty.call(data, value));

          if (!hasObrigatoryKeys) {
            reason = 'O Objeto não contém todas as propriedades obrigatórias';
            break;
          }

          const optionalKeys = ['fantasia', 'compEnd', 'paisEnd', 'email', 'tel'];

          const hasExtraKeys = Object.keys(data).some(val => !(obrigatoryKeys.includes(val) || optionalKeys.includes(val)));

          if (hasExtraKeys) {
            reason = 'O Objeto contém propriedades não documentadas.';
            break;
          }

          if (!(data.razao || data.razao.length <= 150)) {
            reason = 'Propriedade \'razao\' é obrigatória e tem tamanho máxima de 150 caracteres.';
            break;
          }

          if (!(data.tipoId) || (Number(data.tipoId) !== 1 || Number(data.tipoId) !== 2)) {
            reason = 'Propriedade \'tipoId\' é obrigatória e só pode ser 1 (cpf) ou 2 (cnpj).';
            break;
          }

          if (!(data.identificacao)) {
            reason = 'Propriedade \'identificacao\' é obrigatória.';
            break;
          }

          if (!(data.identificacao !== keys[1])) {
            reason = 'Propriedade \'identificacao\' é diferente da segunda chave da publicação';
            break;
          }

          if (Number(data.tipoId) === 1 && !validCPF(data.identificacao)) {
            reason = 'Propriedade \'identificacao\' não é um CPF válido';
            break;
          }

          if (Number(data.tipoId) === 2 && !validCNPJ(data.identificacao)) {
            reason = 'Propriedade \'identificacao\' não é um CNPJ válido';
            break;
          }

          if (!(data.logEnd || data.logEnd.length <= 125)) {
            reason = 'Propriedade \'logEnd\' é obrigatória e tem tamanho máxima de 125 caracteres.';
            break;
          }

          if (!(data.numEnd || data.numEnd.length <= 10)) {
            reason = 'Propriedade \'numEnd\' é obrigatória e tem tamanho máxima de 10 caracteres.';
            break;
          }

          if (!(data.bairroEnd || data.bairroEnd.length <= 150)) {
            reason = 'Propriedade \'bairroEnd\' é obrigatória e tem tamanho máxima de 60 caracteres.';
            break;
          }

          if (!(data.cidadeEnd && validateCity(data.cidadeEnd))) {
            reason = 'Propriedade \'cidadeEnd\' é obrigatória e precisa corresponder à um municipio do IBGE.';
            break;
          }

          if (!(data.estadoEnd && validateState(data.estadoEnd))) {
            reason = 'Propriedade \'estadoEnd\' é obrigatória e precisa corresponder à uma UF.';
            break;
          }

          if (!validateCityWithinState(data.cidadeEnd, data.estadoEnd)) {
            reason = 'Propriedade \'cidadeEnd\' não pertence ao \'estadoEnd\'';
            break;
          }

          if (Number(data.cidadeEnd) === 9999999 && (data.paisEnd && validateCountry(data.paisEnd))) {
            reason = 'Propriedade \'paisEnd\' é obrigatória quando município é 9999999 e precisa corresponder com o código do país no BACEN';
            break;
          }

          // Checar se CEP está contido no UF/Municipio

          if (!(data.cepEnd && validateCEP(data.cepEnd))) {
            reason = 'Propriedade \'cepEnd\' é obrigatória e precisa corresponder à um CEP válido.';
            break;
          }

          if (!(data.endBlock && validateAddress(data.endBlock))) {
            reason = 'Propriedade \'endBlock\' é obrigatória e precisa corresponder à um endereço público válido.';
            break;
          }

          if (data.fantasia && data.fantasia.length > 60) {
            reason = 'Propriedade \'fantasia\' tem tamanho máxima de 60 caracteres.';
            break;
          }

          if (data.compEnd && data.compEnd.length > 60) {
            reason = 'Propriedade \'compEnd\' tem tamanho máxima de 60 caracteres.';
            break;
          }

          if (data.email && data.email.length > 80) {
            reason = 'Propriedade \'email\' tem tamanho máxima de 80 caracteres.';
            break;
          }

          if (data.tel && data.tel.length > 20) {
            reason = 'Propriedade \'email\' tem tamanho máxima de 80 caracteres.';
            break;
          }
        }

        reason = 'A primeira chave da publicação precisa ser \'CPF\' ou \'CNPJ\'.';
      }
    }

    return reason;  
  }
  return;
}

