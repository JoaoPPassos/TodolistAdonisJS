export const fieldsChecker = (required: String[], body: Object) => {
  const fieldsOnBody: String[] = Object.keys(body)
  const fieldsNotRelated = required.filter((item) => !fieldsOnBody.includes(item))

  if (fieldsNotRelated.length > 0) {
    let message: Object[] = []
    fieldsNotRelated.forEach((item) => {
      message.push({
        field: item,
        message: `campo ${item} é necessário`,
      })
    })
    throw new Error(JSON.stringify(message))
  }

  return true
}
