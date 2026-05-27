export const uploadImageToS3 = async (file: File) => {
	// 1. Pedimos signed URL al backend (Vercel API)
	const response = await fetch("/api/presign.ts", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			filename: file.name,
			contentType: file.type,
		}),
	});

	if (!response.ok) {
		throw new Error("Error generando URL firmada");
	}

	const { url, publicUrl } = await response.json();

	// 2. Subimos imagen directo a S3
	const uploadResponse = await fetch(url, {
		method: "PUT",
		headers: {
			"Content-Type": file.type,
		},
		body: file,
	});

	if (!uploadResponse.ok) {
		throw new Error("Error subiendo imagen a S3");
	}

	// 3. Retornamos URL pública
	return publicUrl;
};