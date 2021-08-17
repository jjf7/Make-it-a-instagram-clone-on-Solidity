import web3 from "./web3"
import Decentragram from "./abis/Decentagram.json"

export default async function loadContract(){
    const networkId = await web3.eth.net.getId();
    const networkData = Decentragram.networks[networkId];
    const Decentagram = new web3.eth.Contract(Decentragram.abi, networkData.address)
    return Decentagram;
}