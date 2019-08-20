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

  const tx = getfiltertransaction();
  if (Object.prototype.hasOwnProperty.call(tx, 'issue')) {
    if (tx.issue.type === 'issuefirst' && isCNPJ(tx.issue.name)) {

    }
  }

  return '';
}

filtertransaction();
