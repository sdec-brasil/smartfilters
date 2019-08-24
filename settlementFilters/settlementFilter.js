import { lc116 } from './lc116';

function validateSettlements() {
  function defineReceiver(x) {
    const tomador = [];
    const provedor = [];
    while (x.length) {
      const element = x.shift();
      if (lc116[String(element.itemLista)].incidenciaTomador) {
        tomador.push(element);
      } else {
        provedor.push(element);
      }
    }
    return [tomador, provedor];
  }

  // const invoice = invoices list -> how do we make sure all invoices of that month are here?
  // const company = companies info

  const [tomador, provedor] = defineReceiver(invoices);

  const settlementValues = {};

  let totalProvedor = 0;
  // invoices para o provedor
  if (provedor.length) {
    totalProvedor = provedor.reduce((x, y) => x + y.valIss, 0);
    settlementValues[company.cidadeEnd] = totalProvedor;
  }
  // invoices para o tomador
  if (tomador.length) {
    tomador.forEach((inv) => {
      if (settlementValues[inv.prefeituraPrestacao] !== undefined) {
        settlementValues[inv.prefeituraPrestacao] += inv.valIss;
      } else {
        settlementValues[inv.prefeituraPrestacao] = inv.valIss;
      }
    });
  }
//   return settlementValues;
// here assert settlements are equal to presented value
}
