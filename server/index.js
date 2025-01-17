const express = require('express');
const MerkleTree = require('../utils/MerkleTree');
const niceList = require('../utils/niceList');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const merkleTree = new MerkleTree(niceList);
const root = merkleTree.getRoot();
const MERKLE_ROOT = root;

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const {proof,name} = req.body;
  
  // TODO: prove that a name is in the list 
  let check=verifyProof(proof, name, MERKLE_ROOT);
  const isInTheList = check;
  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
