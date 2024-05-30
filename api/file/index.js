export const getDownloadUrl = (businessId) => {
  if (businessId) {
    return `${url}/file/business/${businessId}/download`;
  }
};
