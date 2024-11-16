export const formatVND = (amount: number | string) => {
  const number = typeof amount === "string" ? parseInt(amount, 10) : amount;
  
  if (isNaN(number)) {
    return "Invalid amount";
  }
  return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}