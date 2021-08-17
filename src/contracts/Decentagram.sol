pragma solidity >=0.8.6 <0.9.0;
import "./safemath.sol";

contract Decentagram {

using SafeMath for uint;

string public name = "Decentagram";

struct Post {
    uint id;
    string description;
    string imgHash;
    uint tipAmount;
    address author;
}
uint public postCount;
mapping(uint => Post) public posts;

event postCreated(uint indexed id, string _description, string imgHash, uint tip, address indexed author);

event tipGivenToAuthor(uint indexed id, uint tip, uint tipAmount);

function createPost(string memory _description, string memory _imgHash) public {
    require(bytes(_description).length > 0);
    require(bytes(_imgHash).length > 0);
    require(msg.sender != address(0));
    postCount = postCount.add(1);
    posts[postCount] = Post(postCount, _description, _imgHash, 0, msg.sender);
    emit postCreated(postCount, _description, _imgHash, 0, msg.sender);
}

function tipsToAuthor(uint _id) public payable {
    require(_id > 0 && _id <= postCount);
    require(msg.value >= 0.01 ether);
    Post storage post = posts[_id];
    payable(post.author).transfer(msg.value);
    post.tipAmount = post.tipAmount.add(msg.value);
    emit tipGivenToAuthor(_id, msg.value, post.tipAmount);
}


}