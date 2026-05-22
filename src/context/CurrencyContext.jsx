import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyContext = createContext();

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within CurrencyProvider');
  }
  return context;
};

export const CurrencyProvider = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('PKR');
  const [exchangeRates, setExchangeRates] = useState({});
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const BASE_CURRENCY = 'PKR';

  // All currencies list
  const allCurrencies = [
    'PKR', 'USD', 'EUR', 'GBP', 'INR', 'AED', 'SAR', 'CAD', 'AUD', 'JPY', 
    'CNY', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AWG', 'AZN', 'BAM', 
    'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BRL', 'BSD', 
    'BTN', 'BWP', 'BYN', 'BZD', 'CDF', 'CHF', 'CLP', 'COP', 'CRC', 'CUP', 
    'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EGP', 'ERN', 'ETB', 'FJD', 
    'FKP', 'GEL', 'GHS', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 
    'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'IQD', 'IRR', 'ISK', 'JMD', 'JOD', 
    'KES', 'KGS', 'KHR', 'KMF', 'KPW', 'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 
    'LBP', 'LKR', 'LRD', 'LSL', 'LYD', 'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 
    'MNT', 'MOP', 'MRU', 'MUR', 'MVR', 'MWK', 'MXN', 'MYR', 'MZN', 'NAD', 
    'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN', 'PGK', 'PHP', 
    'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SBD', 'SCR', 'SDG', 
    'SEK', 'SGD', 'SHP', 'SLL', 'SOS', 'SRD', 'SSP', 'STN', 'SVC', 'SYP', 
    'SZL', 'THB', 'TJS', 'TMT', 'TND', 'TOP', 'TRY', 'TTD', 'TWD', 'TZS', 
    'UAH', 'UGX', 'UYU', 'UZS', 'VES', 'VND', 'VUV', 'WST', 'XAF', 'XCD', 
    'XOF', 'XPF', 'YER', 'ZAR', 'ZMW', 'ZWL'
  ];

  const fetchExchangeRates = async (targetCurrency) => {
    if (targetCurrency === BASE_CURRENCY) {
      setExchangeRates({});
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      // Using ExchangeRate-API (free, no key needed for basic)
      const response = await axios.get(
        `https://api.exchangerate-api.com/v4/latest/${BASE_CURRENCY}`
      );
      
      if (response.data && response.data.rates) {
        const rate = response.data.rates[targetCurrency];
        if (rate) {
          setExchangeRates({ [targetCurrency]: rate });
          setLastUpdate(new Date().toLocaleString());
        } else {
          // Fallback rate
          setExchangeRates({ [targetCurrency]: 1 });
        }
      }
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      // Manual fallback rates for common currencies
      const fallbackRates = {
        USD: 0.0036, EUR: 0.0033, GBP: 0.0028, INR: 0.30, 
        AED: 0.013, SAR: 0.0135, CAD: 0.0049, AUD: 0.0054,
        JPY: 0.54, CNY: 0.026
      };
      setExchangeRates({ [targetCurrency]: fallbackRates[targetCurrency] || 1 });
      setLastUpdate(new Date().toLocaleString());
    } finally {
      setLoading(false);
    }
  };

  const convertAmount = (amountInPKR) => {
    if (!amountInPKR || amountInPKR === 0) return 0;
    if (!selectedCurrency || selectedCurrency === BASE_CURRENCY) {
      return amountInPKR;
    }
    const rate = exchangeRates[selectedCurrency];
    if (rate && rate !== 1) {
      const converted = (amountInPKR * rate).toFixed(2);
      return converted;
    }
    return amountInPKR;
  };

  useEffect(() => {
    fetchExchangeRates(selectedCurrency);
  }, [selectedCurrency]);

  return (
    <CurrencyContext.Provider
      value={{
        selectedCurrency,
        setSelectedCurrency,
        convertAmount,
        exchangeRates,
        loading,
        lastUpdate,
        BASE_CURRENCY,
        allCurrencies
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};