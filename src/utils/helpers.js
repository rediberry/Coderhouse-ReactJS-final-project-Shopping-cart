export const formatPrice = (number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'ARS',
    }).format(number / 1)
  }