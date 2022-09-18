export default () => {
  const formatToNaira = (amount) =>
    `₦${(Number(amount) / 100).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  return { formatToNaira };
};
