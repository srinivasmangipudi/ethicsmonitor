Accounts.ui.config({
	passwordSignupFields: 'USERNAME_ONLY'
});

ShareIt.configure({
    useFB: true,          // boolean (default: true)
                          // Whether to show the Facebook button
    useTwitter: true,     // boolean (default: true)
                          // Whether to show the Twitter button
    useGoogle: true,      // boolean (default: true)
                          // Whether to show the Google+ button
    classes: "default btn", // string (default: 'large btn')
                          // The classes that will be placed on the sharing buttons, bootstrap by default.
    iconOnly: false,      // boolean (default: false)
                          // Don't put text on the sharing buttons
    applyColors: true     // boolean (default: true)
                          // apply classes to inherit each social networks background color
  });