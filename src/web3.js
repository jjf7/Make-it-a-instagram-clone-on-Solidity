import Web3 from 'web3';

let web3;
if(typeof window.ethereum !== "undefined"){
    web3 = new Web3(window.ethereum);
    window.ethereum.enable();
}else if(window.web3){
    web3 = new Web3(window.web3.currentProvider);
}else{
    window.alert("Please install metamask");
}

export default web3;