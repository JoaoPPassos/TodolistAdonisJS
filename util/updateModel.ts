export const updatingField = (model, field, value) => {
  try {
    model[field] = value
  } catch (error) {
    return false
  }
}
