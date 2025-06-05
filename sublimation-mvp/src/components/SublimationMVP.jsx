import React, { useContext, useRef, useState } from 'react';
import {
  ShoppingCart,
  User,
  Package,
  Upload,
  Palette,
  CreditCard,
  CheckCircle,
  Download,
  Edit3,
  Trash2,
  Plus,
  DollarSign,
  Settings,
} from 'lucide-react';
import { AppContext } from '../context/AppContext';

const SublimationMVP = () => {
  const {
    user,
    setUser,
    cart,
    setCart,
    orders,
    setOrders,
    products,
  } = useContext(AppContext);

  const [currentStep, setCurrentStep] = useState('login');

  // Designer states
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [designElements, setDesignElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [textInput, setTextInput] = useState('');
  const [textColor, setTextColor] = useState('#000000');
  const [textFont, setTextFont] = useState('Arial');
  const [adminView, setAdminView] = useState('orders');

  const fileInputRef = useRef(null);

  const handleLogin = (email, password) => {
    if (email && password) {
      const newUser = {
        id: 1,
        email,
        name: email.split('@')[0],
        isAdmin: email.includes('admin'),
      };
      setUser(newUser);
      setCurrentStep(email.includes('admin') ? 'admin' : 'products');
      return true;
    }
    return false;
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setCurrentStep('customize');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Por favor selecciona un archivo de imagen válido');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen debe ser menor a 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        const newElement = {
          id: Date.now(),
          type: 'image',
          src: ev.target.result,
          x: 50,
          y: 50,
          width: 200,
          height: 200,
          rotation: 0,
        };
        setDesignElements((prev) => [...prev, newElement]);
        setSelectedElement(newElement);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddText = () => {
    if (textInput.trim()) {
      const newElement = {
        id: Date.now(),
        type: 'text',
        content: textInput,
        x: 100,
        y: 100,
        color: textColor,
        font: textFont,
        size: 24,
      };
      setDesignElements((prev) => [...prev, newElement]);
      setSelectedElement(newElement);
      setTextInput('');
    }
  };

  const updateSelectedElement = (updates) => {
    if (selectedElement) {
      setDesignElements((prev) =>
        prev.map((el) =>
          el.id === selectedElement.id ? { ...el, ...updates } : el
        )
      );
      setSelectedElement({ ...selectedElement, ...updates });
    }
  };

  const addToCart = () => {
    if (
      selectedProduct &&
      selectedColor &&
      selectedSize &&
      designElements.length > 0
    ) {
      const cartItem = {
        id: Date.now(),
        product: selectedProduct,
        color: selectedColor,
        size: selectedSize,
        design: [...designElements],
        price: selectedProduct.basePrice + 10,
        quantity: 1,
      };
      setCart([...cart, cartItem]);
      setCurrentStep('cart');
    } else {
      alert('Por favor completa todos los campos y agrega al menos un elemento de diseño');
    }
  };

  const processPayment = () => {
    const newOrder = {
      id: Date.now(),
      items: [...cart],
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      status: 'confirmado',
      date: new Date().toLocaleDateString(),
      customer: user.name,
      customerEmail: user.email,
    };
    setOrders([...orders, newOrder]);
    setCart([]);
    setCurrentStep('confirmation');
    alert('¡Pago procesado exitosamente! Tu pedido ha sido confirmado.');
  };

  const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
      if (handleLogin(email, password)) {
        // handled in handleLogin
      } else {
        alert('Por favor ingresa email y contraseña');
      }
    };

    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleSubmit();
      }
    };

    return (
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="tu@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Iniciar Sesión
          </button>
        </div>
        <div className="mt-4 text-sm text-gray-600 text-center">
          <p>Demo: usa cualquier email/contraseña</p>
          <p>Para admin: usar email con "admin"</p>
        </div>
      </div>
    );
  };

  const ProductSelection = () => (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Selecciona tu Producto</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
              <Package size={64} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
            <p className="text-2xl font-bold text-blue-600 mb-4">${product.basePrice}</p>
            <button
              onClick={() => handleProductSelect(product)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Personalizar
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const CustomizationTool = () => (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">Vista Previa del Diseño</h3>
          <div className="relative w-full h-96 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden">
            <div
              className={`absolute inset-4 rounded-lg opacity-20 ${
                selectedColor === 'blanco'
                  ? 'bg-white border'
                  : selectedColor === 'negro'
                  ? 'bg-black'
                  : selectedColor === 'azul'
                  ? 'bg-blue-500'
                  : selectedColor === 'rojo'
                  ? 'bg-red-500'
                  : 'bg-gray-200'
              }`}
            ></div>
            {designElements.map((element) => (
              <div
                key={element.id}
                className={`absolute cursor-pointer ${
                  selectedElement?.id === element.id ? 'ring-2 ring-blue-500' : ''
                }`}
                style={{
                  left: element.x,
                  top: element.y,
                  transform: element.rotation ? `rotate(${element.rotation}deg)` : 'none',
                }}
                onClick={() => setSelectedElement(element)}
              >
                {element.type === 'image' ? (
                  <img
                    src={element.src}
                    alt="Diseño"
                    style={{ width: element.width, height: element.height }}
                    className="max-w-none"
                  />
                ) : (
                  <span
                    style={{
                      color: element.color,
                      fontFamily: element.font,
                      fontSize: element.size,
                    }}
                    className="font-semibold select-none"
                  >
                    {element.content}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Configuración</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Color</label>
              <div className="flex gap-2">
                {selectedProduct?.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === color ? 'border-blue-500' : 'border-gray-300'
                    } ${
                      color === 'blanco'
                        ? 'bg-white'
                        : color === 'negro'
                        ? 'bg-black'
                        : color === 'azul'
                        ? 'bg-blue-500'
                        : color === 'rojo'
                        ? 'bg-red-500'
                        : 'bg-gray-200'
                    }`}
                    title={color}
                  />
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Talla</label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Seleccionar talla</option>
                {selectedProduct?.sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Herramientas</h3>
          <div className="space-y-4">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors"
            >
              <Upload size={20} />
              Subir Imagen
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            <div className="space-y-2">
              <input
                type="text"
                placeholder="Agregar texto..."
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
              <div className="flex gap-2">
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-12 h-8 border rounded"
                />
                <select
                  value={textFont}
                  onChange={(e) => setTextFont(e.target.value)}
                  className="flex-1 p-2 border rounded-lg text-sm"
                >
                  <option value="Arial">Arial</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Times New Roman">Times</option>
                </select>
              </div>
              <button
                onClick={handleAddText}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                Agregar Texto
              </button>
            </div>
          </div>
        </div>

        {selectedElement && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Editar Elemento</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium mb-1">X</label>
                  <input
                    type="number"
                    value={selectedElement.x}
                    onChange={(e) =>
                      updateSelectedElement({ x: parseInt(e.target.value) || 0 })
                    }
                    className="w-full p-2 border rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Y</label>
                  <input
                    type="number"
                    value={selectedElement.y}
                    onChange={(e) =>
                      updateSelectedElement({ y: parseInt(e.target.value) || 0 })
                    }
                    className="w-full p-2 border rounded text-sm"
                  />
                </div>
              </div>
              {selectedElement.type === 'image' && (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium mb-1">Ancho</label>
                    <input
                      type="number"
                      value={selectedElement.width}
                      onChange={(e) =>
                        updateSelectedElement({
                          width: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full p-2 border rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Alto</label>
                    <input
                      type="number"
                      value={selectedElement.height}
                      onChange={(e) =>
                        updateSelectedElement({
                          height: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full p-2 border rounded text-sm"
                    />
                  </div>
                </div>
              )}

              <button
                onClick={() => {
                  setDesignElements((prev) =>
                    prev.filter((el) => el.id !== selectedElement.id)
                  );
                  setSelectedElement(null);
                }}
                className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
              >
                Eliminar Elemento
              </button>
            </div>
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="text-xl font-bold mb-4">
            Total: ${selectedProduct ? selectedProduct.basePrice + 10 : 0}
          </div>
          <button
            onClick={addToCart}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Agregar al Carrito
          </button>
        </div>
      </div>
    </div>
  );

  const ShoppingCartComponent = () => (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Carrito de Compras</h2>
      {cart.length === 0 ? (
        <div className="text-center text-gray-500">
          <ShoppingCart size={64} className="mx-auto mb-4 opacity-50" />
          <p>Tu carrito está vacío</p>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4 border-b">
              <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                <Package size={32} className="text-gray-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{item.product.name}</h3>
                <p className="text-gray-600">Color: {item.color} | Talla: {item.size}</p>
                <p className="text-gray-600">{item.design.length} elementos de diseño</p>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold">${item.price}</div>
              </div>
            </div>
          ))}
          <div className="pt-4">
            <div className="text-right text-2xl font-bold mb-4">
              Total: ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
            </div>
            <button
              onClick={processPayment}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <CreditCard size={20} />
              Proceder al Pago
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const AdminPanel = () => (
    <div className="max-w-6xl mx-auto">
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setAdminView('orders')}
          className={`py-2 px-4 rounded-lg ${
            adminView === 'orders' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          Pedidos
        </button>
        <button
          onClick={() => setAdminView('products')}
          className={`py-2 px-4 rounded-lg ${
            adminView === 'products' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          Productos
        </button>
        <button
          onClick={() => setAdminView('analytics')}
          className={`py-2 px-4 rounded-lg ${
            adminView === 'analytics' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          Análisis
        </button>
      </div>

      {adminView === 'orders' && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">Gestión de Pedidos</h3>
          {orders.length === 0 ? (
            <p className="text-gray-500">No hay pedidos registrados</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="border p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold">Pedido #{order.id}</h4>
                      <p className="text-gray-600">
                        {order.customer} - {order.customerEmail}
                      </p>
                      <p className="text-gray-600">Fecha: {order.date}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">${order.total}</div>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          order.status === 'confirmado'
                            ? 'bg-yellow-100 text-yellow-800'
                            : order.status === 'en impresión'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                      Ver Diseño
                    </button>
                    <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">
                      Actualizar Estado
                    </button>
                    <button className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 flex items-center gap-1">
                      <Download size={16} /> Descargar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {adminView === 'products' && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">Gestión de Productos</h3>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg mb-4 hover:bg-green-700 flex items-center gap-2">
            <Plus size={16} /> Agregar Producto
          </button>
          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="border p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <h4 className="font-semibold">{product.name}</h4>
                  <p className="text-gray-600">Precio base: ${product.basePrice}</p>
                  <p className="text-gray-600">Colores: {product.colors.join(', ')}</p>
                  <p className="text-gray-600">Tallas: {product.sizes.join(', ')}</p>
                </div>
                <div className="flex gap-2">
                  <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                    <Edit3 size={16} />
                  </button>
                  <button className="bg-red-600 text-white p-2 rounded hover:bg-red-700">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {adminView === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Pedidos Totales</p>
                <p className="text-3xl font-bold">{orders.length}</p>
              </div>
              <Package size={32} className="text-blue-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Ingresos</p>
                <p className="text-3xl font-bold">${orders.reduce((sum, o) => sum + o.total, 0)}</p>
              </div>
              <DollarSign size={32} className="text-green-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Productos</p>
                <p className="text-3xl font-bold">{products.length}</p>
              </div>
              <Settings size={32} className="text-purple-600" />
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const Navigation = () => (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Palette size={24} className="text-blue-600" />
            <span className="text-xl font-bold">SublimaPro</span>
          </div>

          <div className="flex items-center gap-4">
            {!user?.isAdmin && (
              <>
                <button
                  onClick={() => setCurrentStep('products')}
                  className={`px-3 py-2 rounded ${
                    currentStep === 'products'
                      ? 'bg-blue-100 text-blue-600'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  Productos
                </button>
                <button
                  onClick={() => setCurrentStep('cart')}
                  className={`px-3 py-2 rounded flex items-center gap-2 ${
                    currentStep === 'cart'
                      ? 'bg-blue-100 text-blue-600'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <ShoppingCart size={16} /> Carrito ({cart.length})
                </button>
              </>
            )}

            <div className="flex items-center gap-2">
              <User size={16} />
              <span>{user?.name}</span>
            </div>

            <button
              onClick={() => {
                setUser(null);
                setCurrentStep('login');
                setCart([]);
                setDesignElements([]);
                setSelectedElement(null);
                setSelectedProduct(null);
              }}
              className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
            >
              Salir
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {user && <Navigation />}
      <div className="container mx-auto px-4 py-8">
        {currentStep === 'login' && <LoginForm />}
        {currentStep === 'products' && <ProductSelection />}
        {currentStep === 'customize' && <CustomizationTool />}
        {currentStep === 'cart' && <ShoppingCartComponent />}
        {currentStep === 'admin' && <AdminPanel />}
        {currentStep === 'confirmation' && (
          <div className="max-w-md mx-auto text-center">
            <CheckCircle size={64} className="text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">¡Pedido Confirmado!</h2>
            <p className="text-gray-600 mb-4">
              Tu pedido ha sido procesado exitosamente. Recibirás un email de confirmación pronto.
            </p>
            <button
              onClick={() => setCurrentStep('products')}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Continuar Comprando
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SublimationMVP;
