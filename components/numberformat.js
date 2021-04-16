export const numberFormat = (value) => {
  if (value == undefined || value == "-") {
    return "-";
  } else {
    return new Intl.NumberFormat("en-IN").format(value);
  }
};
