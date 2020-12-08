// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiURL: "https://api.backendless.com/ACC3E787-D7E6-43D4-FF9B-3BEE098FAE00/3E17CEA1-A057-4464-B642-274739CE17C5/",
  endPoint: {
    user: {
      login: 'users/login',
      register: 'users/register',
      logout: 'users/logout',
      validate: 'users/isvalidusertoken/'
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
