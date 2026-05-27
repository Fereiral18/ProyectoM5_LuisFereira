import { useState } from "react";
import {
	addDoc,
	collection,
	serverTimestamp,
} from "firebase/firestore";

import { db } from "../../../lib/firebase";
import { uploadImageToS3 } from "../../../services/upload.service";
import "./style.css"


type Category = "electronics" | "clothing" | "home" | "other";

export default function ProductFormPage() {
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState<Category>("other");
	const [stock, setStock] = useState("");
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [preview, setPreview] = useState("");
	const [loading, setLoading] = useState(false);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setImageFile(file);
		setPreview(URL.createObjectURL(file));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			setLoading(true);

			let imageUrl = "";

			if (imageFile) {
				imageUrl = await uploadImageToS3(imageFile);
			}

			await addDoc(collection(db, "products"), {
				name,
				price: Number(price),
				description,
				category,
				stock: Number(stock),
				imageUrl,
				createdAt: serverTimestamp(),
			});

			alert("Producto creado");

			setName("");
			setPrice("");
			setDescription("");
			setCategory("other");
			setStock("");
			setImageFile(null);
			setPreview("");
		} catch (error) {
			console.error(error);
			alert("Error creando producto");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="page">
			<div className="card">
				<h1 className="title">Crear Producto</h1>

				<form className="form" onSubmit={handleSubmit}>
					<input
						className="input"
						type="text"
						placeholder="Nombre"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>

					<input
						className="input"
						type="number"
						placeholder="Precio"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
					/>

					<textarea
						className="textarea"
						placeholder="Descripción"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>

					<select
						className="input"
						value={category}
						onChange={(e) =>
							setCategory(e.target.value as Category)
						}
					>
						<option value="electronics">Electrónica</option>
						<option value="clothing">Ropa</option>
						<option value="home">Hogar</option>
						<option value="other">Otro</option>
					</select>

					<input
						className="input"
						type="number"
						placeholder="Stock"
						value={stock}
						onChange={(e) => setStock(e.target.value)}
					/>

					<input
						className="file"
						type="file"
						accept="image/*"
						onChange={handleImageChange}
					/>

					{preview && (
						<div className="previewWrapper">
							<img src={preview} className="preview" />
						</div>
					)}

					<button className="button" type="submit" disabled={loading}>
						{loading ? "Guardando..." : "Crear Producto"}
					</button>
				</form>
			</div>
		</div>
	);
}