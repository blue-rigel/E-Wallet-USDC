const headers = {
  authorization: `Bearer ${process.env.API_KEY}`,
  accept: "application/json",
  "content-type": "application/json",
};

const postOptions = {
  method: "POST",
  headers,
};

const getOptions = {
  method: "GET",
  headers,
};

const formatTransactionList = (transactions, wallet) => {

  if (!transactions) {
    return [];
  }

  return transactions.map((transaction) => ({
    from: transaction.from === wallet ? "My Account (" + transaction.from + ")" : transaction.from,
    to: transaction.to === wallet ? "My Account (" + transaction.to + ")" : transaction.to,
    amount: transaction.value / 1000000,
    time: new Date(transaction.timeStamp * 1000).toLocaleString('en-GB'),
    status: "Completed"
  }));
};

const encryptEntityKey = () => {
  const publicKeyString = `-----BEGIN RSA PUBLIC KEY-----\nMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA3EbLBu4nF9eNSlAfUyrs\n4TvNiDpOhYRlF/RC1mScz0BUGnqjaivNcwMGZOMXVzOYd2mAOYohaOjAlX1TIk/+\n/3RFBv/WXiAtt+L37eJemcv7smucnrM6hLVOHHaXjmp1PYmYAd1ukppxsn+0CmOG\nfIqYSJL+XjD0mcd4ytCk/3T4ovO2uJV0+UPKJkkZmK/zozqlHfi1lf+AlBlbCSH9\nUxb9eufBSfDD4+qJSQSm6i4xWwNUlk0crTCybLn2OFnFYxfRR3PrJQ8ZyYELPDIt\nVbqVKid6jZE1E27oG8z8osDmbj/2aA18mN7+/i+SZ/IKOsSqPEe1RYbfWu2R2Wl5\nrjL+v0VNibcBO7ylHU7TJQrinyXnZz3Zqw+iMBPN2SYNK97gKTPKHzlts5eiKd9a\nFBHj6U3Rs7QaWx679oyywqxv0uwTsqAqFeySc32xWIb5WkAwA2Z0Vq2dP5UbyCmw\ni2g21WE+8tpTTxIhBIqZjfNHjHftInGRlqrMn2kK11qIHcledUEdICFP8x7SLOWN\n34qaVezcZWjfWyVOnc9Vhl0vERXBL38k2oDy1xfzwD3Z0kSLgYjKFd0KxiUFuOYB\nRjwrHvuJOKCNZOFWTdFGCiVU6XHLePZOck/HrsYUqorOs73o4RiCA5BnuczGqMyE\nFfnLEFDDc7DAJ6U9PZYc6WMCAwEAAQ==\n-----END RSA PUBLIC KEY-----\n`
  const hexEncodedEntitySecret = "7646735e2f2ee8d6751b3da61e4d107f1185d61a82274622b87779b0a9b3c175"

  const forge = require('node-forge');
  const entitySecret = forge.util.hexToBytes(hexEncodedEntitySecret);
  // encrypt data by the public key
  const publicKey = forge.pki.publicKeyFromPem(publicKeyString);
  const encryptedData = publicKey.encrypt(entitySecret, "RSA-OAEP", {
    md: forge.md.sha256.create(),
    mgf1: {
      md: forge.md.sha256.create()
    }
  });
  const base64EncryptedData = forge.util.encode64(encryptedData);

  return base64EncryptedData;
}

module.exports = { postOptions, getOptions, formatTransactionList, encryptEntityKey };
