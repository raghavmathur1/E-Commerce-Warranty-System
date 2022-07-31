// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol";

struct ProductMetaData{
    string productURL;      //Product metadata url uploaded in ipfs
    string retailerEmail;      //Flipkart account email of the retailer/user
}


/*
    Feature set of this contract
        1.To able to introduce a new product nft 
        2.To able to fetch the product details
        3.To able to modify the product details
        4.To able to get the retailer address
*/
contract ProductNFT is ERC721 {


    uint256 private _productIDs = 0;                         //Auto generating product IDs
    mapping(uint256 => ProductMetaData) productMetaData;    //Map of id to productMetaData
    mapping(string => uint256) productURLToID;              //Map to avoid concurrancy issues
    address private flipkartAddress;                        //Owner of the product contract


    constructor() ERC721("Products","PNFT") {

        flipkartAddress = msg.sender;
    }

    //Function modifier to check the request is from owner only
    modifier onlyOwner {
      require(msg.sender == flipkartAddress);
      _;
    }

    
    function getProductID(string memory productURL) public view onlyOwner returns(uint256){
        require(productURLToID[productURL] > 0);
        return productURLToID[productURL];
    }

    //Function to introduce a new product to the market
    /*
        We should ensure that the email here already exists as a retailer 
        Nobody other address except the flipkart address can introduce a product
    */

    function introduceProduct(string memory productURL,string memory email) public onlyOwner{

            _productIDs = _productIDs + 1; 
            uint256 newProductID = _productIDs;
            
            //Introduce the digital product 
            _mint(msg.sender,newProductID);

            //Set the metaData url
            productMetaData[newProductID] = ProductMetaData(productURL,email);

            //Set the product id against url
            productURLToID[productURL] = _productIDs;
    }
    //Function to get the email address of the product owner
    function getProductRetailerEmail(uint256 tokenID) public view returns(string memory){
        //Validate the tokenID
        require(isValidProductID(tokenID));
        
        return productMetaData[tokenID].retailerEmail;
    }

    //Function to get the data of the product 
    function getProductDetailsURL(uint256 tokenID) public view returns(ProductMetaData memory){
        //Validate the tokenID
        require(isValidProductID(tokenID));

        return productMetaData[tokenID];
    }

    //Function to update the data of the product
    function updateProductDetails(uint256 tokenID,string memory newProductURL,string memory email) public onlyOwner{


        //Validate the tokenID
        require(isValidProductID(tokenID));

        ProductMetaData storage currProduct = productMetaData[tokenID];
        
        //Verify the ownership of the product so that unauthorized persons cannot modify it
        require(stringsEquals(currProduct.retailerEmail, email) &&  msg.sender == flipkartAddress);
        
        //Update the product detail
        currProduct.productURL = newProductURL;
    }
    

    //Helper functions
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

    //Function to check if a product with the tokenID is present of not
    function isValidProductID(uint256 tokenID) public view returns (bool) {
        return _exists(tokenID);
    }
}