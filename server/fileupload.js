Slingshot.createDirective("myFileUploads", Slingshot.S3Storage, {
  bucket: "ethicsmonitor",
  allowedFileTypes: ["image/png", "image/jpeg", "image/gif"],
  maxSize: 1200000,
  acl: "public-read",

  authorize: function () {
    //Deny uploads if user is not logged in.
    if (!this.userId) {
      var message = "Please login before posting files";
      throw new Meteor.Error("Login Required", message);
    }

    return true;
  },

  key: function (file) {
    // better to save by id instead of username 
    return this.userId + "/" + file.name;
    
    /*//Store file into a directory by the user's username.
    var user = Meteor.users.findOne(this.userId);
    var username = '';
    if(user && user.profile && user.profile.name)
    {
      username = user.profile.name;
    }
    else
      username = user.username;
    
    return username + "/" + file.name;*/
  }
});