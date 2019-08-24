/* eslint-disable no-undef */
function filtertransaction() {
  const isCNPJ = (string) => {
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

  const error = field => `Tamanho máximo para '${field}' atigindo`;

  const tx = getfiltertransaction();
  if (Object.prototype.hasOwnProperty.call(tx, 'issue')) {
    if (tx.issue.type === 'issuefirst' && isCNPJ(tx.issue.name)) {
      const registry = tx.issue.details;
      try {
        if (!isCNPJ(registry.taxNumber) && !isCPF(registry.taxNumber)) return 'Campo taxNumber precisa ser um CNPJ ou CPF válido e formatado';
        if (!registry.taxNumber === tx.issue.name) return 'O nome do ativo precisa ser o mesmo informado como taxNumber';
        if (!Array.isArray(registry.economicActivities)) return 'Campo economicActivities precisa ser um vetor';
        if (!registry.economicActivities.length >= 1) return 'Vetor economicActivities não pode estar vazio';
        if (!registry.name.length <= 150) return error('name');
        if (!registry.tradeName.length <= 60) return error('tradeName');
        if (!registry.postalCode.length === 9) return 'Campo postalCode precisa ter 9 caracteres e estar formatando com hifén';
        if (registry.postalCode.split('-')[0].length !== 5 || registry.postalCode.split('-')[1].length !== 3) return 'Campo postalCode inválido';
        if (!registry.street.length <= 125) return error('street');
        if (!registry.number.length <= 10) return error('number');
        if (!registry.additionalInformation.length <= 60) return error('additionalInformation');
        if (!registry.district.length <= 60) return error('district');
        if (!registry.state.length === 2) return 'Campo state precisa corresponder à sigla de uma Unidade Federativa';
        if (!registry.city.length === 7) return 'Campo city precisa corresponder ao código do IBGE (7 caracteres) do município';
        if (registry.taxRegime <= 0 || registry.taxRegime >= 5) return 'Campo regTrib com valor inválido.';
        if (!registry.endBlock.length <= 50) return error('endBlock');
      } catch (e) {
        return `O registro não apresenta todos os campos obrigatórios no formato esperado, ${e}`;
      }
      if (registry.phoneNumber && registry.phoneNumber.length > 20) return error('phoneNumber');
      if (registry.email && registry.email.length > 80) return error('email');
    }
  }

  return '';
}

filtertransaction();
