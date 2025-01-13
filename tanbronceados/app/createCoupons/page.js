'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function CouponsPage() {
  const [coupons, setCoupons] = useState([]);
  const [formData, setFormData] = useState({
    Code: '',
    DiscountPercentage: '',
    ValidFrom: '',
    ValidTo: '',
    MinPurchaseAmount: '',
    isActive: true,
  });
  const [error, setError] = useState('');
  const router = useRouter();

  // 1. Cargar cupones al montar el componente
  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const res = await fetch('/api/createCoupons');
      if (!res.ok) throw new Error('Error al obtener cupones');
      const data = await res.json();
      setCoupons(data);
    } catch (err) {
      console.error(err);
      setError('No se pudieron cargar los cupones');
    }
  };

  // 2. Manejar inputs del formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 3. Crear cupón
  const handleCreateCoupon = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/createCoupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || 'Error al crear el cupón');
      }
      // Cupón creado con éxito
      await fetchCoupons();  // Recargamos la lista
      // Limpia formulario
      setFormData({
        Code: '',
        DiscountPercentage: '',
        ValidFrom: '',
        ValidTo: '',
        MinPurchaseAmount: '',
        isActive: true,
      });
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  // 4. Eliminar cupón
  const handleDeleteCoupon = async (couponId) => {
    try {
      const res = await fetch('/api/createCoupons', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ CouponID: couponId }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || 'Error al eliminar el cupón');
      }

      await fetchCoupons();
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Gestión de Cupones</h1>

      {/* Formulario para crear un nuevo cupón */}
      <form onSubmit={handleCreateCoupon} style={{ marginBottom: '2rem' }}>
        <h2>Crear Cupón</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div>
          <label>Code: </label>
          <input
            type="text"
            name="Code"
            value={formData.Code}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>DiscountPercentage: </label>
          <input
            type="number"
            step="0.01"
            name="DiscountPercentage"
            value={formData.DiscountPercentage}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>ValidFrom: </label>
          <input
            type="date"
            name="ValidFrom"
            value={formData.ValidFrom}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>ValidTo: </label>
          <input
            type="date"
            name="ValidTo"
            value={formData.ValidTo}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Mínimo de Compra: </label>
          <input
            type="number"
            step="0.01"
            name="MinPurchaseAmount"
            value={formData.MinPurchaseAmount}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Activo: </label>
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={(e) =>
              setFormData({ ...formData, isActive: e.target.checked })
            }
          />
        </div>

        <button type="submit">Crear</button>
      </form>

      {/* Listar cupones existentes */}
      <h2>Lista de Cupones</h2>
      {coupons.length === 0 ? (
        <p>No hay cupones disponibles.</p>
      ) : (
        <ul>
          {coupons.map((coupon) => (
            <li key={coupon.CouponID}>
              <strong>{coupon.Code}</strong> - 
              {coupon.DiscountPercentage}% - Válido desde {coupon.ValidFrom} hasta{' '}
              {coupon.ValidTo} - Activo: {coupon.isActive ? 'Sí' : 'No'} - Mínimo de compra: 
              {coupon.MinPurchaseAmount}
              <button
                style={{ marginLeft: '1rem', cursor: 'pointer' }}
                onClick={() => handleDeleteCoupon(coupon.CouponID)}
              >
                Eliminar
              </button>
              {/* Podrías agregar un botón de "Editar" si deseas */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CouponsPage;
