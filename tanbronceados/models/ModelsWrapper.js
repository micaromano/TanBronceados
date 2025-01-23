const db = require('../config/db');

const AdminModel = require('./AdminModel');
const AutomatedNotificationModel = require('./AutomatedNotificationModel');
const BookingModel = require('./BookingModel');
const ClientModel = require('./ClientModel');
const CouponModel = require('./CouponModel');
const DiscountCouponModel = require('./DiscountCouponModel');
const NotificationModel = require('./NotificationModel');
const PaymentModel = require('./PaymentModel');
const ServiceModel = require('./ServiceModel');
const SessionModel = require('./SessionModel');

const adminModel = new AdminModel(db);
const automatedNotificationModel = new AutomatedNotificationModel(db);
const bookingModel = new BookingModel(db);
const clientModel = new ClientModel(db);
const couponModel = new CouponModel(db);
const discountCouponModel = new DiscountCouponModel(db);
const notificationModel = new NotificationModel(db);
const paymentModel = new PaymentModel(db);
const serviceModel = new ServiceModel(db);
const sessionModel = new SessionModel(db);

const models = { 
    adminModel,
    automatedNotificationModel,
    bookingModel,
    clientModel,
    couponModel,
    discountCouponModel,
    notificationModel,
    paymentModel,
    serviceModel,
    sessionModel
}

Object.keys(models).forEach((model)=>{
    if(model.associate){
        model.associate();
    }
})

db.sync().then(()=> {
    console.log('database sync correctly');
}).catch(()=>{
    console.log('database not sync');
})

module.exports = models;

