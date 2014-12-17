Template.progressBar.helpers({
  progress: function () {

  	var uploader = Session.get("uploader");
  	console.log(uploader);

  	if(uploader !== undefined && uploader.progress)
  	{
  		//console.log(Math.round(uploader.progress * 100));
  		return Math.round(uploader.progress * 100);
  	}
    else
    	return 0;
  }
});