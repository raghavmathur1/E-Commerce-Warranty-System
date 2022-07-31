exports.MARKET_PLACE_ADDRESS = "0x0f2474Be44310214918Ac4811A4da39d480cd963";
exports.MARKET_PLACE_ABI = [
	{
		inputs: [],
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "productID",
				type: "uint256",
			},
			{
				internalType: "string",
				name: "retailerEmail",
				type: "string",
			},
		],
		name: "addProductToRetailer",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "productID",
				type: "uint256",
			},
			{
				internalType: "string",
				name: "retailerEmail",
				type: "string",
			},
			{
				internalType: "string",
				name: "customerEmail",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "moneySent",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "productPrice",
				type: "uint256",
			},
		],
		name: "buyProduct",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "email",
				type: "string",
			},
		],
		name: "getCustomerID",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "email",
				type: "string",
			},
		],
		name: "getCustomerMetaData",
		outputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "customerID",
						type: "uint256",
					},
					{
						internalType: "string",
						name: "email",
						type: "string",
					},
					{
						internalType: "contract DynamicArray",
						name: "products",
						type: "address",
					},
				],
				internalType: "struct CustomerMetaData",
				name: "",
				type: "tuple",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "email",
				type: "string",
			},
		],
		name: "getCustomerProduct",
		outputs: [
			{
				internalType: "uint256[]",
				name: "",
				type: "uint256[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "getMarketProducts",
		outputs: [
			{
				internalType: "uint256[]",
				name: "",
				type: "uint256[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "getRate",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "retailerEmail",
				type: "string",
			},
		],
		name: "getRetailerBankBalance",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "email",
				type: "string",
			},
		],
		name: "getRetailerID",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "email",
				type: "string",
			},
		],
		name: "getRetailerMetaData",
		outputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "balance",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "retailerID",
						type: "uint256",
					},
					{
						internalType: "string",
						name: "email",
						type: "string",
					},
					{
						internalType: "contract DynamicArray",
						name: "products",
						type: "address",
					},
				],
				internalType: "struct RetailerMetaData",
				name: "",
				type: "tuple",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "email",
				type: "string",
			},
		],
		name: "getRetailerProduct",
		outputs: [
			{
				internalType: "uint256[]",
				name: "",
				type: "uint256[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "email",
				type: "string",
			},
		],
		name: "getRetailerTransactions",
		outputs: [
			{
				components: [
					{
						internalType: "uint256",
						name: "productID",
						type: "uint256",
					},
					{
						internalType: "uint256",
						name: "amount",
						type: "uint256",
					},
				],
				internalType: "struct Transaction[]",
				name: "",
				type: "tuple[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "email",
				type: "string",
			},
		],
		name: "isValidCustomer",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "email",
				type: "string",
			},
		],
		name: "isValidRetailer",
		outputs: [
			{
				internalType: "bool",
				name: "",
				type: "bool",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "marketProductLength",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "email",
				type: "string",
			},
		],
		name: "registerCustomer",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "email",
				type: "string",
			},
		],
		name: "registerRetailer",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "newRate",
				type: "uint256",
			},
		],
		name: "setRate",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "fromEmail",
				type: "string",
			},
			{
				internalType: "string",
				name: "toEmail",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "productID",
				type: "uint256",
			},
		],
		name: "transferProduct",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
];
