export function isGranted(permissionName, permissions) {
  return (
    permissions.allPermissions[permissionName] != undefined &&
    permissions.grantedPermissions[permissionName] != undefined
  );
}
