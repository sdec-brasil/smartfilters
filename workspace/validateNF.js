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

        if (type === 'date') {
          const formattedDate = `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6)}`;
          const date = new Date(formattedDate);
          if (!date.getTime()) return false;
          return date.toISOString().slice(0, 10).replace(/-/g, '') === value;
        }

        if (type === 'boolean') {
          // here the customRule wont be able to access the value of the variable
          return (value === true) || (value === false);
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
  const d = 'date';
  const b = 'boolean';

  validate(field('emissor', s, true, 38, addr => validateAddress(addr)));
  validate(field('substitutes', s, false));
  validate(field('prestacao.prefeituraIncidencia', s, true, 7, code => !!municipios[code]));

  validate(field('prestacao.baseCalculo', i, true, 15, (value, data) => value === Number(data.prestacao.valServicos) - Number(data.prestacao.valDeducoes) - Number(data.prestacao.descontoIncond)));
  validate(field('prestacao.aliqServicos', i, true));
  validate(field('prestacao.valLiquiNfse', i, true, null, (value, data) => {
    // maybe all those fields need to be required
    let targetValue = Number(data.prestacao.valServicos);
    targetValue -= Number(data.prestacao.valPis);
    targetValue -= Number(data.prestacao.valCofins);
    targetValue -= Number(data.prestacao.valInss);
    targetValue -= Number(data.prestacao.valIr);
    targetValue -= Number(data.prestacao.valCsll);
    targetValue -= Number(data.prestacao.outrasRetencoes);
    targetValue -= Number(data.prestacao.valIss);
    targetValue -= Number(data.prestacao.descontoIncond);
    targetValue -= Number(data.prestacao.descontoCond);
    return value === targetValue;
  }));
  validate(field('prestacao.competencia', d, true, 8));
  validate(field('prestacao.valServicos', i, true));
  validate(field('prestacao.valDeducoes', i, false));
  validate(field('prestacao.valPis', i, false));
  validate(field('prestacao.valCofins', i, false));
  validate(field('prestacao.valInss', i, false));
  validate(field('prestacao.valIr', i, false));
  validate(field('prestacao.valCsll', i, false));
  validate(field('prestacao.outrasRetencoes', i, false));
  validate(field('prestacao.valTotalTributos', i, false));
  validate(field('prestacao.valIss', i, true));
  validate(field('prestacao.descontoIncond', i, false));
  validate(field('prestacao.descontoCond', i, false));
  validate(field('prestacao.issRetido', b, true));
  validate(field('prestacao.respRetencao', i, false, null, (value, data) => {
    if (data.prestacao.issRetido) return value === 1 || value === 2;
    return false;
  }));
  validate(field('prestacao.itemLista', s, true, 5));
  validate(field('prestacao.codCnae', s, false, 20));
  validate(field('prestacao.codServico', s, false, 20));
  validate(field('prestacao.codNBS', s, false, 9));
  validate(field('prestacao.discriminacao', s, true, 2000));
  validate(field('prestacao.exigibilidadeISS', i, true, null, value => value >= 1 && value <= 7));
  validate(field('prestacao.codTributMunicipio', i, false));
  validate(field('prestacao.numProcesso', s, false, 30));
  validate(field('prestacao.regimeEspTribut', i, false, null, value => value >= 1 && value <= 6));
  validate(field('prestacao.optanteSimplesNacional', b, true));
  validate(field('prestacao.incentivoFiscal', b, true));

  validate(field('tomador.identificacaoTomador', s, false, 14));
  validate(field('tomador.nif', s, false, 40));
  validate(field('tomador.nomeRazaoTomador', s, false, 150));
  validate(field('tomador.logEnd', s, false, 125));
  validate(field('tomador.numEnd', s, false, 10));
  validate(field('tomador.compEnd', s, false, 60));
  validate(field('tomador.bairroEnd', s, false, 60));
  validate(field('tomador.cidadeEnd', i, false));
  validate(field('tomador.estadoEnd', s, false, 2));
  validate(field('tomador.paisEnd', i, false));
  validate(field('tomador.cepEnd', s, false, 8));
  validate(field('tomador.email', s, false, 80, (v) => {
    let value = v;
    if (!value.includes('@')) return false;
    value = value.split('@');
    if (value.length > 2) return false;
    if (!value[1].includes('.')) return false;
    return true;
  }));
  validate(field('tomador.tel', s, false, 20));

  validate(field('intermediario.identificacaoIntermed', s, false, 14));
  validate(field('intermediario.nomeRazaoIntermed', s, false, 150));
  validate(field('intermediario.cidadeIntermed', false, i));

  validate(field('constCivil.codObra', s, false, 30));
  validate(field('constCivil.art', s, false, 30));

  // esse campo não está no modelo de invoice, e sobrou.
  // existe o campo optanteSimplesNacional. Será que está duplicado?
  // validate(field('prestacao.simplesNacional'));
}

validateNote({});
