

//Retrieve Job Bank data from their RSS feed
function pullData()
{
  var content = document.getElementById('content');
  var noc = $("#noc").val();
  var xhr = new XMLHttpRequest();

  console.log(noc);

  xhr.onreadystatechange = function(){
      if (xhr.readyState==4 && xhr.status==200)
      {
          var data = JSON.parse(xhr.responseText);
          console.log(data.items);
          var locationString = [];
          if(data.status == 'ok'){

              var output = '<h1> Number of Jobs: '+data.items.length+'</h1>';

              for(var i=0;i<data.items.length;++i){

                  output += '<p><h2><a href="' +
                  data.items[i].link + '" >' +
                  data.items[i].title + '</h2></a></p>';

                  var locationIndex = data.items[i].content.indexOf("Location:");

                  for (var j=0; j < data.items[i].content.length; j++){
                    if (data.items[i].content.charAt(locationIndex + 17 + j) === "<")
                    {
                      break;
                    }
                    else {
                      locationString[i] += data.items[i].content.charAt(locationIndex + 17 + j);
                    }
                  }
                  console.log(locationString[i]);

              }


              content.innerHTML = output;

          }
      }
  };
  xhr.open('GET','https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.jobbank.gc.ca%2Fjobsearch%2Ffeed%2FjobSearchRSSfeed%3Fnoc%3D' + noc + '%26sort%3DD%26wid%3Dpv%26pcd%3DON%26lang%3Den&api_key=fmdoce28xipk4eplanimu1ox9of5qxqiitrtj5xw&count=200',true);
  xhr.send();
 }
