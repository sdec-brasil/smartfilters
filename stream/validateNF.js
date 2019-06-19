/* eslint-disable no-undef */
function filterstreamitem() {

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

// Só checa se o tamanho >

const municipios = require('../data/municipios.json');

function validateNote(obj) {
  function field(name, type, necessary, maxSize, customRule = undefined) {
    try {
      if (!obj[name] && necessary) return false;
      if (obj[name]) {
        let value = obj[name];

        if (type === 'number' || type === 'integer') {
          if (Number.isNaN(Number(value))) return false;
          if (type === 'integer' && !Number.isInteger(Number(value))) return false;
          value = Number(value);
        }

        if (type === 'string') {
          value = String(value);
          if (value.length > maxSize || value.length === 0) return false;
        } else {
          return false;
        }

        if (customRule) return customRule(value, obj);
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  const results = [];
  const validate = results.push;

  const s = 'string';
  const n = 'number';
  const i = 'integer';

  validate(field('emissor', s, true, 38, addr => validateAddress(addr)));
  validate(field('prestacao.prefeituraIncidencia', s, true, 7, code => !!municipios[code]));

  validate(field('prestacao.competencia', s, true, 8, (string) => {
    const formattedDate = `${string.slice(0, 4)}-${string.slice(4, 6)}-${string.slice(6)}`;
    const date = new Date(formattedDate);
    if (!date.getTime()) return false;
    return date.toISOString().slice(0, 10).replace('-', '') === string;
  }));

  validate(field('prestacao.baseCalculo', i, true, 15, (value, data) => value === Number(data[prestacao][valServicos]) - Number(data[prestacao][valDeducoes]) - Number(data[prestacao][descontoIncond])));
  validate(field('prestacao.aliqServicos', n, false));
  validate(field('prestacao.codServico'));
  validate(field('prestacao.valIss'));
  validate(field('prestacao.valLiquiNfse'));
  validate(field('prestacao.valServicos'));
  validate(field('prestacao.valDeducoes'));
  validate(field('prestacao.issRetido'));
  validate(field('prestacao.itemLista'));
  validate(field('prestacao.discriminacao'));
  validate(field('prestacao.codTributMunicipio'));
  validate(field('prestacao.exigibilidadeISS'));
  validate(field('prestacao.simplesNacional'));
  validate(field('prestacao.incentivoFiscal'));
  validate(field('prestacao.respRetencao'));
  validate(field('prestacao.valPis'));
  validate(field('prestacao.valCofins'));
  validate(field('prestacao.valInss'));
  validate(field('prestacao.valIr'));
  validate(field('prestacao.valCsll'));
  validate(field('prestacao.outrasRetencoes'));
  validate(field('prestacao.valTotalTributos'));
  validate(field('prestacao.descontoIncond'));
  validate(field('prestacao.descontoCond'));
  validate(field('prestacao.codCnae'));
  validate(field('prestacao.codNBS'));
  validate(field('prestacao.numProcesso'));
  validate(field('prestacao.regimeEspTribut'));
  validate(field('prestacao.optanteSimplesNacional'));
  validate(field('tomador.identificacaoTomador'));
  validate(field('tomador.nif'));
  validate(field('tomador.nomeRazaoTomador'));
  validate(field('tomador.logEnd'));
  validate(field('tomador.numEnd'));
  validate(field('tomador.compEnd'));
  validate(field('tomador.bairroEnd'));
  validate(field('tomador.cidadeEnd'));
  validate(field('tomador.estadoEnd'));
  validate(field('tomador.paisEnd'));
  validate(field('tomador.cepEnd'));
  validate(field('tomador.email'));
  validate(field('tomador.tel'));
  validate(field('intermediario.identificacaoIntermed'));
  validate(field('intermediario.nomeRazaoIntermed'));
  validate(field('intermediario.cidadeIntermed'));
  validate(field('constCivil.codObra'));
  validate(field('constCivil.art'));
}

validateNote({});
