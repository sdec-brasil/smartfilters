###  Filtros de Validação de uma Nota Fiscal

#### Formato Esperado:

Campo                   | Optativo? | Tipo    | Tamanho | Exemplo                             |
------------------------|-----------|---------| --------| ------------------------------------|
substitutes             |     N     | String  |   18    |                                     |
invoiceName             |     -     | String  |  [1,..) |                                     |
encryptedBorrower       |     N     | String  | (0,150] |                                     |
emitter                 |     S     | String  | (0,60]  |                                     |
taxNumber               |     S     | String  |    9    |                                     |
provision               |     S     | Object  |    -    |                                     |
tributes                |     S     | Object  |    -    |                                     |
borrower                |     N     | Object  |    -    |                                     |
intermediary            |     N     | Object  |    -    |                                     |
construction            |     N     | Object  |    -    |                                     |

##### Provision:

Campo                | Optativo? | Tipo    | Tamanho | Exemplo                             |
---------------------|-----------|---------| --------| ------------------------------------|
issuedOn             |     N     | String  |   18    |                                     |
cityServiceLocation  |     N     | String  |  [1,..) |                                     |
serviceCode          |     N     | String  | (0,150] |                                     |
cnaeCode             |     S     | String  | (0,60]  |                                     |
nbsCode              |     S     | String  |    9    |                                     |
description          |     N     | String  |    -    |                                     |
servicesAmount       |     N     | Integer |    -    |                                     |

##### Tributes

Campo                       | Optativo? | Tipo    | Tamanho | Exemplo                             |
----------------------------|-----------|---------| --------| ------------------------------------|
taxBenefit                  |      ?    | Boolean |    -    |                                     |
issExigibility              |      ?    | Integer |   1-7   |                                     |
processNumber               |      ?    | String  |         |                                     |
issRate                     |      ?    | String  |         |                                     |
issAmount                   |      ?    | Integer |    -    |                                     |
issWithheld                 |      ?    | Boolean |    -    |                                     |
retentionResponsible        |      ?    | Integer |   1-2   |                                     |
specialTaxRegime            |      ?    | Integer |  0-16   |                                     |
pisAmount                   |      ?    | Integer |    -    |                                     |
cofinsAmount                |      ?    | Integer |    -    |                                     |
inssAMount                  |      ?    | Integer |    -    |                                     |
irAmount                    |      ?    | Integer |    -    |                                     |
csllAmount                  |      ?    | Integer |    -    |                                     |
unconditionedDiscountAmount |      ?    | Integer |    -    |                                     |
conditionedDiscountAmount   |      ?    | Integer |    -    |                                     |
othersAmountsWithheld       |      ?    | Integer |    -    |                                     |
deductionsAmount            |      ?    | Integer |    -    |                                     |
calculationBasis            |      ?    | Integer |    -    |                                     |
approximateTax              |      ?    | Integer |    -    |                                     |
netValueNfse                |      ?    | Integer |    -    |                                     |

##### Borrower

Campo                 |  Optativo  | Tipo |
----------------------|------------|------|
taxNumber             |      ?     |      |
nif                   |      ?     |      |
name                  |      ?     |      |
street                |      ?     |      |
number                |      ?     |      |
additionalInformation |      ?     |      |
district              |      ?     |      |
city                  |      ?     |      |
state                 |      ?     |      |
country               |      ?     |      |
postalCode            |      ?     |      |
email                 |      ?     |      |
phoneNumber           |      ?     |      |

##### Intermediary

Campo                 |  Optativo  | Tipo |
----------------------|------------|------|
taxNumber             |      ?     |      |
name                  |      ?     |      |
city                  |      ?     |      |

##### Construction

Campo                 | Optativo  | Tipo |
----------------------|-----------|------|
workCode              |     ?     |      |
art                   |     ?     |      |


#### Filtros:

Nome do Arquivo     | Descrição/Objetivo                                               |
--------------------|------------------------------------------------------------------|
fields.js           | Garantir a existência somente das chaves obrigatórias e opcionais|
formatted.js        | Garantir formato estrutural dos dados presentes                  |
[codigoIbge.js]     | Enforça os serviços e alíquotas daquele município                |
tributes.js         | Garante a consistência entre os campos relativos                 |

#### Comentários:


#### getfiltertransaction() 

Função própria da Blockchain que retorna a transação sendo validada. O retorno dessa função para uma transação de emissão de nota é do formato:

```json
{

```