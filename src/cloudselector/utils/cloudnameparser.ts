export function getCloudName(cloudName: string) {
  return cloudName.slice(cloudName.indexOf("-") + 2, cloudName.indexOf(":"));
}

export function getCloudProvider(cloudName: string) {
  return cloudName.slice(0, cloudName.indexOf("-"));
}
