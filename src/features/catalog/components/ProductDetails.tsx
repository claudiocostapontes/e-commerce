interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  stock: number;
}

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Product Image */}
      <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Sem imagem
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        
        <p className="text-2xl font-semibold text-gray-900 mb-4">
          R$ {product.price.toFixed(2)}
        </p>

        <p className="text-gray-600 mb-6">{product.description}</p>

        <div className="mb-6">
          <span className={`text-sm font-medium ${
            product.stock > 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {product.stock > 0 ? `Em estoque: ${product.stock} unidades` : 'Fora de estoque'}
          </span>
        </div>

        <button
          disabled={product.stock === 0}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {product.stock > 0 ? 'Adicionar ao Carrinho' : 'Indisponível'}
        </button>
      </div>
    </div>
  );
}
