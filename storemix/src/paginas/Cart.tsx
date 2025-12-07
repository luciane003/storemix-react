import { useState } from "react";

interface CartItem {
    image: string;
    name: string;
    price: string;
    quantity: number;
}

interface CartProps {
    cart: CartItem[];
    updateQuantity: (nameProduct: string, newQuantity: number) => void;
    handleRemoveFromCart: (name: string) => void;
}

export default function Cart({ cart, updateQuantity, handleRemoveFromCart }: CartProps) {

    const [showPurchaseMsg, setshowPurchaseMsg] = useState(false);
    const [emptyCartMsg, setEmptyCartMsg] = useState(false);

    const totalAmount = cart.reduce((total, item) => {
        const numericPrice = Number(item.price.replace("R$", "").replace(",", "."));
        return total + numericPrice * item.quantity;
    }, 0);

    const handlePurchase = () => {
        if (cart.length === 0) {
            setEmptyCartMsg(true);
            setTimeout(() =>
                setEmptyCartMsg(false), 2000);
            return;
        }

        setshowPurchaseMsg(true);
        setTimeout(() => setshowPurchaseMsg(false), 2000);
    };

    return (
        <main className="select-none">
            {cart.length > 0 && (
                <div className="bg-card p-4 m-2 rounded-lg h-min-screen">
                    <div className="flex flex-col gap-6 mb-40">
                        {cart.map((item) => (
                            <div key={item.name} className="flex items-center gap-4 border-b border-textoSuave/20 pb-4">
                                <div className="bg-white rounded-lg h-27 flex items-center justify-center shadow-sm">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="h-20 w-20 object-contain"
                                    />
                                </div>

                                <div className="flex flex-col flex-1 text-texto">
                                    <p className="font-medium">
                                        {item.name}
                                    </p>

                                    <p className="text-purple-700 font-semibold">
                                        Valor: {item.price}
                                    </p>

                                    <div className="flex items-center mt-2">
                                        <button onClick={() => item.quantity > 1 && updateQuantity(item.name, item.quantity - 1)}
                                                className="bg-primario text-white px-3 py-1 rounded hover:bg-primarioHover"> 
                                                -
                                        </button>

                                        <span className="px-3">
                                            {item.quantity}
                                        </span>

                                        <button onClick={() => updateQuantity(item.name, item.quantity + 1)}
                                                className="bg-primario text-white px-3 py-1 rounded hover:bg-primarioHover">
                                            +
                                        </button>

                                        <button onClick={() => handleRemoveFromCart(item.name)}
                                                className="text-red-500 text-sm mt-2 hover:underline pl-5">
                                            Remover
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="fixed bottom-3 right-3 font-semibold text-lg w-[23rem] max-w-[90vw] p-6 rounded-lg bg-card shadow-xl border border-black/5 z-50">
                <p className="text-texto">
                    Total de itens: {cart.length}
                </p>
                <p>
                    Valor total:{" "}
                    <span className="text-primarioHover font-extrabold">
                        {totalAmount.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        })}
                    </span>
                </p>

                <button
                    onClick={handlePurchase}
                    className="bg-primarioHover mt-5 w-[20rem] max-w-[75vw] h-[3rem] rounded-[5px] p-6 flex justify-center items-center text-white hover:brightness-90 transition">
                    Comprar
                </button>
            </div>

            {showPurchaseMsg && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primario text-white px-6 py-3 rounded shadow-lg animate-bounce text-center">
                    🎉 Compra finalizada 🎉
                </div>
            )}

            {emptyCartMsg && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-secundario text-white px-6 py-3 rounded shadow-lg animate-bounce text-center">
                    É necessário incluir itens para continuar com a compra!
                </div>
            )}
        </main>
    )
}