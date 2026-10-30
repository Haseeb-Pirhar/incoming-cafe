export const convertToFormData = (data: Record<string, any>): FormData => {
  const formData = new FormData();

  const appendFormData = (data: any, parentKey: string | null = null) => {
    if (
      data &&
      typeof data === "object" &&
      !(data instanceof Date) &&
      !(data instanceof File)
    ) {
      if (Array.isArray(data)) {
        const allFiles = data.every((item) => item instanceof File);

        if (allFiles) {
          data.forEach((file) => {
            if (parentKey) {
              formData.append(parentKey, file);
            }
          });
        } else {
          data.forEach((value, index) => {
            const key = parentKey ? `${parentKey}[${index}]` : String(index);
            appendFormData(value, key);
          });
        }
      } else {
        Object.keys(data).forEach((key) => {
          const value = data[key];
          const newKey = parentKey ? `${parentKey}[${key}]` : key;
          appendFormData(value, newKey);
        });
      }
    } else {
      if (parentKey !== null) {
        formData.append(parentKey, data);
      }
    }
  };

  appendFormData(data);
  return formData;
};
