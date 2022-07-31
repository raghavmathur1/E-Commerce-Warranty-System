// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

/*
    Feature set
        1. Issue a warranty against a product
            1.1 Warranty should contain the warrantyID, productID, name of the user, email of the user, issuedDate, duration, expiry date.
        2. Transfer a warranty to a user against a product
        3. Validate a warranty for a particular user and for a particular product we keep a hash of the productID + the productEmail and check it
        4. Get warraty against the warranty ID
        5. For a particular product ID we can show the issued warranty
        6. Check if warranty is expired or not
        7. Get a warranty against a product ID
*/
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol";

//Structure of the warranty card
struct WarrantyMetaData{
    uint256 warrantyID;
    uint256 productID;
    uint256 duration;
    string userEmail;
    uint256 startTimeStamp;
}
contract ProductWarranty is ERC721{
    uint256 warrantyIDs;                                                   //Unique warranty ID
    address private flipkartAddress;                                       //Owner of the product contract 
    mapping(uint256 => WarrantyMetaData) warrantyMetaData;                 //Map of warranty id to warranty meta data
    mapping(uint256 => uint256) warrantyIDForProductID;                    //Map of warrantyID from product ID        

    constructor() ERC721("Warranty","WNFT"){
        warrantyIDs = 0;
        flipkartAddress = msg.sender;
    }

     //Function modifier to check the request is from owner only
    modifier onlyOwner {
      require(msg.sender == flipkartAddress);
      _;
    }

    //Function to introduce a warranty against a product ID
    function issueWarranty(uint256 productID,string memory userEmail,uint256 durationDays) public onlyOwner{
        //There should be no warranty issued!
        require(warrantyIDForProductID[productID] == 0);

        warrantyIDs++;

        //Introduce the new warranty
        _mint(msg.sender,warrantyIDs);
        
        //Set the metadata URL
        warrantyMetaData[warrantyIDs] = WarrantyMetaData(warrantyIDs,productID,durationDays,userEmail,block.timestamp);

        //Set the productID against warrantyID;
        warrantyIDForProductID[productID] = warrantyIDs;

    }


    //Function to get a warranty from it's warranty ID
    function getWarranty(uint256 warrantyID) public view returns(WarrantyMetaData memory){
        //Check if the warranty exists or not
        require(isValidWarrantyID(warrantyID));
    
        //Returns the warranty issued against that id;
        return warrantyMetaData[warrantyID];
    }


    //Function to check if warranty is expired or not
    function isExpired(uint256 warrantyID) public view returns(bool){
        //Validate the warrantyID
        require(isValidWarrantyID(warrantyID));

        //Fetch the current warranty data 
        WarrantyMetaData storage warranty = warrantyMetaData[warrantyID];
        
        //Validate the data
         if (warranty.startTimeStamp + warranty.duration/*In days*/ * 24 * 60 * 60 >= block.timestamp){
                return false;
            }
            else{
                return true;
            }   
    }

    //Function to get warranty against product ID
    function getWarrantyAgainstProductID(uint256 productID) public view returns(WarrantyMetaData memory){
        //Check if the warranty is present for this product ID
        require(warrantyIDForProductID[productID] > 0);

        //Returns the warranty meta data
        return warrantyMetaData[warrantyIDForProductID[productID]];
    }

    //Function to change the warranty of the owner
    function changeWarrantyOwner(uint256 warrantyID,string memory email,string memory newEmail) public onlyOwner{
        require(isValidWarrantyID(warrantyIDs));

        //Fetch the warranty against warrantyID
        WarrantyMetaData storage warranty = warrantyMetaData[warrantyID];


        //Check for the user email that is changing it
        require(stringsEquals(warranty.userEmail, email));

        //Change the email
        warranty.userEmail = newEmail;

    }
    //Helper functions
    //Function to check if a product with the tokenID is present of not
    function isValidWarrantyID(uint256 tokenID) public view returns (bool) {
        return _exists(tokenID);
    }

    //Function to check if two strings are equal or not
    function stringsEquals(string memory s1, string memory s2) private pure returns (bool) {
        bytes memory b1 = bytes(s1);
        bytes memory b2 = bytes(s2);
        uint256 l1 = b1.length;
        if (l1 != b2.length) return false;
        for (uint256 i=0; i<l1; i++) {
            if (b1[i] != b2[i]) return false;
        }
        return true;
    }
}