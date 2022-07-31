// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "../DynamicArray.sol";


struct CustomerMetaData{
    uint256 customerID;                         //Customer Id
    string email;                               //Customer email
    DynamicArray products;                      //Store all the product id that he has buyed
}
struct Transaction{
    uint256 productID;
    uint256 amount;
}
struct RetailerMetaData{
    uint256 balance;                            //Balance of 
    uint256 retailerID;                         //Id of the retailer
    string email;                               //Email of the retailer               
    DynamicArray products;                      //List of all the product introduced by the retailer
}

contract FlipkartMarketPlace{    
    uint256 private flipkartRate;                               //Rate that flipkart charges it's retailers for every product in percentage%
    uint256 private flipkartBalance;                    //Balance of flipkart
    uint256 private retailerIDs;                        //Generation of ID for each retailer
    uint256 private customerIDs;                        //Generation of ID for each customer
    DynamicArray private marketProducts;                 //Array to keep track of all the products that are in market
    address flipkartAddress;
    constructor(){
        flipkartAddress = msg.sender;
        flipkartBalance = 0;
        retailerIDs = 0;
        customerIDs = 0;
        flipkartRate = 5;
        marketProducts = new DynamicArray();
    }

    //Map to register all the retailers with their bank balance and email
    //Map to register all the customers with their email
    mapping(string => RetailerMetaData) private retailers;
    mapping(string => CustomerMetaData) private customers;
    mapping(string => Transaction[]) private transactions;

    //Function modifier to check the request is from owner only
    modifier onlyOwner {
      require(msg.sender == flipkartAddress);
      _;
    }


    //Functions to register retailer
    function registerRetailer(string memory email) public{
        retailerIDs++;
        retailers[email] = RetailerMetaData(0,retailerIDs,email,new DynamicArray());
    }
    
    //Function to register customer
    function registerCustomer(string memory email) public{
        customerIDs++;
        customers[email] = CustomerMetaData(customerIDs,email,new DynamicArray());
    }

     //Function to check whether a customer exists with this email
    function isValidCustomer(string memory email) public view returns(bool){
        if(customers[email].customerID > 0){
            return true;
        }
        else{
            return false;
        }
    }

    //Function to check whther a retailer exists with this email
    function isValidRetailer(string memory email) public view returns(bool){
        if(retailers[email].retailerID > 0){
            return true;
        }
        else{
            return false;
        }
    }

    //Function to return id of a particular customer
    function getCustomerID(string memory email) public view returns(uint256){
        require(isValidCustomer(email));

        return customers[email].customerID;
    }

    //Function to return id of a particular retailer
    function getRetailerID(string memory email) public view returns(uint256){
        require(isValidRetailer(email));

        return retailers[email].retailerID;
    }

    //Function to return retailer information using email
    function getRetailerMetaData(string memory email) public view returns(RetailerMetaData memory){
        require(isValidRetailer(email));

        return retailers[email];
    }

    //Function to return customer information using email
    function getCustomerMetaData(string memory email) public view returns(CustomerMetaData memory){
        require(isValidRetailer(email));

        return customers[email];
    }

    //Function to get all the product ID's of the marget
    function getMarketProducts() public view returns (uint256[] memory){
        return marketProducts.getData();
    }

    //Function to get the length of the marketProduct list
    function marketProductLength() public view returns (uint256) {
        return marketProducts.getLength();
    }


    //Function to add product to the retailer's product list
    function addProductToRetailer(uint256 productID,string memory retailerEmail) public {
        require(msg.sender == flipkartAddress && isValidRetailer(retailerEmail) && !marketProducts.find(productID));
        
        //Fetch the retailer 
        RetailerMetaData storage retailer = retailers[retailerEmail];

        //Add the product to the retailer and to the flipkart market
        retailer.products.addData(productID);

        addProductToMarket(productID,retailerEmail);
    }

    //Function to remove product from retailer
    function removeProductFromRetailer(uint256 productID, string memory retailerEmail) private{
        require(retailers[retailerEmail].products.find(productID) && marketProducts.find(productID));

        //Delete from the retailer product list
        retailers[retailerEmail].products.deleteAtIndex(retailers[retailerEmail].products.findIndex(productID));

        //Delete from the market place
        marketProducts.deleteAtIndex(marketProducts.findIndex(productID));
    }

    //Function to add product to the market
    function addProductToMarket(uint256 productID,string memory retailerEmail) private {
        require(isValidRetailer(retailerEmail) && retailers[retailerEmail].products.find(productID));

        //Add to the market place
        marketProducts.addData(productID);
    }
    //Remove product from market place
    function removeProductFromMarket(uint256 productID) private{
        require(marketProducts.find(productID));


        //Delete the product from the list
        marketProducts.deleteAtIndex(marketProducts.findIndex(productID));
    }
    //Function to buy a product by a customer
    function buyProduct(uint256 productID,string memory retailerEmail, string memory customerEmail,uint256 moneySent, uint256 productPrice) public onlyOwner{
        //Validation before buying a product
        require(msg.sender == flipkartAddress && 
                isValidRetailer(retailerEmail) && 
                isValidCustomer(customerEmail) &&
                retailers[retailerEmail].products.find(productID) &&
                marketProducts.find(productID)
                );
    
        RetailerMetaData storage retailer = retailers[retailerEmail];
        CustomerMetaData storage customer = customers[customerEmail];


        //Delete from retailer and from the marketplace
        removeProductFromRetailer(productID,retailerEmail);

        //Add the amount to flipkart and retailer
        uint256 flipkartAmount =  (productPrice * flipkartRate) / 100;
        flipkartBalance += flipkartAmount;

        retailer.balance+=(moneySent - flipkartAmount);

        //Add the transaction to the retailer's array
        transactions[retailerEmail].push(Transaction(productID,moneySent - flipkartAmount));

        //Add the product into the customer's product list
        customer.products.addData(productID);

    }

    //Function to transfer one product to another product
    function transferProduct(string memory fromEmail, string memory toEmail,uint256 productID) public onlyOwner{
        //Check if fromEmail is valid, toEmail is valid, productID is there in the fromEmail customer's ownership
        require(isValidCustomer(fromEmail) && isValidCustomer(toEmail) && customers[fromEmail].products.find(productID));
        
        CustomerMetaData storage seller = customers[fromEmail] ;
        CustomerMetaData storage buyer = customers[toEmail];

        //Delete from the owner's product list
        seller.products.deleteAtIndex(seller.products.findIndex(productID));

        //Add to the buyer's product list
        buyer.products.addData(productID);
    }


    //Function to return the products of a customer
    function getCustomerProduct(string memory email) public view returns(uint256[] memory){
        require(isValidCustomer(email));

        //Fetch data from the map
        return customers[email].products.getData();
    }

    //Function to get retailer productList
    function getRetailerProduct(string memory email) public view returns(uint256[] memory){
        require(isValidRetailer(email));

        //Fetch data from the map
        return retailers[email].products.getData();
    }

    //Function to get retailer transaction list
    function getRetailerTransactions(string memory email) public view returns(Transaction[] memory){
        require(isValidRetailer(email));

        //Fetch from the map
        return transactions[email];
    }
    //Function to set the rate of flipkart
    function setRate(uint256 newRate) public{
        //Check if account is verified to change the rate
        require(msg.sender == flipkartAddress);

        //Change the rate
        flipkartRate = newRate;
    }

    //Function to get the rate of flipkat
    function getRate() public view returns(uint256){
        return flipkartRate;
    }

    //Function to get the retailer bank balance
    function getRetailerBankBalance(string memory retailerEmail) public view returns(uint256){
        require(isValidRetailer(retailerEmail));

        //Fetch the retailer from email
        RetailerMetaData storage retailer = retailers[retailerEmail];
        
        //Return the retailer balance
        return retailer.balance;
    }

}