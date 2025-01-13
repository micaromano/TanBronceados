import CouponModel from '../../models/CouponModel';
import db from '../../config/db';

export default async function handler(req, res) {
  const { method } = req;

  try {
    // Asegúrate de conectar la DB (si todavía no está conectada en algún middleware).
    await db.authenticate();

    switch (method) {
      /**
       * GET /api/coupons
       * Obtiene la lista de todos los cupones
       */
      case 'GET': {
        const coupons = await CouponModel.raw.findAll();
        return res.status(200).json(coupons);
      }

      /**
       * POST /api/coupons
       * Crea un nuevo cupón. El body debería incluir:
       *  { Code, DiscountPercentage, ValidFrom, ValidTo, MinPurchaseAmount, isActive }
       */
      case 'POST': {
        const {
          Code,
          DiscountPercentage,
          ValidFrom,
          ValidTo,
          MinPurchaseAmount,
          isActive = true,
        } = req.body;

        // Puedes validar campos aquí
        if (!Code || !DiscountPercentage || !ValidFrom || !ValidTo || !MinPurchaseAmount) {
          return res
            .status(400)
            .json({ error: 'Faltan campos requeridos para crear el cupón' });
        }

        const newCoupon = await CouponModel.raw.create({
          Code,
          DiscountPercentage,
          ValidFrom,
          ValidTo,
          MinPurchaseAmount,
          isActive,
        });

        return res.status(201).json(newCoupon);
      }

      /**
       * PUT /api/coupons
       * Actualiza un cupón existente. Se espera que envíes
       * el ID y campos a actualizar en el body.
       */
      case 'PUT': {
        const {
          CouponID,
          Code,
          DiscountPercentage,
          ValidFrom,
          ValidTo,
          MinPurchaseAmount,
          isActive,
        } = req.body;

        if (!CouponID) {
          return res.status(400).json({ error: 'Se requiere CouponID para actualizar' });
        }

        const coupon = await CouponModel.raw.findByPk(CouponID);
        if (!coupon) {
          return res.status(404).json({ error: 'Cupón no encontrado' });
        }

        // Actualiza únicamente campos que estén presentes en el body
        if (Code !== undefined) coupon.Code = Code;
        if (DiscountPercentage !== undefined)
          coupon.DiscountPercentage = DiscountPercentage;
        if (ValidFrom !== undefined) coupon.ValidFrom = ValidFrom;
        if (ValidTo !== undefined) coupon.ValidTo = ValidTo;
        if (MinPurchaseAmount !== undefined)
          coupon.MinPurchaseAmount = MinPurchaseAmount;
        if (isActive !== undefined) coupon.isActive = isActive;

        await coupon.save();
        return res.status(200).json(coupon);
      }

      /**
       * DELETE /api/coupons
       * Elimina un cupón. Se espera un 'CouponID' en el body.
       */
      case 'DELETE': {
        const { CouponID } = req.body;

        if (!CouponID) {
          return res.status(400).json({ error: 'Se requiere CouponID para eliminar' });
        }

        const coupon = await CouponModel.raw.findByPk(CouponID);
        if (!coupon) {
          return res.status(404).json({ error: 'Cupón no encontrado' });
        }

        await coupon.destroy();
        return res.status(200).json({ message: 'Cupón eliminado exitosamente' });
      }

      default:
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('Error in /api/coupons:', error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
}
