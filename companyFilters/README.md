###  Filtros de Validação de uma Nova Empresa

#### Formato Esperado:

Campo     | Optativo? | Tipo    | Tamanho | Exemplo                             |
----------|-----------|---------| --------| ------------------------------------|
cnpj      |     N     | String  |   18    | "21.442.205/0001-05"                |
cnaes     |     N     | [String]|  [1,..) | ["5231-1/01", "6613-4/00"]          |
razao     |     N     | String  | (0,150] | "Felicidades Brasil Social"         |
fantasia  |     N     | String  | (0,60]  | "Brasil Feliz"                      |
cepEnd    |     N     | String  |    9    | "22610-010"                         |
logEnd    |     N     | String  | (0,125] | "Avenida Embaixador Branco"         |
numEnd    |     N     | String  | (0,10]  | "333A"                              |
compEnd   |     N     | String  | (0,60]  | "Prédio Kennedy"                    |
bairroEnd |     N     | String  | (0,60]  | "Bairro do Ipê Amarelo"             |
cidadeEnd |     N     | String  |    7    | "3304557"                           |
estadoEnd |     N     | String  |    2    | "RJ"                                |
regTrib   |     N     | Integer |  1-4    |  2                                  |
email     |     S     | String  | (0,80]  | "felicidades@brasil.com"            |
telefone  |     S     | String  | (0,20]  | "2122331515"                        |
endBlock  |     N     | String  | (0,50]  | "1LmjfhrnJcq9Te3h7x7cDQcXPneqS1jTJc"|

#### Filtros:

Nome do Arquivo     | Descrição/Objetivo                                               |
--------------------|------------------------------------------------------------------|
fields.js           | Garantir a existência somente das chaves obrigatórias e opcionais|
formatted.js        | Garantir formato estrutural dos dados presentes                  |
cnaes.js            | Verificar a existência dos CNAE's citados*                       |

*\*cnaes.js: Esse filtro, quando lido pelo Worker, serve também para popular a tabela de CNAE's*

#### Comentários:

A verificação de cep <-> bairro <-> cidade <-> estado deve ser feita off-chain pela Junta Comercial que pretende cadastrar a empresa no sistema. 

#### getfiltertransaction() 

Função própria da Blockchain que retorna a transação sendo validada. O retorno dessa função para uma transação de registro de empresa é do formato:

```json
{
    "hex" : "0100000001d425884b0a0991d6a8094dbb1b2369c3d1171e5ca946c4d5c34b627b7e5f79be000000006a473044022001f82f8237115aa8072e50f0103164b3b799492e6a8178f7080f3d2996e8712a022052c0b95ca470c06c803137a4e4d18d51f4e89eeb7f8d362f5814dd1c9941dc050121030d185dd46f98e6f2f6f87e599c7b0418c22a09b842258613bd2a9dca5eb7391dffffffff0300000000000000002776a91439365dd5349ddadd075cbe38a031447e5cb9ebbc88ac0c73706b670000000000000000750000000000000000fd82014d7d0173706b6e0100011232312e3434322e3230352f303030312d303500410401000000000201010005fd53017b6904636e706a53691232312e3434322e3230352f303030312d3035690572617a616f53691849676f72204d6f72656972612052617a6f20536f6369616c690866616e746173696153691c4170656e617320756d204e6f6d652046616e7461736961204c5444416906636570456e6453690934373438362d38323069066c6f67456e645369125275612045737461646f7320556e69646f7369066e756d456e645369033233376907636f6d70456e6453690746617a656e6461690962616972726f456e645369075472656d656d626909636964616465456e6453690735373738383131690965737461646f456e645369024d5469077265675472696269036908656e64426c6f636b53692631584d335952576351705466433146765652507862504575644662514148554a67516e59316d6905636e6165735b536909353233312d312f3031536909363631332d342f30305d7d756a00000000000000001976a9146590d65231a8549913cfa8154fd30cab2e0425e688ac00000000",
    "txid" : "73e6b6a8cf39990104c7eb671a1182a80f2588657d10dfa607cfba023d00a6cc",
    "version" : 1,
    "locktime" : 0,
    "vin" : [
        {
            "txid" : "be795f7e7b624bc3d5c446a95c1e17d1c369231bbb4d09a8d691090a4b8825d4",
            "vout" : 0,
            "scriptSig" : {
                "asm" : "3044022001f82f8237115aa8072e50f0103164b3b799492e6a8178f7080f3d2996e8712a022052c0b95ca470c06c803137a4e4d18d51f4e89eeb7f8d362f5814dd1c9941dc0501 030d185dd46f98e6f2f6f87e599c7b0418c22a09b842258613bd2a9dca5eb7391d",
                "hex" : "473044022001f82f8237115aa8072e50f0103164b3b799492e6a8178f7080f3d2996e8712a022052c0b95ca470c06c803137a4e4d18d51f4e89eeb7f8d362f5814dd1c9941dc050121030d185dd46f98e6f2f6f87e599c7b0418c22a09b842258613bd2a9dca5eb7391d"
            },
            "sequence" : 4294967295
        }
    ],
    "vout" : [
        {
            "value" : 0,
            "n" : 0,
            "scriptPubKey" : {
                "asm" : "OP_DUP OP_HASH160 39365dd5349ddadd075cbe38a031447e5cb9ebbc OP_EQUALVERIFY OP_CHECKSIG 73706b670000000000000000 OP_DROP",
                "hex" : "76a91439365dd5349ddadd075cbe38a031447e5cb9ebbc88ac0c73706b67000000000000000075",
                "reqSigs" : 1,
                "type" : "pubkeyhash",
                "addresses" : [
                    "18jVDBANk7M3Ppdvh5g72gtexrQif5r4oRMx1p"
                ]
            },
            "assets" : [
                {
                    "name" : "21.442.205/0001-05",
                    "issuetxid" : "73e6b6a8cf39990104c7eb671a1182a80f2588657d10dfa607cfba023d00a6cc",
                    "assetref" : null,
                    "qty" : 0,
                    "raw" : 0,
                    "type" : "issuefirst"
                }
            ]
        },
        {
            "value" : 0,
            "n" : 1,
            "scriptPubKey" : {
                "asm" : "73706b6e0100011232312e3434322e3230352f303030312d303500410401000000000201010005fd53017b6904636e706a53691232312e3434322e3230352f303030312d3035690572617a616f53691849676f72204d6f72656972612052617a6f20536f6369616c690866616e746173696153691c4170656e617320756d204e6f6d652046616e7461736961204c5444416906636570456e6453690934373438362d38323069066c6f67456e645369125275612045737461646f7320556e69646f7369066e756d456e645369033233376907636f6d70456e6453690746617a656e6461690962616972726f456e645369075472656d656d626909636964616465456e6453690735373738383131690965737461646f456e645369024d5469077265675472696269036908656e64426c6f636b53692631584d335952576351705466433146765652507862504575644662514148554a67516e59316d6905636e6165735b536909353233312d312f3031536909363631332d342f30305d7d OP_DROP OP_RETURN",
                "hex" : "4d7d0173706b6e0100011232312e3434322e3230352f303030312d303500410401000000000201010005fd53017b6904636e706a53691232312e3434322e3230352f303030312d3035690572617a616f53691849676f72204d6f72656972612052617a6f20536f6369616c690866616e746173696153691c4170656e617320756d204e6f6d652046616e7461736961204c5444416906636570456e6453690934373438362d38323069066c6f67456e645369125275612045737461646f7320556e69646f7369066e756d456e645369033233376907636f6d70456e6453690746617a656e6461690962616972726f456e645369075472656d656d626909636964616465456e6453690735373738383131690965737461646f456e645369024d5469077265675472696269036908656e64426c6f636b53692631584d335952576351705466433146765652507862504575644662514148554a67516e59316d6905636e6165735b536909353233312d312f3031536909363631332d342f30305d7d756a",
                "type" : "nulldata"
            }
        },
        {
            "value" : 0,
            "n" : 2,
            "scriptPubKey" : {
                "asm" : "OP_DUP OP_HASH160 6590d65231a8549913cfa8154fd30cab2e0425e6 OP_EQUALVERIFY OP_CHECKSIG",
                "hex" : "76a9146590d65231a8549913cfa8154fd30cab2e0425e688ac",
                "reqSigs" : 1,
                "type" : "pubkeyhash",
                "addresses" : [
                    "1EjAxK6fLWPxcakJ62QBMSSxehfypg1xz7Cqpj"
                ]
            }
        }
    ],
    "issue" : {
        "type" : "issuefirst",
        "name" : "21.442.205/0001-05",
        "multiple" : 1,
        "open" : true,
        "details" : {
            "cnpj" : "21.442.205/0001-05",
            "razao" : "Igor Moreira Razo Social",
            "fantasia" : "Apenas um Nome Fantasia LTDA",
            "cepEnd" : "47486-820",
            "logEnd" : "Rua Estados Unidos",
            "numEnd" : "237",
            "compEnd" : "Fazenda",
            "bairroEnd" : "Trememb",
            "cidadeEnd" : "5778811",
            "estadoEnd" : "MT",
            "regTrib" : 3,
            "endBlock" : "1XM3YRWcQpTfC1FvVRPxbPEudFbQAHUJgQnY1m",
            "cnaes" : [
                "5231-1/01",
                "6613-4/00"
            ]
        }
    }
}
```