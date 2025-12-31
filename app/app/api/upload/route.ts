


import { NextRequest, NextResponse } from "next/server";
import { BlobServiceClient } from "@azure/storage-blob"

export async function POST(req: NextRequest) {
    try {

        const { imageBase64 } = await req.json();

        if (!imageBase64) {
            return NextResponse.json({ error: "No image provided" }, { status: 400 });
        }

        const blobServiceClient = BlobServiceClient.fromConnectionString(
            process.env.AZURE_STORAGE_CONNECTION_STRING!
        );

        const containerName = "monument-images";
        const containerClient = blobServiceClient.getContainerClient(containerName);

        const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
        const imageBuffer = Buffer.from(base64Data, "base64");

        const blobName = `image-${Date.now()}.jpg`

        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        await blockBlobClient.uploadData(imageBuffer);

        const imageUrl = `https://monumentimages.blob.core.windows.net/${containerName}/${blobName}`;

        return NextResponse.json({ message: "Uploaded Sucessfully", url: imageUrl }, { status: 200 })


    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "upload failed" }, { status: 500 })
    }



}