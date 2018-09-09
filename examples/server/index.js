const TronWeb = require('../../dist/TronWeb.node.js'); // require('tronweb');
const HttpProvider = TronWeb.providers.HttpProvider;

const fullNode = new HttpProvider('http://rpc.tron.watch:8090'); // http://159.69.37.73:8090
const solidityNode = new HttpProvider('http://rpc.tron.watch:8091'); // http://159.69.37.73:8091
const eventServer = 'http://47.90.203.178:18891';
const privateKey = '4d141598bde726f8681d584ea51d5e930bc40e214c172f89d4ebb5d58dfdfe50';

const app = async () => {
    const tronWeb = new TronWeb(
        fullNode, 
        solidityNode, 
        eventServer,
        privateKey
    );

    tronWeb.setDefaultBlock('latest');

    const nodes = await tronWeb.isConnected();
    const connected = !Object.entries(nodes).map(([ name, connected ]) => {
        if(!connected)
            console.error(`Error: ${name} is not connected`);

        return connected;
    }).includes(false);

    if(!connected)
        return;

    const account = await tronWeb.createAccount();
    const isValid = tronWeb.isAddress(account.address.hex);

    console.group('\nGenerated account');
        console.log('- Private Key:', account.privateKey);
        console.log('- Public Key: ', account.publicKey);
        console.group('Address')
            console.log('- Base58:', account.address.base58);
            console.log('- Hex:   ', account.address.hex);
            console.log('- Valid: ', isValid, '\n')
        console.groupEnd();
    console.groupEnd();

    const currentBlock = await tronWeb.trx.getCurrentBlock();

    console.group('Current block');
        console.log(JSON.stringify(currentBlock, null, 2), '\n');
    console.groupEnd();

    // You can use latest, earliest, a block hash or block number
    const previousBlock = await tronWeb.trx.getBlock('79136');

    console.group('Previous block #79136');
        console.log(JSON.stringify(previousBlock, null, 2), '\n');
    console.groupEnd();

    const genesisBlockCount = await tronWeb.trx.getBlockTransactionCount('earliest');

    console.group('Genesis Block Transaction Count');
        console.log('Transactions:', genesisBlockCount, '\n');
    console.groupEnd();

    const transaction = await tronWeb.trx.getTransaction('134d90066bf262c0f1fb490bde165ce46aeb74230cf7c91031e5521744816853');

    console.group('Transaction');
        console.log('- Hash:', transaction.txID);
        console.log('- Transaction:\n' + JSON.stringify(transaction, null, 2), '\n');
    console.groupEnd();

    const transactions = await tronWeb.trx.getTransactionsRelated('TGEJj8eus46QMHPgWQe1FJ2ymBXRm96fn1', 'all');

    console.group('Transactions relating to address');
        console.log('- Address: TGEJj8eus46QMHPgWQe1FJ2ymBXRm96fn1');
        console.log('- Transactions:\n' + JSON.stringify(transactions, null, 2), '\n');
    console.groupEnd();

    const accountInfo = await tronWeb.trx.getAccount('4144abc6018aec80cf05e3ac94376d6cd76da1b112');

    console.group('Account information');
        console.log('- Address: 4144abc6018aec80cf05e3ac94376d6cd76da1b112');
        console.log('- Account:\n' + JSON.stringify(accountInfo, null, 2), '\n');
    console.groupEnd();

    const balance = await tronWeb.trx.getBalance('TGEJj8eus46QMHPgWQe1FJ2ymBXRm96fn1');

    console.group('Account balance');
        console.log('- Address: TGEJj8eus46QMHPgWQe1FJ2ymBXRm96fn1');
        console.log('- Balance:', balance, '\n');
    console.groupEnd();

    const bandwidth = await tronWeb.trx.getBandwidth('TGEJj8eus46QMHPgWQe1FJ2ymBXRm96fn1');

    console.group('Account bandwidth');
        console.log('- Address: 4144abc6018aec80cf05e3ac94376d6cd76da1b112');
        console.log('- Bandwidth:', bandwidth, '\n');
    console.groupEnd();

    const tokens = await tronWeb.trx.getTokensIssuedByAddress('TSZRsyxQrTFrjpAoqsPJj1pS4pacBnsBx1');

    console.group('Tokens from address');
        console.log('- Owner Address: TSZRsyxQrTFrjpAoqsPJj1pS4pacBnsBx1');
        console.log('- Tokens:\n' + JSON.stringify(tokens, null, 2), '\n');
    console.groupEnd();

    const token = await tronWeb.trx.getTokenFromID('TestToken');

    console.group('Tokens from its name');
        console.log('- Token Name: TestToken');
        console.log('- Token:\n' + JSON.stringify(token, null, 2), '\n');
    console.groupEnd();

    const nodeList = await tronWeb.trx.listNodes();

    console.group('List of full nodes');
        console.log('- Node Count:', nodeList.length);
        console.log('- Nodes:', JSON.stringify(nodeList), '\n');
    console.groupEnd();
};

app();