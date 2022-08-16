import { Web3Storage, File } from "web3.storage";
import { API_TOKEN } from "./config";

const makeStorageClient = () => {
	return new Web3Storage({ token: API_TOKEN });
};

const getSymbolFromName = (name: string): string => {
	return name
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase())
		.join("");
};

const makeFileFromJSON = (
	name: string,
	description: string,
	image: string,
	address: string
): File => {
	const data = {
		name,
		symbol: getSymbolFromName(name),
		description,
		properties: {
			category: "image",
			creators: [
				{
					address,
					share: 100,
				},
			],
			files: [
				{
					uri: image,
					type: "image/png",
				},
			],
		},
		image,
	};

	const buffer = Buffer.from(JSON.stringify(data));

	return new File([buffer], `metadata-${data["symbol"]}-${address}.json`);
};


export const storeFile = (name: String, desc: String, image: String, address: String): String => {
	const file = makeFileFromJSON(name, desc, image, address);

	const client = makeStorageClient();
	const cid = await client.put([file]);
	console.log("stored files with cid: ", cid);

	return cid;
};