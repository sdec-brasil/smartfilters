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

  const error = field => `Tamanho máximo para '${field}' atigindo`;

  const tx = getfiltertransaction();
  if (Object.prototype.hasOwnProperty.call(tx, 'issue')) {
    if (tx.issue.type === 'issuefirst' && isCNPJ(tx.issue.name)) {
      const registry = tx.issue.details;
      try {
        if (!isCNPJ(registry.cnpj)) return 'Campo cnpj precisa ser um CNPJ válido formatado';
        if (!registry.cnpj === tx.issue.name) return 'O nome do ativo precisa ser o CNPJ informado pela empresa';
        if (!Array.isArray(registry.cnaes)) return 'Campo cnaes precisa ser um vetor';
        if (!registry.cnaes.length >= 1) return 'Vetor cnaes não pode estar vazio';
        if (!registry.razao.length <= 150) return error('razao');
        if (!registry.fantasia.length <= 60) return error('fantasia');
        if (!registry.cepEnd.length === 9) return 'Campo cepEnd precisa ter 9 caracteres e estar formatando com hifén';
        if (registry.cepEnd.split('-')[0].length !== 5 || registry.cepEnd.split('-')[1].length !== 3) return 'Campo cepEnd inválido';
        if (!registry.logEnd.length <= 125) return error('logEnd');
        if (!registry.numEnd.length <= 10) return error('numEnd');
        if (!registry.compEnd.length <= 60) return error('compEnd');
        if (!registry.bairroEnd.length <= 60) return error('bairroEnd');
        if (!registry.estadoEnd.length === 2) return 'Campo estadoEnd precisa corresponder à sigla de uma Unidade Federativa';
        if (!registry.cidadeEnd.length === 7) return 'Campo cidadeEnd precisa corresponder ao código do IBGE (7 caracteres) do município';
        if (registry.regTrib <= 0 || registry.regTrib >= 5) return 'Campo regTrib com valor inválido.';
        if (!registry.endBlock.length <= 50) return error('endBlock');
      } catch (e) {
        return `O registro não apresenta todos os campos obrigatórios no formato esperado, ${e}`;
      }
      if (registry.telefone && registry.telefone.length > 20) return error('telefone');
      if (registry.email && registry.email.length > 80) return error('email');
    }
  }

  return '';
}

filtertransaction();
