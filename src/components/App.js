import React, { useState, useEffect } from "react";
import Main from "./Main";
import web3 from "../web3";
import Navbar from "./Navbar";
import loadContract from "../decentagram";

const { create } = require("ipfs-http-client");
const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

export default function App() {
  const [isLoader, setIsLoader] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [decentagramContract, setDecentagramContract] = useState({}); 
  const [buffer, setBuffer] = useState("");
  const [posts, setPosts] = useState([]);
  const [description, setDescription] = useState("");

  async function loadDataBlockChain() {
    setIsLoader(true);
    const accounts = await web3.eth.getAccounts();
    setAccounts(accounts);
    const contract = await loadContract()
    setDecentagramContract(contract);

    const postCounts = await contract.methods.postCount().call();

    for(var i=1; i <= postCounts; i++){
        const post = await contract.methods.posts(i).call();
        setPosts( (prev) => [...prev, post]);
    } 
    setIsLoader(false);
  }

  useEffect(() => {
    loadDataBlockChain();
  }, []);

  useEffect( () => {
    setPosts(posts.sort( (a,b) => b.tipAmount - a.tipAmount))
  }, [posts])

  const captureFile = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);

    reader.onloadend = () => {
      setBuffer(Buffer(reader.result));
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting the form");
      console.log('buffer', buffer)
      console.log('accounts[0]', accounts[0])
      setIsLoader(true);
      // adding file to ipfs
      const result = await ipfs.add(buffer);
      console.log('result.path', result.path)
      decentagramContract.methods
        .createPost(description, result.path)
        .send({ from: accounts[0] })
        .on("transactionHash", (hash) => {
          setIsLoader(false);
        });
        
    } catch (error) {
      console.log(error);
    }
  };

  const handleTip = async(id) => {

    let amount = await web3.utils.toWei("0.1", "ether");
    setIsLoader(true);
    decentagramContract.methods
    .tipsToAuthor(id)
    .send({ from: accounts[0], value: amount })
    .on("transactionHash", (hash) => {
      setIsLoader(false);
    });
  }

  return (
    <> 
      <Navbar account={accounts[0]} />
      {!isLoader ? (
        <Main
          setDescription={setDescription}
          handleTip={handleTip}
          handleSubmit={handleSubmit}
          captureFile={captureFile}
          posts = {posts}
        />
      ) : (
        <h1 className="text-center">Cargando...</h1>
      )}
    </>
  );
}
