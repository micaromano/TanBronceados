'use client';

import React, { useEffect } from 'react';
import { loadMercadoPago } from "@mercadopago/sdk-js";

console.log('window:', window );

async function ProcessPayment() {
    await loadMercadoPago();
    const mp = new window.MercadoPago("YOUR_PUBLIC_KEY");

    useEffect(() => {
        const cardNumberElement = mp.fields.create('cardNumber', {
            placeholder: "Número de la tarjeta"
        }).mount('#form-checkout__cardNumber');
        
        const expirationDateElement = mp.fields.create('expirationDate', {
            placeholder: "MM/YY",
        }).mount('#form-checkout__expirationDate');
        
        const securityCodeElement = mp.fields.create('securityCode', {
            placeholder: "Código de seguridad"
        }).mount('#form-checkout__securityCode');
    }, []); 

    (async function getIdentificationTypes() {
        try {
          const identificationTypes = await mp.getIdentificationTypes();
          const identificationTypeElement = document.getElementById('form-checkout__identificationType');
  
          createSelectOptions(identificationTypeElement, identificationTypes);
        } catch (e) {
          return console.error('Error getting identificationTypes: ', e);
        }
      })();
  
      function createSelectOptions(elem, options, labelsAndKeys = { label: "name", value: "id" }) {
        const { label, value } = labelsAndKeys;
  
        elem.options.length = 0;
  
        const tempOptions = document.createDocumentFragment();
  
        options.forEach(option => {
          const optValue = option[value];
          const optLabel = option[label];
  
          const opt = document.createElement('option');
          opt.value = optValue;
          opt.textContent = optLabel;
  
          tempOptions.appendChild(opt);
        });
  
        elem.appendChild(tempOptions);
      }
  
    return (
        <form id="form-checkout" action="/process_payment" method="POST">
            <div id="form-checkout__cardNumber" className="container"></div>
            <div id="form-checkout__expirationDate" className="container"></div>
            <div id="form-checkout__securityCode" className="container"></div>
            <input type="text" id="form-checkout__cardholderName" placeholder="Titular de la tarjeta" />
            <select id="form-checkout__issuer" name="issuer" defaultValue="">
                <option value="" disabled>Banco emisor</option>
            </select>
            <select id="form-checkout__installments" name="installments" defaultValue="">
                <option value="" disabled>Cuotas</option>
            </select>
            <select id="form-checkout__identificationType" name="identificationType" defaultValue="">
                <option value="" disabled>Tipo de documento</option>
            </select>
            <input type="text" id="form-checkout__identificationNumber" name="identificationNumber" placeholder="Número de documento" />
            <input type="email" id="form-checkout__email" name="email" placeholder="E-mail" />

            <input id="token" name="token" type="hidden"/>
            <input id="paymentMethodId" name="paymentMethodId" type="hidden"/>
            <input id="transactionAmount" name="transactionAmount" type="hidden" value="100"/>
            <input id="description" name="description" type="hidden" value="Nombre del Producto"/>

            <button type="submit" id="form-checkout__submit">Pagar</button>
        </form>
    );
}

export default ProcessPayment;
