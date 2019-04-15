/* eslint-disable no-undef */
/* eslint-disable quotes */

/* This filter checks whether a transaction
is paying the right miner fee (R$0.01), defined in raw blockchain units */


function filtertransaction() {
  const bal = getfilterassetbalances("", true);
  let fee = 0;
  Object.keys(bal).forEach((add) => {
    fee -= bal[add];
  });

  if (fee !== 10) {
    return "Fee needs to be exactly R$0.01 (10 units)";
  }
}
