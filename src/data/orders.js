export const orders = [
  {
    id: 'ORD-2024-8847',
    product: {
      name: { en: 'Classic Linen Shirt', hi: 'क्लासिक लिनन शर्ट' },
      image: '👔',
      price: 1499,
      quantity: 1,
    },
    date: '2024-12-28',
    total: 1499,
    status: 'delivered',
    trackingStep: 3, // 0=Ordered, 1=Packed, 2=OnTheWay, 3=Delivered
    deliveryDate: '2025-01-02',
    estimatedDelivery: '2025-01-03',
    deliveryPartner: 'Raju K.',
    refund: null,
  },
  {
    id: 'ORD-2024-9102',
    product: {
      name: { en: 'Wireless Earbuds Max', hi: 'वायरलेस इयरबड्स मैक्स' },
      image: '🎧',
      price: 3999,
      quantity: 1,
    },
    date: '2025-01-05',
    total: 3999,
    status: 'on_the_way',
    trackingStep: 2, // On the Way
    deliveryDate: null,
    estimatedDelivery: '2025-01-09',
    deliveryPartner: 'Sunil M.',
    refund: null,
  },
  {
    id: 'ORD-2024-7653',
    product: {
      name: { en: 'Running Sneakers Pro', hi: 'रनिंग स्नीकर्स प्रो' },
      image: '👟',
      price: 2799,
      quantity: 1,
    },
    date: '2024-12-15',
    total: 2799,
    status: 'returned',
    trackingStep: 3,
    deliveryDate: '2024-12-19',
    estimatedDelivery: '2024-12-20',
    deliveryPartner: 'Amit S.',
    refund: {
      reason: 'wrongSize',
      status: 'bankTransfer', // returned -> warehouse -> qualityCheck -> approved -> bankTransfer
      refundStep: 4,
      amount: 2799,
      initiatedDate: '2024-12-22',
      estimatedDate: '2025-01-05',
    },
  },
  {
    id: 'ORD-2025-1201',
    product: {
      name: { en: 'Cotton Kurta Set', hi: 'कॉटन कुर्ता सेट' },
      image: '👘',
      price: 1899,
      quantity: 2,
    },
    date: '2025-01-08',
    total: 3798,
    status: 'packed',
    trackingStep: 1, // Packed
    deliveryDate: null,
    estimatedDelivery: '2025-01-13',
    deliveryPartner: null,
    refund: null,
  },
];

export const trackingSteps = [
  { key: 'ordered', icon: 'ShoppingBag' },
  { key: 'packed', icon: 'Package' },
  { key: 'onTheWay', icon: 'Truck' },
  { key: 'delivered', icon: 'CheckCircle' },
];

export const refundSteps = [
  { key: 'returned', icon: 'RotateCcw' },
  { key: 'warehouse', icon: 'Warehouse' },
  { key: 'qualityCheck', icon: 'ClipboardCheck' },
  { key: 'approved', icon: 'ShieldCheck' },
  { key: 'bankTransfer', icon: 'Banknote' },
];

export const returnReasons = [
  { key: 'wrongSize', icon: 'Ruler' },
  { key: 'damaged', icon: 'AlertTriangle' },
  { key: 'notAsDescribed', icon: 'FileX' },
  { key: 'changedMind', icon: 'RefreshCw' },
  { key: 'defective', icon: 'XCircle' },
  { key: 'lateDelivery', icon: 'Clock' },
  { key: 'wrongItem', icon: 'PackageX' },
  { key: 'other', icon: 'MoreHorizontal' },
];
