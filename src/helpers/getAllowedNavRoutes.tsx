// import { IRouteInfo } from '../types/route'

// const filterRoutes = (routes: IRouteInfo[], rolePermissions: string[]): IRouteInfo[] => {
//   return routes.filter((route) => {
//     if (!route.children || route.children.length === 0) {
//       if (!route.permissions || route.permissions.length === 0) return true

//       return (
//         route.permissions.findIndex((p) => rolePermissions.findIndex((r) => r === p) !== -1) !== -1
//       )
//     }

//     const filteredChildren = filterRoutes(route.children, rolePermissions)
//     return filteredChildren.length > 0
//   })
// }

// export default function getAllowedNavRoutes(routes: IRouteInfo[], rolePermissions: string[]) {
//   return filterRoutes(routes, rolePermissions)
// }


// import { IRouteInfo } from '../types/route'

// const filterRoutes = (routes: IRouteInfo[], rolePermissions: string[]): IRouteInfo[] => {
//   console.log("filterRoutes######")
//   console.log(routes)
//   return routes.filter((route) => {
//     console.log("loop##")
//     // Check if the route has permissions defined
//     if (route.permissions && route.permissions.length > 0) {
//       // Check if any of the role permissions match the route permissions
//       const hasPermission = route.permissions.some(permission => rolePermissions.includes(permission))
//       if (!hasPermission) {
//         // If no permission matches, filter out this route
//         return false;
//       }
//     }
    
//     // If the route has children, recursively filter them
//     if (route.children && route.children.length > 0) {
//       route.children = filterRoutes(route.children, rolePermissions);
//       // If any children routes remain after filtering, keep this route
//       return route.children.length > 0;
//     }

//     // If no children or permissions are defined or all children are filtered out, keep this route
//     return true;
//   });
// }

// export default function getAllowedNavRoutes(routes: IRouteInfo[], rolePermissions: string[]) {
//   return filterRoutes(routes, rolePermissions);
// }

import { IRouteInfo } from '../types/route'

const filterRoutes = (routes: IRouteInfo[], rolePermissions: string[]): IRouteInfo[] => {
  
  return routes.map(route => {
    // Create a shallow copy of the route object
    const filteredRoute = { ...route };

    // Check if the route has permissions defined
    if (filteredRoute.permissions && filteredRoute.permissions.length > 0) {
      // Check if any of the role permissions match the route permissions
      const hasPermission = filteredRoute.permissions.every(permission => rolePermissions.includes(permission));
      if (!hasPermission) {
        // If no permission matches, filter out this route
        return null;
      }
    }
    
    // If the route has children, recursively filter them
    if (filteredRoute.children && filteredRoute.children.length > 0) {
      filteredRoute.children = filterRoutes(filteredRoute.children, rolePermissions);
      // If any children routes remain after filtering, keep this route
      if (filteredRoute.children.length === 0) {
        return null;
      }
    }

    // If no children or permissions are defined or all children are filtered out, keep this route
    return filteredRoute;
  }).filter((route): route is IRouteInfo => route !== null);
}

export default function getAllowedNavRoutes(routes: IRouteInfo[], rolePermissions: string[]) {
  return filterRoutes(routes, rolePermissions);
}


