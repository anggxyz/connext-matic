## Indra <> Mumbai 
Connext integration with Matic's Mumbai testnet

Node hosted at: `https://indra-mumbai.matic.today`

### Setup config

`config.json` in `./`

```json
{
  "alice": "PRIVATE_KEY",
  "parentChain": "https://goerli.infura.io/v3/9b2d88cc1db243a1acf9819af5f4302d",
  "parentChainId": 5,
  "childChain": "https://rpc-mumbai.matic.today",
  "amountInWei": "1000"
}

```

### Instantiating a Channel

run:
```bash
$ node test
```
1. Creates 4 channels
    for Alice on Mumbai and Goerli; for Bob on Mumbai and Goerli
2. Deposits amount specified in config from Alice on to her channel on Mumbai
3. Withdraws from Alice's channel on Goerli


### Notes

1. Channel = (user address + network)
2. 1:1 mapping exists between key and channel => a single user cannot have two channels on the same node with different networks
