import { useState } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

type CartProduct = Product & {
  quantity: number;
};

export default function App() {
  const [storeProducts] = useState<Product[]>([
    {
      id: 2,
      name: "Cocaine",
      description: "High Quality Cocaine 90% purity.",
      price: 45_00,
    },
    {
      id: 3,
      name: "Heroin",
      description:
        "Uncut, dark, real pure Heroin also good for IV use (with citric acid).",
      price: 20_00,
    },
    {
      id: 1,
      name: "MDMA",
      description: "High Quality MDMA 84% purity.",
      price: 100_00,
    },
    {
      id: 1,
      name: "LSD",
      description: "50x 250ug LSD - Bicycle Go.",
      price: 100_00,
    },
  ]);
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [cartIsOpen, setCartIsOpen] = useState<boolean>(false);
  const [cartIsClosing, setCartIsClosing] = useState<boolean>(true);

  const handleClick = () => {
    if (cartIsOpen) {
      setCartIsClosing(true);
      setTimeout(() => {
        setCartIsOpen(false);
      }, 200);
    } else {
      setCartIsOpen(true);
      setCartIsClosing(false);
    }
  };

  const handleAdd = (product: Product, quantity: number) => {
    setCartProducts((st) => {
      const storedProduct = st.findIndex((el) => el.id === product.id);
      if (storedProduct === -1) {
        return [...st, { ...product, quantity }];
      }
      st[storedProduct].quantity += quantity;
      return st;
    });
  };

  const handleSubmit = (
    evt: React.FormEvent<HTMLFormElement> & {
      target: {
        elements: { id: { value: string }; quantity: { value: string } };
      };
    }
  ) => {
    evt.preventDefault();
    if (evt.target.elements["quantity"].value) {
      const productId = evt.target.elements["id"].value;
      const quantity = +evt.target.elements["quantity"].value;
      const product = storeProducts.find((p) => p.id === +productId)!;
      handleAdd(product, quantity);
      evt.target.elements["quantity"].value = "1";
    }
  };

  return (
    <div className="bg-slate-800 min-h-screen bg-gradient-to-br from-rose-900/20 to-blue-900/10 flex flex-col font-thin font-mono">
      <header className="shadow-md flex items-center justify-between px-4 md:px-8 lg:px-20 text-white/90 bg-slate-400/10 py-3">
        <h1
          role="brand-header"
          className="bg-clip-text text-transparent bg-gradient-to-br from-red-500 to-indigo-500 text-2xl md:text-3xl font-bold tracking-wide"
        >
          Drugs 4 You
        </h1>
        <button
          role="toggle-cart"
          onClick={handleClick}
          className="flex items-center gap-3 bg-indigo-500 text-sm md:text-base md:p-2 rounded-full hover:bg-indigo-600 transition-all duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2 w-[22px] h-[22px]"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
          </svg>{" "}
          Your Cart{" "}
          <span className="bg-slate-800/60 p-1 rounded-full px-3">
            {cartProducts.length}
          </span>
        </button>
      </header>
      <main className="overflow-hidden flex-1 p-8 flex flex-col gap-8 text-white/75 relative">
        {cartIsOpen && (
          <>
            <div
              className={`bg-slate-800 drop-shadow absolute top-0 right-0 h-full z-20 flex flex-col ${
                cartIsClosing ? "animation-slide-out" : "animation-slide-in"
              }`}
            >
              <h1 className="text-lg font-bold border-b p-2 md:p-4 text-center border-indigo-500">
                Your Cart
              </h1>
              {cartProducts.map((product) => (
                <div
                  className="flex flex-col border-b border-white/20 py-4"
                  key={`${product.id}-${product.name}`}
                >
                  <p className="text-center">{product.name}</p>
                  <div className="flex justify-around">
                    <p className="">${product.price / 100}</p>
                    <p className="">x{product.quantity}</p>
                  </div>
                </div>
              ))}
              <h2 className="italic text-center text-indigo-400 font-bold my-3 px-4 md:px-8">
                Total: $
                {cartProducts.reduce(
                  (acc, product) => product.price * product.quantity + acc,
                  0
                ) / 100}
              </h2>
            </div>
            <div
              onClick={handleClick}
              className={`top-0 left-0 z-10 backdrop-blur-[1px] w-full h-full bg-black/30 absolute ${
                cartIsClosing ? "animation-fade-out" : "animation-fade-in"
              }`}
            />
          </>
        )}
        <section className="bg-slate-700/60 p-4 px-8 rounded shadow text-center">
          <h2 className="text-2xl mb-4">All the Drugs 4 You</h2>
          <p className="text-indigo-400 mb-4">
            High quality drugs combined with an extremely discreet and fast
            shipping.
          </p>
          <p>
            We have been active during the Agora, Evolution, Silkroad 3 era,
            then continued through Alphabay and Nucleus, and even the late Dream
            Market and also Wallstreet, with the same successful concept
          </p>
        </section>
        <section className="p-4 bg-slate-700/60 shadow rounded flex flex-col gap-4">
          {storeProducts.map((product) => (
            <div
              className="flex justify-between items-center border-b border-white/20 py-4"
              key={`${product.id}-${product.description.charAt(0)}`}
            >
              <div className="flex flex-col">
                <p className="font-bold text-rose-400">{product.name}</p>
                <p className="italic">{product.description}</p>
                <p className="font-bold text-indigo-400">
                  ${product.price / 100}
                </p>
              </div>
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex items-center gap-2">
                  <label htmlFor={`amount-${product.id}`}>Amount</label>
                  <input type="hidden" value={product.id} name="id" />
                  <input
                    name="quantity"
                    id={`amount-${product.id}`}
                    type="number"
                    step={1}
                    min={1}
                    className="rounded w-12 p-1 text-slate-800"
                  />
                </div>
                <button className="rounded-full bg-indigo-500 p-1 hover:bg-indigo-600 transition-all duration-200">
                  + Add
                </button>
              </form>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
