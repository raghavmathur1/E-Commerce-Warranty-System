// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract DynamicArray{
	
    // Declaring state variable
    uint256[] private arr;
        
    // Function to add data
    // in dynamic array
    function addData(uint256 num) public{
        arr.push(num);
    }
        
    // Function to get data of
    // dynamic array
    function getData() public view returns(uint256[] memory){
        return arr;
    }
        
    // Function to return length
    // of dynamic array
    function getLength() public view returns (uint){
        return arr.length;
    }

    //Function to return item at index
    function getAtIndex(uint256 index) public view returns (uint256){
        require(index<0||index >= arr.length);
        return arr[index];
    }

    //Functions to delete the index of an array by maintaing an order
    function deleteAtIndex(uint256 index) public{
        if (index < 0 || index >= arr.length) return;

        for (uint i = index; i<arr.length-1; i++){
            arr[i] = arr[i+1];
        }
        arr.pop();
    }

    //Function to find the index of a particular element
    //If not found then returns the array size
    function findIndex(uint256 element) public view returns(uint256) {
        for(uint256 i = 0;i < arr.length; i++){
            if(arr[i] == element) return i;
        }
        
        //Return the arr.size
        return arr.length;
    }
    //Function to find if the element is present or not 
    function find(uint256 element) public view returns(bool){
        for(uint256 i = 0;i < arr.length; i++){
            if(arr[i] == element) return true;
        }
        
        return false;
    }
}
