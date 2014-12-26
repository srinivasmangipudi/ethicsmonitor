Template.progressBar.helpers({
  progress: function () {
    console.log(this.uploader);

    if(this.uploader)
      return Math.round(this.uploader.progress() * 100);
    else
      return 0;
  }
});