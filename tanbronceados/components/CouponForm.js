import React from 'react';
import styles from '../styles/coupons.module.css';

function CouponForm({ 
  formData, 
  coupons, 
  error, 
  handleChange, 
  handleCreateCoupon, 
  handleDeleteCoupon 
}) {
  return (
    <div className={styles['coupons-container']}>
      <h1>Gestión de Cupones</h1>

      <form onSubmit={handleCreateCoupon} className={styles.form}>
        <h2>Crear Cupón</h2>
        {error && <p className={styles.error}>{error}</p>}

        <label className={styles.label}>Code: </label>
        <input
          type="text"
          name="Code"
          value={formData.Code}
          onChange={handleChange}
          className={styles.input}
        />

        <label className={styles.label}>Porcentaje de descuento: </label>
        <input
          type="number"
          step="0.01"
          name="DiscountPercentage"
          value={formData.DiscountPercentage}
          onChange={handleChange}
          className={styles.input}
        />

        <label className={styles.label}>Valido desde: </label>
        <input
          type="date"
          name="ValidFrom"
          value={formData.ValidFrom}
          onChange={handleChange}
          className={styles.input}
        />

        <label className={styles.label}>Valido hasta: </label>
        <input
          type="date"
          name="ValidTo"
          value={formData.ValidTo}
          onChange={handleChange}
          className={styles.input}
        />

        <label className={styles.label}>Mínimo de Compra: </label>
        <input
          type="number"
          step="0.01"
          name="MinPurchaseAmount"
          value={formData.MinPurchaseAmount}
          onChange={handleChange}
          className={styles.input}
        />

        <label className={styles.label}>Activo: </label>
        <input
          type="checkbox"
          name="isActive"
          checked={formData.isActive}
          onChange={(e) =>
            handleChange({ target: { name: 'isActive', value: e.target.checked } })
          }
          className={styles.input}
        />

        <label className={styles.label}>Tipo de Cupón: </label>
        <select
          name="CouponType"
          value={formData.CouponType}
          onChange={handleChange}
          className={styles.select}
        >
          <option value="Novias - Vestido">Novias - Vestido</option>
          <option value="Novias - Maquillaje">Novias - Maquillaje</option>
          <option value="Promoción TAN">Promoción TAN</option>
          <option value="Influencer">Influencer</option>
          <option value="Otros">Otros</option>
        </select>

        <button type="submit" className={styles.button}>
          Crear
        </button>
      </form>

      <h2>Lista de Cupones</h2>
      <div className={styles['coupons-list']}>
        {coupons.length === 0 ? (
          <p>No hay cupones disponibles.</p>
        ) : (
          <ul>
            {coupons.map((coupon) => (
              <li key={coupon.CouponID} className={styles['coupons-list-item']}>
                <strong>{coupon.Code}</strong> - 
                {coupon.DiscountPercentage}% - Válido desde {coupon.ValidFrom} hasta{' '}
                {coupon.ValidTo} - Activo: {coupon.isActive ? 'Sí' : 'No'} - Mínimo de compra: 
                {coupon.MinPurchaseAmount}
                <button
                  className={styles['delete-button']}
                  onClick={() => handleDeleteCoupon(coupon.CouponID)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CouponForm;
