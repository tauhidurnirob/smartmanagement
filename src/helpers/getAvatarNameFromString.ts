export default function getAvatarNameFromString(name: string, onlyFirst?: boolean) {
  const firstName = name.split(' ')[0]?.[0] || ''
  const secondName = name.split(' ')[1]?.[0] || ''
  return onlyFirst ? firstName : `${firstName}${secondName}`
}
