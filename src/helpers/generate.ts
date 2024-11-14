export const generateVietQr = (
  amount: number,
  addInfo: string,
  accountName: string
) => {
  return `https://img.vietqr.io/image/vietinbank-113366668888-compact2.jpg?amount=${amount}&${addInfo}&accountName=${accountName}"`;
}