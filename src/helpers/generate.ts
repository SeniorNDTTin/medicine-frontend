export const generateVietQr = (
  amount: number,
  addInfo: string,
  accountName: string
) => {
  return `https://img.vietqr.io/image/bidv-7411169464-compact2.jpg?amount=${amount}&${addInfo}&accountName=${accountName}"`;
}