import AddBtn from "@/Components/AddBtn";

export default async function ProductsPage() {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">All Products</h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {data.products.map((p) => (
                    <div key={p.id} className="border p-4 rounded shadow">
                        <img src={p.thumbnail} className="h-32 w-full object-cover" />
                        <h3>{p.title}</h3>
                        <p>₹{p.price}</p>

                        {/* ⭐ Add to Cart Button */}
                        <AddBtn product={p} />
                    </div>
                ))}
            </div>
        </div>
    );
}
