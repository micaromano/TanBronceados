'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CouponForm from '../../components/CouponForm';

function CouponsPage() {
  const [coupons, setCoupons] = useState([]);
  const [formData, setFormData] = useState({
    Code: '',
    DiscountPercentage: '',
    ValidFrom: '',
    ValidTo: '',
    MinPurchaseAmount: '',
    isActive: true,
    CouponType: 'Promoción TAN', // Valor predeterminado
  });
  const [error, setError] = useState('');
  const router = useRouter();

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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

      await fetchCoupons();

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
    <CouponForm
      formData={formData}
      coupons={coupons}
      error={error}
      handleChange={handleChange}
      handleCreateCoupon={handleCreateCoupon}
      handleDeleteCoupon={handleDeleteCoupon}
    />
  );
}

export default CouponsPage;
