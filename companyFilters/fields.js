/* eslint-disable no-undef */
function filtertransaction() {
  const isCNPJ = (_cnpj) => {
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
  };

  const isCPF = (_cpf) => {
    if (!/^\d{3}\x2E\d{3}\x2E\d{3}\x2D\d{2}$/.test(_cpf)) return false;
    cpf = _cpf.replace(/[^\d]+/g, '');
    if (cpf === '') return false;
    // Elimina CPFs invalidos conhecidos
    if (cpf.length !== 11
      || cpf === '00000000000'
      || cpf === '11111111111'
      || cpf === '22222222222'
      || cpf === '33333333333'
      || cpf === '44444444444'
      || cpf === '55555555555'
      || cpf === '66666666666'
      || cpf === '77777777777'
      || cpf === '88888888888'
      || cpf === '99999999999') { return false; }
    // Valida 1o digito
    add = 0;
    for (i = 0; i < 9; i++) { add += parseInt(cpf.charAt(i)) * (10 - i); }
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) { rev = 0; }
    if (rev !== parseInt(cpf.charAt(9))) { return false; }
    // Valida 2o digito
    add = 0;
    for (i = 0; i < 10; i++) { add += parseInt(cpf.charAt(i)) * (11 - i); }
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) { rev = 0; }
    if (rev !== parseInt(cpf.charAt(10))) { return false; }
    return true;
  };

  const mandatoryKeys = ['taxNumber', 'economicActivies', 'name', 'tradeName', 'postalCode', 'street', 'number', 'additionalInformation', 'district', 'city', 'state', 'taxRegime', 'endBlock'];
  const optionalKeys = ['email', 'phoneNumber'];

  const tx = getfiltertransaction();
  if (Object.prototype.hasOwnProperty.call(tx, 'issue')) {
    if (tx.issue.type === 'issuefirst' && (isCNPJ(tx.issue.name) || isCPF(tx.issue.name))) {
      const registry = tx.issue.details;

      if (tx.issue.open === false) {
        return 'Propriedade open precisa ser true';
      }
      if (!mandatoryKeys.every(key => Object.prototype.hasOwnProperty.call(registry, key))) {
        return 'O registro não apresenta todos os campos obrigatórios';
      }

      if (Object.keys(registry).some(key => !(mandatoryKeys.includes(key) || optionalKeys.includes(key)))) {
        return 'O registro possui propriedades fora da especificação';
      }
    }
  }

  return '';
}
